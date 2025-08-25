import React, { useState } from 'react';
import { Clock, Bell, X, Plus, Minus } from 'lucide-react';
import { ReminderService } from '../services/reminderService';
import { Pet } from '../types';

interface ReminderPromptProps {
  suggestions: Array<{
    title: string;
    message: string;
    timeInMinutes: number;
    type: 'checkup' | 'medication' | 'feeding' | 'exercise' | 'vet_followup' | 'general';
  }>;
  petId?: string;
  petName?: string;
  onClose: () => void;
  onReminderSet: (count: number) => void;
}

export const ReminderPrompt: React.FC<ReminderPromptProps> = ({
  suggestions,
  petId,
  petName,
  onClose,
  onReminderSet
}) => {
  const [selectedSuggestions, setSelectedSuggestions] = useState<boolean[]>(
    suggestions.map(() => true) // Select all by default
  );
  const [customTimes, setCustomTimes] = useState<number[]>(
    suggestions.map(s => s.timeInMinutes)
  );

  const toggleSuggestion = (index: number) => {
    const newSelected = [...selectedSuggestions];
    newSelected[index] = !newSelected[index];
    setSelectedSuggestions(newSelected);
  };

  const adjustTime = (index: number, change: number) => {
    const newTimes = [...customTimes];
    newTimes[index] = Math.max(1, newTimes[index] + change);
    setCustomTimes(newTimes);
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`;
    if (minutes < 1440) return `${Math.round(minutes / 60)} hr`;
    return `${Math.round(minutes / 1440)} day`;
  };

  const handleSetReminders = async () => {
    let reminderCount = 0;
    
    for (let i = 0; i < suggestions.length; i++) {
      if (selectedSuggestions[i]) {
        const suggestion = suggestions[i];
        const scheduledFor = new Date(Date.now() + customTimes[i] * 60 * 1000);
        
        await ReminderService.scheduleReminder({
          title: suggestion.title,
          message: `${suggestion.message}${petName ? ` for ${petName}` : ''}`,
          petId,
          scheduledFor,
          type: suggestion.type
        });
        
        reminderCount++;
      }
    }
    
    onReminderSet(reminderCount);
    onClose();
  };

  if (suggestions.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-mint-500 rounded-2xl flex items-center justify-center">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Set Reminders</h3>
                <p className="text-sm text-gray-500">I found some follow-up actions</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className={`border-2 rounded-2xl p-4 transition-all ${
                selectedSuggestions[index]
                  ? 'border-mint-300 bg-mint-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-start space-x-3">
                <button
                  onClick={() => toggleSuggestion(index)}
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 transition-colors ${
                    selectedSuggestions[index]
                      ? 'border-mint-500 bg-mint-500'
                      : 'border-gray-300 bg-white'
                  }`}
                >
                  {selectedSuggestions[index] && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
                
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-sm">{suggestion.title}</h4>
                  <p className="text-gray-600 text-sm mt-1">{suggestion.message}</p>
                  
                  {selectedSuggestions[index] && (
                    <div className="flex items-center space-x-3 mt-3">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Remind me in:</span>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => adjustTime(index, -5)}
                          className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                        >
                          <Minus className="w-3 h-3 text-gray-600" />
                        </button>
                        
                        <span className="font-semibold text-mint-600 min-w-[60px] text-center">
                          {formatTime(customTimes[index])}
                        </span>
                        
                        <button
                          onClick={() => adjustTime(index, 5)}
                          className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                        >
                          <Plus className="w-3 h-3 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 border-t border-gray-100">
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-2xl hover:bg-gray-200 transition-colors font-semibold"
            >
              Skip
            </button>
            <button
              onClick={handleSetReminders}
              disabled={!selectedSuggestions.some(Boolean)}
              className="flex-1 py-3 px-4 bg-mint-500 text-white rounded-2xl hover:bg-mint-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
            >
              Set {selectedSuggestions.filter(Boolean).length} Reminder{selectedSuggestions.filter(Boolean).length !== 1 ? 's' : ''}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};