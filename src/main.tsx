import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import App from './App.tsx';
import './index.css';

// Check if we're in StackBlitz environment
const isStackBlitz = window.location.hostname.includes('stackblitz') || 
                     window.location.hostname.includes('webcontainer');

// Initialize Capacitor for mobile
if (Capacitor.isNativePlatform()) {
  console.log('Running on mobile platform:', Capacitor.getPlatform());
  
  // Configure status bar for mobile
  StatusBar.setStyle({ style: Style.Light });
  StatusBar.setBackgroundColor({ color: '#77e1c0' });
  
  // Hide splash screen after app loads
  SplashScreen.hide();
  
  // Prevent zoom on iOS
  document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
  });
  
  // Prevent context menu on long press
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
  });
  
  // Handle safe areas
  document.documentElement.style.setProperty('--safe-area-inset-top', 'env(safe-area-inset-top)');
  document.documentElement.style.setProperty('--safe-area-inset-bottom', 'env(safe-area-inset-bottom)');
  document.documentElement.style.setProperty('--safe-area-inset-left', 'env(safe-area-inset-left)');
  document.documentElement.style.setProperty('--safe-area-inset-right', 'env(safe-area-inset-right)');
} else if (isStackBlitz) {
  console.log('Service Worker registration skipped in StackBlitz environment');
}

// Initialize app-wide settings
document.addEventListener('DOMContentLoaded', () => {
  // Request notification permissions
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }
  
  // Set up service worker for PWA features
  if ('serviceWorker' in navigator && !isStackBlitz) {
    navigator.serviceWorker.register('/sw.js').catch(console.error);
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

if ('serviceWorker' in navigator && !isStackBlitz) {
}