import React, { useState } from 'react';
import { Crown, CreditCard, Calendar, AlertTriangle, CheckCircle, X } from 'lucide-react';
import { Subscription } from '../types';

interface SubscriptionManagementProps {
  subscription: Subscription;
  onUpdateSubscription: (subscription: Subscription) => void;
  onClose: () => void;
}

export const SubscriptionManagement: React.FC<SubscriptionManagementProps> = ({
  subscription,
  onUpdateSubscription,
  onClose
}) => {
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCancelSubscription = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate API call to cancel subscription
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const updatedSubscription: Subscription = {
        ...subscription,
        status: 'canceled',
        // Keep access until current period ends
      };
      
      onUpdateSubscription(updatedSubscription);
      setShowCancelConfirm(false);
      
      alert('Subscription canceled successfully. You\'ll retain access until your current billing period ends.');
    } catch (error) {
      alert('Failed to cancel subscription. Please try again or contact support.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRestorePurchases = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate restore purchases (iOS requirement)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock finding an active subscription
      const restoredSubscription: Subscription = {
        ...subscription,
        status: 'active',
        tier: 'premium'
      };
      
      onUpdateSubscription(restoredSubscription);
      alert('Purchases restored successfully!');
    } catch (error) {
      alert('No purchases found to restore.');
    } finally {
      setIsProcessing(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'canceled': return 'text-red-600 bg-red-100';
      case 'past_due': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'premium':
      case 'pro':
        return <Crown className="w-5 h-5 text-yellow-500" />;
      default:
        return <span className="text-lg">🆓</span>;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-dogswab-mint rounded-xl flex items-center justify-center">
                {getTierIcon(subscription.tier)}
              </div>
              <div>
                <h2 className="text-xl font-bold text-dogswab-navy">Subscription</h2>
                <p className="text-gray-600 capitalize">{subscription.tier} Plan</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Subscription Status */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold text-gray-700">Status</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(subscription.status)}`}>
                {subscription.status}
              </span>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Current Period Ends:</span>
                <span className="font-medium">{subscription.currentPeriodEnd.toLocaleDateString()}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Consultations Used:</span>
                <span className="font-medium">
                  {subscription.consultationsUsed}/{subscription.consultationsLimit === -1 ? '∞' : subscription.consultationsLimit}
                </span>
              </div>
            </div>
          </div>

          {/* Plan Features */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Current Plan Features</h3>
            <div className="space-y-2">
              {subscription.tier === 'free' && (
                <>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-700">5 AI consultations/month</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-700">Basic pet profiles</span>
                  </div>
                </>
              )}
              
              {subscription.tier === 'basic' && (
                <>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-700">50 AI consultations/month</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-700">Photo symptom analysis</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-700">Email support</span>
                  </div>
                </>
              )}
              
              {(subscription.tier === 'premium' || subscription.tier === 'pro') && (
                <>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-700">Unlimited AI consultations</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-700">Vet booking marketplace</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-700">Priority support</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-700">Multi-pet management</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {/* Restore Purchases (iOS requirement) */}
            <button
              onClick={handleRestorePurchases}
              disabled={isProcessing}
              className="w-full bg-blue-100 text-blue-700 py-3 px-4 rounded-xl hover:bg-blue-200 disabled:opacity-50 transition-colors font-semibold flex items-center justify-center space-x-2"
            >
              <CreditCard className="w-4 h-4" />
              <span>Restore Purchases</span>
            </button>

            {/* Cancel Subscription */}
            {subscription.status === 'active' && subscription.tier !== 'free' && (
              <button
                onClick={() => setShowCancelConfirm(true)}
                className="w-full bg-red-100 text-red-700 py-3 px-4 rounded-xl hover:bg-red-200 transition-colors font-semibold flex items-center justify-center space-x-2"
              >
                <AlertTriangle className="w-4 h-4" />
                <span>Cancel Subscription</span>
              </button>
            )}
          </div>

          {/* Billing Information */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-xs text-blue-700">
              <strong>Billing:</strong> Subscriptions are managed through your app store (Apple App Store or Google Play). 
              To update payment methods or view detailed billing history, visit your app store account settings.
            </p>
          </div>
        </div>

        {/* Cancel Confirmation Modal */}
        {showCancelConfirm && (
          <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center p-4">
            <div className="bg-white rounded-xl p-6 max-w-sm w-full">
              <div className="text-center mb-4">
                <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-gray-900">Cancel Subscription?</h3>
                <p className="text-sm text-gray-600 mt-2">
                  You'll lose access to premium features when your current billing period ends on{' '}
                  {subscription.currentPeriodEnd.toLocaleDateString()}.
                </p>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowCancelConfirm(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
                >
                  Keep Plan
                </button>
                <button
                  onClick={handleCancelSubscription}
                  disabled={isProcessing}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors font-semibold"
                >
                  {isProcessing ? 'Canceling...' : 'Cancel'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};