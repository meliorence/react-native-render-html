/* eslint-disable react-native/no-inline-styles */
import { Stack } from '@mobily/stacks';
import React from 'react';
import * as ReactNative from 'react-native';
import { useColorRoles } from '../theme/colorSystem';
import BodyDividerAtom from './BodyDividerAtom';
import BodyParagraphAtom from './BodyParagraphAtom';
import BoxNucleon, { BoxNucleonProps } from './nucleons/BoxNucleon';
import IconNucleon from './nucleons/IconNucleon';

export default function BodyTipBoxAtom({
  children,
  ...props
}: BoxNucleonProps) {
  const { surface, tipColor } = useColorRoles();
  const dividerHeight = ReactNative.StyleSheet.hairlineWidth;
  const contentColor = useColorRoles().surface.secondaryContent;
  const renderDivider = () => (
    <BoxNucleon paddingX={2}>
      <BodyDividerAtom height={dividerHeight} color={tipColor} />
    </BoxNucleon>
  );
  return (
    <BoxNucleon {...props} style={[props.style]}>
      <Stack space={1}>
        {renderDivider()}
        <BoxNucleon
          style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}>
          <BoxNucleon
            style={{
              flexGrow: 1,
              flexShrink: 1,
              alignSelf: 'stretch',
              justifyContent: 'center'
            }}>
            <BodyParagraphAtom color={contentColor}>
              {children}
            </BodyParagraphAtom>
          </BoxNucleon>
          <BoxNucleon padding={2} backgroundColor={surface.background}>
            <IconNucleon
              color={tipColor}
              name="lightbulb-on-outline"
              size={16}
            />
          </BoxNucleon>
        </BoxNucleon>
        {renderDivider()}
      </Stack>
    </BoxNucleon>
  );
}
