import React, { useState } from 'react';
import { X, Check, Crown, Zap, Star } from 'lucide-react';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: (tier: string) => void;
  currentTier: string;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
  onSubscribe,
  currentTier
}) => {
  const [selectedTier, setSelectedTier] = useState<string>('basic');

  if (!isOpen) return null;

  const tiers = [
    {
      id: 'basic',
      name: 'Basic',
      price: 9.99,
      icon: <Zap className="w-6 h-6" />,
      color: 'bg-blue-500',
      features: [
        '50 AI consultations/month',
        'Basic health tracking',
        'Photo symptom analysis',
        'Email support'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 19.99,
      icon: <Crown className="w-6 h-6" />,
      color: 'bg-purple-500',
      popular: true,
      features: [
        'Unlimited AI consultations',
        'Advanced health analytics',
        'Vet booking marketplace',
        'Priority support',
        'Multi-pet management',
        'Predictive health alerts'
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 49.99,
      icon: <Star className="w-6 h-6" />,
      color: 'bg-gold-500',
      features: [
        'Everything in Premium',
        'Video vet consultations',
        '24/7 emergency hotline',
        'Family sharing (5 members)',
        'Custom health reports',
        'API access'
      ]
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="glass-card backdrop-blur-xl bg-white/95 border border-white/20 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6 border-b border-white/20">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-dogswab-navy">Choose Your Plan</h2>
              <p className="text-dogswab-navy/70">Unlock premium features for better pet care</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-dogswab-mint/20 rounded-xl transition-colors"
            >
              <X className="w-6 h-6 text-dogswab-navy" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-3 gap-6">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className={`relative rounded-2xl border-2 p-6 cursor-pointer transition-all ${
                  selectedTier === tier.id
                    ? 'border-dogswab-mint bg-dogswab-mint/10'
                    : 'border-white/30 bg-white/50 hover:border-dogswab-mint'
                 } ${tier.popular ? 'ring-2 ring-dogswab-mint' : ''}`}
                onClick={() => setSelectedTier(tier.id)}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-dogswab-mint text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className={`w-12 h-12 ${tier.color} rounded-xl flex items-center justify-center mx-auto mb-3 text-white`}>
                    {tier.icon}
                  </div>
                  <h3 className="text-xl font-bold text-dogswab-navy">{tier.name}</h3>
                  <div className="mt-2">
                    <span className="text-3xl font-bold text-dogswab-navy">${tier.price}</span>
                    <span className="text-dogswab-navy/70">/month</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-dogswab-navy">{feature}</span>
                    </li>
                  ))}
                </ul>

                {currentTier === tier.id && (
                  <div className="text-center py-2">
                    <span className="text-dogswab-mint font-semibold">Current Plan</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <p className="text-xs text-blue-700">
                <strong>Auto-Renewable Subscriptions:</strong><br/>
                • <strong>DOGSWAB Basic Monthly:</strong> $9.99/month<br/>
                • <strong>DOGSWAB Premium Monthly:</strong> $19.99/month<br/>
                • <strong>DOGSWAB Pro Monthly:</strong> $49.99/month<br/>
                Payment charged to iTunes Account. Auto-renews unless cancelled 24 hours before period ends.<br/>
                <button onClick={() => window.open('/terms.html', '_blank')} className="underline">Terms of Use</button> | 
                <button onClick={() => window.open('/privacy.html', '_blank')} className="underline ml-1">Privacy Policy</button>
              </p>
            </div>
            <button
              onClick={() => onSubscribe(selectedTier)}
              disabled={currentTier === selectedTier}
              className="bg-dogswab-mint text-white px-8 py-3 rounded-2xl hover:bg-dogswab-mint-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold text-lg shadow-lg"
            >
              {currentTier === selectedTier ? 'Current Plan' : 'Upgrade Now'}
            </button>
            <p className="text-xs text-dogswab-navy/60 mt-2">
              Managed by Apple App Store. Cancel in App Store settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { SubscriptionModal };