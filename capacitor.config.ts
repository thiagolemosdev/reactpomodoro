import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.cosmicfocus.app',
  appName: 'CosmicFocus',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#020209',
      androidSplashResourceName: 'splash',
      showSpinner: false,
    },
  },
  android: {
    backgroundColor: '#020209',
  },
}

export default config
