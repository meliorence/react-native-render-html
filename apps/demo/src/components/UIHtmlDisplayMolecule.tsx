import React, { useCallback } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import RenderHTML, { RenderHTMLProps } from 'react-native-render-html';
import UIDisplayLoadingAtom from './UIDisplayLoadingAtom';
import useOnLinkPress from '../hooks/useOnLinkPress';
import { useColorRoles } from '../theme/colorSystem';
import { SYSTEM_FONTS } from '../constants';

const UIHtmlDisplayMolecule = React.memo(
  ({
    renderHtmlProps,
    contentWidth,
    style
  }: {
    contentWidth: number;
    renderHtmlProps: RenderHTMLProps;
    style?: StyleProp<ViewStyle>;
  }) => {
    const onSelectUri = useOnLinkPress();
    const onLinkPress = useCallback((e, uri) => onSelectUri(uri), [
      onSelectUri
    ]);
    const { surface, softDivider } = useColorRoles();
    const baseStyle = {
      color: surface.content,
      backgroundColor: surface.background,
      //@ts-ignore
      ...renderHtmlProps.baseStyle
    };
    const sharedProps = {
      contentWidth,
      ...(renderHtmlProps as any),
      renderersProps: {
        ...renderHtmlProps.renderersProps,
        a: {
          onPress: onLinkPress,
          ...renderHtmlProps.renderersProps?.a
        },
        img: {
          enableExperimentalPercentWidth: true,
          ...renderHtmlProps.renderersProps?.img
        }
      },
      defaultTextProps: {
        selectable: true
      }
    };
    const mergedTagsStyles = {
      ...sharedProps.tagsStyles,
      hr: {
        marginTop: 16,
        marginBottom: 16,
        ...sharedProps.tagsStyles?.hr,
        height: 1,
        backgroundColor: softDivider
      },
      html: {}
    };
    const renderHtml = (
      <RenderHTML
        debug={false}
        {...sharedProps}
        tagsStyles={mergedTagsStyles}
        baseStyle={baseStyle}
        enableUserAgentStyles
        systemFonts={SYSTEM_FONTS}
        remoteLoadingView={() => <UIDisplayLoadingAtom />}
        triggerTREInvalidationPropNames={['baseStyle', 'tagsStyles']}
      />
    );
    return <View style={style}>{renderHtml}</View>;
  }
);

export default UIHtmlDisplayMolecule;
