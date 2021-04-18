import { Stack, useSpacing } from '@mobily/stacks';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import UIHtmlDisplayMolecule from './UIHtmlDisplayMolecule';
import UISourceDisplayMolecule from './UISourceDisplayMolecule';
import BoxNucleon from './nucleons/BoxNucleon';
import IconNucleon from './nucleons/IconNucleon';
import { useColorRoles } from '../theme/colorSystem';
import TextRoleNucleon from './nucleons/TextRoleNucleon';

export default function RenderHtmlCardOrganism({
  html,
  contentWidth,
  caption
}: {
  html: string;
  contentWidth: number;
  caption: string;
}) {
  const hzSpace = useSpacing(0);
  const vtSpace = useSpacing(0);
  const borderWidth = 0;
  const { surface } = useColorRoles();
  const sourceDisplayStyle = {
    backgroundColor: 'rgba(125,125,125,.0)',
    minWidth: contentWidth
  };
  return (
    <BoxNucleon
      style={{
        marginHorizontal: hzSpace,
        paddingVertical: vtSpace
      }}>
      <Stack space={2}>
        <ScrollView indicatorStyle="white" horizontal>
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
        <UIHtmlDisplayMolecule
          style={{
            borderWidth: borderWidth,
            borderColor: surface.secondaryContent
          }}
          renderHtmlProps={{ source: { html } }}
          useLegacy={false}
          supportsLegacy={false}
          contentWidth={contentWidth - (hzSpace + borderWidth) * 2}
        />
        <BoxNucleon paddingX={2}>
          <TextRoleNucleon
            role="caption"
            style={{ flexShrink: 1 }}
            color={surface.secondaryContent}>
            {caption}
          </TextRoleNucleon>
        </BoxNucleon>
      </Stack>
    </BoxNucleon>
  );
}
