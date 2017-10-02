import _RNTextStylePropTypes from 'react-native/Libraries/Text/TextStylePropTypes';
import _RNViewStylePropTypes from 'react-native/Libraries/Components/View/ViewStylePropTypes';
import _RNImageStylePropTypes from 'react-native/Libraries/Image/ImageStylePropTypes';

export const BLOCK_TAGS = ['address', 'article', 'aside', 'footer', 'hgroup', 'nav', 'section', 'blockquote', 'dd', 'div',
'dl', 'dt', 'figure', 'hr', 'li', 'main', 'ol', 'ul', 'br', 'cite', 'data', 'rp', 'rtc', 'ruby', 'area',
'img', 'map', 'center'];

export const TEXT_TAGS = ['a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'figcaption', 'p', 'pre', 'abbr', 'b', 'bdi', 'bdo', 'code',
'dfn', 'i', 'kbd', 'mark', 'q', 'rt', 's', 'samp', 'small', 'big', 'span', 'strong', 'sub', 'sup', 'time', 'u', 'var', 'wbr',
'del', 'ins', 'blink', 'font', 'em', 'bold'];

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
const RNTextStylePropTypes = Object.keys(_RNTextStylePropTypes)
    .reduce((acc, k) => { acc[k] = _RNTextStylePropTypes[k]; return acc; }, {});
const RNViewStylePropTypes = Object.keys(_RNViewStylePropTypes)
    .reduce((acc, k) => { acc[k] = _RNViewStylePropTypes[k]; return acc; }, {});
const RNImageStylePropTypes = Object.keys(_RNImageStylePropTypes)
    .reduce((acc, k) => { acc[k] = _RNImageStylePropTypes[k]; return acc; }, {});

export const STYLESETS = Object.freeze({ VIEW: 'view', TEXT: 'text', IMAGE: 'image' });

export const stylePropTypes = {};
stylePropTypes[STYLESETS.VIEW] = Object.assign({}, RNViewStylePropTypes);
stylePropTypes[STYLESETS.TEXT] = Object.assign({}, RNViewStylePropTypes, RNTextStylePropTypes);
stylePropTypes[STYLESETS.IMAGE] = Object.assign({}, RNViewStylePropTypes, RNImageStylePropTypes);
