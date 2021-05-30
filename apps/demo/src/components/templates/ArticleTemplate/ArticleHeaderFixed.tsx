import { useSpacing } from '@mobily/stacks';
import React from 'react';
import { ImageRequireSource, View } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets
} from 'react-native-safe-area-context';
import UIAppbarActionAtom from '../../UIAppbarActionAtom';
import { useNavigation } from '@react-navigation/core';
import HeaderColorRolesProvider from '../../croles/HeaderColorRolesProvider';

export type ArticleHeaderFixedProps = {
  imageSource: ImageRequireSource;
};

export default function ArticleHeaderFixed({}: ArticleHeaderFixedProps) {
  const navigation = useNavigation();
  const { top: safeTop } = useSafeAreaInsets();
  const onMenuPress = React.useCallback(
    () => (navigation as any).openDrawer(),
    [navigation]
  );
  return (
    <HeaderColorRolesProvider>
      <View
        style={{
          top: 0,
          position: 'absolute',
          height: safeTop,
          width: '100%',
          backgroundColor: 'rgba(0,0,0,0.75)'
        }}
      />
      <SafeAreaView
        style={{
          left: 0,
          right: 0,
          position: 'absolute',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flex: 0,
          marginBottom: useSpacing(4)
        }}>
        <UIAppbarActionAtom
          style={{ backgroundColor: 'black' }}
          icon="menu"
          onPress={onMenuPress}
        />
      </SafeAreaView>
    </HeaderColorRolesProvider>
  );
}
