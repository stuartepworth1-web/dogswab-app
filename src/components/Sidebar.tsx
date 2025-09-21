import React from 'react';
import { Plus, MessageSquare, Heart, Settings, Menu, X, Crown, Activity, Stethoscope, Shield, Bell } from 'lucide-react';
import { Chat, Pet } from '../types';
import { ReminderList } from './ReminderList';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  chats: Chat[];
  pets: Pet[];
  selectedChatId: string | null;
  onChatSelect: (chatId: string) => void;
  onNewChat: () => void;
  onPetManagement: () => void;
  onHealthDashboard: (petId: string) => void;
  onUpgrade: () => void;
  onVetRegistration: () => void;
  onInsuranceQuotes: (pet: Pet) => void;
  subscriptionTier: string;
  consultationsUsed: number;
  consultationsLimit: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onToggle,
  chats,
  pets,
  selectedChatId,
  onChatSelect,
  onNewChat,
  onPetManagement,
  onHealthDashboard,
  onUpgrade,
  onVetRegistration,
  onInsuranceQuotes,
  subscriptionTier,
  consultationsUsed,
  consultationsLimit
}) => {
  const isFreeTier = subscriptionTier === 'free';
  const isNearLimit = consultationsUsed >= consultationsLimit * 0.8;

  const getPetEmoji = (type: string) => {
    switch (type) {
      case 'dog': return '🐕';
      case 'cat': return '🐱';
      case 'bird': return '🐦';
      case 'rabbit': return '🐰';
      default: return '🐾';
    }
  };

  return (
    <>
      {/* Modal Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Professional Sidebar */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-50 w-80 md:w-80 liquid-glass border-r border-white/30
        transform transition-all duration-500 ease-out flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Professional Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/30 safe-area-top liquid-nav">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 liquid-glass rounded-3xl flex items-center justify-center">
              <span className="text-2xl">🐾</span>
            </div>
            <div>
              <span className="text-xl font-bold text-dogswab-navy tracking-tight">DOGSWAB</span>
              <p className="text-sm text-dogswab-navy/70 font-medium -mt-0.5">Pet Health Platform</p>
            </div>
          </div>
          <button
            onClick={onToggle}
            className="md:hidden p-2.5 rounded-2xl liquid-glass-button transition-all duration-200"
          >
            <X className="w-5 h-5 text-dogswab-navy" />
          </button>
        </div>

        {/* New Chat Button */}
        <div className="p-6">
          <button
            onClick={onNewChat}
            className="w-full liquid-glass-button text-white py-4 px-6 rounded-3xl font-semibold flex items-center justify-center space-x-3 text-lg shadow-lg"
          >
            <Plus className="w-6 h-6" />
            <span>New Consultation</span>
          </button>
        </div>

        {/* Subscription Card */}
        <div className="px-6 pb-6">
          <div className="liquid-glass-dark rounded-3xl p-5 border border-dogswab-mint/30 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 liquid-glass-button rounded-2xl flex items-center justify-center">
                  {isFreeTier ? (
                    <span className="text-white text-sm">🆓</span>
                  ) : (
                    <Crown className="w-4 h-4 text-white" />
                  )}
                </div>
                <span className="text-base font-semibold text-dogswab-navy">
                  {subscriptionTier.charAt(0).toUpperCase() + subscriptionTier.slice(1)} Plan
                </span>
              </div>
              {isFreeTier && (
                <button
                  onClick={onUpgrade}
                  className="text-sm liquid-glass-button text-white px-4 py-2 rounded-2xl font-semibold"
                >
                  Upgrade
                </button>
              )}
            </div>
            
            <div className="text-sm text-dogswab-navy/70 mb-3 font-semibold">
              Consultations: {consultationsUsed}/{consultationsLimit === -1 ? '∞' : consultationsLimit}
            </div>
            <div className="w-full bg-white/30 rounded-full h-3 overflow-hidden">
              <div 
                className="liquid-glass-button h-3 rounded-full transition-all duration-500 shadow-sm"
                style={{ 
                  width: consultationsLimit === -1 ? '100%' : `${Math.min((consultationsUsed / consultationsLimit) * 100, 100)}%` 
                }}
              />
            </div>
            
            {isNearLimit && isFreeTier && (
              <p className="text-sm text-amber-600 mt-3 font-semibold">Upgrade for unlimited consultations</p>
            )}
          </div>
        </div>

        {/* Pet Section */}
        {pets.length > 0 && (
          <div className="px-6 pb-6">
            <h3 className="text-base font-semibold text-dogswab-navy mb-4">Your Pets</h3>
            <div className="space-y-3">
              {pets.slice(0, 3).map((pet) => (
                <div key={pet.id} className="flex items-center justify-between p-4 liquid-glass rounded-3xl liquid-card-hover transition-all duration-200 border border-white/40">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getPetEmoji(pet.type)}</span>
                    <div>
                      <span className="font-semibold text-dogswab-navy">{pet.name}</span>
                      <p className="text-sm text-dogswab-navy/60 capitalize font-medium">{pet.type}</p>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => onHealthDashboard(pet.id)}
                      className="w-9 h-9 rounded-2xl liquid-glass flex items-center justify-center hover:bg-dogswab-mint/20 transition-all duration-200 hover:scale-105"
                      title="Health Dashboard"
                    >
                      <Activity className="w-4 h-4 text-dogswab-navy" />
                    </button>
                    <button
                      onClick={() => onInsuranceQuotes(pet)}
                      className="w-9 h-9 rounded-2xl liquid-glass flex items-center justify-center hover:bg-dogswab-mint/20 transition-all duration-200 hover:scale-105"
                      title="Insurance"
                    >
                      <Shield className="w-4 h-4 text-dogswab-navy" />
                    </button>
                  </div>
                </div>
              ))}
              {pets.length > 3 && (
                <button
                  onClick={onPetManagement}
                  className="text-sm text-dogswab-navy/70 hover:text-dogswab-navy font-semibold flex items-center space-x-2 p-3 liquid-glass rounded-2xl transition-all duration-200 w-full"
                >
                  <Plus className="w-5 h-5" />
                  <span>View all {pets.length} pets</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto px-6">
          {/* Reminders Section */}
          <div className="mb-6">
            <h3 className="text-base font-semibold text-dogswab-navy mb-4 flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Active Reminders
            </h3>
            <div className="liquid-glass-dark rounded-3xl border border-dogswab-mint/30 p-4">
              <ReminderList showAll={false} />
            </div>
          </div>
          
          <h3 className="text-base font-semibold text-dogswab-navy mb-4">Recent Chats</h3>
          <div className="space-y-2">
            {chats.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="w-10 h-10 text-dogswab-navy/40 mx-auto mb-3" />
                <p className="text-dogswab-navy/60 font-medium">No consultations yet</p>
              </div>
            ) : (
              chats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => onChatSelect(chat.id)}
                  className={`w-full text-left p-4 rounded-3xl transition-all duration-300 ${
                    selectedChatId === chat.id 
                      ? 'liquid-glass-button text-white shadow-lg' 
                      : 'liquid-glass text-dogswab-navy border border-white/40 liquid-card-hover'
                  }`}
                >
                  <p className="font-semibold truncate">{chat.title}</p>
                  <p className={`text-sm mt-1 ${
                    selectedChatId === chat.id ? 'text-white/90' : 'text-dogswab-navy/60'
                  }`}>
                    {new Date(chat.updatedAt).toLocaleDateString()}
                  </p>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/30 space-y-3 safe-area-bottom">
          <button
            onClick={onPetManagement}
            className="w-full flex items-center space-x-3 p-4 rounded-3xl liquid-glass liquid-card-hover transition-all duration-300 text-dogswab-navy border border-white/40"
          >
            <Settings className="w-6 h-6 text-dogswab-navy" />
            <span className="font-semibold text-base">Manage Pets</span>
          </button>
          
          <button
            onClick={onVetRegistration}
            className="w-full flex items-center space-x-3 p-4 rounded-3xl liquid-glass liquid-card-hover transition-all duration-300 text-dogswab-navy border border-white/40"
          >
            <Stethoscope className="w-6 h-6 text-dogswab-navy" />
            <div className="text-left">
              <span className="font-semibold block text-base">Join as Veterinarian</span>
              <p className="text-sm text-dogswab-navy/70 font-medium">Earn $2K-8K/month</p>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};