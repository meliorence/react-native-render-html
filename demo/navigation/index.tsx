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
import SelectedSnippetContext, {
  defaultSelectedSnippet
} from '../state/SelectedSnippetContext';
import LoadedHTMLContext from '../state/LoadedHTMLContext';

const CombinedLightTheme = merge(PaperLightTheme, NavLightTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavDarkTheme);

export default function Navigation({
  colorScheme
}: {
  colorScheme: ColorSchemeName;
}) {
  const [selectedSnippet, setSelectedSnippet] = React.useState(
    defaultSelectedSnippet
  );
  const [loadedHTML, setLoadedHTML] = React.useState<string | null>(null);
  const theme = colorScheme === 'dark' ? CombinedDarkTheme : CombinedLightTheme;
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <LoadedHTMLContext.Provider
        value={{ html: loadedHTML, setHTML: setLoadedHTML }}>
        <SelectedSnippetContext.Provider value={selectedSnippet}>
          <PaperProvider theme={theme}>
            <NavigationContainer
              onStateChange={(s) => {
                const drawer = s?.routes[0];
                const index = drawer!.state?.index as number;
                setSelectedSnippet(drawer!.state?.routeNames![index] as any);
              }}
              // linking={LinkingConfiguration}
              theme={theme}>
              <RootNavigator />
            </NavigationContainer>
          </PaperProvider>
        </SelectedSnippetContext.Provider>
      </LoadedHTMLContext.Provider>
    </View>
  );
}
