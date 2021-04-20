import * as React from 'react';
import {
  createDrawerNavigator,
  DrawerNavigationOptions
} from '@react-navigation/drawer';
import { StackScreenProps } from '@react-navigation/stack';
import CustomDrawerContent from './CustomDrawerContent';
import DrawerPlaygroundHeader from './DrawerPlaygroundHeader';
import useSurfaceBackgroundStyleNucleon from '../../nucleons/useSurfaceBackgroundStyleNucleon';
import resources, { ResourceRouteDefinition } from '../../../resources';

type RouteName = string;

const Drawer = createDrawerNavigator<Record<RouteName, {}>>();
const initialRouteName = 'Architecture';

interface GroupDefinition {
  groupLabel: string;
  group: string;
  header: DrawerNavigationOptions['header'];
  routes: Array<ResourceRouteDefinition>;
}

const conceptsGroup: GroupDefinition = {
  groupLabel: 'Concepts',
  group: 'concepts',
  header: (props) => <DrawerPlaygroundHeader {...props} />,
  routes: [
    resources.ConceptArchitecture,
    resources.ConceptHTMLProcessing,
    resources.ConceptTRE,
    resources.ConceptCSSProcessing
  ]
};

const playgroundsGroup: GroupDefinition = {
  groupLabel: 'Playgrounds',
  group: 'playgrounds',
  header: (props) => <DrawerPlaygroundHeader {...props} />,
  routes: [resources.PlaygroundLists]
};

const contentGroup: GroupDefinition = {
  groupLabel: 'Content',
  group: 'content',
  header: (props) => <DrawerPlaygroundHeader {...props} />,
  routes: [resources.ContentImages]
};

function mapGroup({ routes, group, groupLabel, header }: GroupDefinition) {
  return routes.map(({ component, iconName, name, title }) => (
    <Drawer.Screen
      component={component}
      options={{
        //@ts-ignore
        group,
        groupLabel,
        header,
        title,
        headerShown: true,
        iconName
      }}
      key={name}
      name={name}
    />
  ));
}

export default function HomeScreen({}: StackScreenProps<any>) {
  return (
    <Drawer.Navigator
      hideStatusBar={false}
      sceneContainerStyle={useSurfaceBackgroundStyleNucleon()}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      initialRouteName={initialRouteName}
      screenOptions={{
        headerShown: true,
        headerTitleAllowFontScaling: true
      }}>
      {mapGroup(conceptsGroup)}
      {mapGroup(contentGroup)}
      {mapGroup(playgroundsGroup)}
    </Drawer.Navigator>
  );
}
