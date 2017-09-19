import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import htmlparser2 from 'htmlparser2';
import HTMLElement from './HTMLElement';
import HTMLTextNode from './HTMLTextNode';
import HTMLRenderers from './HTMLRenderers';
import HTMLStyles from './HTMLStyles';
import { TEXT_TAG_NAMES } from './HTMLUtils';

export default class HTML extends PureComponent {

    static propTypes = {
        renderers: PropTypes.object.isRequired,
        ignoredTags: PropTypes.array.isRequired,
        ignoredStyles: PropTypes.array.isRequired,
        html: PropTypes.string,
        uri: PropTypes.string,
        htmlStyles: PropTypes.object,
        containerStyle: View.propTypes.style,
        onLinkPress: PropTypes.func,
        imagesMaxWidth: PropTypes.number,
        emSize: PropTypes.number.isRequired
    }

    static defaultProps = {
        renderers: HTMLRenderers,
        emSize: 14,
        ignoredTags: ['head', 'scripts'],
        ignoredStyles: []
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

    /**
     * Returns an RN element from the HTML node being parsed
     * @param node: object
     * @param index: number
     * @param groupInfo: object
     * @param parentTagName: string
     * @parentIsText: bool
     */
    createElement (node, index, groupInfo, parentTagName, parentIsText) {
        const { htmlStyles, imagesMaxWidth, onLinkPress, emSize, ignoredStyles } = this.props;
        return (
            <HTMLElement
              key={index}
              htmlStyles={htmlStyles}
              imagesMaxWidth={imagesMaxWidth}
              htmlAttribs={node.attribs}
              tagName={node.name}
              groupInfo={groupInfo}
              parentTagName={parentTagName}
              parentIsText={parentIsText}
              onLinkPress={onLinkPress}
              renderers={this.renderers}
              emSize={emSize}
              ignoredStyles={ignoredStyles}>
                { this.renderHtmlAsRN(node.children, node.name, !HTMLStyles.blockElements.has(node.name)) }
            </HTMLElement>
        );
    }

  /**
   * Returns if a text node is worth being rendered.
   * Loop on it and its children and look for actual text to display,
   * if none is found, don't render it (a single img or an empty p for instance)
   */
    shouldRenderNode (node) {
        const textType = TEXT_TAG_NAMES.has(node.type);
        const hasChildren = node.children.length;

        if (textType && !hasChildren) {
            return false;
        }
        return true;
    }

    /**
    * Converts the html elements to RN elements
    * @param htmlElements: the array of html elements
    * @param parentTagName='body': the parent html element if any
    * @param parentIsText: true if the parent element was a text-y element
    * @return the equivalent RN elements
    */
    renderHtmlAsRN (htmlElements, parentTagName, parentIsText) {
        return htmlElements.map((node, index, list) => {
            if (this._ignoredTags.indexOf(node.name) !== -1) {
                return false;
            }
            if (node.type === 'text') {
                const str = HTMLTextNode.removeWhitespaceListHTML(node.data, index, parentTagName);
                if (str.length) {
                    return (<HTMLTextNode key={index}>{str}</HTMLTextNode>);
                } else {
                    return false;
                }
            } else if (node.type === 'tag') {
                // Generate grouping info if we are a group-type element
                let groupInfo;
                if (node.name === 'li') {
                    groupInfo = {
                        index: htmlElements.reduce((acc, e) => {
                            if (e === node) {
                                acc.found = true;
                            } else if (!acc.found && e.type === 'tag' && e.name === 'li') {
                                acc.index++;
                            }
                            return acc;
                        },
                        { index: 0, found: false }).index,
                        count: htmlElements.filter((e) => e.type === 'tag' && e.name === 'li').length
                    };
                }

                let ElementsToRender;
                const Element = this.createElement(node, index, groupInfo, parentTagName, parentIsText);

                if (this.imgsToRender.length && !parentIsText) {
                    ElementsToRender = (
                        <View key={index}>
                            { this.imgsToRender.map((img, imgIndex) => <View key={`view-${index}-image-${imgIndex}`}>{ img }</View>) }
                            { Element }
                        </View>
                    );
                    this.imgsToRender = [];
                } else {
                    ElementsToRender = Element;
                }

                if (node.name === 'img' && parentIsText) {
                    this.imgsToRender.push({ ...Element, firstLoopIndex: index });
                    return false;
                }

                if (TEXT_TAG_NAMES.has(node.name)) {
                    if (!this.shouldRenderNode(node)) {
                        return false;
                    }
                }

                return ElementsToRender;
            }
        })
        .filter((e) => e !== undefined);
    }

    render () {
        const { dom } = this.state;
        if (!dom) {
            return false;
        }
        let rnNodes;
        const parser = new htmlparser2.Parser(
            new htmlparser2.DomHandler((_err, dom) => {
                rnNodes = this.renderHtmlAsRN(dom, 'body', false);
            })
        );
        parser.write(dom);
        parser.done();

        return (
            <View style={this.props.containerStyle || {}}>{rnNodes}</View>
        );
    }
}
