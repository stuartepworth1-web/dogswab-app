import { Veterinarian, VetAppointment, TimeSlot } from '../types';

export interface VetRegistration {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    licenseNumber: string;
    yearsExperience: number;
  };
  clinicInfo: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    website?: string;
  };
  services: {
    specialties: string[];
    consultationFee: number;
    emergencyFee: number;
    houseCalls: boolean;
    telemedicine: boolean;
  };
  availability: {
    workingHours: { [key: string]: { start: string; end: string } };
    timeZone: string;
    bookingBuffer: number; // minutes between appointments
  };
  paymentInfo: {
    bankAccount: string;
    routingNumber: string;
    taxId: string;
  };
}

export interface VetDashboardStats {
  totalBookings: number;
  monthlyRevenue: number;
  commissionOwed: number;
  rating: number;
  totalReviews: number;
  upcomingAppointments: number;
}

// Mock veterinarians database
const mockVeterinarians: Veterinarian[] = [
  {
    id: 'vet_001',
    name: 'Dr. Sarah Johnson',
    clinic: 'PetCare Veterinary Hospital',
    specialties: ['General Practice', 'Surgery', 'Dermatology'],
    rating: 4.9,
    priceRange: '$80-120',
    availability: generateMockAvailability(),
    isOnline: true,
    email: 'sarah.johnson@petcare.com',
    phone: '(555) 123-4567',
    address: '123 Pet Street, Anytown, ST 12345',
    licenseNumber: 'VET123456',
    yearsExperience: 12,
    consultationFee: 100,
    emergencyFee: 150,
    commissionRate: 0.15,
    totalBookings: 245,
    monthlyRevenue: 12500,
    profileImage: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'vet_002',
    name: 'Dr. Michael Chen',
    clinic: 'Animal Wellness Center',
    specialties: ['Internal Medicine', 'Cardiology', 'Oncology'],
    rating: 4.8,
    priceRange: '$90-150',
    availability: generateMockAvailability(),
    isOnline: true,
    email: 'michael.chen@animalwellness.com',
    phone: '(555) 234-5678',
    address: '456 Wellness Ave, Petville, ST 12346',
    licenseNumber: 'VET234567',
    yearsExperience: 15,
    consultationFee: 120,
    emergencyFee: 180,
    commissionRate: 0.15,
    totalBookings: 189,
    monthlyRevenue: 18900,
    profileImage: 'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 'vet_003',
    name: 'Dr. Emily Rodriguez',
    clinic: 'Emergency Pet Clinic',
    specialties: ['Emergency Care', 'Critical Care', 'Surgery'],
    rating: 4.7,
    priceRange: '$120-200',
    availability: generateMockAvailability(),
    isOnline: false,
    email: 'emily.rodriguez@emergencypet.com',
    phone: '(555) 345-6789',
    address: '789 Emergency Blvd, Urgentville, ST 12347',
    licenseNumber: 'VET345678',
    yearsExperience: 8,
    consultationFee: 150,
    emergencyFee: 200,
    commissionRate: 0.15,
    totalBookings: 156,
    monthlyRevenue: 23400,
    profileImage: 'https://images.pexels.com/photos/4989177/pexels-photo-4989177.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

function generateMockAvailability(): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const today = new Date();
  
  for (let i = 1; i <= 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    // Generate morning slots (9 AM - 12 PM)
    for (let hour = 9; hour < 12; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const start = new Date(date);
        start.setHours(hour, minute, 0, 0);
        const end = new Date(start);
        end.setMinutes(start.getMinutes() + 30);
        
        slots.push({
          start,
          end,
          available: Math.random() > 0.3 // 70% availability
        });
      }
    }
    
    // Generate afternoon slots (2 PM - 6 PM)
    for (let hour = 14; hour < 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const start = new Date(date);
        start.setHours(hour, minute, 0, 0);
        const end = new Date(start);
        end.setMinutes(start.getMinutes() + 30);
        
        slots.push({
          start,
          end,
          available: Math.random() > 0.3
        });
      }
    }
  }
  
  return slots;
}

export const getAllVeterinarians = async (): Promise<Veterinarian[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockVeterinarians;
};

export const getVeterinarianById = async (id: string): Promise<Veterinarian | null> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockVeterinarians.find(vet => vet.id === id) || null;
};

export const searchVeterinarians = async (filters: {
  specialty?: string;
  location?: string;
  priceRange?: string;
  availability?: Date;
}): Promise<Veterinarian[]> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  let filtered = [...mockVeterinarians];
  
  if (filters.specialty) {
    filtered = filtered.filter(vet => 
      vet.specialties.some(s => s.toLowerCase().includes(filters.specialty!.toLowerCase()))
    );
  }
  
  return filtered;
};

export const registerVeterinarian = async (registration: VetRegistration): Promise<{ success: boolean; vetId?: string; message: string }> => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock validation
  if (!registration.personalInfo.licenseNumber) {
    return { success: false, message: 'License number is required' };
  }
  
  const newVetId = 'vet_' + Math.random().toString(36).substr(2, 9);
  
  return {
    success: true,
    vetId: newVetId,
    message: 'Registration successful! Your profile is under review and will be activated within 24 hours.'
  };
};

export const bookAppointment = async (appointment: Omit<VetAppointment, 'id'>): Promise<{ success: boolean; appointmentId?: string; message: string }> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const appointmentId = 'apt_' + Math.random().toString(36).substr(2, 9);
  
  // Calculate commission (15%)
  const commission = appointment.price * 0.15;
  const vetPayout = appointment.price - commission;
  
  console.log(`Appointment booked: $${appointment.price}, Commission: $${commission.toFixed(2)}, Vet payout: $${vetPayout.toFixed(2)}`);
  
  return {
    success: true,
    appointmentId,
    message: `Appointment booked successfully! Confirmation ID: ${appointmentId}`
  };
};

export const getVetDashboardStats = async (vetId: string): Promise<VetDashboardStats> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const vet = mockVeterinarians.find(v => v.id === vetId);
  if (!vet) throw new Error('Veterinarian not found');
  
  return {
    totalBookings: vet.totalBookings || 0,
    monthlyRevenue: vet.monthlyRevenue || 0,
    commissionOwed: (vet.monthlyRevenue || 0) * 0.15,
    rating: vet.rating,
    totalReviews: Math.floor(vet.totalBookings! * 0.7), // Assume 70% leave reviews
    upcomingAppointments: Math.floor(Math.random() * 15) + 5
  };
};

export const processCommissionPayout = async (vetId: string, amount: number): Promise<{ success: boolean; transactionId?: string; message: string }> => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const transactionId = 'txn_' + Math.random().toString(36).substr(2, 9);
  
  return {
    success: true,
    transactionId,
    message: `Commission payout of $${amount.toFixed(2)} processed successfully. Transaction ID: ${transactionId}`
  };
};

export const getAvailableTimeSlots = async (vetId: string, date: Date): Promise<TimeSlot[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const vet = mockVeterinarians.find(v => v.id === vetId);
  if (!vet) return [];
  
  return vet.availability.filter(slot => {
    const slotDate = new Date(slot.start);
    return slotDate.toDateString() === date.toDateString() && slot.available;
  });
};