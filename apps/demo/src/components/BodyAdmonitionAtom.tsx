/* eslint-disable react-native/no-inline-styles */
import { Stack, useSpacing } from '@mobily/stacks';
import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { useColorRoles } from '../theme/colorSystem';
import BodyParagraphAtom from './BodyParagraphAtom';
import IconNucleon, { IconNucleonProps } from './nucleons/IconNucleon';
import type { AdmonitionType } from '@doc/pages';
import TextRoleNucleon from './nucleons/TextRoleNucleon';
import { BODY_HZ_SPACING } from '../constants';

const admonitionDefaultTitles: Record<AdmonitionType, string> = {
  important: 'Important',
  note: 'Note',
  tip: 'Tip',
  caution: 'Caution',
  warning: 'Admonition'
};

const admonitionIconMap: Record<AdmonitionType, IconNucleonProps['name']> = {
  important: 'information',
  note: 'information',
  tip: 'lightbulb-on-outline',
  caution: 'alert',
  warning: 'alert'
};

export default function BodyAdmonitionAtom({
  children,
  type,
  title = admonitionDefaultTitles[type],
  ...props
}: PropsWithChildren<{
  type: AdmonitionType;
  title?: string;
}>) {
  const { admonition } = useColorRoles();
  const semanticColor = admonition[type];
  const dividerWidth = 6;
  const contentColor = useColorRoles().surface.secondaryContent;
  const iconSize = 22;
  const iconPadX = useSpacing(2);
  return (
    <View {...props}>
      <Stack
        style={{
          borderLeftWidth: dividerWidth,
          borderLeftColor: semanticColor
        }}
        marginX={BODY_HZ_SPACING}
        space={2}>
        <Stack
          horizontal
          space={BODY_HZ_SPACING}
          style={{
            paddingLeft: iconPadX,
            flexDirection: 'row',
            alignItems: 'center'
          }}>
          <IconNucleon
            color={semanticColor}
            name={admonitionIconMap[type]}
            size={iconSize}
          />
          <TextRoleNucleon
            style={{ textTransform: 'uppercase' }}
            role="body"
            color={semanticColor}>
            {title}
          </TextRoleNucleon>
        </Stack>
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
        </View>
      </Stack>
    </View>
  );
}
