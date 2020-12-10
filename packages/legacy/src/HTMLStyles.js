import {
  PERC_SUPPORTED_STYLES,
  STYLESETS,
  ABSOLUTE_FONT_SIZE,
  stylePropTypes,
} from "./HTMLUtils";
import {
  generateDefaultBlockStyles,
  generateDefaultTextStyles,
} from "./HTMLDefaultStyles";

/**
 * Converts a html style string to an object
 * @param str: the style string
 * @return the style as an object
 */
export function cssStringToObject(str) {
  return str
    .split(";")
    .map((prop) => prop.split(":"))
    .reduce((acc, prop) => {
      if (prop.length === 2) {
        acc[prop[0].trim()] = prop[1].trim();
      }
      return acc;
    }, {});
}

export function cssObjectToString(obj) {
  let string = "";
  Object.keys(obj).forEach((style) => {
    string += `${style}:${obj[style]};`;
  });
  return string;
}

/**
 * Helper that composes styles with the default style for a tag, the "style" attribute and
 * any given additional style. Checks everything against the style sets of views, images,
 * or texts with prop-types.
 * @export
 * @param {any} { tagName, htmlAttribs, passProps, additionalStyles, styleSet = 'VIEW' }
 * @returns {object}
 */
export function constructStyles({
  tagName,
  htmlAttribs,
  passProps,
  additionalStyles,
  styleSet = "VIEW",
  baseFontSize,
}) {
  let defaultTextStyles = generateDefaultTextStyles(baseFontSize);
  let defaultBlockStyles = generateDefaultBlockStyles(baseFontSize);

  passProps.ignoredStyles.forEach((ignoredStyle) => {
    htmlAttribs[ignoredStyle] && delete htmlAttribs[ignoredStyle];
  });

  let style = [
    (styleSet === "VIEW" ? defaultBlockStyles : defaultTextStyles)[tagName],
    passProps.tagsStyles ? passProps.tagsStyles[tagName] : undefined,
    getElementClassStyles(htmlAttribs, passProps.classesStyles),
    htmlAttribs.style
      ? cssStringToRNStyle(htmlAttribs.style, STYLESETS[styleSet], {
          ...passProps,
          parentTag: tagName,
        })
      : undefined,
  ];

  if (additionalStyles) {
    style = style.concat(
      !additionalStyles.length ? [additionalStyles] : additionalStyles
    );
  }

  return style.filter((s) => s !== undefined);
}

/**
 * Computes the styles of a text node
 * @export
 * @param {any} element parsed DOM node of text
 * @param {any} passProps set of props from the HTML component
 * @returns {object} react-native styles
 */
export function computeTextStyles(element, passProps) {
  let finalStyle = {};

  // Construct an array with the styles of each level of the text node, ie :
  // [element, parent1, parent2, parent3...]
  const parentStyles = _recursivelyComputeParentTextStyles(element, passProps);

  // Only merge the keys that aren't yet applied to the final object. ie:
  // if fontSize is already set in the first iteration, ignore the fontSize that
  // we got from the 3rd iteration because of a class for instance, hence
  // respecting the proper style inheritance
  parentStyles.forEach((styles) => {
    Object.keys(styles).forEach((styleKey) => {
      const styleValue = styles[styleKey];
      if (!finalStyle[styleKey]) {
        finalStyle[styleKey] = styleValue;
      }
    });
  });

  // Finally, try to add the baseFontStyle values to add pontentially missing
  // styles to each text node
  return { ...passProps.baseFontStyle, ...finalStyle };
}

function _recursivelyComputeParentTextStyles(element, passProps, styles = []) {
  const { attribs, name } = element;
  const { classesStyles, tagsStyles, defaultTextStyles } = passProps;

  // Construct every style for this node
  const HTMLAttribsStyles =
    attribs && attribs.style
      ? cssStringToRNStyle(attribs.style, STYLESETS.TEXT, passProps)
      : {};
  const classStyles = getElementClassStyles(attribs, classesStyles);
  const userTagStyles = tagsStyles[name];
  const defaultTagStyles = defaultTextStyles[name];

  // Merge those according to their priority level
  const mergedStyles = {
    ...defaultTagStyles,
    ...userTagStyles,
    ...classStyles,
    ...HTMLAttribsStyles,
  };

  styles.push(mergedStyles);

  if (element.parent) {
    // Keep looping recursively if this node has parents
    return _recursivelyComputeParentTextStyles(
      element.parent,
      passProps,
      styles
    );
  } else {
    return styles;
  }
}

/**
 * Creates a set of style from an array of classes associated to a node.
 * @export
 * @param {any} htmlAttribs
 * @param {any} [classesStyles={}]
 * @returns {object}
 */
export function getElementClassStyles(htmlAttribs, classesStyles = {}) {
  const elementClasses = getElementCSSClasses(htmlAttribs);
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
export function getElementCSSClasses(htmlAttribs) {
  if (!htmlAttribs || !htmlAttribs.class) {
    return [];
  }
  return htmlAttribs.class.split(" ");
}

/**
 * Converts a html style to its equivalent react native style
 * @param {object} css: object of key value css strings
 * @param {string} styleset: the styleset to convert the styles against
 * @param {object} { parentTag, emSize, ignoredStyles }
 * @returns {object}
 */
function cssToRNStyle(
  css,
  styleset,
  { emSize, ptSize, ignoredStyles, allowedStyles }
) {
  const styleProps = stylePropTypes[styleset];
  return Object.keys(css)
    .filter((key) => (allowedStyles ? allowedStyles.indexOf(key) !== -1 : true))
    .filter((key) => (ignoredStyles || []).indexOf(key) === -1)
    .map((key) => [key, css[key]])
    .map(([key, value]) => {
      // Key convert
      return [
        key
          .split("-")
          .map((item, index) =>
            index === 0 ? item : item[0].toUpperCase() + item.substr(1)
          )
          .join(""),
        value,
      ];
    })
    .map(([key, value]) => {
      if (styleProps.indexOf(key) === -1) {
        return undefined;
      }
      if (typeof value === "string") {
        value = value.replace(/\s*!\s*important/, "");
        if (key === "display" && ["flex", "none"].indexOf(value) === -1) {
          return [key, "flex"];
        }
        if (key === "textAlign") {
          if (
            ["left", "right", "justify", "auto", "center"].indexOf(value) !== -1
          ) {
            return [key, value];
          }
          if (value === "start") {
            return [key, "left"];
          }
          if (value === "end") {
            return [key, "right"];
          }
          return undefined;
        }
        if (
          value
            .replace(/[-_]/g, "")
            .search(/\binherit\b|\bnormal\b|\bnone\b|(calc|var)\(.*\)/) !== -1
        ) {
          return undefined;
        }
        // See if we can use the percentage directly
        if (
          value.search(/[\d.]+%/) !== -1 &&
          PERC_SUPPORTED_STYLES.indexOf(key) !== -1
        ) {
          return [key, value];
        }
        if (value.search(/[\d.]+em/) !== -1) {
          const pxSize = parseFloat(value.replace("em", "")) * emSize;
          return [key, pxSize];
        }
        if (value.search(/[\d.]+pt/) !== -1) {
          const pxSize = parseFloat(value.replace("pt", "")) * ptSize;
          return [key, pxSize];
        }
        // See if we can convert a 20px to a 20 automagically
        const numericValue = parseFloat(value.replace("px", ""));
        if (key !== "fontWeight" && !isNaN(numericValue)) {
          if (styleProps.indexOf(key) !== -1) {
            return [key, numericValue];
          }
        }
        if (key === "fontSize") {
          return mapAbsoluteFontSize(key, value);
        }
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
 * @param {string} key: the key of style
 * @param {string} value: the value of style
 * @return {array}
 */
function mapAbsoluteFontSize(key, value) {
  let fontSize = value;
  if (ABSOLUTE_FONT_SIZE.hasOwnProperty(value)) {
    fontSize = ABSOLUTE_FONT_SIZE[value];
  }
  return [key, fontSize];
}

/**
 * @param str: the css style string
 * @param styleset=STYLESETS.TEXT: the styleset to convert the styles against
 * @return a react native style object
 */
export function cssStringToRNStyle(str, styleset = STYLESETS.TEXT, options) {
  return cssToRNStyle(cssStringToObject(str), styleset, options);
}

// Retrocompatibility with v4
exports._getElementClassStyles = getElementClassStyles;
exports._getElementCSSClasses = getElementCSSClasses;
exports._constructStyles = constructStyles;
