import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import HTMLStyles from './HTMLStyles';

export default class HTMLElement extends PureComponent {

    static propTypes = {
        tagName: PropTypes.string.isRequired,
        renderers: PropTypes.object.isRequired,
        emSize: PropTypes.number.isRequired,
        groupInfo: PropTypes.object,
        parentTagName: PropTypes.string,
        htmlStyles: PropTypes.object,
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
        if (this.props.tagName === 'li') {
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
        if (HTMLStyles.blockElements.has(this.props.tagName)) {
            if (this.props.parentIsText) {
                console.warn([
                    'You are trying to nest a non-text HTML element inside a text element.',
                    'The following nodes can only be rendered within themselves and not within text nodes:'
                ].concat(Array.from(HTMLStyles.blockElements)).join('\n'));
                return Text;
            } else {
                return View;
            }
        } else {
            return Text;
        }
    }

    render () {
        const { htmlStyles, tagName, htmlAttribs, renderers, children, emSize, ...passProps } = this.props;

        if (renderers[tagName]) {
            const copyProps = [
                'htmlStyles',
                'groupInfo',
                'parentTagName',
                'onLinkPress',
                'parentIsText',
                'imagesMaxWidth'
            ].reduce((acc, k) => {
                acc[k] = this.props[k];
                return acc;
            }, {});
            return renderers[tagName](htmlAttribs, children, copyProps);
        } else {
            const RNElem = this.elementClass();
            const styleset = RNElem === Text ? HTMLStyles.STYLESETS.TEXT : HTMLStyles.STYLESETS.VIEW;
            const style = []
                .concat(
                    HTMLStyles.defaultStyles[tagName],
                    htmlStyles ? htmlStyles[tagName] : undefined,
                    htmlAttribs.style ? HTMLStyles.cssStringToRNStyle(htmlAttribs.style, styleset, { parentTag: tagName, emSize }) : undefined
                )
                .filter((s) => s !== undefined);

            return (
                <RNElem {...passProps} style={style}>
                    {this.prefixNode()}
                    {this.props.children}
                </RNElem>
            );
        }
    }
}
