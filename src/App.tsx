import React, { useState, useCallback } from 'react';
import { Capacitor } from '@capacitor/core';
import { ErrorBoundary } from './components/ErrorBoundary';
import { OfflineIndicator } from './components/OfflineIndicator';
import { MedicalDisclaimer } from './components/MedicalDisclaimer';
import { UserAuth } from './components/UserAuth';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfService } from './components/TermsOfService';
import { AccessibilityFeatures } from './components/AccessibilityFeatures';
import { SubscriptionManagement } from './components/SubscriptionManagement';
import { Sidebar } from './components/Sidebar';
import { ChatInterface } from './components/ChatInterface';
import { PetManagement } from './components/PetManagement';
import { HealthDashboard } from './components/HealthDashboard';
import { SubscriptionModal } from './components/SubscriptionModal';
import { PetOnboarding } from './components/PetOnboarding';
import { VetRegistration } from './components/VetRegistration';
import { InsuranceQuotes } from './components/InsuranceQuotes';
import { useLocalStorage } from './hooks/useLocalStorage';
import { generateAIResponse, categorizeMessage } from './services/aiService';
import { createCheckoutSession, redirectToCheckout } from './services/stripeService';
import { subscriptionPlans } from './services/stripeService';
import { Pet, Chat, Message, Subscription, HealthRecord, VetAppointment } from './types';
import { ReminderService } from './services/reminderService';
import { ReminderPrompt } from './components/ReminderPrompt';

interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  emailVerified: boolean;
}

type View = 'chat' | 'pets' | 'health' | 'vet-registration';

function App() {
  // User Authentication
  const [user, setUser] = useLocalStorage<User | null>('dogswab-user', null);
  const [showAuth, setShowAuth] = useState(false);
  const [showMedicalDisclaimer, setShowMedicalDisclaimer] = useLocalStorage<boolean>('dogswab-medical-disclaimer-accepted', false);
  
  // Legal & Accessibility
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTermsOfService, setShowTermsOfService] = useState(false);
  const [showAccessibility, setShowAccessibility] = useState(false);
  const [showSubscriptionManagement, setShowSubscriptionManagement] = useState(false);
  
  const [pets, setPets] = useLocalStorage<Pet[]>('dogswab-pets', []);
  const [chats, setChats] = useLocalStorage<Chat[]>('dogswab-chats', []);
  const [healthRecords, setHealthRecords] = useLocalStorage<HealthRecord[]>('dogswab-health-records', []);
  const [subscription, setSubscription] = useLocalStorage<Subscription>('dogswab-subscription', {
    id: 'free',
    tier: 'free',
    status: 'active',
    currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    consultationsUsed: 0,
    consultationsLimit: 5
  });
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useLocalStorage<boolean>('dogswab-onboarding', false);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
  const [selectedHealthPetId, setSelectedHealthPetId] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<View>('chat');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [showVetRegistration, setShowVetRegistration] = useState(false);
  const [showInsuranceQuotes, setShowInsuranceQuotes] = useState(false);
  const [insuranceQuotePet, setInsuranceQuotePet] = useState<Pet | null>(null);
  const [showReminderPrompt, setShowReminderPrompt] = useState(false);
  const [reminderSuggestions, setReminderSuggestions] = useState<Array<{
    title: string;
    message: string;
    timeInMinutes: number;
    type: 'checkup' | 'medication' | 'feeding' | 'exercise' | 'vet_followup' | 'general';
  }>>([]);
  const [revenueStats, setRevenueStats] = useLocalStorage('dogswab-revenue', {
    totalRevenue: 0,
    monthlyRevenue: 0,
    subscriptionRevenue: 0,
    vetCommissions: 0,
    insuranceCommissions: 0
  });

  const selectedChat = chats.find(chat => chat.id === selectedChatId);
  const selectedHealthPet = pets.find(pet => pet.id === selectedHealthPetId);
  const isMobile = Capacitor.isNativePlatform();

  // Show medical disclaimer on first use
  React.useEffect(() => {
    const hasAcceptedDisclaimer = localStorage.getItem('dogswab-medical-disclaimer-accepted');
    if (!hasAcceptedDisclaimer) {
      setShowMedicalDisclaimer(true);
    }
  }, []);

  const handleAcceptDisclaimer = () => {
    localStorage.setItem('dogswab-medical-disclaimer-accepted', 'true');
    setShowMedicalDisclaimer(false);
  };

  const handleDeclineDisclaimer = () => {
    alert('You must accept the medical disclaimer to use DOGSWAB.');
    // In production, you might redirect to a different page or close the app
  };

  const handleAuthSuccess = (userData: User) => {
    setUser(userData);
    setShowAuth(false);
  };

  const createNewChat = useCallback(() => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: 'New Consultation',
      messages: [],
      petId: selectedPetId,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setChats(prev => [newChat, ...prev]);
    setSelectedChatId(newChat.id);
    setCurrentView('chat');
    setSidebarOpen(false);
  }, [selectedPetId, setChats]);

  const sendMessage = useCallback(async (content: string, petId?: string) => {
    // Check subscription limits
    if (subscription.consultationsUsed >= subscription.consultationsLimit) {
      setShowSubscriptionModal(true);
      return;
    }

    let chatId = selectedChatId;
    
    // Create new chat if none exists
    if (!chatId) {
      const newChat: Chat = {
        id: Date.now().toString(),
        title: 'New Consultation',
        messages: [],
        petId: petId || selectedPetId,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      setChats(prev => [newChat, ...prev]);
      setSelectedChatId(newChat.id);
      chatId = newChat.id;
    }

    console.log('Sending message:', content);
    
    const finalPetId = petId || selectedPetId;
    const category = categorizeMessage(content);
    const pet = pets.find(p => p.id === finalPetId);
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
      petId: finalPetId,
      category
    };

    // Update chat with user message
    setChats(prev => prev.map(chat => 
      chat.id === chatId 
        ? {
            ...chat,
            messages: [...chat.messages, userMessage],
            title: chat.messages.length === 0 ? content.slice(0, 50) + (content.length > 50 ? '...' : '') : chat.title,
            updatedAt: new Date(),
            petId: finalPetId
          }
        : chat
    ));

    setIsLoading(true);

    try {
      console.log('Calling generateAIResponse...');
      const aiResponse = await generateAIResponse(content, category, pet?.name, pet);
      console.log('Received AI response:', aiResponse.substring(0, 100) + '...');
      
      // Ensure we have a valid response
      if (!aiResponse || aiResponse.trim() === '') {
        throw new Error('Empty response from AI service');
      }
      
      console.log('Full AI response received:', aiResponse);
      
      // Parse AI response for reminder suggestions
      const suggestions = ReminderService.parseAIResponseForReminders(aiResponse, finalPetId);
      if (suggestions.length > 0) {
        setReminderSuggestions(suggestions);
        setShowReminderPrompt(true);
      }
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
        petId: finalPetId
      };

      console.log('Adding AI message to chat:', aiMessage);
      
      setChats(prev => prev.map(chat => 
        chat.id === chatId 
          ? {
              ...chat,
              messages: [...chat.messages, aiMessage],
              updatedAt: new Date()
            }
          : chat
      ));

      // Update consultation count
      setSubscription(prev => ({
        ...prev,
        consultationsUsed: prev.consultationsUsed + 1
      }));
    } catch (error) {
      console.error('Error generating AI response:', error);
      
      // Add error message to chat
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `❌ I apologize, but I'm having trouble processing your request right now. This could be due to:\n\n• Network connectivity issues\n• API service temporarily unavailable\n• Configuration problems\n\nPlease try again in a moment. If the problem persists, check your internet connection or contact support.\n\nError details: ${error instanceof Error ? error.message : 'Unknown error'}`,
        sender: 'ai',
        timestamp: new Date(),
        petId: finalPetId
      };

      setChats(prev => prev.map(chat => 
        chat.id === chatId 
          ? {
              ...chat,
              messages: [...chat.messages, errorMessage],
              updatedAt: new Date()
            }
          : chat
      ));
    } finally {
      setIsLoading(false);
    }
  }, [selectedChatId, selectedPetId, pets, setChats, subscription, setSubscription]);

  const addPet = useCallback((petData: Omit<Pet, 'id'>) => {
    const newPet: Pet = {
      ...petData,
      id: Date.now().toString()
    };
    setPets(prev => [...prev, newPet]);
    setSelectedPetId(newPet.id); // Auto-select the newly added pet
  }, [setPets]);

  const updatePet = useCallback((id: string, updates: Partial<Pet>) => {
    setPets(prev => prev.map(pet => 
      pet.id === id ? { ...pet, ...updates } : pet
    ));
  }, [setPets]);

  const deletePet = useCallback((id: string) => {
    setPets(prev => prev.filter(pet => pet.id !== id));
    // Also remove pet from any chats
    setChats(prev => prev.map(chat => ({
      ...chat,
      petId: chat.petId === id ? undefined : chat.petId,
      messages: chat.messages.map(msg => ({
        ...msg,
        petId: msg.petId === id ? undefined : msg.petId
      }))
    })));
  }, [setPets, setChats]);

  const handleOnboardingComplete = useCallback((petData: Omit<Pet, 'id'>) => {
    addPet(petData);
    setHasCompletedOnboarding(true);
  }, [addPet, setHasCompletedOnboarding]);

  const handleSkipOnboarding = useCallback(() => {
    setHasCompletedOnboarding(true);
  }, [setHasCompletedOnboarding]);

  const handleSubscribe = useCallback(async (tier: string) => {
    try {
      // Find the selected plan
      const selectedPlan = subscriptionPlans.find(plan => plan.id === tier);
      if (!selectedPlan) {
        throw new Error('Invalid subscription plan selected');
      }

      console.log('Starting subscription for:', selectedPlan.name, 'Price ID:', selectedPlan.priceId);
      
      // Check if price ID is configured
      if (selectedPlan.priceId.startsWith('REPLACE_WITH_')) {
        alert('⚠️ Stripe products not configured yet!\n\nPlease create the Stripe products first and update the Price IDs.\n\nSee STRIPE_SETUP.md for instructions.');
        return;
      }

      // Redirect to Stripe Checkout
      await createCheckoutSession(selectedPlan.priceId, 'user_123');
      
      // The redirect happens automatically, so we don't need to do anything else here
      // The success handling will happen when the user returns from Stripe
    } catch (error) {
      console.error('Subscription error:', error);
      alert(`Subscription failed: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`);
    }
  }, []);

  const handleVetRegistrationSuccess = useCallback((vetId: string) => {
    alert(`🎉 Veterinarian registration successful! 
    
Welcome to the DOGSWAB marketplace! Your profile is under review and will be activated within 24 hours.
    
Vet ID: ${vetId}
Commission Rate: 15%
Expected monthly earnings: $2,000-$8,000`);
    setShowVetRegistration(false);
  }, []);

  const handleInsuranceCommission = useCallback((commission: number) => {
    setRevenueStats(prev => ({
      ...prev,
      insuranceCommissions: prev.insuranceCommissions + commission,
      monthlyRevenue: prev.monthlyRevenue + commission,
      totalRevenue: prev.totalRevenue + commission
    }));
  }, [setRevenueStats]);

  const addHealthRecord = useCallback((record: Omit<HealthRecord, 'id'>) => {
    const newRecord: HealthRecord = {
      ...record,
      id: Date.now().toString()
    };
    setHealthRecords(prev => [...prev, newRecord]);
  }, [setHealthRecords]);

  const bookAppointment = useCallback((appointment: Omit<VetAppointment, 'id'>) => {
    const commission = appointment.price * 0.15; // 15% commission
    
    // Update revenue stats
    setRevenueStats(prev => ({
      ...prev,
      vetCommissions: prev.vetCommissions + commission,
      monthlyRevenue: prev.monthlyRevenue + commission,
      totalRevenue: prev.totalRevenue + commission
    }));
    
    console.log(`Vet booking commission earned: $${commission.toFixed(2)}`);
  }, [setRevenueStats]);

  const showInsuranceForPet = useCallback((pet: Pet) => {
    setInsuranceQuotePet(pet);
    setShowInsuranceQuotes(true);
  }, []);

  // Show onboarding if user hasn't completed it and has no pets
  if (!hasCompletedOnboarding && pets.length === 0) {
    return (
      <ErrorBoundary>
        <div className="min-h-screen overflow-y-auto">
          <OfflineIndicator />
          <PetOnboarding
            onAddPet={handleOnboardingComplete}
            onSkip={handleSkipOnboarding}
          />
          
          {/* Medical Disclaimer */}
          <MedicalDisclaimer
            isOpen={showMedicalDisclaimer}
            onAccept={handleAcceptDisclaimer}
            onDecline={handleDeclineDisclaimer}
          />
        </div>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <div className="flex h-screen" style={{ backgroundColor: '#2d2f63' }}>
        <OfflineIndicator />
        
        <Sidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          chats={chats}
          pets={pets}
          selectedChatId={selectedChatId}
          onChatSelect={(chatId) => {
            setSelectedChatId(chatId);
            setCurrentView('chat');
            setSidebarOpen(false);
          }}
          onNewChat={createNewChat}
          onPetManagement={() => {
            setCurrentView('pets');
            setSidebarOpen(false);
          }}
          onHealthDashboard={(petId) => {
            setSelectedHealthPetId(petId);
            setCurrentView('health');
            setSidebarOpen(false);
          }}
          onUpgrade={() => setShowSubscriptionModal(true)}
          onVetRegistration={() => setShowVetRegistration(true)}
          onInsuranceQuotes={showInsuranceForPet}
          subscriptionTier={subscription.tier}
          consultationsUsed={subscription.consultationsUsed}
          consultationsLimit={subscription.consultationsLimit}
        />

        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {currentView === 'chat' ? (
            <ChatInterface
              messages={selectedChat?.messages || []}
              pets={pets}
              selectedPetId={selectedPetId}
              onSendMessage={sendMessage}
              onPetSelect={setSelectedPetId}
              isLoading={isLoading}
              onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
              onPhotoAnalysis={() => {
                if (pets.length > 0) {
                  setSelectedHealthPetId(pets[0].id);
                  setCurrentView('health');
                } else {
                  setCurrentView('pets');
                }
              }}
              onBookVet={() => {
                if (pets.length > 0) {
                  setSelectedHealthPetId(pets[0].id);
                  setCurrentView('health');
                } else {
                  setCurrentView('pets');
                }
              }}
              onInsuranceQuotes={() => {
                if (pets.length > 0) {
                  showInsuranceForPet(pets[0]);
                } else {
                  setCurrentView('pets');
                }
              }}
            />
          ) : currentView === 'pets' ? (
            <PetManagement
              pets={pets}
              onAddPet={addPet}
              onUpdatePet={updatePet}
              onDeletePet={deletePet}
              onBack={() => setCurrentView('chat')}
            />
          ) : (currentView === 'health' && selectedHealthPet) ? (
            <HealthDashboard
              pet={selectedHealthPet}
              healthRecords={healthRecords}
              onBack={() => setCurrentView('chat')}
              onAddRecord={addHealthRecord}
              onBookAppointment={bookAppointment}
              onInsuranceCommission={handleInsuranceCommission}
            />
          ) : currentView === 'vet-registration' ? (
            <div className="flex-1 flex items-center justify-center p-4 sm:p-8 overflow-y-auto">
              <div className="text-center max-w-2xl">
                <h1 className="text-2xl sm:text-4xl font-bold text-gpt-text mb-4">Join Our Veterinary Network</h1>
                <p className="text-lg sm:text-xl text-gpt-text-secondary mb-6 sm:mb-8 px-4">
                  Connect with pet owners and grow your practice with our 15% commission marketplace
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                  <div className="bg-gpt-lighter rounded-lg p-4 sm:p-6">
                    <h3 className="font-semibold text-gpt-text mb-2 text-sm sm:text-base">Earn More</h3>
                    <p className="text-sm text-gpt-text-secondary">Average vets earn $2,000-$8,000/month through our platform</p>
                  </div>
                  <div className="bg-gpt-lighter rounded-lg p-4 sm:p-6">
                    <h3 className="font-semibold text-gpt-text mb-2 text-sm sm:text-base">Flexible Schedule</h3>
                    <p className="text-sm text-gpt-text-secondary">Set your own hours and availability</p>
                  </div>
                  <div className="bg-gpt-lighter rounded-lg p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
                    <h3 className="font-semibold text-gpt-text mb-2 text-sm sm:text-base">Grow Your Practice</h3>
                    <p className="text-sm text-gpt-text-secondary">Access to thousands of pet owners</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowVetRegistration(true)}
                  className="bg-gpt-accent text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-gpt-accent-hover transition-colors font-semibold text-base sm:text-lg"
                >
                  Register as Veterinarian
                </button>
                <div className="mt-6">
                  <button
                    onClick={() => setCurrentView('chat')}
                    className="text-gpt-text-secondary hover:text-gpt-text"
                  >
                    ← Back to Chat
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {/* Medical Disclaimer */}
        <MedicalDisclaimer
          isOpen={showMedicalDisclaimer}
          onAccept={handleAcceptDisclaimer}
          onDecline={handleDeclineDisclaimer}
        />

        {/* User Authentication */}
        {showAuth && (
          <UserAuth
            onAuthSuccess={handleAuthSuccess}
            onClose={() => setShowAuth(false)}
          />
        )}

        {/* Legal Documents */}
        <PrivacyPolicy
          isOpen={showPrivacyPolicy}
          onClose={() => setShowPrivacyPolicy(false)}
        />

        <TermsOfService
          isOpen={showTermsOfService}
          onClose={() => setShowTermsOfService(false)}
        />

        {/* Accessibility Features */}
        <AccessibilityFeatures
          isOpen={showAccessibility}
          onClose={() => setShowAccessibility(false)}
        />

        {/* Subscription Management */}
        {showSubscriptionManagement && (
          <SubscriptionManagement
            subscription={subscription}
            onUpdateSubscription={setSubscription}
            onClose={() => setShowSubscriptionManagement(false)}
          />
        )}

        {/* Subscription Modal */}
        <SubscriptionModal
          isOpen={showSubscriptionModal}
          onClose={() => setShowSubscriptionModal(false)}
          onSubscribe={handleSubscribe}
          currentTier={subscription.tier}
        />

        {/* Vet Registration Modal */}
        <VetRegistration
          isOpen={showVetRegistration}
          onClose={() => setShowVetRegistration(false)}
          onSuccess={handleVetRegistrationSuccess}
        />

        {/* Insurance Quotes Modal */}
        {insuranceQuotePet && (
          <InsuranceQuotes
            pet={insuranceQuotePet}
            isOpen={showInsuranceQuotes}
            onClose={() => {
              setShowInsuranceQuotes(false);
              setInsuranceQuotePet(null);
            }}
            onApplicationSubmit={handleInsuranceCommission}
          />
        )}

        {/* Reminder Prompt Modal */}
        {showReminderPrompt && (
          <ReminderPrompt
            suggestions={reminderSuggestions}
            petId={selectedPetId}
            petName={pets.find(p => p.id === selectedPetId)?.name}
            onClose={() => setShowReminderPrompt(false)}
            onReminderSet={(count) => {
              alert(`✅ ${count} reminder${count !== 1 ? 's' : ''} set! You'll get notified when it's time.`);
            }}
          />
        )}

        {/* Revenue Stats (Development Only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="fixed bottom-4 right-4 bg-gpt-darker border border-gpt-border rounded-lg p-4 text-xs">
            <h4 className="font-semibold text-gpt-text mb-2">💰 Revenue Stats</h4>
            <div className="space-y-1 text-gpt-text-secondary">
              <div>Total: ${revenueStats.totalRevenue.toFixed(2)}</div>
              <div>Monthly: ${revenueStats.monthlyRevenue.toFixed(2)}</div>
              <div>Subscriptions: ${revenueStats.subscriptionRevenue.toFixed(2)}</div>
              <div>Vet Commissions: ${revenueStats.vetCommissions.toFixed(2)}</div>
              <div>Insurance: ${revenueStats.insuranceCommissions.toFixed(2)}</div>
            </div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;