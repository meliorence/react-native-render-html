import { PageId, PageGroup, pagesSpecs } from '@doc/pages';
import type { MaterialCommunityIcons } from '@expo/vector-icons';
import { ComponentProps } from 'react';

export type IconName = ComponentProps<typeof MaterialCommunityIcons>['name'];

export type PageRoute = `${PageGroup}-${PageId}`;
export type PlaygroundRoute = 'playground-lists';
export type ResourceRoute = PageRoute | PlaygroundRoute;

export interface ResourceRouteDefinition {
  title: string;
  name: ResourceRoute;
  iconName: IconName;
}

const pagesIndex: Record<
  PageRoute,
  ResourceRouteDefinition
> = Object.fromEntries(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Object.entries(pagesSpecs).map(([_k, s]) => [`${s.group}-${s.id}`, s])
) as any;

const resourceRoutesIndex: Record<ResourceRoute, ResourceRouteDefinition> = {
  ...pagesIndex,
  'playground-lists': {
    title: 'Lists Playground',
    name: 'playground-lists',
    iconName: 'format-list-bulleted-square'
  }
};

export { resourceRoutesIndex };
