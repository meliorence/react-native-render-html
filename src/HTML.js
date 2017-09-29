import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { STYLESETS, cssStringToRNStyle, defaultBlockStyles, defaultTextStyles, _getElementClassStyles } from './HTMLStyles';
import htmlparser2 from 'htmlparser2';
import * as HTMLRenderers from './HTMLRenderers';

const BLOCK_TAGS = ['address', 'article', 'aside', 'footer', 'hgroup', 'nav', 'section', 'blockquote', 'dd', 'div',
    'dl', 'dt', 'figure', 'hr', 'li', 'main', 'ol', 'ul', 'br', 'cite', 'data', 'rp', 'rtc', 'ruby', 'area',
    'img', 'map', 'center'];

const TEXT_TAGS = ['a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'figcaption', 'p', 'pre', 'abbr', 'b', 'bdi', 'bdo', 'code',
    'dfn', 'i', 'kbd', 'mark', 'q', 'rt', 's', 'samp', 'small', 'big', 'span', 'strong', 'sub', 'sup', 'time', 'u', 'var', 'wbr',
    'del', 'ins', 'blink', 'font', 'em', 'bold'];

const IGNORED_TAGS = ['head', 'scripts', 'audio', 'video', 'track', 'embed', 'object', 'param', 'source', 'canvas', 'noscript',
    'caption', 'col', 'colgroup', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 'button', 'datalist', 'fieldset', 'form',
    'input', 'label', 'legend', 'meter', 'optgroup', 'option', 'output', 'progress', 'select', 'textarea', 'details', 'diaglog',
    'menu', 'menuitem', 'summary'];

export default class HTML extends PureComponent {

    static propTypes = {
        renderers: PropTypes.object.isRequired,
        ignoredTags: PropTypes.array.isRequired,
        ignoredStyles: PropTypes.array.isRequired,
        ignoreNodesFunction: PropTypes.func,
        html: PropTypes.string,
        uri: PropTypes.string,
        tagsStyles: PropTypes.object,
        classesStyles: PropTypes.object,
        containerStyle: View.propTypes.style,
        onLinkPress: PropTypes.func,
        imagesMaxWidth: PropTypes.number,
        emSize: PropTypes.number.isRequired
    }

    static defaultProps = {
        renderers: HTMLRenderers,
        emSize: 14,
        ignoredTags: IGNORED_TAGS,
        ignoredStyles: [],
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
        this.registerIgnoredTags();
        this.registerDOM();
    }

    componentWillReceiveProps (nextProps) {
        if (this.props.html !== nextProps.html || this.props.uri !== nextProps.uri) {
            this.imgsToRender = [];
            this.registerDOM(nextProps);
        }
        if (this.props.ignoredTags !== nextProps.ignoredTags) {
            this.registerIgnoredTags(nextProps);
        }
        if (this.props.renderers !== nextProps.renderers) {
            this.renderers = { ...HTMLRenderers, ...(nextProps.renderers || {}) };
        }
    }

    async registerDOM (props = this.props) {
        const { html, uri } = props;
        if (html) {
            this.setState({ dom: props.html });
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

    registerIgnoredTags (props = this.props) {
        this._ignoredTags = props.ignoredTags.map((tag) => tag.toLowerCase());
    }

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

    associateRawTexts (children) {
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            if ((child.wrapper === 'Text' && child.tagName !== 'p') && children.length > 1 && (!child.parent || child.parent.name !== 'p')) {
                // Texts outside <p> or not <p> themselves (with siblings)
                let wrappedTexts = [];
                for (let j = i; j < children.length; j++) {
                    // Loop on its next siblings and store them in an array
                    // until we encounter a block or a <p>
                    let nextSibling = children[j];
                    if (nextSibling.wrapper !== 'Text' || nextSibling.tagName === 'p') {
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
                        tagName: 'p',
                        wrapper: 'Text'
                    };
                }
            }
        }
        return children;
    }

    mapDOMNodesTORNElements (DOMNodes, parentTag = false) {
        const { ignoreNodesFunction } = this.props;
        let RNElements = DOMNodes.map((node, nodeIndex) => {
            const { type, attribs, name, data, parent } = node;
            let { children } = node;
            if (ignoreNodesFunction && ignoreNodesFunction(node, parentTag) === true) {
                return false;
            }
            if (this._ignoredTags.indexOf(node.name) !== -1) {
                return false;
            }
            // Remove whitespaces to check if it's just a blank text
            const strippedData = data && data.replace(/\s/g, '');
            if (type === 'text') {
                if (!strippedData || !strippedData.length) {
                    // This is blank, don't render an useless additional component
                    return false;
                }
                // Text without tags or line breaks, this can be mapped to the Text
                // wrapper without any modification
                return { wrapper: 'Text', data, attribs, parent, tagName: name || 'rawtext' };
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
                } else if (TEXT_TAGS.indexOf(name.toLowerCase()) !== -1) {
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
            if (firstChild &&
                children.length === 1 &&
                attribs === firstChild.attribs &&
                firstChild.wrapper === wrapper && (tagName === firstChild.tagName || firstChild.tagName === 'rawtext')) {
                // If the only child of a node is using the same wrapper, merge them into one
                return {
                    ...parsedNode,
                    attribs: { ...attribs, ...firstChild.attribs },
                    data: firstChild.data,
                    children: [],
                    tagName,
                    nodeIndex
                };
            }
            return { ...parsedNode, nodeIndex };
        });
        return this.associateRawTexts(RNElements);
    }

    renderRNElements (RNElements, parentWrapper = 'root', parentIndex = 0) {
        const { tagsStyles, classesStyles, onLinkPress, imagesMaxWidth, emSize, ignoredStyles } = this.props;
        return RNElements && RNElements.length ? RNElements.map((element, index) => {
            const { attribs, data, tagName, parentTag, children, nodeIndex, wrapper } = element;
            const convertedCSSStyles =
                attribs && attribs.style ?
                    cssStringToRNStyle(
                        attribs.style,
                        Wrapper === Text ? STYLESETS.TEXT : STYLESETS.VIEW,
                        { parentTag: tagName, emSize, ignoredStyles }
                    ) :
                    {};

            const childElements = children && children.length ?
                children.map((child, childIndex) => this.renderRNElements([child], wrapper, index)) :
                false;

            if (this.renderers[tagName]) {
                return this.renderers[tagName](
                    attribs,
                    childElements,
                    convertedCSSStyles,
                    {
                        parentWrapper: wrapper,
                        tagsStyles,
                        classesStyles,
                        onLinkPress,
                        imagesMaxWidth,
                        parentTag,
                        nodeIndex,
                        rawChildren: children
                    });
            }

            const textElement = data ? <Text>{ data }</Text> : false;

            const classStyles = _getElementClassStyles(attribs, classesStyles);
            const style = [
                (Wrapper === Text ? defaultTextStyles : defaultBlockStyles)[tagName],
                tagsStyles ? tagsStyles[tagName] : undefined,
                convertedCSSStyles,
                classStyles
            ]
            .filter((s) => s !== undefined);

            return (
                <Wrapper key={`${wrapper}-${parentIndex}-${nodeIndex}-${index}`} style={style}>
                    { textElement }
                    { childElements }
                </Wrapper>
            );
        }) : false;
    }

    render () {
        const { dom } = this.state;
        if (!dom) {
            return false;
        }
        let RNNodes;
        const parser = new htmlparser2.Parser(
            new htmlparser2.DomHandler((_err, dom) => {
                console.log('DOMNodes', dom);
                console.log('Parsed nodes', this.mapDOMNodesTORNElements(dom));
                const RNElements = this.mapDOMNodesTORNElements(dom);
                RNNodes = this.renderRNElements(RNElements);
            })
        );
        parser.write(dom);
        parser.done();

        return (
            <View style={this.props.containerStyle || {}}>
                { RNNodes }
            </View>
        );
    }
}
