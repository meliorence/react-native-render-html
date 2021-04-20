import { enableScreens } from 'react-native-screens';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './src/hooks/useCachedResources';
import Navigation from './src/navigation';
import ThemeProvider from './src/theme/ThemeProvider';
import ColorSchemeProvider from './src/state/ColorSchemeProvider';
import { useColorScheme, useWindowDimensions } from 'react-native';
import UILinkPressDisplayMolecule from './src/components/UILinkPressDisplayMolecule';
import { StacksProvider } from '@mobily/stacks';
import contentWidthContextNucleon from './src/components/nucleons/contentWidthContextNucleon';
import PageToolkitProvider from './src/providers/PageToolkitProvider';

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
        <PageToolkitProvider>
          <StacksProvider spacing={5}>
            <SafeAreaProvider>
              <ColorSchemeProvider initialColorScheme={initialColorScheme}>
                <ThemeProvider>
                  <UILinkPressDisplayMolecule>
                    <Navigation />
                    <StatusBar style="light" />
                  </UILinkPressDisplayMolecule>
                </ThemeProvider>
              </ColorSchemeProvider>
            </SafeAreaProvider>
          </StacksProvider>
        </PageToolkitProvider>
      </contentWidthContextNucleon.Provider>
    );
  }
}
