import * as React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions
} from '@react-navigation/stack';
import HomeScreen from '../components/screens/HomeDrawerScreen';
import { useLegacyMode } from '../state/store';
import StackHeader from './StackHeader';
import UISnackbarAtom from '../components/UISnackbarAtom';
import useSurfaceBackgroundStyleNucleon from '../components/nucleons/useSurfaceBackgroundStyleNucleon';

const Stack = createStackNavigator();

function LegacySnackbar() {
  const legacyMode = useLegacyMode();
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);
  React.useEffect(() => {
    setSnackbarVisible(true);
    const timeout = setTimeout(() => setSnackbarVisible(false), 2500);
    return () => clearTimeout(timeout);
  }, [legacyMode]);
  return (
    <UISnackbarAtom
      collapsable
      visible={snackbarVisible}
      onDismiss={() => setSnackbarVisible(false)}>
      {legacyMode ? 'Legacy (v5.x) enabled.' : 'Foundry (v6.x) enabled'}
    </UISnackbarAtom>
  );
}

export default function RootNavigator() {
  const cardStyle = useSurfaceBackgroundStyleNucleon();
  const screenOptions = React.useMemo<StackNavigationOptions>(
    () => ({
      animationTypeForReplace: 'pop',
      animationEnabled: false,
      header: (props) => <StackHeader {...props} />,
      cardStyle: cardStyle
    }),
    [cardStyle]
  );
  return (
    <>
      <Stack.Navigator screenOptions={screenOptions} initialRouteName="home">
        <Stack.Screen
          name="home"
          options={{ headerShown: false }}
          component={HomeScreen}
        />
      </Stack.Navigator>
      <LegacySnackbar />
    </>
  );
}
