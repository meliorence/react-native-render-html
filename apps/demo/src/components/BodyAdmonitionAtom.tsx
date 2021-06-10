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
  warning: 'Warning'
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
  const space2 = useSpacing(2);
  return (
    <View {...props}>
      <View
        style={{
          borderLeftWidth: dividerWidth,
          borderLeftColor: semanticColor,
          marginHorizontal: useSpacing(BODY_HZ_SPACING)
        }}>
        <Stack
          horizontal
          space={BODY_HZ_SPACING}
          style={{
            paddingLeft: space2,
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: space2
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
    </View>
  );
}
