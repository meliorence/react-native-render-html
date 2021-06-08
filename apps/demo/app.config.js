const version = require('./version').demo;
module.exports = {
  expo: {
    name: 'RNRH Discovery',
    slug: 'react-native-render-html-discovery',
    description:
      'An App to discover React Native Render HTML features and API!',
    version: version,
    primaryColor: '#6767e2',
    orientation: 'default',
    icon: './assets/images/icon.png',
    scheme: 'myapp',
    userInterfaceStyle: 'automatic',
    splash: {
      backgroundColor: '#6767e2'
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true
    },
    web: {
      favicon: './assets/images/favicon.png'
    }
  }
};
