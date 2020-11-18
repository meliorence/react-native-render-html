import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import snippets from './snippets';
import Snippet from './Snippet';

export default function Navigation({
  colorScheme
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      // linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Drawer = createDrawerNavigator<Record<keyof typeof snippets, any>>();

function RootNavigator() {
  const snippetPages = Object.keys(snippets).map((snippetId) => {
    return (
      <Drawer.Screen
        key={snippets[snippetId].name}
        name={snippets[snippetId].name}>
        {() => <Snippet exampleId={snippetId} />}
      </Drawer.Screen>
    );
  });
  return (
    <Drawer.Navigator
      initialRouteName={'paragraphs'}
      screenOptions={{ headerShown: false }}>
      {snippetPages}
    </Drawer.Navigator>
  );
}
