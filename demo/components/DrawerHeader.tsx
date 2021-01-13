import * as React from 'react';
import { DrawerHeaderProps } from '@react-navigation/drawer/lib/typescript/src/types';
import { Appbar, Divider, Menu } from 'react-native-paper';
import {
  useToggleLegacyMode,
  useLegacyMode,
  useSelectedHTML,
  useSelectedSnippetId
} from '../state/store';
import { useComponentColors } from '../state/ThemeProvider';
import filteredSnippets from '../snippets';
import { Linking, Platform } from 'react-native';
import { MONO } from './MonoText';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
  const snippetId = useSelectedSnippetId();
  const [menuVisible, setMenuVisible] = React.useState(false);
  const snippetSource = filteredSnippets[snippetId].codeSource;
  const sourceURL = `https://github.com/meliorence/react-native-render-html/tree/dev/foundry${snippetSource}#L1`;

  const onMenuPress = React.useCallback(
    () => (navigation as any).openDrawer(),
    [navigation]
  );
  const {
    navHeader: { backgroundColor, tintColor }
  } = useComponentColors();
  const makeOnPress = (fn?: () => void) => {
    return () => {
      setMenuVisible(false);
      fn?.call(null);
    };
  };
  return (
    <Appbar.Header style={{ backgroundColor }}>
      <Action icon="menu" onPress={onMenuPress} />
      <Appbar.Content
        subtitle={`(${legacyMode ? 'L' : 'F'}) ${snippetSource}`}
        subtitleStyle={{ fontFamily: MONO }}
        color={tintColor}
        title={options.title}
      />
      <Menu
        visible={menuVisible}
        onDismiss={makeOnPress()}
        anchor={
          <Action
            icon={Platform.select({
              ios: 'dots-horizontal',
              default: 'dots-vertical'
            })}
            onPress={() => setMenuVisible(true)}
          />
        }>
        <Menu.Item
          icon="xml"
          disabled={!html}
          onPress={makeOnPress(() => navigation.navigate('source'))}
          title="Show HTML"
        />
        <Menu.Item
          icon="file-tree"
          onPress={makeOnPress(() => navigation.navigate('ttree'))}
          title="Show tree"
        />
        <Menu.Item
          icon="open-in-new"
          onPress={makeOnPress(() => Linking.openURL(sourceURL))}
          title="Open code"
        />
        <Divider />
        <Menu.Item
          icon={(props) => (
            <MaterialCommunityIcons
              name={legacyMode ? 'alpha-f-circle' : 'alpha-l-circle'}
              {...props}
              style={{ alignSelf: 'flex-start', marginLeft: 2 }}
            />
          )}
          onPress={makeOnPress(toggleUseLegacy)}
          title={`Enable ${legacyMode ? 'foundry' : 'legacy'}`}
        />
      </Menu>
    </Appbar.Header>
  );
}

export default DrawerHeader;
