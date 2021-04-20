import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { TNode, tnodeToString } from 'react-native-render-html';
import TextRoleNucleon from './nucleons/TextRoleNucleon';

export default function UITTreeDisplayMolecule({
  ttree,
  style
}: {
  ttree?: TNode;
  style?: StyleProp<ViewStyle>;
}) {
  const lines = ((ttree && tnodeToString(ttree)) || '').split('\n');
  return (
    <View style={style}>
      {lines.map((t, i) => (
        <TextRoleNucleon role="source" key={i} numberOfLines={1}>
          {t}
        </TextRoleNucleon>
      ))}
    </View>
  );
}
