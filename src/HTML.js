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
        html: PropTypes.string.isRequired,
        htmlStyles: PropTypes.object,
        containerStyle: View.propTypes.style,
        onLinkPress: PropTypes.func,
        imagesMaxWidth: PropTypes.number,
        renderers: PropTypes.object.isRequired
    }

    static defaultProps = {
        renderers: HTMLRenderers
    }

    constructor (props) {
        super(props);
        this.renderers = {
            ...HTMLRenderers,
            ...(this.props.renderers || {})
        };
        this.imgsToRender = [];
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
        return (
            <HTMLElement
              key={index}
              htmlStyles={this.props.htmlStyles}
              imagesMaxWidth={this.props.imagesMaxWidth}
              htmlAttribs={node.attribs}
              tagName={node.name}
              groupInfo={groupInfo}
              parentTagName={parentTagName}
              parentIsText={parentIsText}
              onLinkPress={this.props.onLinkPress}
              renderers={this.renderers}>
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
        if (!node.children || !node.children.length) {
            return false;
        }
        for (let i = 0; i < node.children.length; i++) {
            if (node.children[i].type === 'text') {
                return true;
            } else if (TEXT_TAG_NAMES.has(node.children[i].name)) {
                if (this.shouldRenderNode(node.children[i])) {
                    return true;
                } else {
                    continue;
                }
            }
        }
        return false;
    }

    /**
     * Loop on a HTML node and look for imgs that need
     * to be rendered outside this node (ie : img outside
     * of text elements)
     */
    addImgsToRenderList (node, index, groupInfo, parentTagName, parentIsText) {
        if (!node.children || !node.children.length) {
            return;
        }
        for (let i = 0; i < node.children.length; i++) {
            if (node.children[i].name === 'img') {
                this.imgsToRender.push(
                    this.createElement(
                        node.children[i],
                        index,
                        groupInfo,
                        parentTagName,
                        parentIsText
                    )
                );
            }
        }
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
            if (node.type === 'text') {
                const str = HTMLTextNode.removeWhitespaceListHTML(node.data, index, parentTagName);
                if (str.length) {
                    return (<HTMLTextNode key={index}>{str}</HTMLTextNode>);
                } else {
                    return undefined;
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

                if (node.name === 'img') {
                    this.imgsToRender.push(Element);
                    return false;
                }

                if (TEXT_TAG_NAMES.has(node.name)) {
                    this.addImgsToRenderList(node, index, groupInfo, parentTagName, parentIsText);

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
        let rnNodes;
        const parser = new htmlparser2.Parser(
            new htmlparser2.DomHandler((_err, dom) => {
                rnNodes = this.renderHtmlAsRN(dom, 'body', false);
            })
        );
        parser.write(this.props.html);
        parser.done();

        return (
            <View style={this.props.containerStyle || {}}>{rnNodes}</View>
        );
    }
}
