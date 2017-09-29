import React from 'react';
import { TouchableOpacity, Text, View, WebView } from 'react-native';
import { _constructStyles } from './HTMLStyles';
import HTMLImage from './HTMLImage';

export function a (htmlAttribs, children, convertedCSSStyles, passProps) {
    console.log('<a> arguments', arguments);
    const { parentWrapper, onLinkPress } = passProps;
    const style = _constructStyles({
        tagName: 'a',
        htmlAttribs,
        passProps,
        styleSet: parentWrapper === 'Text' ? 'TEXT' : 'VIEW'
    });

    const onPress = (evt) => onLinkPress && htmlAttribs && htmlAttribs.href ?
        onLinkPress(evt, htmlAttribs.href) :
        undefined;

    if (parentWrapper === 'Text') {
        return (
            <Text {...passProps} style={style} onPress={onPress} key={key}>
                { children }
            </Text>
        );
    } else {
        return (
            <TouchableOpacity onPress={onPress} key={key}>
                { children }
            </TouchableOpacity>
        );
    }
}

export function img (htmlAttribs, children, convertedCSSStyles, passProps = {}) {
    console.log('<img> arguments', arguments);
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

// export function li (htmlAttribs, children, convertedCSSStyles, passProps = {}) {
//     const { parentTag, nodeIndex } = passProps;
//     const style = _constructStyles({
//         tagName: 'li',
//         htmlAttribs,
//         passProps,
//         styleSet: 'VIEW'
//     });
//     const prefix = parentTag === 'ul' ? (
//         <View style={{ width: 5, height: 5, top: 5, backgroundColor: 'black', borderRadius: 2.5, position: 'absolute' }} />
//     ) : (
//         <View style={{ position: 'absolute' }}><Text>{ nodeIndex + 1 })</Text></View>
//     );
//     return (
//         <View style={{ marginVertical: 2.5 }}>
//             <View style={[style, { paddingLeft: 20 }]}>
//                 { children }
//             </View>
//             {/* { prefix } */}
//         </View>
//     );
// }

export function ul (htmlAttribs, children, convertedCSSStyles, passProps = {}) {
    const { rawChildren } = passProps;
    children = children.map((child, index) => {
        const rawChild = rawChildren[index];
        console.log('child', child);
        console.log('rawChild', rawChild);
        let prefix = false;
        if (rawChild) {
            if (rawChild.parentTag === 'ul') {
                prefix = (
                    <View style={{ alignSelf: 'center', marginRight: 10, width: 5, height: 5, borderRadius: 2.5, backgroundColor: 'black' }} />
                );
            } else if (rawChild.parentTag === 'ol') {
                prefix = (
                    <Text>{ index + 1 })</Text>
                );
            }
        }
        return (
            <View key={`blu-${index}`} style={{ flexDirection: 'row' }}>
                { prefix }
                { child }
            </View>
        );
    });
    return (
        <View style={{ paddingLeft: 20 }}>
            { children }
        </View>
    );
}
export const ol = ul;

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

export function br (htlmAttribs, children, convertedCSSStyles, passProps) {
    return (
        <View style={{ height: 1.2 * passProps.emSize }} key={passProps.key} />
    );
}
