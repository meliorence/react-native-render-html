/* eslint-disable react-native/no-inline-styles */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  Linking,
} from "react-native";
import {
  cssStringToRNStyle,
  getElementClassStyles,
  cssStringToObject,
  cssObjectToString,
  computeTextStyles,
} from "./HTMLStyles";
import {
  BLOCK_TAGS,
  TEXT_TAGS,
  MIXED_TAGS,
  IGNORED_TAGS,
  TEXT_TAGS_IGNORING_ASSOCIATION,
  STYLESETS,
  TextOnlyPropTypes,
  PREFORMATTED_TAGS,
} from "./HTMLUtils";
import {
  generateDefaultBlockStyles,
  generateDefaultTextStyles,
} from "./HTMLDefaultStyles";
import { DomHandler, Parser } from "htmlparser2";
import deprecated from "deprecated-prop-type";
import * as HTMLRenderers from "./HTMLRenderers";

const DEPREC_MSG = "This prop will be removed in the v6 release. ";

function sourceObjectsAreEqual(oldSource, newSource) {
  return oldSource.uri === newSource.uri && oldSource.html === newSource.html;
}

function sourceHasChange(oldProps, newProps) {
  return (
    oldProps.uri !== newProps.uri ||
    oldProps.html !== newProps.html ||
    (oldProps.source !== newProps.source &&
      !sourceObjectsAreEqual(oldProps.source, newProps.source))
  );
}

export default class HTML extends PureComponent {
  static propTypes = {
    allowWhitespaceNodes: PropTypes.bool,
    renderers: PropTypes.object.isRequired,
    ignoredTags: PropTypes.array.isRequired,
    ignoredStyles: PropTypes.array.isRequired,
    allowedStyles: PropTypes.array,
    htmlParserOptions: PropTypes.object,
    debug: PropTypes.bool.isRequired,
    listsPrefixesRenderers: PropTypes.object,
    ignoreNodesFunction: PropTypes.func,
    alterData: PropTypes.func,
    alterChildren: PropTypes.func,
    alterNode: PropTypes.func,
    tagsStyles: PropTypes.object,
    classesStyles: PropTypes.object,
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    customWrapper: PropTypes.func,
    onLinkPress: PropTypes.func,
    onParsed: PropTypes.func,
    computeEmbeddedMaxWidth: PropTypes.func,
    contentWidth: PropTypes.number,
    enableExperimentalPercentWidth: PropTypes.bool,
    imagesInitialDimensions: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
    }),
    emSize: PropTypes.number.isRequired,
    ptSize: PropTypes.number.isRequired,
    baseFontStyle: PropTypes.object.isRequired,
    renderersProps: PropTypes.object,
    WebView: PropTypes.elementType,
    defaultTextProps: PropTypes.object,
    defaultWebViewProps: PropTypes.object,
    source: PropTypes.oneOfType([
      PropTypes.shape({
        uri: PropTypes.string.isRequired,
        method: PropTypes.string,
        headers: PropTypes.object,
        body: PropTypes.string,
      }),
      PropTypes.shape({
        html: PropTypes.string.isRequired,
        baseUrl: PropTypes.string,
      }),
    ]),
    // DEPRECATED
    allowFontScaling: deprecated(
      PropTypes.bool,
      DEPREC_MSG + 'Use "defaultTextProps.allowFontScaling" prop instead.'
    ),
    textSelectable: deprecated(
      PropTypes.bool,
      DEPREC_MSG + 'Use "defaultTextProps.textSelectable" prop instead.'
    ),
    decodeEntities: deprecated(
      PropTypes.bool,
      DEPREC_MSG + 'Use "htmlParserOptions.decodeEntities" prop instead.'
    ),
    html: deprecated(
      PropTypes.string,
      DEPREC_MSG + 'Use "source.html" prop instead.'
    ),
    uri: deprecated(
      PropTypes.string,
      DEPREC_MSG + 'Use "source.uri" prop instead.'
    ),
  };

  static defaultProps = {
    allowWhitespaceNodes: false,
    renderers: HTMLRenderers,
    debug: false,
    emSize: 14,
    ptSize: 1.3,
    contentWidth: Dimensions.get("window").width,
    enableExperimentalPercentWidth: false,
    computeEmbeddedMaxWidth: (contentWidth) => contentWidth,
    ignoredTags: IGNORED_TAGS,
    ignoredStyles: [],
    baseFontStyle: { fontSize: 14 },
    tagsStyles: {},
    classesStyles: {},

    onLinkPress: (_e, href) =>
      Linking.canOpenURL(href) && Linking.openURL(href),
    defaultTextProps: {
      allowFontScaling: true,
      selectable: false,
    },
    htmlParserOptions: {
      decodeEntities: true,
    },
    defaultWebViewProps: {},
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.renderers = {
      ...HTMLRenderers,
      ...(this.props.renderers || {}),
    };
    this.mounted = false;
    this.generateDefaultStyles(props.baseFontStyle);
  }

  setStateSafe(...args) {
    this.mounted && this.setState(...args);
  }

  componentDidMount() {
    this.mounted = true;
    this.registerDOM();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      renderers,
      baseFontStyle,
      tagsStyles,
      classesStyles,
      contentWidth,
      computeEmbeddedMaxWidth,
    } = prevProps;
    let shouldParseDOM =
      tagsStyles !== this.props.tagsStyles ||
      classesStyles !== this.props.classesStyles ||
      contentWidth !== this.props.contentWidth ||
      computeEmbeddedMaxWidth !== this.props.computeEmbeddedMaxWidth ||
      baseFontStyle !== this.props.baseFontStyle ||
      this.state.dom !== prevState.dom;

    this.generateDefaultStyles(this.props.baseFontStyle);
    if (renderers !== this.props.renderers) {
      this.renderers = { ...HTMLRenderers, ...(this.props.renderers || {}) };
    }
    if (sourceHasChange(prevProps, this.props)) {
      // If the source changed, register the new HTML and parse it
      this.registerDOM(this.props);
    }
    if (shouldParseDOM) {
      this.parseDOM(this.state.dom, this.props);
    }
  }

  async registerDOM(props = this.props, cb) {
    const html = props.html || (props.source ? props.source.html : null);
    const uri = props.uri || (props.source ? props.source.uri : null);
    if (html) {
      this.setStateSafe({
        dom: html,
        loadingRemoteURL: false,
        errorLoadingRemoteURL: false,
      });
    } else if (uri) {
      try {
        const { body = null, method = "GET", headers = {} } = props.source
          ? props.source
          : {};
        try {
          this.setStateSafe({
            loadingRemoteURL: true,
            errorLoadingRemoteURL: false,
          });
          const response = await fetch(uri, {
            body,
            method,
            headers,
          });
          const dom = await response.text();
          this.setStateSafe({ dom, loadingRemoteURL: false });
        } catch (err) {
          console.warn(err);
          this.setStateSafe({
            errorLoadingRemoteURL: true,
            loadingRemoteURL: false,
          });
        }
      } catch (err) {
        console.warn(
          "react-native-render-html",
          `Couldn't fetch remote HTML from uri : ${uri}`
        );
        return false;
      }
    } else {
      console.warn(
        "react-native-render-html",
        "Please provide the source.html or source.uri prop."
      );
    }
  }

  parseDOM(dom, props = this.props) {
    const { htmlParserOptions, decodeEntities, debug, onParsed } = this.props;
    const parser = new Parser(
      new DomHandler((_err, ldom) => {
        let RNElements = this.mapDOMNodesTORNElements(ldom, false, props);
        if (onParsed) {
          const alteredRNElements = onParsed(ldom, RNElements);
          if (alteredRNElements) {
            RNElements = alteredRNElements;
          }
        }
        this.setStateSafe({
          RNNodes: this.renderRNElements(RNElements, "root", 0, props),
        });
        if (debug) {
          console.log("DOMNodes from htmlparser2", ldom);
          console.log("RNElements from render-html", RNElements);
        }
      }),
      {
        ...htmlParserOptions,
        ...(typeof decodeEntities === "boolean" ? { decodeEntities } : {}),
      }
    );
    parser.write(dom);
    parser.done();
  }

  generateDefaultStyles(baseFontStyle = this.props.baseFontStyle) {
    this.defaultBlockStyles = generateDefaultBlockStyles(
      baseFontStyle.fontSize || 14
    );
    this.defaultTextStyles = generateDefaultTextStyles(
      baseFontStyle.fontSize || 14
    );
  }

  /**
   * Loop on children and return whether if their parent needs to be a <View>
   * @param {any} children
   * @returns {boolean}
   * @memberof HTML
   */
  childrenNeedAView(children) {
    for (let i = 0; i < children.length; i++) {
      if (children[i].wrapper === "View") {
        // If we find at least one View, it has to be nested in one
        return true;
      }
    }
    // We didn't find a single view, it can be wrapped in a Text
    return false;
  }

  wrapperHasTextChild(children) {
    for (let i = 0; i < children.length; i++) {
      if (children[i].wrapper === "Text") {
        return true;
      }
    }
    return false;
  }

  /**
   * Loops on children an find texts that need to be wrapped so we don't render line breaks
   * The wrapper can either be a <p> when it should be a paragraph, or a custom tag named
   * "textwrapper", which renders a plain <Text> component.
   * @param {any} children
   * @returns {array}
   * @memberof HTML
   */
  associateRawTexts(children) {
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (
        child.wrapper === "Text" &&
        TEXT_TAGS_IGNORING_ASSOCIATION.indexOf(child.tagName) === -1 &&
        children.length > 1 &&
        (!child.parent ||
          TEXT_TAGS_IGNORING_ASSOCIATION.indexOf(child.parent.name) === -1)
      ) {
        // Texts outside <p> or not <p> themselves (with siblings)
        let wrappedTexts = [];
        for (let j = i; j < children.length; j++) {
          // Loop on its next siblings and store them in an array
          // until we encounter a block or a <p>
          let nextSibling = children[j];
          if (
            nextSibling.wrapper !== "Text" ||
            TEXT_TAGS_IGNORING_ASSOCIATION.indexOf(nextSibling.tagName) !== -1
          ) {
            break;
          }
          wrappedTexts.push(nextSibling);
          // Remove the child that has been nested
          children[j] = false;
        }
        // Replace the raw text with a <p> that has wrappedTexts as its children
        if (wrappedTexts.length) {
          children[i] = {
            attribs: {},
            children: wrappedTexts,
            nodeIndex: i,
            parent: child.parent,
            parentTag: child.parentTag,
            tagName: "textwrapper",
            wrapper: "Text",
          };
        }
      }
    }
    return children.filter(
      (parsedNode) => parsedNode !== false && parsedNode !== undefined
    );
  }

  /**
   * Maps the DOM nodes parsed by htmlparser2 into a simple structure that will be easy to render with
   * native components. It removes ignored tags, chooses the right wrapper for each set of children
   * to ensure we're not wrapping views inside texts and improves the structure recursively
   * to prevent erratic rendering.
   * @param {array} DOMNodes
   * @param {boolean} [parentTag=false]
   * @returns
   * @memberof HTML
   */
  mapDOMNodesTORNElements(DOMNodes, parentTag = false, props = this.props) {
    const {
      allowWhitespaceNodes,
      ignoreNodesFunction,
      ignoredTags,
      alterNode,
      alterData,
      alterChildren,
      tagsStyles,
      classesStyles,
    } = props;
    let RNElements = DOMNodes.map((node, nodeIndex) => {
      let { children, data } = node;
      if (
        ignoreNodesFunction &&
        ignoreNodesFunction(node, parentTag) === true
      ) {
        return false;
      }
      if (
        ignoredTags
          .map((tag) => tag.toLowerCase())
          .indexOf(node.name && node.name.toLowerCase()) !== -1
      ) {
        return false;
      }

      if (alterNode) {
        const alteredNode = alterNode(node);
        node = alteredNode || node;
      }
      const { type, attribs, name, parent } = node;

      if (alterData && data) {
        const alteredData = alterData(node);
        data = alteredData || data;
      }
      if (alterChildren && children) {
        const alteredChildren = alterChildren(node);
        children = alteredChildren || children;
      }
      // Remove whitespaces to check if it's just a blank text
      const strippedData = data && data.replace(/\s/g, "");
      if (type === "text") {
        if ((!strippedData || !strippedData.length) && !allowWhitespaceNodes) {
          // This is blank, don't render an useless additional component
          return false;
        }

        if (
          node.parent &&
          node.parent.name &&
          PREFORMATTED_TAGS.indexOf(node.parent.name) === -1
        ) {
          // Remove line breaks in non-pre-formatted tags
          data = data.replace(/(\r\n|\n|\r)/gm, "");
        }

        // Text without tags, these can be mapped to the Text wrapper
        return {
          wrapper: "Text",
          data: data,
          attribs: attribs || {},
          parent,
          parentTag: parent && parent.name,
          tagName: name || "rawtext",
          domNode: node,
          nodeIndex,
        };
      }
      if (type === "tag") {
        if (children) {
          // Recursively map all children with this method
          children = this.associateRawTexts(
            this.mapDOMNodesTORNElements(children, name)
          );
        }
        let wrapper = "View";
        if (this.childrenNeedAView(children)) {
          wrapper = "View";
        } else if (this.renderers[name] && this.renderers[name].wrapper) {
          wrapper = this.renderers[name].wrapper;
        } else if (BLOCK_TAGS.indexOf(name.toLowerCase()) !== -1) {
          wrapper = "View";
        } else if (
          TEXT_TAGS.indexOf(name.toLowerCase()) !== -1 ||
          MIXED_TAGS.indexOf(name.toLowerCase()) !== -1
        ) {
          wrapper = "Text";
        }
        return {
          wrapper,
          children,
          attribs,
          parent,
          tagName: name,
          parentTag,
          domNode: node,
          nodeIndex,
        };
      }
    })
      .filter((parsedNode) => parsedNode !== false && parsedNode !== undefined) // remove useless nodes
      .map((parsedNode, nodeIndex) => {
        const { wrapper, children, attribs, tagName } = parsedNode;
        const firstChild = children && children[0];
        if (firstChild && children.length === 1) {
          // Specific tweaks for wrappers with a single child
          if (
            (attribs === firstChild.attribs || !firstChild.attribs) &&
            firstChild.wrapper === wrapper &&
            (tagName === firstChild.tagName || firstChild.tagName === "rawtext")
          ) {
            // If the only child of a node is using the same wrapper, merge them into one
            return {
              ...parsedNode,
              attribs: { ...attribs, ...firstChild.attribs },
              data: firstChild.data,
              children: [],
              tagName,
              nodeIndex,
            };
          }
        }
        return { ...parsedNode, nodeIndex };
      })
      .map((parsedNode, nodeIndex) => {
        const { wrapper, attribs, tagName, children } = parsedNode;
        if (
          wrapper === "View" &&
          attribs &&
          this.wrapperHasTextChild(children)
        ) {
          // When encountering a View wrapper that has some styles and also Text children,
          // let's filter out text-only styles and apply those to *all* Text children and
          // remove them from the wrapper, mimicking browsers' behaviour better.
          const wrapperStyles = {
            ...(tagsStyles[tagName] || {}),
            ...getElementClassStyles(attribs, classesStyles),
            ...cssStringToObject(attribs.style || ""),
          };

          let textChildrenInheritedStyles = {};
          Object.keys(wrapperStyles).forEach((styleKey) => {
            // Extract text-only styles
            if (TextOnlyPropTypes.indexOf(styleKey) !== -1) {
              textChildrenInheritedStyles[styleKey] = wrapperStyles[styleKey];
              delete wrapperStyles[styleKey];
            }
          });
          if (Object.keys(textChildrenInheritedStyles).length === 0) {
            // No style to apply to text children, avoid unnecessary loops
            return parsedNode;
          }
          // Re-write wrapper's styles as a string
          parsedNode.attribs.style = cssObjectToString(wrapperStyles);
          for (let i = 0; i < children.length; i++) {
            const child = children[i];
            const { wrapper: lwrapper, attribs: lattribs } = child;

            if (lwrapper === "Text") {
              // Set (or merge) the inherited text styles extracted from the wrapper for
              // each Text child
              if (!lattribs.style) {
                child.attribs.style = cssObjectToString(
                  textChildrenInheritedStyles
                );
              } else {
                child.attribs.style = cssObjectToString({
                  ...textChildrenInheritedStyles,
                  ...cssStringToObject(child.attribs.style),
                });
              }
            }
          }
        }
        return parsedNode;
      });
    return this.associateRawTexts(RNElements);
  }

  /**
   * Takes the parsed nodes from mapDOMNodesTORNElements and actually renders native components.
   * Calls the utils that convert the CSS into react-native compatible styles and renders custom
   * components when needed.
   * @param {boolean} RNElements
   * @param {string} [parentWrapper='root']
   * @param {number} [parentIndex=0]
   * @returns {array}
   * @memberof HTML
   */
  renderRNElements(
    RNElements,
    parentWrapper = "root",
    parentIndex = 0,
    props = this.props
  ) {
    const {
      allowFontScaling,
      allowedStyles,
      baseFontStyle,
      classesStyles,
      emSize,
      ignoredStyles,
      ptSize,
      tagsStyles,
      textSelectable,
      defaultTextProps: { style: _textStlye, ...defaultTextProps },
    } = props;

    return RNElements && RNElements.length
      ? RNElements.map((element, index) => {
          const {
            attribs,
            data,
            tagName,
            parentTag,
            children,
            nodeIndex,
            wrapper,
            domNode,
          } = element;
          const Wrapper = wrapper === "Text" ? Text : View;
          const key = `${wrapper}-${parentIndex}-${nodeIndex}-${tagName}-${index}-${parentTag}`;
          const convertedCSSStyles =
            attribs && attribs.style
              ? cssStringToRNStyle(
                  attribs.style,
                  Wrapper === Text ? STYLESETS.TEXT : STYLESETS.VIEW, // proper prop-types validation
                  {
                    parentTag: tagName,
                    emSize,
                    ptSize,
                    ignoredStyles,
                    allowedStyles,
                  }
                )
              : {};

          const childElements =
            children && children.length
              ? children.map((child, childIndex) =>
                  this.renderRNElements([child], wrapper, index, props)
                )
              : false;

          let renderersProps = {};
          if (Wrapper === Text) {
            renderersProps = {
              ...defaultTextProps,
            };
            if (typeof textSelectable === "boolean") {
              renderersProps.selectable = textSelectable;
            }
            if (typeof allowFontScaling === "boolean") {
              renderersProps.allowFontScaling = allowFontScaling;
            }
          }

          if (this.renderers[tagName]) {
            const customRenderer =
              typeof this.renderers[tagName] === "function"
                ? this.renderers[tagName]
                : this.renderers[tagName].renderer;

            if (!customRenderer || typeof customRenderer !== "function") {
              console.warn(
                `Custom renderer for ${tagName} supplied incorrectly. Please check out the docs.`
              );
              return undefined;
            }
            // If a custom renderer is available for this tag
            return customRenderer(attribs, childElements, convertedCSSStyles, {
              ...props,
              parentWrapper: wrapper,
              parentTag,
              nodeIndex,
              parentIndex,
              key,
              data,
              transientChildren: children,
              domNode: domNode,
              ...renderersProps,
            });
          }

          const classStyles = getElementClassStyles(attribs, classesStyles);
          const textElement = data ? (
            <Text
              style={computeTextStyles(element, {
                defaultTextStyles: this.defaultTextStyles,
                tagsStyles,
                classesStyles,
                baseFontStyle,
                emSize,
                ptSize,
                ignoredStyles,
                allowedStyles,
              })}
              {...renderersProps}
            >
              {data}
            </Text>
          ) : (
            false
          );

          const style = [
            !tagsStyles || !tagsStyles[tagName]
              ? (Wrapper === Text
                  ? this.defaultTextStyles
                  : this.defaultBlockStyles)[tagName]
              : undefined,
            tagsStyles ? tagsStyles[tagName] : undefined,
            classStyles,
            convertedCSSStyles,
          ].filter((s) => s !== undefined);

          return (
            <Wrapper key={key} style={style} {...renderersProps}>
              {textElement}
              {childElements}
            </Wrapper>
          );
        })
      : false;
  }

  render() {
    const {
      allowFontScaling,
      customWrapper,
      remoteLoadingView,
      remoteErrorView,
    } = this.props;
    const { RNNodes, loadingRemoteURL, errorLoadingRemoteURL } = this.state;
    if (!RNNodes && !loadingRemoteURL && !errorLoadingRemoteURL) {
      return null;
    } else if (loadingRemoteURL) {
      return remoteLoadingView ? (
        remoteLoadingView(this.props, this.state)
      ) : (
        <View style={{ flex: 1, alignItems: "center" }}>
          <ActivityIndicator />
        </View>
      );
    } else if (errorLoadingRemoteURL) {
      return remoteErrorView ? (
        remoteErrorView(this.props, this.state)
      ) : (
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text
            allowFontScaling={allowFontScaling}
            style={{ fontStyle: "italic", fontSize: 16 }}
          >
            Could not load {this.props.uri}
          </Text>
        </View>
      );
    }

    return customWrapper ? (
      customWrapper(RNNodes)
    ) : (
      <View style={this.props.containerStyle || {}}>{RNNodes}</View>
    );
  }
}
