import React from 'react';
import { X, Shield } from 'lucide-react';

interface PrivacyPolicyProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4 safe-area-top safe-area-bottom">
      <div className="bg-white rounded-3xl max-w-md w-full max-h-[85vh] flex flex-col shadow-2xl">
        {/* Header - Fixed */}
        <div className="flex-shrink-0 px-6 py-4 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Privacy</h2>
              <p className="text-sm text-gray-500 mt-0.5">How we handle your data</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="space-y-6">
            {/* Important Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-blue-900 text-sm">Your Privacy Matters</h3>
                  <p className="text-xs text-blue-700 mt-1 leading-relaxed">
                    We follow HIPAA guidelines to protect your pet's health information with the same care as human medical data.
                  </p>
                </div>
              </div>
            </div>

            {/* Data Collection */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 text-base">Information We Collect</h3>
              <div className="space-y-3">
                <div className="bg-gray-50 rounded-xl p-3">
                  <h4 className="font-medium text-gray-900 text-sm mb-1">Pet Health Data</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Pet profiles, symptoms, photos, medical history, and AI consultation records to provide personalized health guidance.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <h4 className="font-medium text-gray-900 text-sm mb-1">Account Information</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Email address, subscription details, and preferences to manage your account and billing.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <h4 className="font-medium text-gray-900 text-sm mb-1">Usage Analytics</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    App interactions and performance data to improve our AI recommendations and user experience.
                  </p>
                </div>
              </div>
            </div>

            {/* How We Use Data */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 text-base">How We Use Your Information</h3>
              <div className="space-y-2">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-700">Provide AI-powered pet health consultations and recommendations</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-700">Connect you with licensed veterinarians and book appointments</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-700">Send important health alerts and medication reminders</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-700">Improve our AI accuracy and app features</p>
                </div>
              </div>
            </div>

            {/* Data Security */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 text-base">Data Security</h3>
              <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-green-800">End-to-end encryption</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-green-800">HIPAA-compliant storage</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-green-800">Secure payment processing</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Third Party Services */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 text-base">Third-Party Services</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Anthropic AI:</strong> Processes health questions securely, data not stored by Anthropic</p>
                <p><strong>Stripe:</strong> Handles payments securely, we don't store card information</p>
                <p><strong>Analytics:</strong> Anonymous usage data to improve app performance</p>
              </div>
            </div>

            {/* Your Rights */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 text-base">Your Rights</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p>• <strong>Access</strong> your data anytime in app settings</p>
                <p>• <strong>Correct</strong> information directly in the app</p>
                <p>• <strong>Delete</strong> your account and all data</p>
                <p>• <strong>Export</strong> your pet's health records</p>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 text-base">Contact Us</h3>
              <div className="bg-gray-50 rounded-xl p-3 space-y-1 text-sm text-gray-700">
                <p><strong>Email:</strong> privacy@dogswab.com</p>
                <p><strong>Phone:</strong> 1-800-DOGSWAB</p>
                <p><strong>Address:</strong> 123 Pet Health Ave, San Francisco, CA 94105</p>
                <p><strong>Full Policy:</strong> <a href="/privacy" className="text-dogswab-mint hover:underline">dogswab.com/privacy</a></p>
              </div>
            </div>

            {/* Last Updated */}
            <div className="text-center pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500">
                Last updated: {new Date().toLocaleDateString()}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                We may update this policy periodically. Continued use constitutes acceptance.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Buttons - Fixed */}
        <div className="flex-shrink-0 px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-3xl">
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-2xl hover:bg-gray-50 transition-colors font-semibold text-sm"
            >
              Decline
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-dogswab-mint text-white py-3 px-4 rounded-2xl hover:bg-dogswab-mint-dark transition-colors font-semibold text-sm"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};