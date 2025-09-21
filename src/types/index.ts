export interface Pet {
  id: string;
  name: string;
  type: 'dog' | 'cat' | 'bird' | 'rabbit' | 'other';
  breed?: string;
  age: number;
  weight?: number;
  gender: 'male' | 'female';
  isNeutered: boolean;
  medicalHistory?: string;
  avatar?: string;
  veterinarian?: {
    name: string;
    clinicName: string;
    email: string;
    phone: string;
    address?: string;
    notes?: string;
  };
}

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  petId?: string;
  category?: 'symptoms' | 'behavior' | 'nutrition' | 'general' | 'emergency';
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  petId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  pets: Pet[];
  chats: Chat[];
  subscription?: Subscription;
  healthRecords: HealthRecord[];
}

export interface Subscription {
  id: string;
  tier: 'free' | 'basic' | 'premium' | 'pro';
  status: 'active' | 'canceled' | 'past_due';
  currentPeriodEnd: Date;
  consultationsUsed: number;
  consultationsLimit: number;
}

export interface HealthRecord {
  id: string;
  petId: string;
  type: 'educational_note' | 'behavior_observation' | 'weight_tracking' | 'care_reminder' | 'vet_visit' | 'photo_educational';
  title: string;
  description: string;
  severity?: 'informational' | 'monitor' | 'vet_recommended' | 'emergency_contact_vet';
  photos?: string[];
  educationalAnalysis?: string;
  vetContactInfo?: string;
  createdAt: Date;
  resolvedAt?: Date;
}

export interface VetAppointment {
  id: string;
  petId: string;
  vetId: string;
  type: 'consultation' | 'emergency' | 'checkup' | 'vaccination';
  scheduledAt: Date;
  duration: number;
  price: number;
  status: 'scheduled' | 'completed' | 'canceled';
  notes?: string;
}

export interface Veterinarian {
  id: string;
  name: string;
  clinic: string;
  specialties: string[];
  rating: number;
  priceRange: string;
  availability: TimeSlot[];
  isOnline: boolean;
  email: string;
  phone: string;
  address: string;
  licenseNumber: string;
  yearsExperience: number;
  consultationFee: number;
  emergencyFee: number;
  commissionRate: number;
  totalBookings?: number;
  monthlyRevenue?: number;
  profileImage?: string;
}

export interface TimeSlot {
  start: Date;
  end: Date;
  available: boolean;
}

export interface Reminder {
  id: string;
  title: string;
  message: string;
  petId?: string;
  scheduledFor: Date;
  type: 'checkup' | 'medication' | 'feeding' | 'exercise' | 'vet_followup' | 'general';
  status: 'pending' | 'sent' | 'dismissed' | 'completed';
  createdAt: Date;
  relatedMessageId?: string;
}