import React, { useState } from 'react';
import { Pet } from '../types';
import { ArrowRight, ArrowLeft, SkipForward, Check } from 'lucide-react';

interface PetOnboardingProps {
  onAddPet: (pet: Omit<Pet, 'id'>) => void;
  onSkip: () => void;
}

type OnboardingStep = 'name' | 'type' | 'breed' | 'age' | 'weight' | 'gender' | 'neutered' | 'medical' | 'complete';

export const PetOnboarding: React.FC<PetOnboardingProps> = ({
  onAddPet,
  onSkip
}) => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('name');
  const [formData, setFormData] = useState({
    name: '',
    type: 'dog' as Pet['type'],
    breed: '',
    age: '',
    weight: '',
    gender: 'male' as Pet['gender'],
    isNeutered: false,
    medicalHistory: ''
  });

  const steps: OnboardingStep[] = ['name', 'type', 'breed', 'age', 'weight', 'gender', 'neutered', 'medical', 'complete'];
  const currentStepIndex = steps.indexOf(currentStep);
  const totalSteps = steps.length - 1; // Exclude 'complete' from count

  const getPetIcon = (type: Pet['type']) => {
    switch (type) {
      case 'dog': return '🐕';
      case 'cat': return '🐱';
      case 'bird': return '🐦';
      case 'rabbit': return '🐰';
      default: return '🐾';
    }
  };

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex]);
    }
  };

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex]);
    }
  };

  const handleComplete = () => {
    const petData: Omit<Pet, 'id'> = {
      ...formData,
      age: parseInt(formData.age) || 0,
      weight: parseFloat(formData.weight) || undefined
    };
    onAddPet(petData);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 'name': return formData.name.trim().length > 0;
      default: return true; // All other steps are optional
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'name':
        return (
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-gpt-text">What's your pet's name?</h2>
              <p className="text-gpt-text-secondary text-lg">Let's start with the basics</p>
            </div>
            <div className="max-w-sm mx-auto px-4">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-6 py-4 text-xl border border-white/30 rounded-2xl focus:ring-2 focus:ring-dogswab-mint focus:border-transparent bg-white/90 text-dogswab-navy text-center font-medium shadow-lg"
                placeholder="Enter your pet's name"
                autoFocus
              />
            </div>
          </div>
        );

      case 'type':
        return (
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-gpt-text">What type of pet is {formData.name}?</h2>
              <p className="text-gpt-text-secondary text-lg">This helps us provide better advice</p>
            </div>
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto px-4">
              {[
                { value: 'dog', label: 'Dog', icon: '🐕' },
                { value: 'cat', label: 'Cat', icon: '🐱' },
                { value: 'bird', label: 'Bird', icon: '🐦' },
                { value: 'rabbit', label: 'Rabbit', icon: '🐰' },
                { value: 'other', label: 'Other', icon: '🐾' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFormData({ ...formData, type: option.value as Pet['type'] })}
                  className={`p-4 rounded-2xl border-2 transition-all shadow-lg ${
                    formData.type === option.value
                      ? 'border-dogswab-mint bg-dogswab-mint text-white'
                      : 'border-white/30 bg-white/90 text-dogswab-navy hover:border-dogswab-mint'
                  }`}
                >
                  <div className="text-3xl mb-2">{option.icon}</div>
                  <div className="font-semibold text-lg">{option.label}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'breed':
        return (
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-gpt-text">What breed is {formData.name}?</h2>
              <p className="text-gpt-text-secondary text-lg">This is optional but helps with specific advice</p>
            </div>
            <div className="max-w-sm mx-auto px-4">
              <input
                type="text"
                value={formData.breed}
                onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                className="w-full px-6 py-4 text-xl border border-white/30 rounded-2xl focus:ring-2 focus:ring-dogswab-mint focus:border-transparent bg-white/90 text-dogswab-navy text-center font-medium shadow-lg"
                placeholder="e.g., Golden Retriever, Mixed"
                autoFocus
              />
            </div>
          </div>
        );

      case 'age':
        return (
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-gpt-text">How old is {formData.name}?</h2>
              <p className="text-gpt-text-secondary text-lg">Age helps us provide age-appropriate advice</p>
            </div>
            <div className="max-w-sm mx-auto px-4">
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="w-full px-6 py-4 text-xl border border-white/30 rounded-2xl focus:ring-2 focus:ring-dogswab-mint focus:border-transparent bg-white/90 text-dogswab-navy text-center font-medium shadow-lg"
                placeholder="Age in years"
                min="0"
                max="50"
                autoFocus
              />
            </div>
          </div>
        );

      case 'weight':
        return (
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-gpt-text">What's {formData.name}'s weight?</h2>
              <p className="text-gpt-text-secondary text-lg">Weight helps with dosage and health recommendations</p>
            </div>
            <div className="max-w-sm mx-auto px-4">
              <div className="relative">
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  className="w-full px-6 py-4 text-xl border border-white/30 rounded-2xl focus:ring-2 focus:ring-dogswab-mint focus:border-transparent bg-white/90 text-dogswab-navy text-center pr-12 font-medium shadow-lg"
                  placeholder="Weight"
                  min="0"
                  step="0.1"
                  autoFocus
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-dogswab-navy/60 font-medium">
                  lbs
                </span>
              </div>
            </div>
          </div>
        );

      case 'gender':
        return (
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-gpt-text">Is {formData.name} male or female?</h2>
              <p className="text-gpt-text-secondary text-lg">This helps with health-specific advice</p>
            </div>
            <div className="flex gap-4 max-w-sm mx-auto px-4">
              {[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' }
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, gender: option.value as Pet['gender'] })}
                  className={`flex-1 p-4 rounded-2xl border-2 transition-all shadow-lg ${
                    formData.gender === option.value
                      ? 'border-dogswab-mint bg-dogswab-mint text-white'
                      : 'border-white/30 bg-white/90 text-dogswab-navy hover:border-dogswab-mint'
                  }`}
                >
                  <div className="font-semibold text-lg">{option.label}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'neutered':
        return (
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-gpt-text">Is {formData.name} spayed or neutered?</h2>
              <p className="text-gpt-text-secondary text-lg">This affects certain health recommendations</p>
            </div>
            <div className="flex gap-4 max-w-sm mx-auto px-4">
              {[
                { value: true, label: 'Yes' },
                { value: false, label: 'No' }
              ].map((option) => (
                <button
                  key={option.value.toString()}
                  type="button"
                  onClick={() => setFormData({ ...formData, isNeutered: option.value })}
                  className={`flex-1 p-4 rounded-2xl border-2 transition-all shadow-lg ${
                    formData.isNeutered === option.value
                      ? 'border-dogswab-mint bg-dogswab-mint text-white'
                      : 'border-white/30 bg-white/90 text-dogswab-navy hover:border-dogswab-mint'
                  }`}
                >
                  <div className="font-semibold text-lg">{option.label}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'medical':
        return (
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-gpt-text">Any medical history for {formData.name}?</h2>
              <p className="text-gpt-text-secondary text-lg">Optional - helps us provide safer recommendations</p>
            </div>
            <div className="max-w-md mx-auto px-4">
              <textarea
                value={formData.medicalHistory}
                onChange={(e) => setFormData({ ...formData, medicalHistory: e.target.value })}
                className="w-full px-6 py-4 text-lg border border-white/30 rounded-2xl focus:ring-2 focus:ring-dogswab-mint focus:border-transparent bg-white/90 text-dogswab-navy font-medium shadow-lg"
                placeholder="Any conditions, allergies, or treatments..."
                rows={4}
                autoFocus
              />
            </div>
          </div>
        );

      case 'complete':
        return (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-gpt-text">Perfect! {formData.name} is all set up</h2>
              <p className="text-gpt-text-secondary text-lg">
                We now have everything we need to provide personalized health advice for your {formData.type}
              </p>
            </div>
            <div className="liquid-glass rounded-3xl p-6 border border-white/30 max-w-md mx-auto shadow-xl">
              <div className="flex items-center space-x-4">
                <div className="text-4xl">{getPetIcon(formData.type)}</div>
                <div className="text-left">
                  <h3 className="font-bold text-dogswab-navy text-xl">{formData.name}</h3>
                  <p className="text-sm text-dogswab-navy/70 font-medium capitalize">
                    {formData.type} {formData.breed && `• ${formData.breed}`}
                  </p>
                  {formData.age && (
                    <p className="text-sm text-dogswab-navy/70 font-medium">
                      {formData.age} years old {formData.weight && `• ${formData.weight} lbs`}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={handleComplete}
              className="liquid-glass-button text-white px-12 py-4 rounded-3xl hover:scale-105 transition-all duration-300 font-semibold text-xl shadow-xl"
            >
              Start chatting
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 safe-area-top safe-area-bottom" style={{ backgroundColor: '#2d2f63' }}>
      <div className="max-w-2xl w-full mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="h-16 sm:h-20 flex items-center justify-center">
              <img 
                src="https://storage.reimage.dev/dogswabapp/3af8c0ebb5c4/original"
                alt="DOGSWAB Logo" 
                className="h-full w-auto object-contain drop-shadow-lg"
              />
            </div>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-gpt-text mb-4">
            Welcome to DOGSWAB
          </h1>
          {currentStep !== 'complete' && (
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2 mt-4">
              <div className="text-sm text-gpt-text-secondary font-medium">
                Step {currentStepIndex + 1} of {totalSteps}
              </div>
              <div className="flex space-x-1">
                {steps.slice(0, -1).map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index <= currentStepIndex ? 'bg-gpt-accent' : 'bg-gpt-border'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Card */}
        <div className="liquid-glass rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/30 min-h-[400px] sm:min-h-[450px] flex flex-col justify-between mx-4 sm:mx-0">
          {/* Skip Button */}
          {currentStep !== 'complete' && (
            <div className="flex justify-end mb-4">
              <button
                onClick={onSkip}
                className="flex items-center space-x-2 text-dogswab-navy/60 hover:text-dogswab-navy transition-colors font-medium"
              >
                <SkipForward className="w-4 h-4" />
                <span className="text-sm">Skip setup</span>
              </button>
            </div>
          )}

          {/* Step Content */}
          <div className="flex-1 flex items-center justify-center">
            {renderStepContent()}
          </div>

          {/* Navigation */}
          {currentStep !== 'complete' && (
            <div className="flex flex-col sm:flex-row justify-between items-center pt-6 gap-4 sm:gap-0">
              <button
                onClick={handleBack}
                disabled={currentStepIndex === 0}
                className="flex items-center space-x-2 px-6 py-3 text-dogswab-navy disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/20 rounded-2xl transition-colors font-medium text-base order-2 sm:order-1 w-full sm:w-auto justify-center sm:justify-start"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex items-center space-x-2 liquid-glass-button text-white px-8 py-3 rounded-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-semibold text-lg order-1 sm:order-2 w-full sm:w-auto justify-center shadow-xl"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};