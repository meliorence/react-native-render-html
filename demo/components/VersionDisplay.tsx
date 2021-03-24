/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { TextStyle, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// @ts-ignore
import version from '../version';
import AtomicText from './AtomicText';

const monoStyle: TextStyle = {
  fontSize: 10,
  textAlign: 'left'
};

export default function VersionDisplay() {
  const { bottom, left, right } = useSafeAreaInsets();
  return (
    <View
      style={{
        alignSelf: 'stretch',
        marginBottom: bottom,
        marginLeft: left,
        marginRight: right,
        padding: 10
      }}>
      <AtomicText mono style={monoStyle}>
        Foundry Playground {version.demo}
      </AtomicText>
      <AtomicText mono style={monoStyle}>
        react-native-render-html {version.lib}
      </AtomicText>
    </View>
  );
}
