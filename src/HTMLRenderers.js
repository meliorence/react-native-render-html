import React from 'react';
import { TouchableOpacity, Text, View, WebView } from 'react-native';
import { _constructStyles } from './HTMLStyles';
import { shouldWrapWithText } from './HTMLElement';
import HTMLImage from './HTMLImage';

export function a (htmlAttribs, children, convertedCSSStyles, passProps) {
    const { parentIsText } = passProps;
    const style = _constructStyles({
        tagName: 'a',
        htmlAttribs,
        passProps,
        styleSet: parentIsText ? 'TEXT' : 'VIEW'
    });

    if (shouldWrapWithText(children, 'a')) {
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
                <View {...passProps} style={style}>{ children }</View>
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
