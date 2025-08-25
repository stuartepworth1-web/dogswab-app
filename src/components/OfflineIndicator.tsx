import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi, AlertCircle } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOfflineMessage, setShowOfflineMessage] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineMessage(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineMessage(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline && !showOfflineMessage) return null;

  return (
    <>
      {/* Offline Banner */}
      {!isOnline && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-red-600 text-white px-4 py-2 text-center text-sm font-medium">
          <div className="flex items-center justify-center space-x-2">
            <WifiOff className="w-4 h-4" />
            <span>You're offline. Some features may not work.</span>
          </div>
        </div>
      )}

      {/* Back Online Notification */}
      {isOnline && showOfflineMessage && (
        <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg animate-slide-in">
          <div className="flex items-center space-x-2">
            <Wifi className="w-4 h-4" />
            <span className="text-sm font-medium">Back online!</span>
          </div>
        </div>
      )}

      {/* Offline Message Modal */}
      {!isOnline && (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <WifiOff className="w-8 h-8 text-red-600" />
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              You're Offline
            </h3>
            
            <p className="text-gray-600 mb-4 text-sm leading-relaxed">
              DOGSWAB needs an internet connection to provide AI health analysis. 
              You can still view your saved pet information and health records.
            </p>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-yellow-700">
                  For pet emergencies, contact your veterinarian directly at their phone number.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowOfflineMessage(false)}
              className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
            >
              Continue Offline
            </button>
          </div>
        </div>
      )}
    </>
  );
};