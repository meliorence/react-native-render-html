import React, { ComponentProps, PropsWithChildren, useMemo } from 'react';
import { Appbar } from 'react-native-paper';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColorRoles } from '../theme/colorSystem';
import HeaderColorRolesProvider from './croles/HeaderColorRolesProvider';

type AppbarHeaderProps = ComponentProps<typeof Appbar.Header>;

function AppbarHeader(props: AppbarHeaderProps) {
  const { surface, statusBarBackground } = useColorRoles();
  const { top } = useSafeAreaInsets();
  const appbarStyles = useMemo(
    () => [props.style, { backgroundColor: surface.background }],
    [surface.background, props.style]
  );
  return (
    <View>
      <View
        style={{
          height: top,
          flexGrow: 1,
          backgroundColor: statusBarBackground
        }}
      />
      <Appbar.Header statusBarHeight={0} {...props} style={appbarStyles} />
    </View>
  );
}

export type UIHeaderAtomProps = PropsWithChildren<AppbarHeaderProps>;

export default function UIHeaderAtom(appbarProps: UIHeaderAtomProps) {
  return (
    <HeaderColorRolesProvider>
      <AppbarHeader {...appbarProps} />
    </HeaderColorRolesProvider>
  );
}
