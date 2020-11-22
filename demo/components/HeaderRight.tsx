import * as React from 'react';
import { memo } from 'react';
import { Appbar } from 'react-native-paper';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useToggleLegacyMode } from '../state/ToggleLegacyContext';
import { useLegacyMode } from '../state/LegacyContext';

const HeaderRight = memo(function HeaderRight({ tintColor }: any) {
  const toggleUseLegacy = useToggleLegacyMode();
  const navigation = useNavigation();
  const legacyMode = useLegacyMode();
  return (
    <View
      style={{
        flexDirection: 'row'
      }}>
      <Appbar.Action
        icon="alpha-l-circle"
        color={legacyMode ? 'red' : tintColor}
        style={{ marginHorizontal: 0 }}
        onPress={toggleUseLegacy}
      />
      <Appbar.Action
        icon="xml"
        color={tintColor}
        style={{ marginHorizontal: 0 }}
        onPress={() => navigation.navigate('source')}
      />
      <Appbar.Action
        icon="file-tree"
        disabled={legacyMode}
        color={tintColor}
        style={{ marginHorizontal: 0 }}
        onPress={() => navigation.navigate('ttree')}
      />
    </View>
  );
});

export default HeaderRight;
