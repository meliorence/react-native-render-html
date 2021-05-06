import React, { useCallback } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import RenderHTML, {
  RenderersPropsBase,
  RenderHTMLProps
} from 'react-native-render-html';
import LegacyHTML from 'react-native-render-html-v5';
import UIDisplayLoadingAtom from './UIDisplayLoadingAtom';
import useOnLinkPress from '../hooks/useOnLinkPress';
import { useColorRoles } from '../theme/colorSystem';
import { SYSTEM_FONTS } from '../constants';
import TextRoleNucleon from './nucleons/TextRoleNucleon';

const DEFAULT_PROPS: Pick<RenderHTMLProps, 'debug'> = {
  debug: true
};

function stripUnsupportedStylesInLegacy(style: Record<string, any>) {
  return Object.keys(style)
    .filter((k) => k != 'whiteSpace' && k != 'listStyleType')
    .reduce((container, key) => ({ ...container, [key]: style[key] }), {});
}

function stripPropsFromStylesheet(
  styleSheet?: Record<string, Record<string, any>>
) {
  if (!styleSheet) {
    return undefined;
  }
  return Object.entries(styleSheet).reduce(
    (prev, [key, value]) => ({
      ...prev,
      [key]: stripUnsupportedStylesInLegacy(value)
    }),
    {} as Record<string, any>
  );
}

const styles = StyleSheet.create({
  legacyWarningContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30,
    flexGrow: 1
  }
});

const UIHtmlDisplayMolecule = React.memo(
  ({
    supportsLegacy,
    renderHtmlProps,
    contentWidth,
    style,
    useLegacy = false
  }: {
    contentWidth: number;
    renderHtmlProps: RenderHTMLProps<RenderersPropsBase>;
    supportsLegacy: boolean;
    useLegacy: boolean;
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
      ...DEFAULT_PROPS,
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
    if (!supportsLegacy && useLegacy) {
      return (
        <View style={styles.legacyWarningContainer}>
          <TextRoleNucleon align="center" role="uiLabel">
            Legacy HTML component is not available for this snippet.
          </TextRoleNucleon>
        </View>
      );
    }

    const renderHtml = useLegacy ? (
      <LegacyHTML
        debug={false}
        {...sharedProps}
        html={sharedProps.html}
        onLinkPress={onLinkPress}
        baseFontStyle={stripUnsupportedStylesInLegacy(baseStyle)}
        classesStyles={stripPropsFromStylesheet(sharedProps.classesStyles)}
        tagsStyles={stripPropsFromStylesheet(mergedTagsStyles)}
      />
    ) : (
      <RenderHTML
        debug={false}
        {...sharedProps}
        tagsStyles={mergedTagsStyles}
        baseStyle={baseStyle}
        enableUserAgentStyles
        enableExperimentalMarginCollapsing={true}
        systemFonts={SYSTEM_FONTS}
        remoteLoadingView={() => <UIDisplayLoadingAtom />}
        triggerTREInvalidationPropNames={['baseStyle', 'tagsStyles']}
      />
    );
    return <View style={style}>{renderHtml}</View>;
  }
);

export default UIHtmlDisplayMolecule;
