/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Circular Std', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        'display': ['Circular Std', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'body': ['Circular Std', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        // Modern Pet Health App - Cutting Edge Design System
        'dogswab': {
          'navy': '#2d2f63',
          'mint': '#77e1c0',
          'mint-light': '#a8f0d9',
          'mint-dark': '#4dd4a8',
          'navy-light': '#4a4d7a',
          'navy-dark': '#1f2147',
        },
        'glass': {
          'white': 'rgba(255, 255, 255, 0.9)',
          'light': 'rgba(255, 255, 255, 0.7)',
          'dark': 'rgba(45, 47, 99, 0.1)',
        },
        'gradient': {
          'primary': 'linear-gradient(135deg, #77e1c0 0%, #2d2f63 100%)',
          'secondary': 'linear-gradient(135deg, #a8f0d9 0%, #4dd4a8 100%)',
          'accent': 'linear-gradient(135deg, #4a4d7a 0%, #2d2f63 100%)',
        },
      },
      fontSize: {
        // Optimized for readability and hierarchy
        'xs': ['12px', { lineHeight: '16px', letterSpacing: '0.025em', fontWeight: '400' }],
        'sm': ['14px', { lineHeight: '20px', letterSpacing: '0.025em', fontWeight: '400' }],
        'base': ['16px', { lineHeight: '24px', letterSpacing: '0', fontWeight: '400' }],
        'lg': ['18px', { lineHeight: '28px', letterSpacing: '-0.025em', fontWeight: '500' }],
        'xl': ['20px', { lineHeight: '28px', letterSpacing: '-0.025em', fontWeight: '500' }],
        '2xl': ['24px', { lineHeight: '32px', letterSpacing: '-0.025em', fontWeight: '600' }],
        '3xl': ['30px', { lineHeight: '36px', letterSpacing: '-0.025em', fontWeight: '600' }],
        '4xl': ['36px', { lineHeight: '40px', letterSpacing: '-0.025em', fontWeight: '700' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '20px',
        '3xl': '24px',
        '4xl': '32px',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'large': '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        'glow': '0 0 20px rgba(14, 165, 233, 0.15)',
        'health': '0 4px 20px rgba(16, 185, 129, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'gradient-shift': 'gradientShift 8s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(119, 225, 192, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(119, 225, 192, 0.6)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
};