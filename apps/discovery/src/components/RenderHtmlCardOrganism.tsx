/* eslint-disable react-native/no-inline-styles */
import { Stack, useSpacing } from '@mobily/stacks';
import React, { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import UIHtmlDisplayMolecule from './UIHtmlDisplayMolecule';
import UISourceDisplayMolecule from './UISourceDisplayMolecule';
import BoxNucleon from './nucleons/BoxNucleon';
import IconNucleon, { IconNucleonProps } from './nucleons/IconNucleon';
import { useColorRoles } from '../theme/colorSystem';
import { useNuclearContentWidth } from './nucleons/useContentWidthContext';
import { PropsWithStyle } from './nucleons/types';
import { RenderHTMLProps, HTMLSourceInline } from 'react-native-render-html';
import { TouchableWithoutFeedbackProps } from 'react-native';
import GestureHandlerAdapterNucleon from './nucleons/GestureHandlerAdapterNucleon';
import { Card, TouchableRipple } from 'react-native-paper';
import DefaultColorRolesProvider from './croles/DefaultColorRolesProvider';
import UICardContainer from './UICardContainer';

function UIIconButton({
  onPress,
  iconName,
  selected,
  ...other
}: {
  iconName: IconNucleonProps['name'];
  onPress?: TouchableWithoutFeedbackProps['onPress'];
  selected: boolean;
}) {
  const { selectable } = useColorRoles();
  const space1 = useSpacing(1);
  return (
    <GestureHandlerAdapterNucleon onPress={onPress}>
      <TouchableRipple
        style={{
          padding: space1,
          backgroundColor: selected
            ? selectable.activeBackground
            : selectable.inactiveBackground
        }}
        rippleColor={selectable.ripple}
        {...other}>
        <IconNucleon
          size={24}
          color={selected ? selectable.activeTint : selectable.inactiveTint}
          name={iconName}
        />
      </TouchableRipple>
    </GestureHandlerAdapterNucleon>
  );
}

interface RenderHtmlCardOrganismProps {
  caption?: string;
  preferHtmlSrc: boolean;
  props: RenderHTMLProps;
  snapshot: string;
  snippet: string;
  title: string;
}

function RenderHTMLCardInner({
  props: renderHtmlProps,
  snippet,
  preferHtmlSrc,
  snapshot
}: Omit<
  PropsWithStyle<RenderHtmlCardOrganismProps>,
  'style' | 'title' | 'caption'
>) {
  const [selectedSourceType, setSelectedSourceType] = useState<
    'html' | 'jsx' | 'trt'
  >(preferHtmlSrc ? 'html' : 'jsx');
  const { surface } = useColorRoles();
  const contentWidth = useNuclearContentWidth();
  const sourceDisplayStyle = {
    minWidth: contentWidth,
    backgroundColor: 'transparent'
  };
  const cardBg = surface.background;
  return (
    <>
      <BoxNucleon
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        paddingY={2}>
        <BoxNucleon
          backgroundColor={cardBg}
          paddingX={2}
          style={{ flexDirection: 'row' }}>
          <UIIconButton
            selected={selectedSourceType === 'jsx'}
            onPress={() => setSelectedSourceType('jsx')}
            iconName="language-javascript"
          />
          <UIIconButton
            selected={selectedSourceType === 'html'}
            onPress={() => setSelectedSourceType('html')}
            iconName="language-html5"
          />
          <UIIconButton
            selected={selectedSourceType === 'trt'}
            onPress={() => setSelectedSourceType('trt')}
            iconName="file-tree"
          />
        </BoxNucleon>
      </BoxNucleon>
      <Stack space={2}>
        <ScrollView
          style={{ flexGrow: 0 }}
          contentContainerStyle={{ flexGrow: 1 }}
          horizontal>
          {selectedSourceType === 'html' ? (
            <UISourceDisplayMolecule
              paddingVertical={2}
              style={sourceDisplayStyle}
              content={(renderHtmlProps.source as HTMLSourceInline).html}
              language="html"
              showLineNumbers={false}
            />
          ) : selectedSourceType === 'jsx' ? (
            <UISourceDisplayMolecule
              paddingVertical={2}
              style={sourceDisplayStyle}
              content={snippet}
              language="jsx"
              showLineNumbers
            />
          ) : (
            <UISourceDisplayMolecule
              paddingVertical={2}
              style={sourceDisplayStyle}
              content={snapshot}
              language="xml"
              showLineNumbers={false}
            />
          )}
        </ScrollView>
        <BoxNucleon alignX="center">
          <IconNucleon size={30} name="transfer-down" />
        </BoxNucleon>
        <BoxNucleon paddingX={2}>
          <Card>
            <DefaultColorRolesProvider>
              <UIHtmlDisplayMolecule
                renderHtmlProps={renderHtmlProps}
                contentWidth={contentWidth - useSpacing(4)}
              />
            </DefaultColorRolesProvider>
          </Card>
        </BoxNucleon>
      </Stack>
    </>
  );
}

export default function RenderHtmlCardOrganism({
  caption,
  title,
  style,
  ...props
}: PropsWithStyle<RenderHtmlCardOrganismProps>) {
  return (
    <UICardContainer caption={caption} title={title} style={style}>
      <RenderHTMLCardInner {...props} />
    </UICardContainer>
  );
}
