import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ViewPropTypes } from 'react-native';
import { BLOCK_TAGS, TEXT_TAGS, IGNORED_TAGS, TEXT_TAGS_IGNORING_ASSOCIATION, STYLESETS } from './HTMLUtils';
import { cssStringToRNStyle, _getElementClassStyles } from './HTMLStyles';
import { generateDefaultBlockStyles, generateDefaultTextStyles } from './HTMLDefaultStyles';
import htmlparser2 from 'htmlparser2';
import _isEqual from 'lodash.isequal';
import * as HTMLRenderers from './HTMLRenderers';

export default class HTML extends PureComponent {
    static propTypes = {
        renderers: PropTypes.object.isRequired,
        ignoredTags: PropTypes.array.isRequired,
        ignoredStyles: PropTypes.array.isRequired,
        decodeEntities: PropTypes.bool.isRequired,
        debug: PropTypes.bool.isRequired,
        listsPrefixesRenderers: PropTypes.object,
        ignoreNodesFunction: PropTypes.func,
        alterData: PropTypes.func,
        alterChildren: PropTypes.func,
        html: PropTypes.string,
        uri: PropTypes.string,
        tagsStyles: PropTypes.object,
        classesStyles: PropTypes.object,
        containerStyle: ViewPropTypes ? ViewPropTypes.style : View.propTypes.style,
        customWrapper: PropTypes.func,
        onLinkPress: PropTypes.func,
        onParsed: PropTypes.func,
        imagesMaxWidth: PropTypes.number,
        imagesInitialDimensions: PropTypes.shape({
            width: PropTypes.number,
            height: PropTypes.number
        }),
        emSize: PropTypes.number.isRequired,
        baseFontStyle: PropTypes.object.isRequired
    }

    static defaultProps = {
        renderers: HTMLRenderers,
        debug: false,
        decodeEntities: true,
        emSize: 14,
        ignoredTags: IGNORED_TAGS,
        ignoredStyles: [],
        baseFontStyle: { fontSize: 14 },
        tagsStyles: {},
        classesStyles: {}
    }

    constructor (props) {
        super(props);
        this.state = {};
        this.renderers = {
            ...HTMLRenderers,
            ...(this.props.renderers || {})
        };
        this.imgsToRender = [];
    }

    componentWillMount () {
        this.generateDefaultStyles();
    }

    componentDidMount () {
        this.registerDOM();
    }

    componentWillReceiveProps (nextProps) {
        const { html, uri, renderers, baseFontStyle } = this.props;

        if (html !== nextProps.html || uri !== nextProps.uri) {
            this.imgsToRender = [];
            this.registerDOM(nextProps);
        }
        if (renderers !== nextProps.renderers) {
            this.renderers = { ...HTMLRenderers, ...(nextProps.renderers || {}) };
        }
        if (!_isEqual(baseFontStyle, nextProps.baseFontStyle)) {
            this.generateDefaultStyles(nextProps.baseFontStyle);
        }
    }

    componentDidUpdate (prevProps, prevState) {
        if (this.state.dom !== prevState.dom) {
            this.parseDOM(this.state.dom);
        }
    }

    async registerDOM (props = this.props) {
        const { html, uri } = props;
        if (html) {
            this.setState({ dom: html });
        } else if (props.uri) {
            try {
                // WIP : This should render a loader and html prop should not be set in state
                // Error handling would be nice, too.
                let response = await fetch(uri);
                this.setState({ dom: response._bodyText });
            } catch (err) {
                console.warn('react-native-render-html', `Couldn't fetch remote HTML from uri : ${uri}`);
                return false;
            }
        } else {
            console.warn('react-native-render-html', 'Please provide the html or uri prop.');
        }
    }

    parseDOM (dom) {
        const { decodeEntities, debug, onParsed } = this.props;
        const parser = new htmlparser2.Parser(
            new htmlparser2.DomHandler((_err, dom) => {
                const RNElements = this.mapDOMNodesTORNElements(dom);
                onParsed && onParsed(dom, RNElements);
                this.setState({ RNNodes: this.renderRNElements(RNElements) });
                if (debug) {
                    console.log('DOMNodes from htmlparser2', dom);
                    console.log('RNElements from render-html', RNElements);
                }
            }),
            { decodeEntities: decodeEntities }
        );
        parser.write(dom);
        parser.done();
    }

    generateDefaultStyles (baseFontStyle = this.props.baseFontStyle) {
        this.defaultBlockStyles = generateDefaultBlockStyles(baseFontStyle.fontSize || 14);
        this.defaultTextStyles = generateDefaultTextStyles(baseFontStyle.fontSize || 14);
    }

    filterBaseFontStyles (element, classStyles) {
        const { tagsStyles, baseFontStyle } = this.props;
        const { tagName, parentTag, parent, attribs } = element;
        const styles = Object.keys(baseFontStyle);
        let appliedStyles = {};

        for (let i = 0; i < styles.length; i++) {
            const styleAttribute = styles[i];
            const styleAttributeWithCSSDashes = styleAttribute.replace(/[A-Z]/, (match) => { return `-${match.toLowerCase()}`; });
            const overridenFromStyle = attribs && attribs.style && attribs.style.search(styleAttributeWithCSSDashes) !== -1;
            const overridenFromParentStyle = parent && parent.attribs && parent.attribs.style && parent.attribs.style.search(styleAttributeWithCSSDashes) !== -1;

            const overridenFromTagStyle = tagName && tagsStyles[tagName] && tagsStyles[tagName][styleAttribute];
            const overridenFromParentTagStyle = parentTag && tagsStyles[parentTag] && tagsStyles[parentTag][styleAttribute];

            const overridenFromClassStyles = classStyles && classStyles[styleAttribute];

            const notOverriden = !overridenFromStyle && !overridenFromParentStyle &&
                !overridenFromTagStyle && !overridenFromParentTagStyle &&
                !overridenFromClassStyles;

            if (notOverriden) {
                appliedStyles[styleAttribute] = baseFontStyle[styleAttribute];
            }
        }
        return appliedStyles;
    }

    /**
     * Loop on children and return whether if their parent needs to be a <View>
     * @param {any} children
     * @returns {boolean}
     * @memberof HTML
     */
    childrenNeedAView (children) {
        for (let i = 0; i < children.length; i++) {
            if (children[i].wrapper === 'View') {
                // If we find at least one View, it has to be nested in one
                return true;
            }
        }
        // We didn't find a single view, it can be wrapped in a Text
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
    associateRawTexts (children) {
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            if ((child.wrapper === 'Text' && TEXT_TAGS_IGNORING_ASSOCIATION.indexOf(child.tagName) === -1) && children.length > 1 && (!child.parent || child.parent.name !== 'p')) {
                // Texts outside <p> or not <p> themselves (with siblings)
                let wrappedTexts = [];
                for (let j = i; j < children.length; j++) {
                    // Loop on its next siblings and store them in an array
                    // until we encounter a block or a <p>
                    let nextSibling = children[j];
                    if (nextSibling.wrapper !== 'Text' || TEXT_TAGS_IGNORING_ASSOCIATION.indexOf(nextSibling.tagName) !== -1) {
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
                        tagName: child.parent && child.parent.name === 'li' ? 'textwrapper' : 'p',
                        wrapper: 'Text'
                    };
                }
            }
        }
        return children.filter((parsedNode) => parsedNode !== false && parsedNode !== undefined);
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
    mapDOMNodesTORNElements (DOMNodes, parentTag = false) {
        const { ignoreNodesFunction, ignoredTags, alterData, alterChildren } = this.props;
        let RNElements = DOMNodes.map((node, nodeIndex) => {
            const { type, attribs, name, parent } = node;
            let { children, data } = node;
            if (ignoreNodesFunction && ignoreNodesFunction(node, parentTag) === true) {
                return false;
            }
            if (ignoredTags.map((tag) => tag.toLowerCase()).indexOf(node.name && node.name.toLowerCase()) !== -1) {
                return false;
            }
            if (alterData && data) {
                const alteredData = alterData(node);
                data = alteredData || data;
            }
            if (alterChildren && children) {
                const alteredChildren = alterChildren(node);
                children = alteredChildren || children;
            }
            // Remove whitespaces to check if it's just a blank text
            const strippedData = data && data.replace(/\s/g, '');
            if (type === 'text') {
                if (!strippedData || !strippedData.length) {
                    // This is blank, don't render an useless additional component
                    return false;
                }
                // Text without tags, these can be mapped to the Text wrapper
                return {
                    wrapper: 'Text',
                    data: data.replace(/(\r\n|\n|\r)/gm, ''), // remove linebreaks
                    attribs,
                    parent,
                    tagName: name || 'rawtext'
                };
            }
            if (type === 'tag') {
                if (children) {
                    // Recursively map all children with this method
                    children = this.associateRawTexts(this.mapDOMNodesTORNElements(children, name));
                }
                if (this.childrenNeedAView(children) || BLOCK_TAGS.indexOf(name.toLowerCase()) !== -1) {
                    // If children cannot be nested in a Text, or if the tag
                    // maps to a block element, use a view
                    return { wrapper: 'View', children, attribs, parent, tagName: name, parentTag };
                } else if (TEXT_TAGS.indexOf(name.toLowerCase()) !== -1 || MIXED_TAGS.indexOf(name.toLowerCase()) !== -1) {
                    // We are able to nest its children inside a Text
                    return { wrapper: 'Text', children, attribs, parent, tagName: name, parentTag };
                }
                return { wrapper: 'View', children, attribs, parent, tagName: name, parentTag };
            }
        })
        .filter((parsedNode) => parsedNode !== false && parsedNode !== undefined) // remove useless nodes
        .map((parsedNode, nodeIndex) => {
            const { wrapper, children, attribs, tagName } = parsedNode;
            const firstChild = children && children[0];
            if (firstChild && children.length === 1) {
                // Specific tweaks for wrappers with a single child
                if ((attribs === firstChild.attribs || !firstChild.attribs) &&
                    firstChild.wrapper === wrapper &&
                    (tagName === firstChild.tagName || firstChild.tagName === 'rawtext')) {
                    // If the only child of a node is using the same wrapper, merge them into one
                    return {
                        ...parsedNode,
                        attribs: { ...attribs, ...firstChild.attribs },
                        data: firstChild.data,
                        children: [],
                        tagName,
                        nodeIndex
                    };
                } else if (['rawtext', 'textwrapper'].indexOf(firstChild.tagName) !== -1 && wrapper === 'View') {
                    // If the only child of a View node, assign its attributes to it so the
                    // text styles are applied properly even when they're not the direct target
                    firstChild.attribs = attribs;
                    parsedNode.attribs = {};
                }
            }
            return { ...parsedNode, nodeIndex };
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
    renderRNElements (RNElements, parentWrapper = 'root', parentIndex = 0) {
        const { tagsStyles, classesStyles, emSize, ignoredStyles } = this.props;
        return RNElements && RNElements.length ? RNElements.map((element, index) => {
            const { attribs, data, tagName, parentTag, children, nodeIndex, wrapper } = element;
            const Wrapper = wrapper === 'Text' ? Text : View;
            const key = `${wrapper}-${parentIndex}-${nodeIndex}-${tagName}-${index}-${parentTag}`;
            const convertedCSSStyles =
                attribs && attribs.style ?
                    cssStringToRNStyle(
                        attribs.style,
                        Wrapper === Text ? STYLESETS.TEXT : STYLESETS.VIEW, // proper prop-types validation
                        { parentTag: tagName, emSize, ignoredStyles }
                    ) :
                    {};

            const childElements = children && children.length ?
                children.map((child, childIndex) => this.renderRNElements([child], wrapper, index)) :
                false;

            if (this.renderers[tagName]) {
                // If a custom renderer is available for this tag
                return this.renderers[tagName](
                    attribs,
                    childElements,
                    convertedCSSStyles,
                    {
                        ...this.props,
                        parentWrapper: wrapper,
                        parentTag,
                        nodeIndex,
                        parentIndex,
                        key,
                        data,
                        rawChildren: children
                    });
            }

            const classStyles = _getElementClassStyles(attribs, classesStyles);
            const textElement = data ?
                <Text style={this.filterBaseFontStyles(element, classStyles)}>{ data }</Text> :
                false;

            const style = [
                (!tagsStyles || !tagsStyles[tagName]) ? (Wrapper === Text ? this.defaultTextStyles : this.defaultBlockStyles)[tagName] : undefined,
                tagsStyles ? tagsStyles[tagName] : undefined,
                classStyles,
                convertedCSSStyles
            ]
            .filter((s) => s !== undefined);

            return (
                <Wrapper key={key} style={style}>
                    { textElement }
                    { childElements }
                </Wrapper>
            );
        }) : false;
    }

    render () {
        const { customWrapper } = this.props;
        const { RNNodes } = this.state;
        if (!RNNodes) {
            return false;
        }

        return customWrapper ? customWrapper(RNNodes) : (
            <View style={this.props.containerStyle || {}}>
                { RNNodes }
            </View>
        );
    }
}
