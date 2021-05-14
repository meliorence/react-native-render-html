/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Page from '../Page';
import RefHtmlparser2 from '../components/RefHtmlparser2';
import useToolkit from '../toolkit/useToolkit';

const minimalHtmlRenderer = `import {Text, View} from 'react-native';
import {parseDocument, ElementType} from 'htmlparser2';
import React, {PureComponent} from 'react';

export default class RenderHtml extends PureComponent {
  ignoredTags = ['head'];
  textTags = ['span', 'strong', 'em'];

  renderTextNode(textNode, index) {
    return <Text key={index}>{textNode.data}</Text>;
  }

  renderElement(element, index) {
    if (this.ignoredTags.indexOf(element.name) > -1) {
      return null;
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

  render() {
    const document = parseDocument(this.props.html);
    return document.children.map((c, i) => this.renderNode(c, i));
  }
}`;

export default function PageReinventTheWheel() {
  const {
    Acronym,
    Bold,
    Admonition,
    Header,
    Paragraph,
    Chapter,
    SourceDisplay,
    RefLibrary,
    RefRNSymbol,
    RefHtmlElement,
    RefCssProperty,
    RenderHtmlCard,
    InlineCode,
    Hyperlink,
    List,
    ListItem,
    SvgFigure
  } = useToolkit();
  return (
    <Page>
      <Header>
        <Paragraph>
          To understand how this library works, we propose a teeny, tiny
          implementation of an HTML renderer in just about{' '}
          <Bold>40 lines of code</Bold>. Of course, it has many limitations that
          are overcomed by <InlineCode>react-native-render-html</InlineCode>,
          but it will give you a good glimpse at how things work internally.
        </Paragraph>
      </Header>
      <Chapter title="Implementation">
        <Paragraph>
          To do so, we will need an HTML parsing library which will give us some
          sort of proxy DOM representation of the HTML source. In this very
          example, we will use <RefHtmlparser2 /> libarary:
        </Paragraph>
        <SourceDisplay
          lang="jsx"
          title="RenderHtml.jsx"
          content={minimalHtmlRenderer}
          showLineNumbers
        />
        <Paragraph>
          Below is an overview of the component's{' '}
          <InlineCode>render</InlineCode> method invocation:
        </Paragraph>
        <List>
          <ListItem>
            <Bold>Line 36</Bold> invokes <InlineCode>parseDocument</InlineCode>{' '}
            from <RefHtmlparser2 /> which returns the root DOM node of the
            document.
          </ListItem>
          <ListItem>
            <Bold>Line 37</Bold> returns the mapping of the root's children with
            the result of <InlineCode>renderNode</InlineCode> method.
          </ListItem>
          <ListItem>
            <Bold>Line 25</Bold>, the <InlineCode>renderNode</InlineCode> method
            returns: the result of <InlineCode>renderTextNode</InlineCode> when
            provided with a DOM <InlineCode>TextNode</InlineCode>, the result of{' '}
            <InlineCode>renderElement</InlineCode> when the provided node is an{' '}
            <InlineCode>Element</InlineCode>, and <InlineCode>null</InlineCode>{' '}
            otherwise, such as when the provided node is a comment, script, or
            stylesheet.
          </ListItem>
        </List>
        <Paragraph>
          Although the <InlineCode>renderTextNode</InlineCode> implementation is
          pretty straightforward,
          <InlineCode>renderElement</InlineCode> has some conditional logic to
          render the element either in a React Native{' '}
          <RefRNSymbol name="Text" /> or <RefRNSymbol name="View" />. This is to
          bypass rendering glitches when embedding <RefRNSymbol name="View" />{' '}
          inside <RefRNSymbol name="Text" />, such as discussed in more details
          in the below section (hoisting).
        </Paragraph>
        <Admonition type="note">
          We allude to the DOM an DOM nodes while <RefHtmlparser2 /> only
          provides a substet of the DOM API for lightweightness sake!
        </Admonition>
      </Chapter>
      <Chapter title="Discussion">
        <Paragraph>
          Perhaps your requirements are so simple that this might actually be
          sufficient for your use-case. You could try to extend this naive
          implementation with the below, easy to implement features:
        </Paragraph>
        <List>
          <ListItem>
            Add custom renderers for specific tags such as{' '}
            <RefHtmlElement name="img" />, <RefHtmlElement name="ul" />
            ...
          </ListItem>
          <ListItem>Add styles for specific tags and classes.</ListItem>
        </List>
        <Paragraph>
          However, you will get involved in a much substantial and complex task
          if you have requirements such as:{' '}
        </Paragraph>
        <List>
          <ListItem>
            Support{' '}
            <Hyperlink url="https://html.spec.whatwg.org/#the-style-attribute">
              inline styles
            </Hyperlink>
            . You would need to transform those styles into React Native
            compatible styles. Beware that unsupported styles on the native side
            could easily crash your app.
          </ListItem>
          <ListItem>
            Support{' '}
            <Hyperlink url="https://developer.mozilla.org/en-US/docs/Web/CSS/white-space">
              whitespace collapsing
            </Hyperlink>{' '}
            such as in <RefCssProperty name="white-space" /> CSS property.
          </ListItem>
          <ListItem>
            Support{' '}
            <Hyperlink url="https://html.spec.whatwg.org/multipage/urls-and-fetching.html#resolving-urls">
              URL resolutions
            </Hyperlink>
            , such as relative URLs, <RefHtmlElement name="base" /> elements...
            etc.
          </ListItem>
          <ListItem>
            Support <Bold>hoisting</Bold>. Because React Native{' '}
            <RefRNSymbol name="View" /> elements are not well handled inside{' '}
            <RefRNSymbol name="Text" /> elements, these should be hoisted up in
            the tree to be rendered inside <InlineCode>Views</InlineCode>.
          </ListItem>
          <ListItem>
            Support full{' '}
            <Hyperlink url="https://developer.mozilla.org/en-US/docs/Web/CSS/inheritance">
              CSS inheritance
            </Hyperlink>
            . For example, a <RefHtmlElement name="div" /> element could have a
            style with text properties such as <RefCssProperty name="color" />,
            but a React Native <RefRNSymbol name="View" /> element which is the
            default mapping for <RefHtmlElement name="div" /> will not support
            such style property.
          </ListItem>
        </List>
        <Paragraph>
          <InlineCode>react-native-render-html</InlineCode> overcomes all of
          those caveats and more out of the box!
        </Paragraph>
      </Chapter>
    </Page>
  );
}
