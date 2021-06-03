import React, { useMemo } from 'react';
import { LogBox, View } from 'react-native';
import {
  StackHeaderProps,
  StackNavigationOptions,
  TransitionPresets
} from '@react-navigation/stack';
import SheetRouteHome from './SheetRouteHome';
import SheetStack from './SheetStack';
import SheetRouteControls from './SheetRouteControls';
import SheetSourceRoute from './SheetRouteSource';
import SheetRouteFontFamily from './SheetRouteFontFamily';
import SheetRouteOlListType from './SheetRouteOlListType';
import SheetRouteUlListType from './SheetRouteUlListType';
import useSurfaceBackgroundStyleNucleon from '../../nucleons/useSurfaceBackgroundStyleNucleon';
import SheetRouteColor from './SheetRouteColor';
import UIAppbarActionAtom from '../../UIAppbarActionAtom';
import { useColorRoles } from '../../../theme/colorSystem';
import TextRoleNucleon from '../../nucleons/TextRoleNucleon';

LogBox.ignoreLogs([
  "Accessing the 'state' property of the 'route' object is not supported."
]);

const homeOptions = { header: () => null };

const controlsOptions = { title: 'Play' };
const sourceOptions = { title: 'HTML Source' };

function PlaygroundSlimHeader({ navigation, ...otherProps }: StackHeaderProps) {
  const { sheetHandle } = useColorRoles();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: sheetHandle.background
      }}>
      <UIAppbarActionAtom
        size={20}
        icon="arrow-left"
        onPress={navigation.goBack}
      />
      <TextRoleNucleon
        role="headerSubtitle"
        children={otherProps.scene.descriptor.options.title}
      />
    </View>
  );
}

export default function SheetNavigator() {
  const contentStyle = useSurfaceBackgroundStyleNucleon();
  const screenOptions: StackNavigationOptions = useMemo(
    () => ({
      ...TransitionPresets.SlideFromRightIOS,
      headerShown: true,
      safeAreaInsets: { top: 0 },
      header: (props) => <PlaygroundSlimHeader {...props} />,
      cardStyle: contentStyle
    }),
    [contentStyle]
  );
  return (
    <SheetStack.Navigator screenOptions={screenOptions} headerMode="screen">
      <SheetStack.Screen
        name="PlaygroundHome"
        options={homeOptions}
        component={SheetRouteHome}
      />
      <SheetStack.Screen
        name="PlaygroundControls"
        options={controlsOptions}
        component={SheetRouteControls}
      />
      <SheetStack.Screen
        name="PlaygroundSource"
        options={sourceOptions}
        component={SheetSourceRoute}
      />
      <SheetStack.Screen
        name="PlaygroundFontFamily"
        options={{ title: 'Font family' }}
        component={SheetRouteFontFamily}
      />
      <SheetStack.Screen
        name="PlaygroundOlListType"
        options={{ title: 'Ol List Type' }}
        component={SheetRouteOlListType}
      />
      <SheetStack.Screen
        name="PlaygroundUlListType"
        options={{ title: 'Ul List Type' }}
        component={SheetRouteUlListType}
      />
      <SheetStack.Screen
        name="PlaygroundColor"
        options={{ title: 'Color' }}
        component={SheetRouteColor}
      />
    </SheetStack.Navigator>
  );
}
