import React from 'react';
import Page from '../Page';
import useToolkit from '../toolkit/useToolkit';

export default function PageConceptArchitecture() {
  const {
    Acronym,
    Header,
    Paragraph,
    Chapter,
    RefLibrary,
    RefRNSymbol,
    RefHtmlElement,
    RefCssProperty,
    RenderHtmlCard,
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
      <Chapter title="Synopsis">
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
          hood? Consumers of this library need to understand the basic data flow
          model of this library to leverage its capabilities. Features such as
          props will touch on different areas of the data flow.
        </Paragraph>
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
        <Paragraph>
          One might wonder why the need for a step B: why not just render a DOM
          tree? There are a few answers:
        </Paragraph>
        <List>
          <ListItem>
            To mitigate the discrepancies between Web standards and React Native
            layout engine. The DOM and Transient Render trees will not have the
            exact same structure to account for React Native limitations.
          </ListItem>
          <ListItem>
            To support CSS inheritance. For example, a{' '}
            <RefHtmlElement name="div" /> element could have a style with text
            properties such as <RefCssProperty name="color" />, but a React
            Native <RefRNSymbol name="View" /> element which is the default
            mapping for <RefHtmlElement name="div" /> will not support such
            style properties.
          </ListItem>
          <ListItem>
            For the sake of separation of concerns. By decoupling the parsing
            and rendering logics, we end up with a more robust product where
            areas of the code with distinct reponsibilities can be tested in
            isolation.
          </ListItem>
        </List>
      </Chapter>
    </Page>
  );
}
