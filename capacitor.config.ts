import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.dogswab.app',
  appName: 'DOGSWAB',
  webDir: 'dist',
  bundledWebRuntime: false,
  ios: {
    minVersion: '13.0',
    scheme: 'DOGSWAB'
  },
  android: {
    minVersion: 21,
    compileSdkVersion: 34,
    targetSdkVersion: 34
  },
  server: {
    androidScheme: 'https',
    hostname: 'localhost',
    iosScheme: 'capacitor'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#77e1c0",
      showSpinner: false,
      androidSplashResourceName: "splash",
      splashFullScreen: true,
      splashImmersive: true
    },
    StatusBar: {
      style: 'light',
      backgroundColor: "#77e1c0"
    }
  }
};

export default config;