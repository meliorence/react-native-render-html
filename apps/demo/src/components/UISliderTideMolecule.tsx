import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import UITideAtom, { TideAtomProps } from './UITideAtom';
import SliderControlAtom, {
  SliderControlAtomProps
} from './UISliderControlAtom';
import TextRoleNucleon from './nucleons/TextRoleNucleon';
import { useColorRoles } from '../theme/colorSystem';
import { useSpacing } from '@mobily/stacks';

export type UISliderTideMoleculeProps = Omit<
  SliderControlAtomProps,
  'width' | 'style'
> & {
  style?: StyleProp<ViewStyle>;
  leftIconName: TideAtomProps['leftIconName'];
  label: string;
};

export default function UISliderTideMolecule({
  style,
  label,
  leftIconName,
  ...sliderProps
}: UISliderTideMoleculeProps) {
  const { surface } = useColorRoles();
  const padding = useSpacing(2);
  const right = ({ width }: { width: number }) => (
    <View
      style={{
        borderColor: surface.secondaryContent,
        borderWidth: StyleSheet.hairlineWidth,
        borderTopLeftRadius: padding,
        borderBottomRightRadius: padding,
        padding,
        width
      }}>
      <TextRoleNucleon role="uiMono" align="end">
        {sliderProps.value?.toFixed(1)}
      </TextRoleNucleon>
    </View>
  );
  const bottom = () => <SliderControlAtom {...sliderProps} />;
  return (
    <UITideAtom
      style={style}
      leftIconName={leftIconName}
      title={label}
      right={right}
      bottom={bottom}
    />
  );
}
