import React from 'react';

export const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-mint-100 via-sage-100 to-mint-200 animate-gradient-shift" />
      
      {/* Floating elements */}
      <div className="absolute inset-0">
        {/* Large floating circles */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-mint-300/20 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-sage-300/20 rounded-full blur-3xl animate-float-slower" />
        <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-coral-300/20 rounded-full blur-2xl animate-float" />
        
        {/* Small floating dots */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-mint-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
        
        {/* Medical cross patterns */}
        <div className="absolute top-1/3 right-1/3 w-8 h-8 opacity-10">
          <div className="absolute inset-0 bg-mint-500 transform rotate-0" style={{ width: '2px', left: '50%', transform: 'translateX(-50%)' }} />
          <div className="absolute inset-0 bg-mint-500 transform rotate-90" style={{ height: '2px', top: '50%', transform: 'translateY(-50%)' }} />
        </div>
        
        {/* Paw print patterns */}
        <div className="absolute bottom-1/3 right-1/4 text-mint-400/10 text-4xl animate-pulse">
          🐾
        </div>
        <div className="absolute top-1/2 left-1/6 text-sage-400/10 text-3xl animate-pulse" style={{ animationDelay: '2s' }}>
          🐾
        </div>
      </div>
      
      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(20, 184, 166, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20, 184, 166, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
    </div>
  );
};