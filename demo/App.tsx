import { enableScreens } from 'react-native-screens';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';
import ThemeProvider from './state/ThemeProvider';
import ColorSchemeProvider from './state/ColorSchemeProvider';
import { useColorScheme, useWindowDimensions } from 'react-native';
import LinkPressDisplayMolecule from './components/molecules/LinkPressDisplayMolecule';
import { StacksProvider } from '@mobily/stacks';
import contentWidthContextNucleon from './components/nucleons/contentWidthContextNucleon';

enableScreens();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const initialColorScheme = useColorScheme() || 'light';
  const contentWidth = useWindowDimensions().width;
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <contentWidthContextNucleon.Provider value={contentWidth}>
        <StacksProvider spacing={5}>
          <SafeAreaProvider>
            <ColorSchemeProvider initialColorScheme={initialColorScheme}>
              <ThemeProvider>
                <LinkPressDisplayMolecule>
                  <Navigation />
                  <StatusBar style="light" />
                </LinkPressDisplayMolecule>
              </ThemeProvider>
            </ColorSchemeProvider>
          </SafeAreaProvider>
        </StacksProvider>
      </contentWidthContextNucleon.Provider>
    );
  }
}
