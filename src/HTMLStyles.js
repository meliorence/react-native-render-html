import { PERC_SUPPORTED_STYLES, STYLESETS, stylePropTypes } from './HTMLUtils';
import { defaultBlockStyles, defaultTextStyles } from './HTMLDefaultStyles';
import checkPropTypes from './checkPropTypes';

/**
* Converts a html style string to an object
* @param str: the style string
* @return the style as an obect
*/
function cssStringToObject (str) {
    return str
        .split(';')
        .map((prop) => prop.split(':'))
        .reduce((acc, prop) => {
            if (prop.length === 2) {
                acc[prop[0].trim()] = prop[1].trim();
            }
            return acc;
        }, {});
}

/**
 * Helper that composes styles with the default style for a tag, the "style" attribute and
 * any given addiitional style. Checks everything against the style sets of views, images,
 * or texts with prop-types.
 * @export
 * @param {any} { tagName, htmlAttribs, passProps, additionalStyles, styleSet = 'VIEW' }
 * @returns {object}
 */
export function _constructStyles ({ tagName, htmlAttribs, passProps, additionalStyles, styleSet = 'VIEW' }) {
    return [
        (styleSet === 'VIEW' ? defaultBlockStyles : defaultTextStyles)[tagName],
        passProps.htmlStyles ? passProps.htmlStyles[tagName] : undefined,
        _getElementClassStyles(htmlAttribs, passProps.classesStyles),
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

/**
 * Creates a set of style from an array of classes asosciated to a node.
 * @export
 * @param {any} htmlAttribs
 * @param {any} [classesStyles={}]
 * @returns {object}
 */
export function _getElementClassStyles (htmlAttribs, classesStyles = {}) {
    const elementClasses = _getElementCSSClasses(htmlAttribs);
    let styles = {};
    elementClasses.forEach((className) => {
        if (classesStyles[className]) {
            styles = { ...styles, ...classesStyles[className] };
        }
    });
    return styles;
}

/**
 * Simple helper that returns an array of classes of a node.
 * @export
 * @param {any} htmlAttribs
 * @returns {array}
 */
export function _getElementCSSClasses (htmlAttribs) {
    if (!htmlAttribs || !htmlAttribs.class) {
        return [];
    }
    return htmlAttribs.class.split(' ');
}

/**
 * Converts a html style to its equavalent react native style
 * @param {object} css: object of key value css strings
 * @param {string} styleset: the styleset to convert the styles against
 * @param {object} { parentTag, emSize, ignoredStyles }
 * @returns {object}
 */
function cssToRNStyle (css, styleset, { parentTag, emSize, ignoredStyles }) {
    const styleProps = stylePropTypes[styleset];
    return Object.keys(css)
        .filter((key) => (ignoredStyles || []).indexOf(key) === -1)
        .map((key) => [key, css[key]])
        .map(([key, value]) => {
            // Key convert
            return [
                key
                    .split('-')
                    .map((item, index) => index === 0 ? item : item[0].toUpperCase() + item.substr(1))
                    .join(''),
                value];
        })
        .map(([key, value]) => {
            if (!styleProps[key]) {
                return undefined;
            }

            const testStyle = {};
            testStyle[key] = value;
            const styleProp = {};
            styleProp[key] = styleProps[key];
            if (checkPropTypes(styleProp, testStyle, key, 'react-native-render-html') == null) {
                if (typeof value === 'string') {
                    // See if we can use the percentage directly
                    if (value.search('%') !== -1 && PERC_SUPPORTED_STYLES.indexOf(key) !== -1) {
                        return [key, value];
                    }
                    if (value.search('em') !== -1) {
                        const pxSize = parseFloat(value.replace('em', '')) * emSize;
                        return [key, pxSize];
                    }
                    // See if we can convert a 20px to a 20 automagically
                    const numericValue = parseFloat(value.replace('px', ''));
                    if (!isNaN(numericValue)) {
                        testStyle[key] = numericValue;
                        if (checkPropTypes(styleProp, testStyle, key, 'react-native-render-html') == null) {
                            return [key, numericValue];
                        }
                    }
                }
                return [key, value];
            }
            return [key, value];
        })
        .filter((prop) => prop !== undefined)
        .reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {});
}

/**
* @param str: the css style string
* @param styleset=STYLESETS.TEXT: the styleset to convert the styles against
* @return a react native style object
*/
export function cssStringToRNStyle (str, styleset = STYLESETS.TEXT, options) {
    return cssToRNStyle(cssStringToObject(str), styleset, options);
}
