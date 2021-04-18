import * as React from 'react';
import {
  createDrawerNavigator,
  DrawerNavigationOptions
} from '@react-navigation/drawer';
import { StackScreenProps } from '@react-navigation/stack';
import Lists from '../../playgrounds/Lists';
import CustomDrawerContent from './CustomDrawerContent';
import DrawerPlaygroundHeader from './DrawerPlaygroundHeader';
import useSurfaceBackgroundStyleNucleon from '../../nucleons/useSurfaceBackgroundStyleNucleon';
import { IconNucleonProps } from '../../nucleons/IconNucleon';
import Images from '../../features/Images';
import Architecture from '../../concepts/Architecture';
import Css from '../../concepts/Css';
import Html from '../../concepts/Html';
import Tre from '../../concepts/Tre';

type RouteName = string;

const Drawer = createDrawerNavigator<Record<RouteName, {}>>();
const initialRouteName = 'Images';

interface GroupDefinition {
  groupLabel: string;
  group: string;
  header: DrawerNavigationOptions['header'];
  routes: Array<{
    title: string;
    name: string;
    iconName: IconNucleonProps['name'];
    component: React.ComponentType<any>;
  }>;
}

const concepts: GroupDefinition = {
  groupLabel: 'Concepts',
  group: 'concepts',
  header: (props) => <DrawerPlaygroundHeader {...props} />,
  routes: [
    {
      title: 'Architecture',
      name: 'Architecture',
      iconName: 'atom',
      component: Architecture
    },
    {
      title: 'HTML Processing',
      name: 'HTMLProcessing',
      iconName: 'language-html5',
      component: Html
    },
    {
      title: 'Transient Render Engine',
      name: 'TRE',
      iconName: 'file-tree',
      component: Tre
    },
    {
      title: 'CSS Processing',
      name: 'CSSProcessing',
      iconName: 'language-css3',
      component: Css
    }
  ]
};

const playgrounds: GroupDefinition = {
  groupLabel: 'Playgrounds',
  group: 'playgrounds',
  header: (props) => <DrawerPlaygroundHeader {...props} />,
  routes: [
    {
      title: 'Lists Playground',
      name: 'ListsPlayground',
      iconName: 'format-list-bulleted-square',
      component: Lists
    }
  ]
};

const features: GroupDefinition = {
  groupLabel: 'Content',
  group: 'content',
  header: (props) => <DrawerPlaygroundHeader {...props} />,
  routes: [
    {
      title: 'Images',
      name: 'Images',
      component: Images,
      iconName: 'image-album'
    }
  ]
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
      {mapGroup(concepts)}
      {mapGroup(features)}
      {mapGroup(playgrounds)}
    </Drawer.Navigator>
  );
}
