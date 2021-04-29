import React from 'react';
import Page from '../Page';
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

export default function PageConceptArchitecture() {
  const {
    Acronym,
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
    SvgFigure: SvgAsset
  } = useToolkit();
  return (
    <Page>
      <Header>
        <Paragraph>
          This article is an introduction to the{' '}
          <RefLibrary
            name="react-native-render-html"
            url="https://github.com/meliorence/react-native-render-html#readme"
          />{' '}
          architecture.
        </Paragraph>
      </Header>
      <Chapter title="A Naive Implementation">
        <Paragraph>
          Let's abide by Richard Feynman principle which states, "What I cannot
          create, I do not understand", and create the most simple, naive
          implementation of this library in just about 40 lines. To do so, we
          will need an HTML parsing library which will give us some sort of
          proxy DOM representation of the HTML source. In this very example, we
          will use{' '}
          <RefLibrary
            url="https://github.com/fb55/htmlparser2#readme"
            name="htmlparser2"
          />{' '}
          libarary:
        </Paragraph>
        <SourceDisplay
          lang="jsx"
          title="RenderHtml.jsx"
          content={minimalHtmlRenderer}
        />
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
            Support inline styles. You would need to transform those styles into
            React Native compatible styles. Beware that unsupported styles on
            the native side could easily crash your app.
          </ListItem>
          <ListItem>
            Support{' '}
            <Hyperlink url="https://developer.mozilla.org/en-US/docs/Web/CSS/white-space">
              whitespace collapsing
            </Hyperlink>{' '}
            such as in <RefCssProperty name="white-space" /> CSS property.
          </ListItem>
          <ListItem>
            Support URL resolutions, such as relative URLs,{' '}
            <RefHtmlElement name="base" /> elements... etc.
          </ListItem>
          <ListItem>
            Support hoisting. Because React Native <RefRNSymbol name="View" />{' '}
            elements are not well handled inside <RefRNSymbol name="Text" />{' '}
            elements, these should be hoisted up in the tree to be rendered
            inside <InlineCode>Views</InlineCode>.
          </ListItem>
          <ListItem>
            Support CSS styles inheritance. For example, a{' '}
            <RefHtmlElement name="div" /> element could have a style with text
            properties such as <RefCssProperty name="color" />, but a React
            Native <RefRNSymbol name="View" /> element which is the default
            mapping for <RefHtmlElement name="div" /> will not support such
            style properties.
          </ListItem>
        </List>
        <Paragraph>
          <InlineCode>react-native-render-html</InlineCode> supports many of
          those edge-cases out of the box!
        </Paragraph>
      </Chapter>
      <Chapter title="Hello World!">
        <Paragraph>Let's start with a simple example:</Paragraph>
        <RenderHtmlCard
          title="Minimal working example"
          caption="This card shows the result of rendering a simple HTML code snippet."
          html={`
<p style='text-align:center;'>
  Hello World!
</p>`}
        />
        <Paragraph>
          This looks pretty simple. But what exactly is happening under the
          hood? As seen in the previous section, we need some logic to translate
          the DOM into a structure easily translatable into native elements and
          support all the above-mentionned features. This data structure is
          called the Transient Render Tree, see figure below.
        </Paragraph>
        <Admonition type="important">
          Consumers of this library can benefit greatly from understanding the
          basic data flow model to leverage its capabilities. Features such as
          props will touch on different areas of this data flow.
        </Admonition>
      </Chapter>
      <Chapter title="Data Flow">
        <SvgAsset asset="data-flow" />
        <Paragraph>
          We can roughly split the transformations from an HTML string to a
          React tree in 3 steps:
        </Paragraph>
        <List type="upper-alpha">
          <ListItem>
            HTML parsing. In this step, the HTML code is parsed to form a DOM
            tree. This step is performed by the{' '}
            <RefLibrary
              name="htmlparser2"
              url="https://github.com/fb55/htmlparser2#readme"
            />{' '}
            library.
          </ListItem>
          {/* <ListItem>
            Inline CSS Parsing. This step is performed by{' '}
            <RefLibrary
              name="@native-html/css-parser"
              url="https://github.com/native-html/core/tree/master/packages/css-processor#readme"
            />{' '}
            module.
          </ListItem> */}
          <ListItem>
            <Acronym name="TRT" /> Construction. In this step, the DOM tree is
            transformed in a TRT. Each node of this tree is referred to as a
            Transient Node (TNode) which has React-Native compatible styles.
            This step is performed by{' '}
            <RefLibrary
              name="@native-html/transient-render-engine"
              url="https://github.com/native-html/core/tree/master/packages/transient-render-engine#readme"
            />{' '}
            module.
          </ListItem>
          <ListItem>
            Transient Render Tree Rendering. In this step, the TRT is
            transformed in a React render tree (VDOM). TNodes are passed to
            internal and custom renderers.
          </ListItem>
        </List>
      </Chapter>
    </Page>
  );
}
