import React, { useState } from 'react';
import { Sparkles, Zap, Brain, Heart, Shield, Award, Star, TrendingUp } from 'lucide-react';

interface PremiumFeaturesProps {
  onFeatureSelect: (feature: string) => void;
}

export const PremiumFeatures: React.FC<PremiumFeaturesProps> = ({ onFeatureSelect }) => {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  const premiumFeatures = [
    {
      id: 'ai-health-score',
      icon: <Brain className="w-8 h-8" />,
      title: 'AI Health Score',
      subtitle: 'Real-time wellness tracking',
      description: 'Advanced AI analyzes your pet\'s behavior, symptoms, and history to provide a comprehensive health score with personalized recommendations.',
      gradient: 'from-purple-500 to-pink-500',
      benefits: ['Predictive health alerts', 'Trend analysis', 'Early warning system']
    },
    {
      id: 'smart-reminders',
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Smart Care Reminders',
      subtitle: 'Never miss important care',
      description: 'Intelligent scheduling for vaccinations, medications, grooming, and check-ups based on your pet\'s specific needs.',
      gradient: 'from-blue-500 to-cyan-500',
      benefits: ['Personalized schedules', 'Push notifications', 'Vet integration']
    },
    {
      id: 'emergency-detection',
      icon: <Zap className="w-8 h-8" />,
      title: 'Emergency Detection',
      subtitle: 'Instant critical care alerts',
      description: 'Advanced AI instantly recognizes emergency symptoms and connects you with 24/7 emergency vet services.',
      gradient: 'from-red-500 to-orange-500',
      benefits: ['24/7 monitoring', 'Instant alerts', 'Emergency vet network']
    },
    {
      id: 'wellness-insights',
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Wellness Insights',
      subtitle: 'Data-driven pet care',
      description: 'Comprehensive analytics showing health trends, behavioral patterns, and personalized care recommendations.',
      gradient: 'from-green-500 to-teal-500',
      benefits: ['Health trends', 'Behavioral analysis', 'Care optimization']
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-4">
          <Award className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Premium Pet Care</h2>
        <p className="text-gray-600">Advanced AI-powered features for the best pet care</p>
      </div>

      <div className="grid gap-4">
        {premiumFeatures.map((feature) => (
          <div
            key={feature.id}
            className={`relative overflow-hidden rounded-3xl border-2 transition-all duration-300 ${
              activeFeature === feature.id 
                ? 'border-purple-300 shadow-lg scale-[1.02]' 
                : 'border-gray-200 hover:border-purple-200'
            }`}
          >
            <div className="p-6 bg-white">
              <div className="flex items-start space-x-4">
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{feature.subtitle}</p>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">{feature.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {feature.benefits.map((benefit, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                      >
                        <Star className="w-3 h-3 mr-1" />
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => {
                  setActiveFeature(feature.id);
                  onFeatureSelect(feature.id);
                }}
                className={`w-full mt-4 py-3 px-4 rounded-2xl font-semibold transition-all ${
                  activeFeature === feature.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {activeFeature === feature.id ? 'Feature Activated' : 'Try This Feature'}
              </button>
            </div>
            
            {/* Gradient overlay for premium feel */}
            <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-5 pointer-events-none`} />
          </div>
        ))}
      </div>
    </div>
  );
};