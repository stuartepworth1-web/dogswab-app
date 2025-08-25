import React, { useState, useRef, useEffect } from 'react';
import { Send, Menu, Heart, Stethoscope, Camera, Calendar, Shield, Activity, Brain, Plus } from 'lucide-react';
import { Capacitor } from '@capacitor/core';
import { Message, Pet } from '../types';
import { VoiceInput } from './VoiceInput';
import { NotificationSystem } from './NotificationSystem';
import { InlineMedicalDisclaimer } from './MedicalDisclaimer';

interface ChatInterfaceProps {
  messages: Message[];
  pets: Pet[];
  selectedPetId: string | null;
  onSendMessage: (content: string, petId?: string) => void;
  onPetSelect: (petId: string | null) => void;
  isLoading: boolean;
  onToggleSidebar: () => void;
  onPhotoAnalysis: () => void;
  onBookVet: () => void;
  onInsuranceQuotes: () => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  pets,
  selectedPetId,
  onSendMessage,
  onPetSelect,
  isLoading,
  onToggleSidebar,
  onPhotoAnalysis,
  onBookVet,
  onInsuranceQuotes
}) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const selectedPet = pets.find(pet => pet.id === selectedPetId);

  const isMobile = Capacitor.isNativePlatform();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input.trim(), selectedPetId);
      setInput('');
    }
  };

  const quickActions = [
    {
      icon: <Camera className="w-7 h-7" />,
      title: "Photo Analysis",
      subtitle: "AI symptom detection",
      color: "bg-blue-500",
      onClick: onPhotoAnalysis
    },
    {
      icon: <Stethoscope className="w-7 h-7" />,
      title: "Book Vet",
      subtitle: "Professional consultation",
      color: "bg-mint-500",
      onClick: onBookVet
    },
    {
      icon: <Shield className="w-7 h-7" />,
      title: "Insurance",
      subtitle: "Coverage options",
      color: "bg-orange-500",
      onClick: onInsuranceQuotes
    }
  ];

  const commonQuestions = [
    "My pet seems lethargic today",
    "Changes in eating habits",
    "Unusual behavior patterns",
    "Skin irritation concerns"
  ];

  return (
    <div className="flex-1 flex flex-col h-screen bg-white overflow-hidden">
      {/* Clean Professional Header */}
      <div className="liquid-nav border-b border-white/20 px-4 py-3 safe-area-top flex-shrink-0 shadow-sm">
        <div className="flex items-center justify-between w-full">
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-2 rounded-2xl liquid-glass transition-colors"
          >
            <Menu className="w-5 h-5 text-dogswab-navy" />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 liquid-glass rounded-2xl flex items-center justify-center">
              <img 
                src="https://storage.reimage.dev/dogswabapp/dba9be83d5bd/original" 
                alt="DOGSWAB Logo" 
                className="h-full w-auto object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-dogswab-navy">DOGSWAB</h1>
              <p className="text-xs text-dogswab-navy/70">Pet Health Assistant</p>
            </div>
          </div>
          
          {pets.length > 0 && (
            <select
              value={selectedPetId || ''}
              onChange={(e) => onPetSelect(e.target.value || null)}
              className="px-3 py-2 liquid-glass border border-white/30 rounded-2xl text-sm font-medium text-dogswab-navy focus:ring-2 focus:ring-dogswab-mint focus:border-transparent max-w-[120px] sm:max-w-none"
            >
              <option value="">Select Pet</option>
              {pets.map((pet) => (
                <option key={pet.id} value={pet.id}>
                  {pet.name}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden liquid-glass px-2 sm:px-4" style={{ scrollBehavior: 'smooth' }}>
        {messages.length === 0 ? (
          <div className="max-w-2xl mx-auto py-6 sm:py-8 min-h-full flex flex-col justify-start">
            {/* Professional Welcome Section */}
            <div className="text-center mb-6 sm:mb-8 px-4">
              <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <img 
                  src="https://storage.reimage.dev/dogswabapp/dba9be83d5bd/original" 
                  alt="DOGSWAB Logo" 
                  className="h-full w-auto object-contain"
                />
              </div>
              <div className="w-20 h-20 bg-mint-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-white font-bold text-2xl">🐾</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-dogswab-navy mb-2">
                AI Pet Health Diagnosis
              </h2>
              <p className="text-dogswab-navy/70 leading-relaxed max-w-md mx-auto text-sm sm:text-base">
                Get instant, professional health insights for your pet. Describe symptoms or upload photos for AI analysis.
              </p>
            </div>

            {/* Professional Quick Actions */}
            <div className="grid gap-4 mb-6 sm:mb-8 px-4">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.onClick}
                  className="w-full p-4 sm:p-6 liquid-glass rounded-3xl liquid-card-hover transition-all duration-400 text-left group animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 ${action.color} rounded-3xl flex items-center justify-center text-white shadow-lg flex-shrink-0 group-hover:scale-110 transition-all duration-400`}>
                      {action.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-dogswab-navy text-base sm:text-lg">{action.title}</h3>
                      <p className="text-dogswab-navy/60 mt-1 font-medium text-sm sm:text-base">{action.subtitle}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full liquid-glass flex items-center justify-center flex-shrink-0 group-hover:bg-dogswab-mint group-hover:text-white transition-all duration-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Professional Common Questions */}
            <div className="liquid-glass rounded-3xl shadow-xl overflow-hidden border border-white/30 mx-4">
              <div className="px-6 py-4 border-b border-white/30 liquid-glass-button">
                <h3 className="font-semibold text-white text-base sm:text-lg">Common Questions</h3>
              </div>
              <div className="divide-y divide-white/20">
                {commonQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => onSendMessage(question, selectedPetId)}
                    className="w-full text-left px-4 sm:px-6 py-3 sm:py-4 hover:bg-dogswab-mint/10 transition-all duration-300 group"
                  >
                    <p className="text-dogswab-navy font-medium group-hover:text-dogswab-navy/80 text-sm sm:text-base">{question}</p>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Medical Disclaimer */}
            <div className="mt-6 px-4">
              <InlineMedicalDisclaimer />
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto py-4 space-y-4 min-h-full">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} px-2`}
              >
                <div className="max-w-[85%] sm:max-w-[80%]">
                  {message.sender === 'user' ? (
                    <div className="liquid-glass-button text-white px-4 sm:px-6 py-3 sm:py-4 rounded-3xl rounded-br-xl shadow-lg">
                      <p className="text-sm sm:text-base leading-relaxed font-medium">{message.content}</p>
                    </div>
                  ) : (
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 liquid-glass-button rounded-3xl flex items-center justify-center flex-shrink-0 mt-1 shadow-lg">
                        <Stethoscope className="w-5 h-5 text-white" />
                      </div>
                      <div className="liquid-glass px-4 sm:px-6 py-3 sm:py-4 rounded-3xl rounded-bl-xl shadow-lg border border-white/40">
                        <div className="text-dogswab-navy text-sm sm:text-base leading-relaxed font-medium whitespace-pre-wrap">
                          {message.content}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {isLoading && (
          <div className="flex justify-start max-w-2xl mx-auto px-2 sm:px-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 liquid-glass-button rounded-3xl flex items-center justify-center flex-shrink-0 mt-1 shadow-lg animate-pulse-slow">
                <Stethoscope className="w-5 h-5 text-white" />
              </div>
              <div className="liquid-glass px-4 sm:px-6 py-3 sm:py-4 rounded-3xl rounded-bl-xl shadow-lg border border-white/40 shimmer">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-dogswab-mint rounded-full animate-bounce-gentle"></div>
                    <div className="w-2 h-2 bg-dogswab-mint rounded-full animate-bounce-gentle" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-dogswab-mint rounded-full animate-bounce-gentle" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                  <span className="text-dogswab-navy/70 text-sm font-medium">Analyzing...</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Professional Input Bar */}
      <div className="liquid-glass border-t border-white/30 p-4 sm:p-6 safe-area-bottom flex-shrink-0 shadow-2xl">
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto w-full">
          <div className="flex items-end space-x-3">
            <VoiceInput 
              onTranscript={(text) => {
                setInput(text);
                // Auto-send voice messages for better UX
                if (text.trim()) {
                  onSendMessage(text.trim(), selectedPetId);
                  setInput('');
                }
              }}
            />
            <div className="flex-1">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={selectedPet ? `Ask about ${selectedPet.name}...` : "Describe symptoms, upload photos, or ask questions..."}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 liquid-glass border border-white/40 rounded-3xl focus:ring-2 focus:ring-dogswab-mint focus:border-transparent text-sm sm:text-base text-dogswab-navy placeholder-dogswab-navy/50 font-medium shadow-sm"
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="w-12 h-12 sm:w-14 sm:h-14 liquid-glass-button text-white rounded-3xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center flex-shrink-0 hover:scale-105 transition-all duration-300"
            >
              <Send className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};