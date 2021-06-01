import { Stack, useSpacing } from '@mobily/stacks';
import React, { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import UIHtmlDisplayMolecule from './UIHtmlDisplayMolecule';
import UISourceDisplayMolecule from './UISourceDisplayMolecule';
import BoxNucleon from './nucleons/BoxNucleon';
import IconNucleon, { IconNucleonProps } from './nucleons/IconNucleon';
import { useColorRoles } from '../theme/colorSystem';
import TextRoleNucleon from './nucleons/TextRoleNucleon';
import { useNuclearContentWidth } from './nucleons/useContentWidthContext';
import { PropsWithStyle } from './nucleons/types';
import { RenderHTMLProps, HTMLSourceInline } from 'react-native-render-html';
import { StyleSheet, TouchableWithoutFeedbackProps, View } from 'react-native';
import GestureHandlerAdapterNucleon from './nucleons/GestureHandlerAdapterNucleon';
import { TouchableRipple } from 'react-native-paper';
import Color from 'color';

function UIIconButton({
  onPress,
  iconName,
  selected,
  ...other
}: {
  onPress?: TouchableWithoutFeedbackProps['onPress'];
  iconName: IconNucleonProps['name'];
  selected: boolean;
}) {
  const { pressable } = useColorRoles();
  const space1 = useSpacing(1);
  return (
    <GestureHandlerAdapterNucleon onPress={onPress}>
      <TouchableRipple
        style={{ padding: space1 }}
        rippleColor={pressable.ripple}
        {...other}>
        <IconNucleon
          size={24}
          color={selected ? 'white' : 'rgb(190,190,195)'}
          name={iconName}
        />
      </TouchableRipple>
    </GestureHandlerAdapterNucleon>
  );
}

export default function RenderHtmlCardOrganism({
  props: renderHtmlProps,
  caption,
  snippet,
  style,
  title,
  preferHtmlSrc,
  snapshot
}: PropsWithStyle<{
  props: RenderHTMLProps;
  title: string;
  snippet: string;
  snapshot: string;
  caption?: string;
  preferHtmlSrc: boolean;
}>) {
  const [selectedSourceType, setSelectedSourceType] = useState<
    'html' | 'jsx' | 'trt'
  >(preferHtmlSrc ? 'html' : 'jsx');
  const hzSpace = useSpacing(0);
  const vtSpace = useSpacing(0);
  const borderWidth = StyleSheet.hairlineWidth;
  const { surface } = useColorRoles();
  const contentWidth = useNuclearContentWidth();
  const sourceDisplayStyle = {
    minWidth: contentWidth
  };
  const cardHeaderBg = '#5f76d4';
  return (
    <View>
      <BoxNucleon
        grow={false}
        style={{
          backgroundColor: Color(cardHeaderBg).darken(0.04).string(),
          alignSelf: 'flex-start'
        }}
        paddingX={2}
        marginX={2}>
        <TextRoleNucleon
          style={{
            flexGrow: 0
          }}
          role="body"
          color="white">
          {title}
        </TextRoleNucleon>
      </BoxNucleon>
      <BoxNucleon
        grow={false}
        style={[
          {
            marginHorizontal: hzSpace,
            paddingVertical: vtSpace,
            backgroundColor: 'rgba(0,0,0,0.05)',
            borderLeftWidth: 4,
            borderRightWidth: 4,
            borderBottomWidth: 4,
            borderColor: cardHeaderBg
          },
          style
        ]}>
        <BoxNucleon
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          backgroundColor={cardHeaderBg}
          paddingY={2}>
          <BoxNucleon
            backgroundColor={cardHeaderBg}
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
          <ScrollView style={{ flexGrow: 0 }} horizontal>
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
          <UIHtmlDisplayMolecule
            style={{
              borderTopWidth: borderWidth,
              borderBottomWidth: borderWidth,
              borderColor: surface.secondaryContent
            }}
            renderHtmlProps={renderHtmlProps}
            useLegacy={false}
            supportsLegacy={false}
            contentWidth={contentWidth - (hzSpace + borderWidth) * 2}
          />
          {!!caption && (
            <BoxNucleon grow={false} paddingBottom={2} paddingX={2}>
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
    </View>
  );
}
