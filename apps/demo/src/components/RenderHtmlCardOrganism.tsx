import { Stack, useSpacing } from '@mobily/stacks';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import UIHtmlDisplayMolecule from './UIHtmlDisplayMolecule';
import UISourceDisplayMolecule from './UISourceDisplayMolecule';
import BoxNucleon from './nucleons/BoxNucleon';
import IconNucleon from './nucleons/IconNucleon';
import { useColorRoles } from '../theme/colorSystem';
import TextRoleNucleon from './nucleons/TextRoleNucleon';
import { useNuclearContentWidth } from './nucleons/useContentWidthContext';
import { PropsWithStyle } from './nucleons/types';
import { RenderHTMLProps } from 'react-native-render-html';

export default function RenderHtmlCardOrganism({
  props: renderHtmlProps,
  caption,
  snippet,
  style
}: PropsWithStyle<{
  props: RenderHTMLProps;
  title: string;
  snippet: string;
  caption?: string;
}>) {
  const hzSpace = useSpacing(0);
  const vtSpace = useSpacing(0);
  const borderWidth = 0;
  const { surface } = useColorRoles();
  const contentWidth = useNuclearContentWidth();
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
            content={snippet}
            language="jsx"
            showLineNumbers
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
          renderHtmlProps={renderHtmlProps}
          useLegacy={false}
          supportsLegacy={false}
          contentWidth={contentWidth - (hzSpace + borderWidth) * 2}
        />
        <BoxNucleon grow={false} paddingX={2}>
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
