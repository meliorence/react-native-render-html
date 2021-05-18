/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Page from '../Page';
import useToolkit from '../toolkit/useToolkit';
import RefRNRH from '../components/RefRNRH';
import RefHtmlparser2 from '../components/RefHtmlparser2';
import RefTRE from '../components/RefTRE';

export default function PageArchitecture() {
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
    RefDoc,
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
          This article is an introduction to the <RefRNRH /> architecture.
        </Paragraph>
      </Header>
      <Chapter title="Hello World!">
        <Paragraph>Let's start with a simple example:</Paragraph>
        <RenderHtmlCard
          title="Minimal working example"
          caption="This card shows the result of rendering a simple HTML code snippet."
          props={{
            source: {
              html: `
<p style='text-align:center;'>
  Hello World!
</p>`
            }
          }}
        />
        <Paragraph>
          This looks pretty simple. But what exactly is happening under the
          hood? As laid out in the <RefDoc target="reinvent-the-wheel" /> page,
          we need some logic to translate the DOM into a structure easily
          translatable into native elements and support all the features
          mentioned in the referred page. This data structure is called the
          Transient Render Tree, see figure below.
        </Paragraph>
        <Admonition type="important">
          Consumers of this library can benefit greatly from understanding the
          basic data flow model to leverage its capabilities. Features such as
          props will touch on different areas of this data flow.
        </Admonition>
      </Chapter>
      <Chapter title="Data Flow">
        <SvgFigure asset="data-flow" />
        <Paragraph>
          We can roughly split the transformations from an HTML string to a
          React tree in 3 steps:
        </Paragraph>
        <List type="upper-alpha">
          <ListItem>
            HTML parsing. In this step, the HTML code is parsed to form a DOM
            tree. This step is performed by the <RefHtmlparser2 /> library.
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
            This step is performed by <RefTRE /> module.
          </ListItem>
          <ListItem>
            Transient Render Tree Rendering. In this step, the{' '}
            <Acronym name="TRT" /> is transformed in a React render tree (VDOM).
            TNodes are passed to internal and custom renderers.
          </ListItem>
        </List>
        <Paragraph>
          For more information on <Acronym name="TRT" /> construction, see{' '}
          <RefDoc target="transient-render-engine" /> and{' '}
          <RefDoc target="css-processing" /> pages.
        </Paragraph>
      </Chapter>
    </Page>
  );
}
