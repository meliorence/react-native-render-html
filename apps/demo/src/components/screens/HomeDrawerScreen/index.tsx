import * as React from 'react';
import {
  createDrawerNavigator,
  DrawerNavigationOptions
} from '@react-navigation/drawer';
import { StackScreenProps } from '@react-navigation/stack';
import CustomDrawerContent from './CustomDrawerContent';
import DrawerPlaygroundHeader from './DrawerPlaygroundHeader';
import useSurfaceBackgroundStyleNucleon from '../../nucleons/useSurfaceBackgroundStyleNucleon';
import { pagesSpecs, PageGroup } from '@doc/pages';
import ArticleTemplate from '../../templates/ArticleTemplate';
import groupBy from './groupBy';
import PlaygroundLists from '../../resources/PlaygroundLists';
import {
  ResourceRouteDefinition,
  ResourceRoute,
  resourceRoutesIndex
} from '../../../nav-model';
import imagesMap from '../../../imagesMap';

interface ResourceRouteNav extends ResourceRouteDefinition {
  component: React.ComponentType<any>;
  header?: DrawerNavigationOptions['header'];
}

const Drawer = createDrawerNavigator<Record<ResourceRoute, {}>>();

const initialRouteName: ResourceRoute = 'root-intro';

interface GroupDefinition {
  groupLabel: string;
  group: string;
  header?: DrawerNavigationOptions['header'];
  routes: Array<ResourceRouteNav>;
}

const specsByGroups = groupBy(
  Object.values(pagesSpecs).sort((a, b) => a.position - b.position),
  'group'
);

const groups: Array<GroupDefinition> = Object.entries(specsByGroups).map(
  ([groupName, pages], groupIndex, groupEntries) => {
    const [_prevGroupName, prevGroupPages] = groupEntries[groupIndex - 1] || [];
    const prevGroupLastPage = prevGroupPages
      ? prevGroupPages?.[prevGroupPages?.length - 1]
      : null;
    const [_nextGroupName, nextGroupPages] = groupEntries[groupIndex + 1] || [];
    const nextGroupFirstPage = nextGroupPages ? nextGroupPages?.[0] : null;
    return {
      group: groupName,
      groupLabel: groupName,
      routes: pages.map<ResourceRouteNav>((page, pageIndex) => ({
        header: () => null,
        component: function Page() {
          const prevPage = pages[pageIndex - 1] || prevGroupLastPage || null;
          const nextPage = pages[pageIndex + 1] || nextGroupFirstPage || null;
          return (
            <ArticleTemplate
              title={page.title}
              groupLabel={groupName}
              description={page.description}
              prevPage={prevPage}
              nextPage={nextPage}
              imageSource={imagesMap[page.id]}>
              {React.createElement(page.component)}
            </ArticleTemplate>
          );
        },
        iconName: page.iconName as any,
        name: `${groupName as PageGroup}-${page.id}` as const,
        title: page.title
      }))
    };
  }
);

const playgroundsGroup: GroupDefinition = {
  groupLabel: 'Playgrounds',
  group: 'playgrounds',
  header: (props) => <DrawerPlaygroundHeader {...props} />,
  routes: [
    {
      ...resourceRoutesIndex['playground-lists'],
      component: PlaygroundLists
    }
  ]
};

function mapGroup({
  routes,
  group,
  groupLabel,
  header: groupHeader
}: GroupDefinition) {
  return routes.map(({ component, iconName, name, header, title }) => (
    <Drawer.Screen
      component={component}
      options={{
        //@ts-ignore
        group,
        groupLabel,
        header: header || groupHeader,
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
      {groups.map(mapGroup)}
      {mapGroup(playgroundsGroup)}
    </Drawer.Navigator>
  );
}
