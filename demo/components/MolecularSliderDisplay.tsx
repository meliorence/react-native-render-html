import { Column, Columns } from '@mobily/stacks';
import React from 'react';
import { StyleSheet } from 'react-native';
import AtomicSlider, { AtomicSliderProp } from './AtomicSlider';
import AtomicText from './AtomicText';

const DISPLAY_WIDTH = 50;

const styles = StyleSheet.create({
  displayValue: {
    flexBasis: DISPLAY_WIDTH,
    alignItems: 'flex-end'
  }
});

export default function MolecularSliderDisplay({
  style,
  ...props
}: AtomicSliderProp) {
  return (
    <Columns space={3} alignY="center" style={style}>
      <Column width={'content'}>
        <AtomicSlider {...props} width={props.width - DISPLAY_WIDTH} />
      </Column>
      <Column style={styles.displayValue}>
        <AtomicText>{props.value?.toFixed(1)}</AtomicText>
      </Column>
    </Columns>
  );
}
