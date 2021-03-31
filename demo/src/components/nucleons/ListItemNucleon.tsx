import React, { ComponentProps, PropsWithChildren, useCallback } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { List } from 'react-native-paper';
import GestureHandlerAdapterNucleon from './GestureHandlerAdapterNucleon';

export type ListItemNucleonProps = PropsWithChildren<
  Omit<ComponentProps<typeof List.Item>, 'left' | 'description'> & {
    leftIconName: ComponentProps<typeof MaterialCommunityIcons>['name'];
    rightIconName?: ComponentProps<typeof MaterialCommunityIcons>['name'];
  }
>;

type IconRendererProps = Omit<ComponentProps<typeof List.Icon>, 'icon'>;

export default function ListItemNucleon({
  leftIconName,
  rightIconName,
  right,
  children,
  ...listProps
}: ListItemNucleonProps) {
  const left = useCallback(
    (lp: IconRendererProps) => <List.Icon {...lp} icon={leftIconName} />,
    [leftIconName]
  );
  const syntheticRight = useCallback(
    (rp: IconRendererProps) =>
      rightIconName && <List.Icon {...rp} icon={rightIconName} />,
    [rightIconName]
  );
  return (
    <GestureHandlerAdapterNucleon onPress={listProps.onPress}>
      <List.Item
        {...listProps}
        description={children}
        left={left}
        right={right || syntheticRight}
      />
    </GestureHandlerAdapterNucleon>
  );
}
