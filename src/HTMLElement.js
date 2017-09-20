import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { blockElements, STYLESETS, cssStringToRNStyle, defaultBlockStyles, defaultTextStyles, _getElementClassStyles } from './HTMLStyles';

export default class HTMLElement extends PureComponent {

    static propTypes = {
        tagName: PropTypes.string.isRequired,
        renderers: PropTypes.object.isRequired,
        emSize: PropTypes.number.isRequired,
        ignoredStyles: PropTypes.array.isRequired,
        htmlAttribs: PropTypes.object,
        groupInfo: PropTypes.object,
        parentTagName: PropTypes.string,
        tagsStyles: PropTypes.object,
        classesStyles: PropTypes.object,
        htmlAttibs: PropTypes.object,
        onLinkPress: PropTypes.func,
        children: PropTypes.node,
        parentIsText: PropTypes.bool.isRequired
    }

    handleLinkPressed (evt) {
        if (this.props.onLinkPress) {
            this.props.onLinkPress(evt, this.props.onLinkPressArg);
        }
    }

    /**
    * Generates the prefix nodes
    * @return prefix nodes if applicable
    */
    prefixNode () {
        const { children } = this.props;
        if (this.props.tagName === 'li' || this.props.tagName === 'dt') {
            if (this.props.parentTagName === 'ol') {
                return <Text>{`\n${this.props.groupInfo.index + 1}). `}</Text>;
            } else {
                return <Text>{'\n• '}</Text>;
            }
        } else if (this.props.tagName === 'br') {
            return <Text>{'\n'}</Text>;
        } else {
            return undefined;
        }
    }

    /**
     * @return the class for this node
    */
    elementClass () {
        const { children, tagName } = this.props;
        const Element = this.wrapWithText(children, tagName) ? Text : View;
        // let Element = Text;
        // if (blockElements.has(this.props.tagName)) {
        //     if (this.props.parentIsText) {
        //         console.warn([
        //             'You are trying to nest a non-text HTML element inside a text element.',
        //             'The following nodes can only be rendered within themselves and not within text nodes:'
        //         ].concat(Array.from(blockElements)).join('\n'));
        //         Element = Text;
        //     } else {
        //         Element = View;
        //     }
        // } else {
        //     Element = Text;
        // }
        return Element;
    }

    wrapWithText (children, tagName) {
        if (tagName === 'img') {
            return true;
        }
        if (typeof children === 'string') {
            return true;
        }
        if (!children || typeof children !== 'object' || (typeof children.length !== 'undefined' && children.length === 0)) {
            return false;
        }

        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            let childIsText = child.type === 'HTMLTextNode'; // we know for sure this child is text
            if (!childIsText) {
                // Check recursively for children of this child to make sure this isn't a nested text
                childIsText = this.wrapWithText(child.props && child.props.children);
            }
            if (!childIsText) {
                // We know for sure this isn't a Text
                return false;
            }
        }
        // We never reached an early return, meaning all children are Texts
        return true;
    }

    render () {
        const { tagsStyles, classesStyles, tagName, htmlAttribs, renderers, children, emSize, ignoredStyles, ...passProps } = this.props;

        const RNElem = this.elementClass();
        const styleset = RNElem === Text ? STYLESETS.TEXT : STYLESETS.VIEW;
        const convertedCSSStyles =
            htmlAttribs.style ?
                cssStringToRNStyle(
                    htmlAttribs.style,
                    styleset,
                    { parentTag: tagName, emSize, ignoredStyles }
                ) :
                {};
        const classStyles = _getElementClassStyles(htmlAttribs, classesStyles);

        if (renderers[tagName]) {
            const copyProps = [
                'tagsStyles',
                'classesStyles',
                'groupInfo',
                'parentTagName',
                'onLinkPress',
                'parentIsText',
                'imagesMaxWidth'
            ].reduce((acc, k) => {
                acc[k] = this.props[k];
                return acc;
            }, {});
            return renderers[tagName](htmlAttribs, children, convertedCSSStyles, copyProps);
        } else {
            const style = [
                (RNElem === Text ? defaultTextStyles : defaultBlockStyles)[tagName],
                tagsStyles ? tagsStyles[tagName] : undefined,
                convertedCSSStyles,
                classStyles
            ]
            .filter((s) => s !== undefined);

            return (
                <RNElem {...passProps} style={style}>
                    { this.prefixNode() }
                    {this.props.children}
                </RNElem>
            );
        }
    }
}
