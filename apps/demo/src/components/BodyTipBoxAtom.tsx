/* eslint-disable react-native/no-inline-styles */
import { Stack, useSpacing } from '@mobily/stacks';
import React from 'react';
import * as ReactNative from 'react-native';
import { View } from 'react-native';
import { useColorRoles } from '../theme/colorSystem';
import BodyDividerAtom from './BodyDividerAtom';
import BodyParagraphAtom from './BodyParagraphAtom';
import BoxNucleon, { BoxNucleonProps } from './nucleons/BoxNucleon';
import IconNucleon from './nucleons/IconNucleon';

export default function BodyTipBoxAtom({
  children,
  ...props
}: BoxNucleonProps) {
  const { tipColor } = useColorRoles();
  const dividerHeight = ReactNative.StyleSheet.hairlineWidth;
  const contentColor = useColorRoles().surface.secondaryContent;
  const iconSize = 16;
  const iconPadX = useSpacing(2);
  const renderDivider = () => (
    <BoxNucleon paddingX={2}>
      <BodyDividerAtom height={dividerHeight} color={tipColor} />
    </BoxNucleon>
  );
  return (
    <View {...props} style={props.style}>
      <Stack space={1}>
        {renderDivider()}
        <View
          style={{
            flexDirection: 'row',
            flex: 0,
            alignItems: 'center'
          }}>
          <BodyParagraphAtom
            style={{
              flexGrow: 1,
              flexShrink: 1,
              alignSelf: 'stretch',
              justifyContent: 'center'
            }}
            color={contentColor}>
            {children}
          </BodyParagraphAtom>
          <View style={{ paddingHorizontal: iconPadX }}>
            <IconNucleon
              color={tipColor}
              name="lightbulb-on-outline"
              size={iconSize}
            />
          </View>
        </View>
        {renderDivider()}
      </Stack>
    </View>
  );
}
