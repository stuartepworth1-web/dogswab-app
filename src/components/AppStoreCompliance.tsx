import React from 'react';
import { Shield, AlertTriangle, CreditCard, FileText, X } from 'lucide-react';

interface AppStoreComplianceProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppStoreCompliance: React.FC<AppStoreComplianceProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-blue-600" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">App Store Compliance</h2>
                <p className="text-gray-600">Important information about DOGSWAB</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Medical Disclaimer */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-6 h-6 text-red-600 mt-1" />
              <div>
                <h3 className="font-bold text-red-800 mb-3 text-base">🚨 CRITICAL MEDICAL DISCLAIMER</h3>
                <div className="space-y-2 text-red-700 text-sm leading-relaxed">
                  <p className="font-semibold">
                    DOGSWAB provides EDUCATIONAL INFORMATION ONLY and does NOT provide medical advice, diagnosis, or treatment.
                  </p>
                  <p>
                    This app CANNOT replace professional veterinary examination. We are NOT licensed veterinarians 
                    and do NOT practice veterinary medicine.
                  </p>
                  <p className="font-semibold">
                    For ALL health concerns and medical decisions, consult a licensed veterinarian immediately.
                  </p>
                  <p className="font-bold text-red-800">
                    🚨 FOR EMERGENCIES: Contact your veterinarian or emergency animal hospital RIGHT NOW.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Developer Information */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h3 className="font-bold text-blue-800 mb-3">Developer Information</h3>
            <div className="space-y-2 text-blue-700 text-sm">
              <p><strong>Company:</strong> DOGSWAB Inc.</p>
              <p><strong>Address:</strong> 123 Pet Health Avenue, San Francisco, CA 94105</p>
              <p><strong>Email:</strong> support@dogswab.com</p>
              <p><strong>Phone:</strong> 1-800-DOGSWAB (1-800-364-7922)</p>
              <p><strong>Website:</strong> https://dogswab.com</p>
            </div>
          </div>

          {/* Subscription Terms */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <CreditCard className="w-6 h-6 text-green-600 mt-1" />
              <div>
                <h3 className="font-bold text-green-800 mb-2">Subscription Information</h3>
                <div className="space-y-2 text-green-700 text-sm">
                  <p><strong>Auto-Renewal:</strong> Subscriptions automatically renew unless cancelled 24 hours before renewal</p>
                  <p><strong>Cancellation:</strong> Cancel anytime in App Store account settings</p>
                  <p><strong>Refunds:</strong> Managed through Apple App Store policies</p>
                  <p><strong>Free Trial:</strong> 7-day free trial for new Premium subscribers</p>
                  <p><strong>Pricing:</strong> Basic $9.99/month, Premium $19.99/month, Pro $49.99/month</p>
                </div>
              </div>
            </div>
          </div>

          {/* Terms and Privacy */}
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <FileText className="w-6 h-6 text-purple-600 mt-1" />
              <div>
                <h3 className="font-bold text-purple-800 mb-2">Legal Documents</h3>
                <div className="space-y-2 text-purple-700 text-sm">
                  <p><strong>Terms of Service:</strong> <a href="https://dogswab.com/terms" className="underline">dogswab.com/terms</a></p>
                  <p><strong>Privacy Policy:</strong> <a href="https://dogswab.com/privacy" className="underline">dogswab.com/privacy</a></p>
                  <p><strong>Support:</strong> <a href="https://dogswab.com/support" className="underline">dogswab.com/support</a></p>
                </div>
              </div>
            </div>
          </div>

          {/* App Functionality */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <h3 className="font-bold text-yellow-800 mb-2">What DOGSWAB Does</h3>
            <ul className="space-y-1 text-yellow-700 text-sm">
              <li>• Provides general pet health information and guidance</li>
              <li>• Connects pet owners with licensed veterinarians</li>
              <li>• Offers pet insurance quote comparisons</li>
              <li>• Tracks pet health records and reminders</li>
              <li>• Uses AI for educational content only (not diagnosis)</li>
            </ul>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full bg-dogswab-mint text-white py-3 px-4 rounded-xl hover:bg-dogswab-mint-dark transition-colors font-semibold"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};