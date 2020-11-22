import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import RootNavigator from './RootNavigator';
import { useSetSelectedSnippetId } from '../state/store';
import { SnippetId } from '../snippets';
import { useTheme } from '../state/ThemeProvider';

export default function Navigation() {
  const setSelectedSnippet = useSetSelectedSnippetId();
  const theme = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <NavigationContainer
        // linking={LinkingConfiguration}
        onStateChange={(s) => {
          const drawer = s?.routes[0];
          const index = drawer!.state?.index as number;
          const snippet = drawer!.state?.routeNames![index] as SnippetId;
          setSelectedSnippet(snippet);
        }}
        theme={theme}>
        <RootNavigator />
      </NavigationContainer>
    </View>
  );
}
