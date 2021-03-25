/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { TextStyle, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// @ts-ignore
import version from '../../version';
import TextNucleon from '../nucleons/TextNucleon';

const monoStyle: TextStyle = {
  fontSize: 10,
  textAlign: 'left'
};

export default function VersionDisplayMolecule() {
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
      <TextNucleon mono style={monoStyle}>
        Foundry Playground {version.demo}
      </TextNucleon>
      <TextNucleon mono style={monoStyle}>
        react-native-render-html {version.lib}
      </TextNucleon>
    </View>
  );
}
