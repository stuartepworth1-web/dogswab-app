import React, { useEffect, useState } from 'react';
import { CheckCircle, Heart, Sparkles } from 'lucide-react';

interface SuccessAnimationProps {
  message: string;
  onComplete?: () => void;
  duration?: number;
}

export const SuccessAnimation: React.FC<SuccessAnimationProps> = ({ 
  message, 
  onComplete, 
  duration = 3000 
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-3xl p-8 max-w-sm mx-4 text-center shadow-2xl animate-scale-in">
        {/* Success icon with animation */}
        <div className="relative mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto animate-bounce">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          
          {/* Sparkle effects */}
          <div className="absolute -top-2 -right-2 animate-ping">
            <Sparkles className="w-6 h-6 text-yellow-400" />
          </div>
          <div className="absolute -bottom-2 -left-2 animate-ping" style={{ animationDelay: '0.5s' }}>
            <Heart className="w-5 h-5 text-pink-400" />
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2">Success!</h3>
        <p className="text-gray-600 leading-relaxed">{message}</p>
        
        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-1 mt-6">
          <div 
            className="bg-green-500 h-1 rounded-full animate-progress"
            style={{ 
              animation: `progress ${duration}ms linear forwards`
            }}
          />
        </div>
      </div>
    </div>
  );
};