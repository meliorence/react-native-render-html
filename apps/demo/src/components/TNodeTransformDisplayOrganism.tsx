import { Stack } from '@mobily/stacks';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import UISourceDisplayMolecule from './UISourceDisplayMolecule';
import BoxNucleon from './nucleons/BoxNucleon';
import IconNucleon from './nucleons/IconNucleon';
import { useNuclearContentWidth } from './nucleons/useContentWidthContext';
import { PropsWithStyle } from './nucleons/types';
import { TNodeTransformDisplayProps } from '@doc/pages';
import UICardContainer from './UICardContainer';

export type TNodeTransformDisplayOrganismProps = PropsWithStyle<
  TNodeTransformDisplayProps & { style?: any }
>;

function TNodeTransformDisplayOrganismInner({
  html,
  snaphost
}: TNodeTransformDisplayOrganismProps) {
  const contentWidth = useNuclearContentWidth();
  const sourceDisplayStyle = {
    minWidth: contentWidth
  };
  return (
    <Stack space={2}>
      <ScrollView
        style={{ flexGrow: 0 }}
        contentContainerStyle={{ flexGrow: 1 }}
        horizontal>
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
      <ScrollView
        style={{ flexGrow: 0 }}
        contentContainerStyle={{ flexGrow: 1 }}
        horizontal>
        <UISourceDisplayMolecule
          paddingVertical={2}
          style={sourceDisplayStyle}
          content={snaphost}
          language="xml"
          showLineNumbers={false}
        />
      </ScrollView>
    </Stack>
  );
}

export default function TNodeTransformDisplayOrganism(
  props: TNodeTransformDisplayOrganismProps
) {
  return (
    <UICardContainer
      caption={props.caption}
      title={props.title}
      style={props.style}>
      <TNodeTransformDisplayOrganismInner {...props} />
    </UICardContainer>
  );
}
