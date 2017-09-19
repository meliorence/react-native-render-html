import React from 'react';
import { TouchableOpacity, Text, WebView } from 'react-native';
import HTMLStyles from './HTMLStyles';
import HTMLImage from './HTMLImage';

export default {
    /**
     * Renders an anchor tag
    * @param htmlAttribs: dict of html attributes
    * @param children: the children to place within the element
    * @param passProps: other props that are to be passed into the element
    * @return a RN element that represents an anchor tag
    */
    a: (htmlAttribs, children, convertedCSSStyles, passProps) => {
        const style = []
            .concat(
                HTMLStyles.defaultStyles.a,
                passProps.htmlStyles ? passProps.htmlStyles.a : undefined,
                htmlAttribs.style ? HTMLStyles.cssStringToRNStyle(htmlAttribs.style, HTMLStyles.STYLESETS.TEXT) : undefined
            ).filter((s) => s !== undefined);

        if (passProps.parentIsText) {
            return (
                <Text
                  {...passProps}
                  style={style}
                  onPress={(evt) => { passProps.onLinkPress && passProps.onLinkPress(evt, htmlAttribs.href); }}>
                      {children}
                </Text>
            );
        } else {
            return (
                <TouchableOpacity
                  onPress={(evt) => { passProps.onLinkPress && passProps.onLinkPress(evt, htmlAttribs.href); }}
                >
                    <Text {...passProps} style={style}>
                        { children }
                    </Text>
                </TouchableOpacity>
            );
        }
    },

    /**
    * Renders an image tag
    * @param htmlAttribs: dict of html attributes
    * @param children: the children to place within the element
    * @param passProps: other props that are to be passed into the element
    * @return a RN element that represents an image tag
    */
    img: (htmlAttribs, children, convertedCSSStyles, passProps) => {
        if (!htmlAttribs.src) {
            return false;
        }

        // Build our styles
        const style = []
            .concat(
                HTMLStyles.defaultStyles.img,
                passProps.htmlStyles ? passProps.htmlStyles.img : undefined,
                htmlAttribs.style ?
                    HTMLStyles.cssStringToRNStyle(htmlAttribs.style, HTMLStyles.STYLESETS.IMAGE, { parentTag: 'img' }) :
                    undefined
            )
            .filter((s) => s !== undefined);

        return (
            <HTMLImage
              source={{ uri: htmlAttribs.src }}
              style={style}
              {...passProps}
            />
        );
    },

    iframe: (htmlAttribs, children, convertedCSSStyles, passProps) => {
        if (!htmlAttribs.src) {
            return false;
        }

        const style = [
            HTMLStyles.defaultStyles.iframe,
            passProps.htmlStyles ? passProps.htmlStyles.iframe : {},
            htmlAttribs.style ?
                HTMLStyles.cssStringToRNStyle(htmlAttribs.style, HTMLStyles.STYLESETS.IMAGE, { parentTag: 'iframe' }) :
                {},
            htmlAttribs.height ? { height: parseInt(htmlAttribs.height, 10) } : {},
            htmlAttribs.width ? { width: parseInt(htmlAttribs.width, 10) } : {}
        ];

        return (
            <WebView source={{ uri: htmlAttribs.src }} style={style} {...passProps} />
        );
    }
};
