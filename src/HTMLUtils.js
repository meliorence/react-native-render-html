import TextStylesPropTypes from 'react-native/Libraries/Text/TextStylePropTypes';
import ViewStylesPropTypes from 'react-native/Libraries/Components/View/ViewStylePropTypes';
import ImageStylesPropTypes from 'react-native/Libraries/Image/ImageStylePropTypes';

// Filter prop-types that are only applicable to <Text> and not <View>
export let TextOnlyPropTypes = {};
Object.keys(TextStylesPropTypes).forEach((prop) => {
    if (!ViewStylesPropTypes[prop]) {
        TextOnlyPropTypes[prop] = TextStylesPropTypes[prop];
    }
});

// These tags should ALWAYS be mapped to View wrappers
export const BLOCK_TAGS = ['address', 'article', 'aside', 'footer', 'hgroup', 'nav', 'section', 'blockquote', 'dd',
    'dl', 'dt', 'figure', 'hr', 'li', 'main', 'ol', 'ul', 'cite', 'data', 'rp', 'rtc', 'ruby', 'area',
    'img', 'map', 'center'];

// These tags should ALWAYS be mapped to Text wrappers
export const TEXT_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'figcaption', 'p', 'pre', 'abbr', 'b', 'bdi', 'bdo', 'code',
    'dfn', 'i', 'kbd', 'mark', 'q', 'rt', 's', 'samp', 'small', 'big', 'span', 'strong', 'sub', 'sup', 'time', 'u', 'var', 'wbr',
    'del', 'ins', 'blink', 'font', 'em', 'bold', 'br'];

// These tags can either be mapped to View or Text wrappers, depending solely on their children
export const MIXED_TAGS = ['a'];

// These text tags shouldn't be associated with their siblings in the associateRawTags method
export const TEXT_TAGS_IGNORING_ASSOCIATION = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

export const ABSOLUTE_FONT_SIZE = {
    'medium': 14,
    'xx-small': 8.5,
    'x-small': 10,
    'small': 12,
    'large': 17,
    'x-large': 20,
    'xx-large': 24,
    'smaller': 13.3,
    'larger': 16,
    'length': null,
    'initial': null,
    'inherit': null
};

export const IGNORED_TAGS = ['head', 'scripts', 'audio', 'video', 'track', 'embed', 'object', 'param', 'source', 'canvas', 'noscript',
    'caption', 'col', 'colgroup', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 'button', 'datalist', 'fieldset', 'form',
    'input', 'label', 'legend', 'meter', 'optgroup', 'option', 'output', 'progress', 'select', 'textarea', 'details', 'diaglog',
    'menu', 'menuitem', 'summary'];

// As of react-native 0.48, this might change in the future
export const PERC_SUPPORTED_STYLES = [
    'width', 'height',
    'top', 'bottom', 'left', 'right',
    'margin', 'marginBottom', 'marginTop', 'marginLeft', 'marginRight', 'marginHorizontal', 'marginVertical',
    'padding', 'paddingBottom', 'paddingTop', 'paddingLeft', 'paddingRight', 'paddingHorizontal', 'paddingVertical'
];

// We have to do some munging here as the objects are wrapped
const RNTextStylePropTypes = Object.keys(TextStylesPropTypes)
    .reduce((acc, k) => { acc[k] = TextStylesPropTypes[k]; return acc; }, {});
const RNViewStylePropTypes = Object.keys(ViewStylesPropTypes)
    .reduce((acc, k) => { acc[k] = ViewStylesPropTypes[k]; return acc; }, {});
const RNImageStylePropTypes = Object.keys(ImageStylesPropTypes)
    .reduce((acc, k) => { acc[k] = ImageStylesPropTypes[k]; return acc; }, {});

export const STYLESETS = Object.freeze({ VIEW: 'view', TEXT: 'text', IMAGE: 'image' });

export const stylePropTypes = {};
stylePropTypes[STYLESETS.VIEW] = Object.assign({}, RNViewStylePropTypes);
stylePropTypes[STYLESETS.TEXT] = Object.assign({}, RNViewStylePropTypes, RNTextStylePropTypes);
stylePropTypes[STYLESETS.IMAGE] = Object.assign({}, RNViewStylePropTypes, RNImageStylePropTypes);

/**
 * Returns an array with the tagname of every parent of a node.
 * Returns an empty array if nothing is found.
 * @export
 * @param {any} parent a parsed HTML node, from alterChildren for example
 * @param {any} tags you don't need to supply this yourself
 * @returns {array}
 */
export function getParentsTagsRecursively (parent, tags = []) {
    if (!parent) {
        return tags;
    }
    parent.name && tags.push(parent.name);
    if (parent.parent) {
        return getParentsTagsRecursively(parent.parent, tags);
    } else {
        return tags;
    }
}

/**
 * Returns the closest parent of a node with a specific tag.
 * @export
 * @param {any} node
 * @param {string} tag
 * @returns {HTMLNode?}
 */
export function getClosestNodeParentByTag (node, tag) {
    if (!node || !node.parent) {
        return undefined;
    }
    if (node.parent.name === tag) {
        return node.parent;
    }
    return getClosestNodeParentByTag(node.parent, tag);
}
