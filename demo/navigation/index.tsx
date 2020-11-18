import * as React from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useNavigation
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { ColorSchemeName } from 'react-native';
import { Appbar } from 'react-native-paper';
import snippets from './snippets';
import Snippet from './Snippet';
import SourceRenderer from '../components/SourceRenderer';

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

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator<Record<keyof typeof snippets, any>>();

function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="home">
      <Stack.Screen name="home" options={{ headerShown: false }}>
        {({ navigation }) => (
          <Drawer.Navigator
            initialRouteName={'test'}
            hideStatusBar={false}
            screenOptions={{ headerShown: false }}>
            {Object.keys(snippets).map((snippetId) => {
              return (
                <Drawer.Screen
                  options={{
                    title: snippets[snippetId].name,
                    headerShown: true,
                    headerRight: ({ tintColor }) => (
                      <Appbar.Action
                        icon="xml"
                        onPress={() =>
                          navigation.navigate(
                            'source',
                            snippets[snippetId].html as any
                          )
                        }
                      />
                    )
                  }}
                  key={snippets[snippetId].name}
                  name={snippets[snippetId].name}>
                  {() => <Snippet exampleId={snippetId} />}
                </Drawer.Screen>
              );
            })}
          </Drawer.Navigator>
        )}
      </Stack.Screen>
      <Stack.Screen name="source" component={SourceRenderer} />
    </Stack.Navigator>
  );
}
