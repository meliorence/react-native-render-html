import { Stack, useSpacing } from '@mobily/stacks';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import UISourceDisplayMolecule from './UISourceDisplayMolecule';
import BoxNucleon from './nucleons/BoxNucleon';
import IconNucleon from './nucleons/IconNucleon';
import { useNuclearContentWidth } from './nucleons/useContentWidthContext';
import { PropsWithStyle } from './nucleons/types';
import { TNodeTransformDisplayProps } from '@doc/pages';
import TextRoleNucleon from './nucleons/TextRoleNucleon';
import { useColorRoles } from '../theme/colorSystem';

export default function TNodeTransformDisplayOrganism({
  html,
  snaphost,
  style,
  caption
}: PropsWithStyle<TNodeTransformDisplayProps & { style?: any }>) {
  const hzSpace = useSpacing(0);
  const vtSpace = useSpacing(0);
  const contentWidth = useNuclearContentWidth();
  const { surface } = useColorRoles();
  const sourceDisplayStyle = {
    minWidth: contentWidth
  };
  return (
    <BoxNucleon
      grow={false}
      style={[
        {
          marginHorizontal: hzSpace,
          paddingVertical: vtSpace
        },
        style
      ]}>
      <Stack space={2}>
        <ScrollView style={{ flexGrow: 0 }} horizontal>
          <UISourceDisplayMolecule
            paddingVertical={2}
            style={sourceDisplayStyle}
            content={html}
            language="html"
            showLineNumbers={false}
          />
        </ScrollView>
        <BoxNucleon alignX="center">
          <IconNucleon size={30} name="transfer-down" />
        </BoxNucleon>
        <ScrollView style={{ flexGrow: 0 }} horizontal>
          <UISourceDisplayMolecule
            paddingVertical={2}
            style={sourceDisplayStyle}
            content={snaphost}
            language="xml"
            showLineNumbers={false}
          />
        </ScrollView>
        {!!caption && (
          <BoxNucleon grow={false} paddingX={2}>
            <TextRoleNucleon
              role="caption"
              style={{ flexShrink: 1 }}
              color={surface.secondaryContent}>
              {caption}
            </TextRoleNucleon>
          </BoxNucleon>
        )}
      </Stack>
    </BoxNucleon>
  );
}
