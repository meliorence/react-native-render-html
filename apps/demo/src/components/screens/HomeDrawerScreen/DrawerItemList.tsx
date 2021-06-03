import React from 'react';
import { CommonActions, DrawerActions } from '@react-navigation/native';
import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import UITideAtom from '../../UITideAtom';
import { Stack } from '@mobily/stacks';
import BoxNucleon from '../../nucleons/BoxNucleon';
import { IconNucleonProps } from '../../nucleons/IconNucleon';
import { useColorRoles } from '../../../theme/colorSystem';
import TextRoleNucleon from '../../nucleons/TextRoleNucleon';
import groupBy from './groupBy';

interface ItemDefinition {
  index: number;
  group: string;
  groupLabel: string;
  key: string;
  name: string;
  title: string;
  drawerLabel: string;
  iconName: IconNucleonProps['name'];
}

/**
 * Component that renders the navigation list in the drawer.
 */
export default function DrawerItemList({
  state,
  navigation,
  descriptors
}: DrawerContentComponentProps<any>) {
  const { surface } = useColorRoles();
  //  const buildLink = useLinkBuilder();
  // const routes = state.routes as Array<{ key: string; }>
  const routeDefinitions = state.routes.map(
    ({ key, name }: { key: string; name: string }, index: number) => ({
      ...descriptors[key].options,
      key,
      name,
      index
    })
  ) as Array<ItemDefinition>;
  const renderItem = ({
    key,
    title,
    drawerLabel,
    iconName,
    name,
    index
  }: ItemDefinition) => {
    const focused = index === state.index;
    return (
      <UITideAtom
        key={key}
        title={
          drawerLabel !== undefined
            ? drawerLabel
            : title !== undefined
            ? title
            : name
        }
        leftIconName={iconName}
        active={focused}
        // to={buildLink(route.name, route.params)}
        onPress={() => {
          navigation.dispatch({
            ...(focused
              ? DrawerActions.closeDrawer()
              : CommonActions.navigate(name)),
            target: state.key
          });
        }}
      />
    );
  };
  const renderGroup = (name: string, defs: ItemDefinition[]) => {
    return (
      <BoxNucleon key={name}>
        <Stack space={1}>
          {
            <TextRoleNucleon
              color={surface.secondaryContent}
              role="sectionOutline">
              {name === 'root' ? 'Getting Started' : name}
            </TextRoleNucleon>
          }
          {defs.map(renderItem)}
        </Stack>
      </BoxNucleon>
    );
  };
  const groups = groupBy(routeDefinitions, 'group');
  return (
    <BoxNucleon paddingY={1} paddingX={1}>
      <Stack space={4}>
        {Object.entries(groups).map(([name, defs]) => renderGroup(name, defs))}
      </Stack>
    </BoxNucleon>
  );
}
