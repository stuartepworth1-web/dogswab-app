import React, { useState, useEffect } from 'react';
import { Bell, Clock, Check, X, SunSnow as Snooze, Calendar } from 'lucide-react';
import { ReminderService } from '../services/reminderService';
import { Reminder } from '../types';

interface ReminderListProps {
  petId?: string;
  showAll?: boolean;
}

export const ReminderList: React.FC<ReminderListProps> = ({ petId, showAll = false }) => {
  const [reminders, setReminders] = useState<Reminder[]>([]);

  useEffect(() => {
    const updateReminders = (allReminders: Reminder[]) => {
      let filtered = allReminders;
      
      if (petId) {
        filtered = allReminders.filter(r => r.petId === petId);
      }
      
      if (!showAll) {
        filtered = filtered.filter(r => r.status === 'pending' || r.status === 'sent');
      }
      
      setReminders(filtered);
    };

    updateReminders(ReminderService.getReminders());
    const unsubscribe = ReminderService.subscribe(updateReminders);
    
    return unsubscribe;
  }, [petId, showAll]);

  const getStatusColor = (status: Reminder['status']) => {
    switch (status) {
      case 'pending': return 'text-blue-600 bg-blue-100';
      case 'sent': return 'text-orange-600 bg-orange-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'dismissed': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: Reminder['type']) => {
    switch (type) {
      case 'medication': return '💊';
      case 'checkup': return '🔍';
      case 'feeding': return '🍽️';
      case 'exercise': return '🏃';
      case 'vet_followup': return '🩺';
      default: return '🔔';
    }
  };

  const formatTimeUntil = (date: Date) => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    
    if (diff < 0) {
      const pastDiff = Math.abs(diff);
      if (pastDiff < 60000) return 'Just now';
      if (pastDiff < 3600000) return `${Math.floor(pastDiff / 60000)} min ago`;
      if (pastDiff < 86400000) return `${Math.floor(pastDiff / 3600000)} hr ago`;
      return `${Math.floor(pastDiff / 86400000)} days ago`;
    }
    
    if (diff < 60000) return 'In < 1 min';
    if (diff < 3600000) return `In ${Math.floor(diff / 60000)} min`;
    if (diff < 86400000) return `In ${Math.floor(diff / 3600000)} hr`;
    return `In ${Math.floor(diff / 86400000)} days`;
  };

  if (reminders.length === 0) {
    return (
      <div className="text-center py-8">
        <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500">No reminders set</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {reminders.map((reminder) => (
        <div
          key={reminder.id}
          className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm"
        >
          <div className="flex items-start space-x-3">
            <div className="text-2xl">{getTypeIcon(reminder.type)}</div>
            
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">{reminder.title}</h4>
                  <p className="text-gray-600 text-sm mt-1">{reminder.message}</p>
                  
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500">
                        {formatTimeUntil(reminder.scheduledFor)}
                      </span>
                    </div>
                    
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(reminder.status)}`}>
                      {reminder.status}
                    </span>
                  </div>
                </div>
                
                {(reminder.status === 'pending' || reminder.status === 'sent') && (
                  <div className="flex space-x-1">
                    <button
                      onClick={() => ReminderService.markAsCompleted(reminder.id)}
                      className="w-8 h-8 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors flex items-center justify-center"
                      title="Mark as completed"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => ReminderService.snoozeReminder(reminder.id, 10)}
                      className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors flex items-center justify-center"
                      title="Snooze 10 minutes"
                    >
                      <Snooze className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => ReminderService.dismissReminder(reminder.id)}
                      className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors flex items-center justify-center"
                      title="Dismiss"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};