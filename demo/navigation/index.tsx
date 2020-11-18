import * as React from 'react';
import {
  NavigationContainer,
  DefaultTheme as NavLightTheme,
  DarkTheme as NavDarkTheme,
  useTheme
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { ColorSchemeName, View } from 'react-native';
import { Appbar, Snackbar } from 'react-native-paper';
import snippets from './snippets';
import Snippet from './Snippet';
import SourceRenderer from '../components/SourceRenderer';
import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperLightTheme
} from 'react-native-paper';
import merge from 'deepmerge';

const CombinedLightTheme = merge(PaperLightTheme, NavLightTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavDarkTheme);

export default function Navigation({
  colorScheme
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <PaperProvider
      theme={colorScheme === 'dark' ? CombinedDarkTheme : CombinedLightTheme}>
      <NavigationContainer
        // linking={LinkingConfiguration}
        theme={colorScheme === 'dark' ? CombinedDarkTheme : CombinedLightTheme}>
        <RootNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator<Record<keyof typeof snippets, any>>();

function RootNavigator() {
  const [useLegacy, setUseLegacy] = React.useState(false);
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);
  const theme = useTheme();
  React.useEffect(() => {
    setSnackbarVisible(true);
    const timeout = setTimeout(() => setSnackbarVisible(false), 2500);
    return () => clearTimeout(timeout);
  }, [useLegacy]);
  return (
    <>
      <Stack.Navigator initialRouteName="home">
        <Stack.Screen name="home" options={{ headerShown: false }}>
          {({ navigation }) => (
            <Drawer.Navigator
              initialRouteName={'test'}
              hideStatusBar={false}
              screenOptions={{
                headerTintColor: theme.colors.text,
                headerShown: true
              }}>
              {Object.keys(snippets).map((snippetId) => {
                return (
                  <Drawer.Screen
                    options={{
                      title: snippets[snippetId].name,
                      headerRight: ({ tintColor }) => (
                        <View style={{ flexDirection: 'row' }}>
                          <Appbar.Action
                            icon="alpha-l-circle"
                            color={useLegacy ? 'red' : tintColor}
                            onPress={() => setUseLegacy((l) => !l)}
                          />
                          <Appbar.Action
                            icon="xml"
                            color={tintColor}
                            onPress={() =>
                              navigation.navigate(
                                'source',
                                snippets[snippetId].html as any
                              )
                            }
                          />
                        </View>
                      )
                    }}
                    key={snippets[snippetId].name}
                    name={snippets[snippetId].name}>
                    {() => (
                      <Snippet useLegacy={useLegacy} exampleId={snippetId} />
                    )}
                  </Drawer.Screen>
                );
              })}
            </Drawer.Navigator>
          )}
        </Stack.Screen>
        <Stack.Screen
          name="source"
          options={{  }}
          component={SourceRenderer}
        />
      </Stack.Navigator>
      <Snackbar visible={snackbarVisible} onDismiss={() => void 0}>
        {useLegacy ? 'Legacy (v5.x) enabled.' : 'Foundry (v6.x) enabled'}
      </Snackbar>
    </>
  );
}
