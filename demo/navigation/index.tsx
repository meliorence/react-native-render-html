import * as React from 'react';
import {
  NavigationContainer,
  DefaultTheme as NavLightTheme,
  DarkTheme as NavDarkTheme
} from '@react-navigation/native';
import { ColorSchemeName, View } from 'react-native';
import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperLightTheme
} from 'react-native-paper';
import merge from 'deepmerge';
import RootNavigator from './RootNavigator';

const CombinedLightTheme = merge(PaperLightTheme, NavLightTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavDarkTheme);

export default function Navigation({
  colorScheme
}: {
  colorScheme: ColorSchemeName;
}) {
  const theme = colorScheme === 'dark' ? CombinedDarkTheme : CombinedLightTheme;
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <PaperProvider theme={theme}>
        <NavigationContainer
          // linking={LinkingConfiguration}
          theme={theme}>
          <RootNavigator />
        </NavigationContainer>
      </PaperProvider>
    </View>
  );
}
