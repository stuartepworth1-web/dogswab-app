import React from 'react';
import { X, FileText, AlertTriangle, Shield, CreditCard } from 'lucide-react';

interface TermsOfServiceProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsOfService: React.FC<TermsOfServiceProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <FileText className="w-6 h-6 text-dogswab-mint" />
              <h2 className="text-2xl font-bold text-dogswab-navy">Terms of Service</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-6 h-6 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-red-800 mb-3 text-base">🚨 CRITICAL MEDICAL DISCLAIMER</h3>
                <div className="space-y-2 text-sm text-red-700">
                  <p className="font-semibold">
                    DOGSWAB provides EDUCATIONAL INFORMATION ONLY and does NOT provide medical advice, diagnosis, or treatment.
                  </p>
                  <p>
                    We are NOT licensed veterinarians and do NOT practice veterinary medicine. This app CANNOT replace 
                    professional veterinary examination, diagnosis, or treatment.
                  </p>
                  <p className="font-semibold">
                    For ALL health concerns, symptoms, or medical decisions, you MUST consult with a licensed veterinarian.
                  </p>
                  <p className="font-bold text-red-900">
                    🚨 EMERGENCIES: Contact your veterinarian or emergency animal hospital IMMEDIATELY. Do not delay professional care.
                  </p>
                  <p className="font-semibold">
                    DOGSWAB Inc. is NOT liable for any health outcomes, medical decisions, or consequences resulting from use of this app.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <section>
            <h3 className="text-xl font-semibold text-dogswab-navy mb-3">1. Acceptance of Terms</h3>
            <p className="text-gray-700">
              By downloading, installing, or using DOGSWAB, you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, do not use our service.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-dogswab-navy mb-3">2. Service Description</h3>
            <div className="space-y-3 text-gray-700">
              <p>DOGSWAB provides:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>AI-powered pet health guidance and information</li>
                <li>Pet health tracking and record management</li>
                <li>Connection to licensed veterinarians</li>
                <li>Pet insurance quote comparisons</li>
                <li>Educational content about pet care</li>
              </ul>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-dogswab-navy mb-3">3. Medical Limitations</h3>
            <div className="space-y-3 text-gray-700">
              <p><strong>Not Medical Advice:</strong> Our AI provides general information only, not medical diagnosis or treatment recommendations.</p>
              <p><strong>Emergency Situations:</strong> For pet emergencies, contact your veterinarian or emergency animal hospital immediately.</p>
              <p><strong>Professional Care:</strong> Always consult with a licensed veterinarian for medical decisions about your pet.</p>
              <p><strong>Accuracy:</strong> While we strive for accuracy, we cannot guarantee the completeness or correctness of AI responses.</p>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-dogswab-navy mb-3 flex items-center">
              <CreditCard className="w-5 h-5 mr-2" />
              4. Subscription & Billing
            </h3>
            <div className="space-y-3 text-gray-700">
              <p><strong>Subscription Plans:</strong> We offer Basic ($9.99/month), Premium ($19.99/month), and Pro ($49.99/month) plans.</p>
              <p><strong>Auto-Renewal:</strong> Subscriptions automatically renew unless cancelled before the renewal date.</p>
              <p><strong>Cancellation:</strong> You can cancel your subscription at any time through your account settings or app store.</p>
              <p><strong>Refunds:</strong> Refunds are handled according to app store policies (Apple App Store, Google Play Store).</p>
              <p><strong>Price Changes:</strong> We may change subscription prices with 30 days notice.</p>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-dogswab-navy mb-3">5. User Responsibilities</h3>
            <div className="space-y-3 text-gray-700">
              <p><strong>Accurate Information:</strong> Provide accurate information about your pets for best results.</p>
              <p><strong>Appropriate Use:</strong> Use the service only for legitimate pet health purposes.</p>
              <p><strong>Account Security:</strong> Keep your account credentials secure and confidential.</p>
              <p><strong>Prohibited Uses:</strong> Do not use the service for illegal activities or to harm animals.</p>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-dogswab-navy mb-3">6. Limitation of Liability</h3>
            <div className="space-y-3 text-gray-700">
              <p>
                DOGSWAB SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, 
                INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR USE, ARISING OUT OF OR RELATING TO YOUR USE OF THE SERVICE.
              </p>
              <p>
                OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID FOR THE SERVICE IN THE 12 MONTHS PRECEDING THE CLAIM.
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-dogswab-navy mb-3">7. Veterinarian Network</h3>
            <div className="space-y-3 text-gray-700">
              <p><strong>Third-Party Providers:</strong> Veterinarians in our network are independent contractors, not employees.</p>
              <p><strong>Licensing:</strong> All veterinarians must maintain valid licenses in their jurisdictions.</p>
              <p><strong>Commission:</strong> We earn a commission from veterinarian bookings and insurance referrals.</p>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-dogswab-navy mb-3">8. Termination</h3>
            <p className="text-gray-700">
              We may terminate or suspend your account immediately if you violate these terms. 
              Upon termination, your right to use the service ceases immediately.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-dogswab-navy mb-3">9. Contact Information</h3>
            <div className="space-y-2 text-gray-700">
              <p><strong>Email:</strong> legal@dogswab.com</p>
              <p><strong>Address:</strong> DOGSWAB Inc., 123 Pet Health Ave, San Francisco, CA 94105</p>
              <p><strong>Phone:</strong> 1-800-DOGSWAB</p>
            </div>
          </section>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Changes to Terms:</strong> We may update these terms periodically. Continued use of the service 
              after changes constitutes acceptance of the new terms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};