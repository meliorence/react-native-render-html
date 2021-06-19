import React, { useCallback } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import RenderHTML, { RenderHTMLProps } from 'react-native-render-html';
import UIDisplayLoadingAtom from './UIDisplayLoadingAtom';
import useOnLinkPress from '../hooks/useOnLinkPress';
import { useColorRoles } from '../theme/colorSystem';
import { SYSTEM_FONTS } from '../constants';
import { useMemo } from 'react';

function renderRemoteLoadingView() {
  return <UIDisplayLoadingAtom />;
}

const defaultTextProps = {
  selectable: true
};

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
    const baseStyle = useMemo(
      () => ({
        color: surface.content,
        backgroundColor: surface.background,
        ...renderHtmlProps.baseStyle
      }),
      [renderHtmlProps.baseStyle, surface.background, surface.content]
    );
    const sharedProps = {
      contentWidth,
      ...(renderHtmlProps as any),
      renderersProps: useMemo(
        () => ({
          ...renderHtmlProps.renderersProps,
          a: {
            onPress: onLinkPress,
            ...renderHtmlProps.renderersProps?.a
          },
          img: {
            enableExperimentalPercentWidth: true,
            ...renderHtmlProps.renderersProps?.img
          }
        }),
        [onLinkPress, renderHtmlProps.renderersProps]
      ),
      defaultTextProps
    };
    const mergedTagsStyles = useMemo(
      () => ({
        ...sharedProps.tagsStyles,
        hr: {
          marginTop: 16,
          marginBottom: 16,
          ...sharedProps.tagsStyles?.hr,
          height: 1,
          backgroundColor: softDivider
        },
        html: {}
      }),
      [sharedProps.tagsStyles, softDivider]
    );
    const renderHtml = (
      <RenderHTML
        debug={false}
        {...sharedProps}
        tagsStyles={mergedTagsStyles}
        baseStyle={baseStyle}
        source={sharedProps.source}
        enableUserAgentStyles
        systemFonts={SYSTEM_FONTS}
        remoteLoadingView={renderRemoteLoadingView}
      />
    );
    return <View style={style}>{renderHtml}</View>;
  }
);

export default UIHtmlDisplayMolecule;
