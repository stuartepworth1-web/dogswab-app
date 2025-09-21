import React from 'react';
import { ArrowLeft, Shield, Lock, Eye, Database, Users, Globe } from 'lucide-react';

interface PrivacyPolicyPageProps {
  onBack: () => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-dogswab-navy text-white px-4 py-6 safe-area-top">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-white/80 hover:text-white mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to App</span>
          </button>
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">Privacy Policy</h1>
              <p className="text-white/80">How DOGSWAB protects your data</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="prose prose-lg max-w-none">
          {/* Last Updated */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <p className="text-sm text-blue-800 font-medium">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-dogswab-navy mb-4 flex items-center">
              <Shield className="w-6 h-6 mr-2" />
              Our Commitment to Your Privacy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              At DOGSWAB, we understand that your pet's health information is deeply personal and sensitive. 
              This Privacy Policy explains how we collect, use, protect, and share information when you use 
              our AI-powered pet health consultation app and veterinary marketplace.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
              <p className="text-green-800 font-medium">
                <strong>HIPAA-Level Protection:</strong> We treat your pet's health data with the same care 
                and security standards used for human medical information.
              </p>
            </div>
          </section>

          {/* Information We Collect */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-dogswab-navy mb-4 flex items-center">
              <Database className="w-6 h-6 mr-2" />
              Information We Collect
            </h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-dogswab-navy mb-3">Pet Health Information</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Pet profiles (name, breed, age, weight, medical history)</li>
                  <li>• Symptom descriptions and health concerns</li>
                  <li>• Photos uploaded for AI analysis</li>
                  <li>• AI consultation records and recommendations</li>
                  <li>• Veterinary appointment details and notes</li>
                  <li>• Medication and vaccination records</li>
                  <li>• Health tracking data and wellness scores</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-dogswab-navy mb-3">Personal Information</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Name and email address</li>
                  <li>• Phone number (for vet appointments and emergencies)</li>
                  <li>• Subscription and billing information</li>
                  <li>• Account preferences and settings</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-dogswab-navy mb-3">Technical Information</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Device information and operating system</li>
                  <li>• App usage patterns and feature interactions</li>
                  <li>• Error logs and crash reports</li>
                  <li>• IP address and general location (for finding nearby vets)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-dogswab-navy mb-4 flex items-center">
              <Eye className="w-6 h-6 mr-2" />
              How We Use Your Information
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">App Functionality</h3>
                <ul className="space-y-2 text-blue-800 text-sm">
                  <li>• Provide AI-powered health consultations</li>
                  <li>• Connect you with licensed veterinarians</li>
                  <li>• Process insurance applications</li>
                  <li>• Send health reminders and alerts</li>
                  <li>• Manage your account and subscriptions</li>
                  <li>• Provide customer support</li>
                </ul>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-purple-900 mb-3">Personalization</h3>
                <ul className="space-y-2 text-purple-800 text-sm">
                  <li>• Customize AI recommendations for your pets</li>
                  <li>• Suggest relevant veterinarians</li>
                  <li>• Provide personalized health insights</li>
                  <li>• Recommend appropriate insurance plans</li>
                  <li>• Tailor care reminders to your pets' needs</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Data Security */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-dogswab-navy mb-4 flex items-center">
              <Lock className="w-6 h-6 mr-2" />
              Data Security & Protection
            </h2>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-green-900 mb-3">Security Measures</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2 text-green-800 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>End-to-end encryption for all health data</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>HIPAA-compliant data storage</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Secure API communications (HTTPS)</span>
                  </div>
                </div>
                <div className="space-y-2 text-green-800 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Regular security audits and updates</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Access controls and authentication</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Secure payment processing via Stripe</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Third-Party Services */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-dogswab-navy mb-4 flex items-center">
              <Users className="w-6 h-6 mr-2" />
              Third-Party Services
            </h2>
            
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Anthropic AI (Claude)</h3>
                <p className="text-gray-700 text-sm">
                  Processes your pet health questions to provide AI consultations. Health data is sent securely 
                  and is not stored by Anthropic beyond the consultation session.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Stripe</h3>
                <p className="text-gray-700 text-sm">
                  Handles subscription payments and vet booking transactions. We do not store your payment 
                  card information - it's securely processed by Stripe.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Licensed Veterinarians</h3>
                <p className="text-gray-700 text-sm">
                  When you book appointments, relevant pet health information is shared with your chosen 
                  veterinarian to provide proper care.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Insurance Providers</h3>
                <p className="text-gray-700 text-sm">
                  When you apply for pet insurance, necessary health information is shared with insurance 
                  companies to process your application.
                </p>
              </div>
            </div>
          </section>

          {/* Your Rights */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-dogswab-navy mb-4">Your Privacy Rights</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-blue-600 text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Access Your Data</h3>
                    <p className="text-gray-600 text-sm">View all your pet health records anytime in the app</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-blue-600 text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Correct Information</h3>
                    <p className="text-gray-600 text-sm">Update pet profiles and health information directly</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-blue-600 text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Delete Your Data</h3>
                    <p className="text-gray-600 text-sm">Request complete account and data deletion</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-blue-600 text-sm font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Export Records</h3>
                    <p className="text-gray-600 text-sm">Download your pet's complete health history</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Data Retention */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-dogswab-navy mb-4">Data Retention</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Health Records:</strong> Retained for 7 years after account deletion (medical record requirements)</li>
                <li>• <strong>Account Information:</strong> Deleted within 30 days of account deletion request</li>
                <li>• <strong>AI Consultation Logs:</strong> Retained for 2 years for service improvement</li>
                <li>• <strong>Payment Information:</strong> Handled by Stripe, not stored by DOGSWAB</li>
                <li>• <strong>Photos:</strong> Deleted immediately upon user request or account deletion</li>
              </ul>
            </div>
          </section>

          {/* International Users */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-dogswab-navy mb-4 flex items-center">
              <Globe className="w-6 h-6 mr-2" />
              International Data Transfers
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              DOGSWAB is based in the United States. If you use our service from outside the US, 
              your information may be transferred to, stored, and processed in the United States 
              where our servers are located.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 text-sm">
                <strong>EU/UK Users:</strong> We comply with GDPR requirements and provide appropriate 
                safeguards for international data transfers.
              </p>
            </div>
          </section>

          {/* Children's Privacy */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-dogswab-navy mb-4">Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              DOGSWAB is not intended for children under 13 years of age. We do not knowingly 
              collect personal information from children under 13. If you are a parent or guardian 
              and believe your child has provided us with personal information, please contact us 
              immediately.
            </p>
          </section>

          {/* Changes to Privacy Policy */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-dogswab-navy mb-4">Changes to This Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy periodically to reflect changes in our practices 
              or for legal, operational, or regulatory reasons. We will notify you of any material 
              changes by email or through the app. Your continued use of DOGSWAB after changes 
              become effective constitutes acceptance of the updated policy.
            </p>
          </section>

          {/* Contact Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-dogswab-navy mb-4">Contact Us</h2>
            <div className="bg-dogswab-mint/10 border border-dogswab-mint/30 rounded-lg p-6">
              <p className="text-dogswab-navy mb-4">
                If you have questions about this Privacy Policy or how we handle your data, please contact us:
              </p>
              <div className="space-y-2 text-dogswab-navy">
                <p><strong>Email:</strong> privacy@dogswab.com</p>
                <p><strong>Phone:</strong> 1-800-DOGSWAB (1-800-364-7922)</p>
                <p><strong>Mail:</strong> DOGSWAB Inc., Privacy Officer<br />
                123 Pet Health Avenue<br />
                San Francisco, CA 94105</p>
              </div>
            </div>
          </section>

          {/* Legal Compliance */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-dogswab-navy mb-4">Legal Compliance</h2>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">HIPAA Compliance</h3>
                <p className="text-gray-700 text-sm">
                  While HIPAA doesn't directly apply to pet health data, we voluntarily follow 
                  HIPAA security standards to protect your pet's health information.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">GDPR Compliance</h3>
                <p className="text-gray-700 text-sm">
                  For users in the European Union, we comply with the General Data Protection 
                  Regulation (GDPR) and provide all required rights and protections.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">CCPA Compliance</h3>
                <p className="text-gray-700 text-sm">
                  For California residents, we comply with the California Consumer Privacy Act 
                  (CCPA) and provide all required privacy rights.
                </p>
              </div>
            </div>
          </section>

          {/* Effective Date */}
          <div className="border-t border-gray-200 pt-8">
            <p className="text-center text-gray-500 text-sm">
              This Privacy Policy is effective as of {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })} and was last updated on the same date.
            </p>
            <p className="text-center text-gray-500 text-sm mt-2">
              © 2024 DOGSWAB Inc. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};