import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Linking } from 'react-native';
import HTML from 'react-native-render-html';
import EXAMPLES, * as snippets from './snippets';
import styles from './styles';

const IMAGES_MAX_WIDTH = Dimensions.get('window').width - 50;
const CUSTOM_STYLES = {};
const CUSTOM_RENDERERS = {};
const DEFAULT_PROPS = {
    htmlStyles: CUSTOM_STYLES,
    renderers: CUSTOM_RENDERERS,
    imagesMaxWidth: IMAGES_MAX_WIDTH,
    onLinkPress: (evt, href) => { Linking.openURL(href); },
    debug: true
};

export default class Demo extends Component {

    constructor (props) {
        super(props);
        this.state = { currentExample: 'paragraphs' };

        this.setCurrentExample = this.setCurrentExample.bind(this);
    }

    onLinkPress (evt, href, htmlAttribs) {
        alert(`Opened ${href} ! Attributes:`, htmlAttribs);
    }

    setCurrentExample (currentExample) {
        this.setState({ currentExample });
    }

    get examplesList () {
        const examples = Object.keys(EXAMPLES).map((snippetId, index) => {
            return (
                <TouchableOpacity
                  key={`example-btn-${index}`}
                  onPress={() => this.setCurrentExample(snippetId)}
                  style={styles.exampleBtn}
                  >
                    <Text style={styles.exampleBtnLabel}>{ EXAMPLES[snippetId].name }</Text>
                </TouchableOpacity>
            );
        });
        return (
            <ScrollView
              horizontal={true}
              style={styles.examplesListContainer}
              contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
            >
                { examples }
            </ScrollView>
        );
    }

    renderSnippet (snippetId) {
        const additionalProps = EXAMPLES[snippetId].props || {};
        return (
            <HTML
              {...DEFAULT_PROPS}
              html={snippets[snippetId]}
              {...additionalProps}
            />
        );
    }

    get currentExample () {
        return (
            <ScrollView style={{ flex: 1 }}>
                { this.renderSnippet(this.state.currentExample) }
            </ScrollView>
        );
    }

    render () {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>react-native-render-html</Text>
                { this.examplesList }
                { this.currentExample }
            </View>
        );
    }
}
