import * as React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions
} from '@react-navigation/stack';
import HomeScreen from '../components/screens/HomeDrawerScreen';
import StackHeader from './StackHeader';
import useSurfaceBackgroundStyleNucleon from '../components/nucleons/useSurfaceBackgroundStyleNucleon';

const Stack = createStackNavigator();

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
    <Stack.Navigator screenOptions={screenOptions} initialRouteName="home">
      <Stack.Screen
        name="home"
        options={{ headerShown: false }}
        component={HomeScreen}
      />
    </Stack.Navigator>
  );
}
