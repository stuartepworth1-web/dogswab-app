import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.dogswab.app',
  appName: 'DOGSWAB',
  webDir: 'dist',
  version: '1.0.3',
  server: {
    androidScheme: 'https',
    iosScheme: 'capacitor',
    hostname: 'localhost'
  },
  plugins: {
    App: {
      launchUrl: 'capacitor://localhost',
      launchAutoHide: true
    },
    Camera: {
      permissions: ['camera', 'photos']
    },
    LocalNotifications: {
      smallIcon: 'ic_stat_icon_config_sample',
      iconColor: '#77e1c0',
      sound: 'beep.wav'
    },
    Device: {
      permissions: []
    },
    Geolocation: {
      permissions: ['location']
    },
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#77e1c0",
      showSpinner: false,
      spinnerColor: "#2d2f63"
    },
    StatusBar: {
      style: 'default',
      backgroundColor: "#77e1c0"
    }
  }
};

export default config;