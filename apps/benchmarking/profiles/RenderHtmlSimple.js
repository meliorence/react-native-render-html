import { Text, View, Image } from 'react-native';
import { parseDocument, ElementType } from 'htmlparser2';
import React, { PureComponent } from 'react';

export default class RenderHtmlSimple extends PureComponent {
  constructor(props) {
    super(props);
    this.ignoredTags = props.ignoredTags || this.ignoredTags;
  }

  ignoredTags = ['head'];

  render() {
    const { html, ...viewProps } = this.props;
    const document = parseDocument(html);
    return (
      <View {...viewProps}>
        {document.children.map((c, i) => this.renderNode(c, i))}
      </View>
    );
  }

  renderElement(element, index) {
    if (this.ignoredTags.indexOf(element.name) > -1) {
      return null;
    }
    if (element.name === 'img') {
      return <Image key={index} source={{ uri: element.attribs.src }} />;
    }
    const Wrapper = this.textTags.indexOf(element.name) > -1 ? Text : View;
    return (
      <Wrapper key={index}>
        {element.children.map((c, i) => this.renderNode(c, i))}
      </Wrapper>
    );
  }

  renderNode(node, index) {
    switch (node.type) {
      case ElementType.Text:
        return this.renderTextNode(node, index);
      case ElementType.Tag:
        return this.renderElement(node, index);
    }
    return null;
  }

  renderTextNode(textNode, index) {
    return <Text key={index}>{textNode.data}</Text>;
  }

  textTags = ['span', 'strong', 'em'];
}
