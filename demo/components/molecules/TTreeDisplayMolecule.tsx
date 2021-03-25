import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { TNode, tnodeToString } from 'react-native-render-html';
import TextNucleon from '../nucleons/TextNucleon';

export default function TTreeDisplayMolecule({
  ttree,
  style
}: {
  ttree?: TNode;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={style}>
      <TextNucleon mono fontSize="small">
        {ttree && tnodeToString(ttree)}
      </TextNucleon>
    </View>
  );
}
