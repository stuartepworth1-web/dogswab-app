import React from 'react';
import { Heart, Stethoscope } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
  type?: 'default' | 'medical' | 'ai';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = 'Loading...', 
  type = 'default' 
}) => {
  const renderSpinner = () => {
    switch (type) {
      case 'medical':
        return (
          <div className="relative">
            <div className="w-12 h-12 border-4 border-mint-200 border-t-mint-500 rounded-full animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-mint-600 animate-pulse" />
            </div>
          </div>
        );
      
      case 'ai':
        return (
          <div className="relative">
            <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-ping" />
            </div>
          </div>
        );
      
      default:
        return (
          <div className="relative">
            <div className="w-12 h-12 border-4 border-mint-200 border-t-mint-500 rounded-full animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 flex items-center justify-center">
                <img 
                  src="https://storage.reimage.dev/dogswabapp/dba9be83d5bd/original" 
                  alt="DOGSWAB Logo" 
                  className="h-full w-auto object-contain animate-pulse"
                />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
      {renderSpinner()}
      <div className="text-center">
        <p className="text-gray-700 font-medium">{message}</p>
        <div className="flex items-center justify-center space-x-1 mt-2">
          <div className="w-2 h-2 bg-mint-400 rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-mint-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
          <div className="w-2 h-2 bg-mint-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
        </div>
      </div>
    </div>
  );
};