import React from 'react';
import { TouchableOpacity, Text, View, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { _constructStyles, _getElementClassStyles } from './HTMLStyles';
import HTMLImage from './HTMLImage';

function getTextProps(passProps) {
    const { selectable, allowFontScaling } = passProps;
    return {
        selectable,
        allowFontScaling
    }
}

function getImgProps(passProps) {
  const { imagesMaxWidth, imagesInitialDimensions } = passProps;
  return {
    imagesMaxWidth,
    imagesInitialDimensions,
  };
}

function normalizeUri(uri) {
    return uri.startsWith('//') ? `https:${uri}` : uri;
}

export function a (htmlAttribs, children, convertedCSSStyles, passProps) {
    const style = _constructStyles({
        tagName: 'a',
        htmlAttribs,
        passProps,
        styleSet: passProps.parentWrapper === 'Text' ? 'TEXT' : 'VIEW'
    });
    // !! This deconstruction needs to happen after the styles construction since
    // the passed props might be altered by it !!
    const { parentWrapper, onLinkPress, key, data } = passProps;
    const textProps = getTextProps(passProps);
    const onPress = (evt) => onLinkPress && htmlAttribs && htmlAttribs.href ?
        onLinkPress(evt, htmlAttribs.href, htmlAttribs) :
        undefined;
    if (parentWrapper === 'Text') {
        return (
            <Text testID="a-renderer" {...textProps} style={style} onPress={onPress} key={key}>
                { children || data }
            </Text>
        );
    } else {
        return (
            <TouchableOpacity onPress={onPress} key={key}>
                { children || data }
            </TouchableOpacity>
        );
    }
}

export function img (htmlAttribs, children, convertedCSSStyles, { key, ...passProps } = {}) {
    if (!htmlAttribs.src) {
        return false;
    }

    const style = _constructStyles({
        tagName: 'img',
        htmlAttribs,
        passProps,
        styleSet: 'IMAGE'
    });
    const { src, alt, width, height } = htmlAttribs;
    return (
        <HTMLImage
          source={{ uri: normalizeUri(src) }}
          alt={alt}
          width={width}
          height={height}
          style={style}
          key={key}
          testID="img"
          {...getImgProps(passProps)}
        />
    );
}

export function ul (htmlAttribs, children, convertedCSSStyles, passProps = {}) {
    const style = _constructStyles({
        tagName: 'ul',
        htmlAttribs,
        passProps,
        styleSet: 'VIEW'
    });
    const { rawChildren, nodeIndex, key, baseFontStyle, listsPrefixesRenderers } = passProps;
    const baseFontSize = baseFontStyle.fontSize || 14;
    const textProps = getTextProps(passProps);
    children = children && children.map((child, index) => {
        const rawChild = rawChildren[index];
        let prefix = false;
        const rendererArgs = [
            htmlAttribs,
            children,
            convertedCSSStyles,
            {
                ...passProps,
                index
            }
        ];

        if (rawChild) {
            if (rawChild.parentTag === 'ul' && rawChild.tagName === 'li') {
                prefix = listsPrefixesRenderers && listsPrefixesRenderers.ul ? listsPrefixesRenderers.ul(...rendererArgs) : (
                    <View style={{
                        marginRight: 10,
                        width: baseFontSize / 2.8,
                        height: baseFontSize / 2.8,
                        marginTop: baseFontSize / 2,
                        borderRadius: baseFontSize / 2.8,
                        backgroundColor: 'black'
                    }} />
                );
            } else if (rawChild.parentTag === 'ol' && rawChild.tagName === 'li') {
                prefix = listsPrefixesRenderers && listsPrefixesRenderers.ol ? listsPrefixesRenderers.ol(...rendererArgs) : (
                    <Text {...textProps} style={{ marginRight: 5, fontSize: baseFontSize }}>{ index + 1 })</Text>
                );
            }
        }
        return (
            <View key={`list-${nodeIndex}-${index}-${key}`} style={{ flexDirection: 'row', marginBottom: 10 }}>
                { prefix }
                <View style={{ flex: 1 }}>{ child }</View>
            </View>
        );
    });
    return (
        <View style={style} key={key}>
            { children }
        </View>
    );
}
export const ol = ul;

export function iframe (htmlAttribs, children, convertedCSSStyles, passProps) {
    const { staticContentMaxWidth, tagsStyles, classesStyles } = passProps;

    const tagStyleHeight = tagsStyles.iframe && tagsStyles.iframe.height;
    const tagStyleWidth = tagsStyles.iframe && tagsStyles.iframe.width;

    const classStyles = _getElementClassStyles(htmlAttribs, classesStyles);
    const classStyleWidth = classStyles.width;
    const classStyleHeight = classStyles.height;

    const attrHeight = htmlAttribs.height ? parseInt(htmlAttribs.height) : false;
    const attrWidth = htmlAttribs.width ? parseInt(htmlAttribs.width) : false;

    const height = attrHeight || classStyleHeight || tagStyleHeight || 200;
    const width = attrWidth || classStyleWidth || tagStyleWidth || staticContentMaxWidth;

    const style = _constructStyles({
        tagName: 'iframe',
        htmlAttribs,
        passProps,
        styleSet: 'VIEW',
        additionalStyles: [{ height, width }]
    });

    const source = htmlAttribs.srcdoc ? { html: htmlAttribs.srcdoc } : { uri: normalizeUri(htmlAttribs.src) };

    return (
        <WebView testID="iframe" key={passProps.key} source={source} style={style} />
    );
}

export function pre (htlmAttribs, children, convertedCSSStyles, passProps) {
    return (
        <Text
          key={passProps.key}
          {...getTextProps(passProps)}
          style={{ fontFamily: Platform.OS === 'android' ? 'monospace' : 'Menlo' }}>
            { children }
        </Text>
    );
}

export function br (htlmAttribs, children, convertedCSSStyles, passProps) {
    return (
        <Text
            {...getTextProps(passProps)}
            style={{ height: 1.2 * passProps.emSize, flex: 1 }}
            key={passProps.key}
        >
            {"\n"}
        </Text>
    );
}

export function textwrapper (htmlAttribs, children, convertedCSSStyles, { key, ...passProps }) {
    return (
        <Text {...getTextProps(passProps)} key={key} style={convertedCSSStyles}>{ children }</Text>
    );
}
