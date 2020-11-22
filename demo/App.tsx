import { enableScreens } from 'react-native-screens';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';
import ThemeProvider from './state/ThemeProvider';
import ColorSchemeProvider from './state/ColorSchemeProvider';
import { useColorScheme } from 'react-native';

enableScreens();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const initialColorScheme = useColorScheme() || 'light';
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ColorSchemeProvider initialColorScheme={initialColorScheme}>
          <ThemeProvider>
            <Navigation />
            <StatusBar style="light" />
          </ThemeProvider>
        </ColorSchemeProvider>
      </SafeAreaProvider>
    );
  }
}
