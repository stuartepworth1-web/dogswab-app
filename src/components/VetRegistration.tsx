import React, { useState } from 'react';
import { X, Upload, Check, AlertCircle, User, Building, DollarSign, Calendar } from 'lucide-react';
import { VetRegistration as VetRegistrationType, registerVeterinarian } from '../services/vetService';

interface VetRegistrationProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (vetId: string) => void;
}

type RegistrationStep = 'personal' | 'clinic' | 'services' | 'availability' | 'payment' | 'review';

const VetRegistration: React.FC<VetRegistrationProps> = ({ isOpen, onClose, onSuccess }) => {
  const [currentStep, setCurrentStep] = useState<RegistrationStep>('personal');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<VetRegistrationType>({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      licenseNumber: '',
      yearsExperience: 0
    },
    clinicInfo: {
      name: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      phone: '',
      website: ''
    },
    services: {
      specialties: [],
      consultationFee: 100,
      emergencyFee: 150,
      houseCalls: false,
      telemedicine: false
    },
    availability: {
      workingHours: {
        monday: { start: '09:00', end: '17:00' },
        tuesday: { start: '09:00', end: '17:00' },
        wednesday: { start: '09:00', end: '17:00' },
        thursday: { start: '09:00', end: '17:00' },
        friday: { start: '09:00', end: '17:00' },
        saturday: { start: '09:00', end: '13:00' },
        sunday: { start: '', end: '' }
      },
      timeZone: 'America/New_York',
      bookingBuffer: 15
    },
    paymentInfo: {
      bankAccount: '',
      routingNumber: '',
      taxId: ''
    }
  });

  const steps: { id: RegistrationStep; title: string; icon: React.ReactNode }[] = [
    { id: 'personal', title: 'Personal Info', icon: <User className="w-5 h-5" /> },
    { id: 'clinic', title: 'Clinic Details', icon: <Building className="w-5 h-5" /> },
    { id: 'services', title: 'Services & Pricing', icon: <DollarSign className="w-5 h-5" /> },
    { id: 'availability', title: 'Availability', icon: <Calendar className="w-5 h-5" /> },
    { id: 'payment', title: 'Payment Info', icon: <DollarSign className="w-5 h-5" /> },
    { id: 'review', title: 'Review', icon: <Check className="w-5 h-5" /> }
  ];

  const specialtyOptions = [
    'General Practice', 'Surgery', 'Dermatology', 'Cardiology', 'Oncology',
    'Orthopedics', 'Ophthalmology', 'Dentistry', 'Emergency Care', 'Internal Medicine',
    'Neurology', 'Radiology', 'Anesthesiology', 'Exotic Animals', 'Behavioral Medicine'
  ];

  if (!isOpen) return null;

  const handleNext = () => {
    const stepIndex = steps.findIndex(s => s.id === currentStep);
    if (stepIndex < steps.length - 1) {
      setCurrentStep(steps[stepIndex + 1].id);
    }
  };

  const handleBack = () => {
    const stepIndex = steps.findIndex(s => s.id === currentStep);
    if (stepIndex > 0) {
      setCurrentStep(steps[stepIndex - 1].id);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const result = await registerVeterinarian(formData);
      if (result.success && result.vetId) {
        onSuccess(result.vetId);
        onClose();
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleSpecialty = (specialty: string) => {
    const current = formData.services.specialties;
    const updated = current.includes(specialty)
      ? current.filter(s => s !== specialty)
      : [...current, specialty];
    
    setFormData(prev => ({
      ...prev,
      services: { ...prev.services, specialties: updated }
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'personal':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gpt-text mb-2">First Name *</label>
                <input
                  type="text"
                  value={formData.personalInfo.firstName}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, firstName: e.target.value }
                  }))}
                  className="w-full px-4 py-3 border border-gpt-border rounded-lg focus:ring-2 focus:ring-gpt-accent focus:border-transparent bg-gpt-light text-gpt-text"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gpt-text mb-2">Last Name *</label>
                <input
                  type="text"
                  value={formData.personalInfo.lastName}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, lastName: e.target.value }
                  }))}
                  className="w-full px-4 py-3 border border-gpt-border rounded-lg focus:ring-2 focus:ring-gpt-accent focus:border-transparent bg-gpt-light text-gpt-text"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gpt-text mb-2">Email Address *</label>
              <input
                type="email"
                value={formData.personalInfo.email}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  personalInfo: { ...prev.personalInfo, email: e.target.value }
                }))}
                className="w-full px-4 py-3 border border-gpt-border rounded-lg focus:ring-2 focus:ring-gpt-accent focus:border-transparent bg-gpt-light text-gpt-text"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gpt-text mb-2">Phone Number *</label>
              <input
                type="tel"
                value={formData.personalInfo.phone}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  personalInfo: { ...prev.personalInfo, phone: e.target.value }
                }))}
                className="w-full px-4 py-3 border border-gpt-border rounded-lg focus:ring-2 focus:ring-gpt-accent focus:border-transparent bg-gpt-light text-gpt-text"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gpt-text mb-2">License Number *</label>
                <input
                  type="text"
                  value={formData.personalInfo.licenseNumber}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, licenseNumber: e.target.value }
                  }))}
                  className="w-full px-4 py-3 border border-gpt-border rounded-lg focus:ring-2 focus:ring-gpt-accent focus:border-transparent bg-gpt-light text-gpt-text"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gpt-text mb-2">Years of Experience *</label>
                <input
                  type="number"
                  value={formData.personalInfo.yearsExperience}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, yearsExperience: parseInt(e.target.value) || 0 }
                  }))}
                  className="w-full px-4 py-3 border border-gpt-border rounded-lg focus:ring-2 focus:ring-gpt-accent focus:border-transparent bg-gpt-light text-gpt-text"
                  min="0"
                  required
                />
              </div>
            </div>
          </div>
        );

      case 'services':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gpt-text mb-3">Specialties</label>
              <div className="grid grid-cols-2 gap-2">
                {specialtyOptions.map((specialty) => (
                  <button
                    key={specialty}
                    type="button"
                    onClick={() => toggleSpecialty(specialty)}
                    className={`p-3 text-sm rounded-lg border transition-all ${
                      formData.services.specialties.includes(specialty)
                        ? 'border-gpt-accent bg-gpt-accent text-white'
                        : 'border-gpt-border bg-gpt-light text-gpt-text hover:border-gpt-accent'
                    }`}
                  >
                    {specialty}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gpt-text mb-2">Consultation Fee ($)</label>
                <input
                  type="number"
                  value={formData.services.consultationFee}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    services: { ...prev.services, consultationFee: parseInt(e.target.value) || 0 }
                  }))}
                  className="w-full px-4 py-3 border border-gpt-border rounded-lg focus:ring-2 focus:ring-gpt-accent focus:border-transparent bg-gpt-light text-gpt-text"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gpt-text mb-2">Emergency Fee ($)</label>
                <input
                  type="number"
                  value={formData.services.emergencyFee}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    services: { ...prev.services, emergencyFee: parseInt(e.target.value) || 0 }
                  }))}
                  className="w-full px-4 py-3 border border-gpt-border rounded-lg focus:ring-2 focus:ring-gpt-accent focus:border-transparent bg-gpt-light text-gpt-text"
                  min="0"
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.services.houseCalls}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    services: { ...prev.services, houseCalls: e.target.checked }
                  }))}
                  className="w-4 h-4 text-gpt-accent"
                />
                <span className="text-gpt-text">Offer house calls</span>
              </label>
              
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.services.telemedicine}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    services: { ...prev.services, telemedicine: e.target.checked }
                  }))}
                  className="w-4 h-4 text-gpt-accent"
                />
                <span className="text-gpt-text">Offer telemedicine consultations</span>
              </label>
            </div>
          </div>
        );

      case 'review':
        return (
          <div className="space-y-6">
            <div className="bg-gpt-light rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gpt-text mb-4">Registration Summary</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gpt-text">Personal Information</h4>
                  <p className="text-sm text-gpt-text-secondary">
                    Dr. {formData.personalInfo.firstName} {formData.personalInfo.lastName}
                  </p>
                  <p className="text-sm text-gpt-text-secondary">{formData.personalInfo.email}</p>
                  <p className="text-sm text-gpt-text-secondary">License: {formData.personalInfo.licenseNumber}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gpt-text">Clinic</h4>
                  <p className="text-sm text-gpt-text-secondary">{formData.clinicInfo.name}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gpt-text">Services</h4>
                  <p className="text-sm text-gpt-text-secondary">
                    Consultation: ${formData.services.consultationFee} | Emergency: ${formData.services.emergencyFee}
                  </p>
                  <p className="text-sm text-gpt-text-secondary">
                    Specialties: {formData.services.specialties.join(', ') || 'General Practice'}
                  </p>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-semibold mb-1">Commission Structure</p>
                    <p>DOGSWAB charges a 15% commission on all bookings made through our platform. You'll receive 85% of the booking fee, with monthly payouts via direct deposit.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Step content not implemented</div>;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-gpt-darker rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gpt-border">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gpt-text">Veterinarian Registration</h2>
              <p className="text-gpt-text-secondary">Join our marketplace and start earning with 15% commission</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gpt-light rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gpt-text" />
            </button>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center space-x-4 mt-6">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                  currentStep === step.id ? 'bg-gpt-accent text-white' : 
                  steps.findIndex(s => s.id === currentStep) > index ? 'bg-green-100 text-green-800' : 
                  'bg-gpt-light text-gpt-text-secondary'
                }`}>
                  {step.icon}
                  <span className="text-sm font-medium">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-8 h-px bg-gpt-border mx-2" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6">
          {renderStepContent()}
          
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={handleBack}
              disabled={currentStep === 'personal'}
              className="px-6 py-3 text-gpt-text disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gpt-light rounded-lg transition-colors font-medium"
            >
              Back
            </button>
            
            {currentStep === 'review' ? (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-8 py-3 bg-gpt-accent text-white rounded-lg hover:bg-gpt-accent-hover disabled:opacity-50 transition-colors font-semibold"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Registration'}
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-8 py-3 bg-gpt-accent text-white rounded-lg hover:bg-gpt-accent-hover transition-colors font-semibold"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { VetRegistration };