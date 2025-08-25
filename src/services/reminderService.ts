import { Reminder } from '../types';

// Mock notification service - in production, use Firebase Cloud Messaging or similar
export class ReminderService {
  private static reminders: Reminder[] = [];
  private static listeners: ((reminders: Reminder[]) => void)[] = [];

  static async scheduleReminder(reminder: Omit<Reminder, 'id' | 'status' | 'createdAt'>): Promise<string> {
    const newReminder: Reminder = {
      ...reminder,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date()
    };

    this.reminders.push(newReminder);
    this.notifyListeners();

    // Schedule the actual notification
    await this.scheduleNotification(newReminder);
    
    return newReminder.id;
  }

  private static async scheduleNotification(reminder: Reminder) {
    const timeUntilReminder = reminder.scheduledFor.getTime() - Date.now();
    
    if (timeUntilReminder <= 0) {
      // Send immediately if time has passed
      this.sendNotification(reminder);
      return;
    }

    // Schedule for future
    setTimeout(() => {
      this.sendNotification(reminder);
    }, timeUntilReminder);
  }

  private static sendNotification(reminder: Reminder) {
    // Update status
    const reminderIndex = this.reminders.findIndex(r => r.id === reminder.id);
    if (reminderIndex !== -1) {
      this.reminders[reminderIndex].status = 'sent';
      this.notifyListeners();
    }

    // Send browser notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(reminder.title, {
        body: reminder.message,
        icon: 'https://storage.reimage.dev/dogswabapp/dba9be83d5bd/original',
        badge: 'https://storage.reimage.dev/dogswabapp/dba9be83d5bd/original',
        tag: reminder.id,
        requireInteraction: true,
        actions: [
          { action: 'complete', title: 'Mark Complete' },
          { action: 'snooze', title: 'Remind in 10 min' }
        ]
      });
    }

    // Fallback: In-app notification
    this.showInAppNotification(reminder);
  }

  private static showInAppNotification(reminder: Reminder) {
    // Create in-app notification element
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-white border border-mint-300 rounded-2xl p-4 shadow-lg z-50 max-w-sm animate-slide-in';
    notification.innerHTML = `
      <div class="flex items-start space-x-3">
        <div class="w-8 h-8 bg-mint-500 rounded-full flex items-center justify-center">
          <span class="text-white text-sm">🔔</span>
        </div>
        <div class="flex-1">
          <h4 class="font-semibold text-gray-900 text-sm">${reminder.title}</h4>
          <p class="text-gray-600 text-sm mt-1">${reminder.message}</p>
          <div class="flex space-x-2 mt-3">
            <button class="bg-mint-500 text-white px-3 py-1 rounded-lg text-xs font-medium" onclick="this.parentElement.parentElement.parentElement.parentElement.remove()">
              Complete
            </button>
            <button class="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg text-xs font-medium" onclick="this.parentElement.parentElement.parentElement.parentElement.remove()">
              Dismiss
            </button>
          </div>
        </div>
        <button class="text-gray-400 hover:text-gray-600" onclick="this.parentElement.parentElement.remove()">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    `;

    document.body.appendChild(notification);

    // Auto-remove after 10 seconds
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 10000);
  }

  static async requestNotificationPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      console.log('This browser does not support notifications');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }

    return false;
  }

  static getReminders(): Reminder[] {
    return [...this.reminders].sort((a, b) => a.scheduledFor.getTime() - b.scheduledFor.getTime());
  }

  static getPendingReminders(): Reminder[] {
    return this.reminders.filter(r => r.status === 'pending' && r.scheduledFor > new Date());
  }

  static markAsCompleted(reminderId: string) {
    const reminderIndex = this.reminders.findIndex(r => r.id === reminderId);
    if (reminderIndex !== -1) {
      this.reminders[reminderIndex].status = 'completed';
      this.notifyListeners();
    }
  }

  static dismissReminder(reminderId: string) {
    const reminderIndex = this.reminders.findIndex(r => r.id === reminderId);
    if (reminderIndex !== -1) {
      this.reminders[reminderIndex].status = 'dismissed';
      this.notifyListeners();
    }
  }

  static snoozeReminder(reminderId: string, minutes: number = 10) {
    const reminderIndex = this.reminders.findIndex(r => r.id === reminderId);
    if (reminderIndex !== -1) {
      const reminder = this.reminders[reminderIndex];
      reminder.scheduledFor = new Date(Date.now() + minutes * 60 * 1000);
      reminder.status = 'pending';
      this.scheduleNotification(reminder);
      this.notifyListeners();
    }
  }

  static subscribe(listener: (reminders: Reminder[]) => void) {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  private static notifyListeners() {
    this.listeners.forEach(listener => listener(this.getReminders()));
  }

  // Parse AI responses for reminder suggestions
  static parseAIResponseForReminders(aiResponse: string, petId?: string): Array<{
    title: string;
    message: string;
    timeInMinutes: number;
    type: Reminder['type'];
  }> {
    const suggestions: Array<{
      title: string;
      message: string;
      timeInMinutes: number;
      type: Reminder['type'];
    }> = [];

    // Common reminder patterns in AI responses
    const patterns = [
      {
        regex: /check.*?(?:on|up).*?(?:in|after)\s+(\d+)\s*(minute|hour|day)s?/gi,
        type: 'checkup' as const,
        getMinutes: (match: RegExpMatchArray) => {
          const num = parseInt(match[1]);
          const unit = match[2].toLowerCase();
          return unit.startsWith('hour') ? num * 60 : unit.startsWith('day') ? num * 24 * 60 : num;
        }
      },
      {
        regex: /give.*?medication.*?(?:in|after)\s+(\d+)\s*(minute|hour|day)s?/gi,
        type: 'medication' as const,
        getMinutes: (match: RegExpMatchArray) => {
          const num = parseInt(match[1]);
          const unit = match[2].toLowerCase();
          return unit.startsWith('hour') ? num * 60 : unit.startsWith('day') ? num * 24 * 60 : num;
        }
      },
      {
        regex: /monitor.*?(?:for|in)\s+(\d+)\s*(minute|hour|day)s?/gi,
        type: 'checkup' as const,
        getMinutes: (match: RegExpMatchArray) => {
          const num = parseInt(match[1]);
          const unit = match[2].toLowerCase();
          return unit.startsWith('hour') ? num * 60 : unit.startsWith('day') ? num * 24 * 60 : num;
        }
      },
      {
        regex: /follow.*?up.*?(?:in|after)\s+(\d+)\s*(minute|hour|day)s?/gi,
        type: 'vet_followup' as const,
        getMinutes: (match: RegExpMatchArray) => {
          const num = parseInt(match[1]);
          const unit = match[2].toLowerCase();
          return unit.startsWith('hour') ? num * 60 : unit.startsWith('day') ? num * 24 * 60 : num;
        }
      }
    ];

    patterns.forEach(pattern => {
      let match;
      while ((match = pattern.regex.exec(aiResponse)) !== null) {
        const timeInMinutes = pattern.getMinutes(match);
        const petName = petId ? 'your pet' : 'them'; // Could be enhanced with actual pet name
        
        suggestions.push({
          title: `${pattern.type === 'medication' ? 'Medication' : 'Health Check'} Reminder`,
          message: `Time to ${match[0].toLowerCase().replace(/in \d+.*/, '')} ${petName}`,
          timeInMinutes,
          type: pattern.type
        });
      }
    });

    return suggestions;
  }
}

// Initialize notification permission on app start
ReminderService.requestNotificationPermission();