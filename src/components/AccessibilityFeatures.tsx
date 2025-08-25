import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Eye, EyeOff, Type, Contrast } from 'lucide-react';

interface AccessibilityFeaturesProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccessibilityFeatures: React.FC<AccessibilityFeaturesProps> = ({
  isOpen,
  onClose
}) => {
  const [settings, setSettings] = useState({
    screenReader: false,
    highContrast: false,
    largeText: false,
    reduceMotion: false,
    voiceAnnouncements: false
  });

  useEffect(() => {
    // Load saved accessibility settings
    const saved = localStorage.getItem('dogswab-accessibility');
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    // Apply accessibility settings
    const root = document.documentElement;
    
    if (settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    
    if (settings.largeText) {
      root.classList.add('large-text');
    } else {
      root.classList.remove('large-text');
    }
    
    if (settings.reduceMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }

    // Save settings
    localStorage.setItem('dogswab-accessibility', JSON.stringify(settings));
  }, [settings]);

  const updateSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const announceChange = (message: string) => {
    if (settings.voiceAnnouncements && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.rate = 0.8;
      utterance.volume = 0.7;
      speechSynthesis.speak(utterance);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl" role="dialog" aria-labelledby="accessibility-title">
        <div className="p-6 border-b border-gray-200">
          <h2 id="accessibility-title" className="text-2xl font-bold text-dogswab-navy flex items-center">
            <Eye className="w-6 h-6 mr-2" />
            Accessibility Settings
          </h2>
          <p className="text-gray-600 mt-2">Customize the app for your needs</p>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Contrast className="w-5 h-5 text-gray-600" />
              <div>
                <h3 className="font-semibold text-gray-900">High Contrast</h3>
                <p className="text-sm text-gray-600">Increase color contrast for better visibility</p>
              </div>
            </div>
            <button
              onClick={() => {
                updateSetting('highContrast');
                announceChange(settings.highContrast ? 'High contrast disabled' : 'High contrast enabled');
              }}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.highContrast ? 'bg-dogswab-mint' : 'bg-gray-300'
              }`}
              aria-label={`${settings.highContrast ? 'Disable' : 'Enable'} high contrast`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                settings.highContrast ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Type className="w-5 h-5 text-gray-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Large Text</h3>
                <p className="text-sm text-gray-600">Increase text size throughout the app</p>
              </div>
            </div>
            <button
              onClick={() => {
                updateSetting('largeText');
                announceChange(settings.largeText ? 'Large text disabled' : 'Large text enabled');
              }}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.largeText ? 'bg-dogswab-mint' : 'bg-gray-300'
              }`}
              aria-label={`${settings.largeText ? 'Disable' : 'Enable'} large text`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                settings.largeText ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Volume2 className="w-5 h-5 text-gray-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Voice Announcements</h3>
                <p className="text-sm text-gray-600">Hear important updates and changes</p>
              </div>
            </div>
            <button
              onClick={() => {
                updateSetting('voiceAnnouncements');
                if (!settings.voiceAnnouncements) {
                  announceChange('Voice announcements enabled');
                }
              }}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.voiceAnnouncements ? 'bg-dogswab-mint' : 'bg-gray-300'
              }`}
              aria-label={`${settings.voiceAnnouncements ? 'Disable' : 'Enable'} voice announcements`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                settings.voiceAnnouncements ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <EyeOff className="w-5 h-5 text-gray-600" />
              <div>
                <h3 className="font-semibold text-gray-900">Reduce Motion</h3>
                <p className="text-sm text-gray-600">Minimize animations and transitions</p>
              </div>
            </div>
            <button
              onClick={() => {
                updateSetting('reduceMotion');
                announceChange(settings.reduceMotion ? 'Motion reduction disabled' : 'Motion reduction enabled');
              }}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.reduceMotion ? 'bg-dogswab-mint' : 'bg-gray-300'
              }`}
              aria-label={`${settings.reduceMotion ? 'Disable' : 'Enable'} motion reduction`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                settings.reduceMotion ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full bg-dogswab-mint text-white py-3 px-4 rounded-xl hover:bg-dogswab-mint-dark transition-colors font-semibold"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};