import { Pet } from '../types';

export interface InsuranceQuote {
  providerId: string;
  providerName: string;
  planName: string;
  monthlyPremium: number;
  annualDeductible: number;
  reimbursementRate: number;
  annualLimit: number;
  coverageHighlights: string[];
  exclusions: string[];
  waitingPeriods: {
    accidents: number; // days
    illnesses: number; // days
    preExisting: boolean;
  };
  rating: number;
  customerReviews: number;
  referralCommission: number; // $50 per signup
}

export interface InsuranceProvider {
  id: string;
  name: string;
  logo: string;
  description: string;
  specialties: string[];
  rating: number;
  established: number;
}

const mockInsuranceProviders: InsuranceProvider[] = [
  {
    id: 'healthy_paws',
    name: 'Healthy Paws',
    logo: 'https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg?auto=compress&cs=tinysrgb&w=100',
    description: 'Comprehensive pet insurance with fast claim processing',
    specialties: ['Accidents', 'Illnesses', 'Hereditary Conditions'],
    rating: 4.8,
    established: 2009
  },
  {
    id: 'petplan',
    name: 'Petplan',
    logo: 'https://images.pexels.com/photos/4498364/pexels-photo-4498364.jpeg?auto=compress&cs=tinysrgb&w=100',
    description: 'Flexible coverage options for every pet and budget',
    specialties: ['Customizable Plans', 'Wellness Coverage', 'Dental Care'],
    rating: 4.6,
    established: 1996
  },
  {
    id: 'embrace',
    name: 'Embrace Pet Insurance',
    logo: 'https://images.pexels.com/photos/4498366/pexels-photo-4498366.jpeg?auto=compress&cs=tinysrgb&w=100',
    description: 'Personalized pet insurance with wellness rewards',
    specialties: ['Wellness Rewards', 'Diminishing Deductible', 'Prescription Coverage'],
    rating: 4.7,
    established: 2003
  },
  {
    id: 'trupanion',
    name: 'Trupanion',
    logo: 'https://images.pexels.com/photos/4498368/pexels-photo-4498368.jpeg?auto=compress&cs=tinysrgb&w=100',
    description: 'Direct vet payment and 90% coverage for unexpected injuries',
    specialties: ['Direct Vet Payment', 'No Payout Limits', 'Congenital Conditions'],
    rating: 4.5,
    established: 2000
  }
];

export const getInsuranceQuotes = async (pet: Pet): Promise<InsuranceQuote[]> => {
  // Simulate API processing time
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));
  
  const baseRate = calculateBaseRate(pet);
  
  const quotes: InsuranceQuote[] = [
    {
      providerId: 'healthy_paws',
      providerName: 'Healthy Paws',
      planName: 'Complete Coverage',
      monthlyPremium: baseRate * 1.2,
      annualDeductible: 250,
      reimbursementRate: 80,
      annualLimit: -1, // unlimited
      coverageHighlights: [
        'Unlimited annual and lifetime benefits',
        'No caps on payouts',
        'Fast claim processing (2-5 days)',
        'Covers hereditary and congenital conditions'
      ],
      exclusions: [
        'Pre-existing conditions',
        'Preventive care',
        'Dental cleaning (unless due to accident)'
      ],
      waitingPeriods: {
        accidents: 2,
        illnesses: 15,
        preExisting: false
      },
      rating: 4.8,
      customerReviews: 12500,
      referralCommission: 50
    },
    {
      providerId: 'petplan',
      providerName: 'Petplan',
      planName: 'Essential Plan',
      monthlyPremium: baseRate * 0.9,
      annualDeductible: 200,
      reimbursementRate: 70,
      annualLimit: 15000,
      coverageHighlights: [
        'Customizable deductibles and reimbursement',
        'Coverage for behavioral therapy',
        'Dental illness coverage',
        'Alternative therapies covered'
      ],
      exclusions: [
        'Pre-existing conditions',
        'Cosmetic procedures',
        'Breeding-related conditions'
      ],
      waitingPeriods: {
        accidents: 5,
        illnesses: 15,
        preExisting: false
      },
      rating: 4.6,
      customerReviews: 8900,
      referralCommission: 50
    },
    {
      providerId: 'embrace',
      providerName: 'Embrace Pet Insurance',
      planName: 'Wellness Rewards Plan',
      monthlyPremium: baseRate * 1.1,
      annualDeductible: 300,
      reimbursementRate: 90,
      annualLimit: 25000,
      coverageHighlights: [
        'Wellness rewards program',
        'Diminishing deductible',
        'Prescription drug coverage',
        'Dental accident and illness coverage'
      ],
      exclusions: [
        'Pre-existing conditions',
        'Cosmetic procedures',
        'Experimental treatments'
      ],
      waitingPeriods: {
        accidents: 2,
        illnesses: 14,
        preExisting: false
      },
      rating: 4.7,
      customerReviews: 6700,
      referralCommission: 50
    },
    {
      providerId: 'trupanion',
      providerName: 'Trupanion',
      planName: 'Direct Pay Coverage',
      monthlyPremium: baseRate * 1.3,
      annualDeductible: 0, // per-condition deductible
      reimbursementRate: 90,
      annualLimit: -1, // unlimited
      coverageHighlights: [
        'Direct payment to vets',
        'No payout limits',
        'Covers congenital and hereditary conditions',
        'Per-condition deductibles'
      ],
      exclusions: [
        'Pre-existing conditions',
        'Preventive care',
        'Exam fees'
      ],
      waitingPeriods: {
        accidents: 5,
        illnesses: 30,
        preExisting: false
      },
      rating: 4.5,
      customerReviews: 9200,
      referralCommission: 50
    }
  ];
  
  return quotes.sort((a, b) => a.monthlyPremium - b.monthlyPremium);
};

const calculateBaseRate = (pet: Pet): number => {
  let baseRate = 30; // Base monthly premium
  
  // Age factor
  if (pet.age < 1) baseRate *= 0.8;
  else if (pet.age < 3) baseRate *= 1.0;
  else if (pet.age < 7) baseRate *= 1.3;
  else baseRate *= 1.8;
  
  // Pet type factor
  switch (pet.type) {
    case 'dog':
      baseRate *= 1.2;
      break;
    case 'cat':
      baseRate *= 1.0;
      break;
    default:
      baseRate *= 0.9;
  }
  
  // Breed factor (simplified)
  if (pet.breed?.toLowerCase().includes('retriever') || 
      pet.breed?.toLowerCase().includes('shepherd') ||
      pet.breed?.toLowerCase().includes('bulldog')) {
    baseRate *= 1.2; // Higher risk breeds
  }
  
  // Weight factor for dogs
  if (pet.type === 'dog' && pet.weight) {
    if (pet.weight > 70) baseRate *= 1.3; // Large dogs
    else if (pet.weight < 20) baseRate *= 0.9; // Small dogs
  }
  
  return Math.round(baseRate * 100) / 100;
};

export const getInsuranceProviders = async (): Promise<InsuranceProvider[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockInsuranceProviders;
};

export const submitInsuranceApplication = async (
  quoteId: string, 
  petId: string, 
  ownerInfo: any
): Promise<{ success: boolean; applicationId?: string; message: string; commission?: number }> => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const applicationId = 'app_' + Math.random().toString(36).substr(2, 9);
  const commission = 50; // $50 referral commission
  
  // Track commission for revenue reporting
  console.log(`Insurance application submitted: ${applicationId}, Commission earned: $${commission}`);
  
  return {
    success: true,
    applicationId,
    commission,
    message: `Application submitted successfully! You'll receive a confirmation email shortly. Application ID: ${applicationId}`
  };
};

export const trackInsuranceCommissions = async (): Promise<{
  totalCommissions: number;
  monthlyCommissions: number;
  pendingPayouts: number;
  successfulReferrals: number;
}> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  // Mock commission tracking data
  return {
    totalCommissions: 2500, // Total earned
    monthlyCommissions: 450, // This month
    pendingPayouts: 200, // Awaiting payment
    successfulReferrals: 50 // Total referrals
  };
};

export const getPersonalizedRecommendations = async (pet: Pet): Promise<{
  recommendedProvider: string;
  reasoning: string;
  potentialSavings: number;
  riskFactors: string[];
}> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const riskFactors = [];
  
  if (pet.age > 7) riskFactors.push('Senior pet - higher likelihood of age-related conditions');
  if (pet.breed?.toLowerCase().includes('retriever')) riskFactors.push('Breed predisposition to hip dysplasia');
  if (pet.weight && pet.weight > 70) riskFactors.push('Large breed - increased orthopedic risks');
  
  return {
    recommendedProvider: 'Healthy Paws',
    reasoning: `Based on ${pet.name}'s profile, Healthy Paws offers the best value with unlimited coverage and fast claims processing, ideal for ${pet.type}s of ${pet.name}'s age and breed.`,
    potentialSavings: Math.floor(Math.random() * 500) + 200,
    riskFactors
  };
};