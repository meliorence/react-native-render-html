import React from 'react';
import { TouchableOpacity, Text, WebView } from 'react-native';
import { defaultStyles, cssStringToRNStyle, STYLESETS } from './HTMLStyles';
import HTMLImage from './HTMLImage';

export function a (htmlAttribs, children, convertedCSSStyles, passProps) {
    const { parentIsText } = passProps;
    const style = _constructStyles({
        tagName: 'a',
        htmlAttribs,
        passProps,
        styleSet: parentIsText ? 'TEXT' : 'VIEW'
    });

    if (passProps.parentIsText) {
        return (
            <Text
              {...passProps}
              style={style}
              onPress={(evt) => { passProps.onLinkPress && passProps.onLinkPress(evt, htmlAttribs.href); }}
            >
                {children}
            </Text>
        );
    } else {
        return (
            <TouchableOpacity
              onPress={(evt) => { passProps.onLinkPress && passProps.onLinkPress(evt, htmlAttribs.href); }}
            >
                <Text {...passProps} style={style}>{ children }</Text>
            </TouchableOpacity>
        );
    }
}

export function img (htmlAttribs, children, convertedCSSStyles, passProps) {
    if (!htmlAttribs.src) {
        return false;
    }

    const style = _constructStyles({
        tagName: 'img',
        htmlAttribs,
        passProps,
        styleSet: 'IMAGE'
    });
    return (
        <HTMLImage source={{ uri: htmlAttribs.src }} style={style} {...passProps} />
    );
}

export function iframe (htmlAttribs, children, convertedCSSStyles, passProps) {
    if (!htmlAttribs.src) {
        return false;
    }

    const style = _constructStyles({
        tagName: 'iframe',
        htmlAttribs,
        passProps,
        styleSet: 'VIEW',
        additionalStyles: [
            htmlAttribs.height ? { height: parseInt(htmlAttribs.height, 10) } : {},
            htmlAttribs.width ? { width: parseInt(htmlAttribs.width, 10) } : {}
        ]
    });

    return (
        <WebView source={{ uri: htmlAttribs.src }} style={style} {...passProps} />
    );
}

export function _constructStyles ({ tagName, htmlAttribs, passProps, additionalStyles, styleSet = 'VIEW' }) {
    return [
        defaultStyles[tagName],
        passProps.htmlStyles ? passProps.htmlStyles[tagName] : undefined,
        htmlAttribs.style ?
            cssStringToRNStyle(
                htmlAttribs.style,
                STYLESETS[styleSet],
                { parentTag: tagName }
            ) :
            undefined,
        additionalStyles || undefined
    ]
    .filter((style) => style !== undefined);
}
