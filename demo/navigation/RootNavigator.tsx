import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Snackbar } from 'react-native-paper';
import SourceScreen from '../screens/SourceScreen';
import TTreeScreen from '../screens/TTreeScreen';
import HomeScreen from '../screens/HomeDrawerScreen';
import { useLegacyMode } from '../state/store';
import { useComponentColors } from '../state/ThemeProvider';
import { View } from 'react-native';

const Stack = createStackNavigator();

function LegacySnackbar() {
  const legacyMode = useLegacyMode();
  const {
    snackbar: { backgroundColor }
  } = useComponentColors();
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);
  React.useEffect(() => {
    setSnackbarVisible(true);
    const timeout = setTimeout(() => setSnackbarVisible(false), 2500);
    return () => clearTimeout(timeout);
  }, [legacyMode]);
  return (
    //@ts-ignore
    <Snackbar
      collapsable
      visible={snackbarVisible}
      style={{ backgroundColor }}
      onDismiss={() => setSnackbarVisible(false)}>
      {legacyMode ? 'Legacy (v5.x) enabled.' : 'Foundry (v6.x) enabled'}
    </Snackbar>
  );
}

export default function RootNavigator() {
  const {
    navHeader: { backgroundColor, tintColor }
  } = useComponentColors();
  const headerBackground = React.useCallback(
    () => <View style={{ backgroundColor, flex: 1 }} />,
    [backgroundColor]
  );
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: tintColor,
          headerBackground
        }}
        initialRouteName="home">
        <Stack.Screen
          name="home"
          options={{ headerShown: false }}
          component={HomeScreen}
        />
        <Stack.Screen
          name="source"
          options={{ title: 'HTML Source' }}
          component={SourceScreen}
        />
        <Stack.Screen
          name="ttree"
          options={{ title: 'Transient Render Tree' }}
          component={TTreeScreen}
        />
      </Stack.Navigator>
      <LegacySnackbar />
    </>
  );
}
