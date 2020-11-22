import * as React from 'react';
import { DrawerHeaderProps } from '@react-navigation/drawer/lib/typescript/src/types';
import { Appbar } from 'react-native-paper';
import {
  useToggleLegacyMode,
  useLegacyMode,
  useSelectedHTML
} from '../state/store';
import { useComponentColors } from '../state/ThemeProvider';

function Action({
  selected,
  ...props
}: React.ComponentProps<typeof Appbar.Action> & { selected?: boolean }) {
  const {
    navHeader: { tintColor, selectColor }
  } = useComponentColors();
  return (
    <Appbar.Action color={selected ? selectColor : tintColor} {...props} />
  );
}

function DrawerHeader({ scene }: DrawerHeaderProps) {
  const {
    descriptor: { navigation, options }
  } = scene;
  const toggleUseLegacy = useToggleLegacyMode();
  const legacyMode = useLegacyMode();
  const html = useSelectedHTML();
  const onMenuPress = React.useCallback(
    () => (navigation as any).openDrawer(),
    [navigation]
  );
  const {
    navHeader: { backgroundColor, tintColor }
  } = useComponentColors();
  return (
    <Appbar.Header style={{ backgroundColor }}>
      <Action icon="menu" onPress={onMenuPress} />
      <Appbar.Content color={tintColor} title={options.title} />
      <Action
        icon="alpha-l-circle"
        selected={legacyMode}
        onPress={toggleUseLegacy}
      />
      <Action
        icon="xml"
        disabled={typeof html !== 'string'}
        onPress={() => navigation.navigate('source')}
      />
      <Action
        icon="file-tree"
        disabled={legacyMode}
        onPress={() => navigation.navigate('ttree')}
      />
    </Appbar.Header>
  );
}

export default DrawerHeader;
