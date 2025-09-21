import React, { useState } from 'react';
import { AlertTriangle, Phone, Clock, X } from 'lucide-react';

interface MedicalDisclaimerProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

export const MedicalDisclaimer: React.FC<MedicalDisclaimerProps> = ({
  isOpen,
  onAccept,
  onDecline
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4 safe-area-top safe-area-bottom">
      <div className="bg-white rounded-3xl max-w-md w-full max-h-[85vh] flex flex-col shadow-2xl">
        {/* Header - Fixed */}
        <div className="flex-shrink-0 px-6 py-4 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-dogswab-navy">Medical Disclaimer</h2>
              <p className="text-sm text-dogswab-navy/70 mt-0.5">Please read carefully</p>
            </div>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="space-y-4">
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <h3 className="font-bold text-red-800 mb-3 text-lg">
                🚨 CRITICAL MEDICAL DISCLAIMER - MUST READ
              </h3>
              <div className="space-y-3 text-red-800">
                <p className="font-semibold text-base">
                  DOGSWAB provides EDUCATIONAL INFORMATION ONLY and does NOT provide medical advice, diagnosis, or treatment.
                </p>
                <p className="text-sm leading-relaxed">
                  This app <strong>CANNOT</strong> replace professional veterinary examination, diagnosis, or treatment. 
                  We are <strong>NOT</strong> licensed veterinarians and do <strong>NOT</strong> practice veterinary medicine.
                </p>
                <p className="font-semibold text-sm">
                  For ALL health concerns, symptoms, or medical decisions about your pet, you MUST consult with a licensed veterinarian.
                </p>
                <p className="font-bold text-base text-red-900">
                  🚨 FOR EMERGENCIES: Contact your veterinarian or emergency animal hospital IMMEDIATELY. Do not delay professional care.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="w-4 h-4 text-orange-600" />
                  <h4 className="font-semibold text-dogswab-navy text-sm">For Emergencies</h4>
                </div>
                <p className="text-xs text-dogswab-navy/70 leading-relaxed">
                  If your pet is experiencing a medical emergency, contact your veterinarian 
                  or emergency animal hospital <strong>immediately</strong>. Do not rely on 
                  this app for emergency situations or medical decisions.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <h4 className="font-semibold text-dogswab-navy text-sm">Professional Consultation</h4>
                </div>
                <p className="text-xs text-dogswab-navy/70 leading-relaxed">
                  Always consult with a licensed veterinarian for medical decisions about 
                  your pet. This app provides general education to supplement, not replace, 
                  professional care.
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-dogswab-navy mb-3 text-sm">By using DOGSWAB, you acknowledge:</h4>
              <ul className="space-y-2 text-xs text-dogswab-navy/70">
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-dogswab-mint rounded-full mt-2 flex-shrink-0"></span>
                  <span>All information is educational only and may not be accurate for your specific situation</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-dogswab-mint rounded-full mt-2 flex-shrink-0"></span>
                  <span>You will seek professional veterinary care for medical concerns</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-dogswab-mint rounded-full mt-2 flex-shrink-0"></span>
                  <span>DOGSWAB is not liable for any health outcomes or medical decisions</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-dogswab-mint rounded-full mt-2 flex-shrink-0"></span>
                  <span>You understand this app provides education only, not medical services</span>
                </li>
              </ul>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
              <p className="text-xs text-dogswab-navy/70 leading-relaxed">
                <strong>Emergency Contacts:</strong> Keep your veterinarian's phone number and 
                the nearest emergency animal hospital contact information easily accessible. 
                In ANY health concerns or emergencies, contact professional veterinary care immediately.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Buttons - Fixed */}
        <div className="flex-shrink-0 px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-3xl">
          <div className="flex space-x-3">
            <button
              onClick={onDecline}
              className="flex-1 bg-red-100 border border-red-300 text-red-700 py-3 px-4 rounded-2xl hover:bg-red-200 transition-colors font-semibold text-sm"
            >
              I Don't Agree (Exit App)
            </button>
            <button
              onClick={onAccept}
              className="flex-1 bg-dogswab-mint text-white py-3 px-4 rounded-2xl hover:bg-dogswab-mint-dark transition-colors font-semibold text-sm"
            >
              I Understand (Educational Use Only)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const InlineMedicalDisclaimer: React.FC = () => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
      <div className="flex items-start space-x-2">
        <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
        <div className="text-xs text-red-700">
          <p className="font-semibold mb-1">Educational Information Only</p>
          <p>
            This information is educational only and does not constitute medical advice. 
            For ALL health concerns, emergencies, or medical decisions, 
            contact your veterinarian immediately.
          </p>
        </div>
      </div>
    </div>
  );
};