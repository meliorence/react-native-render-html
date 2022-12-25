/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import ListItemCode from '../components/ListItemCode';
import Page from '../Page';
import useToolkit from '../toolkit/useToolkit';
import RefHtmlparser2 from '../components/RefHtmlparser2';

import removeOlChildrenConfig from './cards/removeOlChildrenConfig';
import replaceDataConfig from './cards/replaceDataConfig';
import insertingElementConfig from './cards/insertingElementConfig';
import ignoreDomNodeConfig from './cards/ignoreDomNodeConfig';
import selectDomRootConfig from './cards/selectDomRootConfig';

const prerenderingSrc = `import React, { useState, useEffect, useMemo } from 'react';
import {
  TRenderEngineProvider,
  RenderHTMLConfigProvider,
  RenderHTMLSource,
  useAmbientTRenderEngine
} from 'react-native-render-html';
import { findAll } from 'domutils';

function isImgElement(node) {
  return node.name === 'img';
}

function RenderSource({ html }) {
  const [isDomReady, setIsDomReady] = useState(false);
  // Let's use the TRE provided from the root of our app
  // via TRenderEngineProvider to build the DOM
  const engine = useAmbientTRenderEngine();
  const dom = useMemo(() => engine.parseDocument(html), [html, engine]);
  // Use effect to inspect the DOM
  useEffect(function inspectDom(){
    // Do any pre-rendering logic here
    const images = findAll(isImgElement, dom, true);
    // Do stuff with images such as preloading
    // ...
    // When preloading is done, set isDomReady to true!
    setIsDomReady(true);
  },[dom]);
  return isDomReady ?
    <RenderHTMLSource source={{ dom }} />
    : null;
}

const html = \`
hello world!
<img src='https://img.io/001.jpg' />
\`

export default function App() {
  return (
    <TRenderEngineProvider>
      <RenderHTMLConfigProvider>
        <RenderSource html={html} />
      </RenderHTMLConfigProvider>
    </TRenderEngineProvider>
  );
}`;

export default function PageGuideDomTampering() {
  const {
    Acronym,
    Admonition,
    Bold,
    DList,
    DListItem,
    DListTitle,
    Header,
    Paragraph,
    Chapter,
    SourceDisplay,
    RefLibrary,
    RefRNSymbol,
    RefHtmlElement,
    RefCssProperty,
    RefRenderHtmlProp,
    RefHtmlAttr,
    RefTRE,
    RefDOM,
    RefRenderHTMLExport,
    RefDoc,
    RenderHtmlCard,
    Section,
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
          This library offers rich integration with the <RefHtmlparser2 />{' '}
          ecosystem. Thanks to the new <Acronym name="TRE" />, you can process
          DOM nodes <Bold>at parse time</Bold>. It implies that the operation
          doesn't require a tree traversal contrary to legacy versions, and thus
          adds up very little overhead.
        </Paragraph>
        <Admonition type="caution">
          One important downside is that{' '}
          <Bold>a DOM node next sibling won't have been parsed yet</Bold>.
          However, the children and parent of this node are guaranteed to be
          attached to this node.
        </Admonition>
      </Header>
      <Chapter title="Altering the DOM Tree">
        <Paragraph>
          The API offers one prop, <RefRenderHtmlProp name="domVisitors" />,
          which is a record of 3 optional fields:
        </Paragraph>
        <DList>
          <DListTitle>
            <RefTRE name="DomVisitorCallbacks" member="onDocument" />
          </DListTitle>
          <DListItem>
            Triggered when the root DOM <RefDOM name="Document" /> has been
            parsed, at the very end of the parsing phase.
          </DListItem>
          <DListTitle>
            <RefTRE name="DomVisitorCallbacks" member="onElement" />
          </DListTitle>
          <DListItem>
            Triggered when a DOM <RefDOM name="Element" /> has been parsed along
            with its children.
          </DListItem>
          <DListTitle>
            <RefTRE name="DomVisitorCallbacks" member="onText" />
          </DListTitle>
          <DListItem>
            Triggered when a DOM <RefDOM name="Text" /> node has been parsed
            along with its content.
          </DListItem>
        </DList>
        <Paragraph>
          Those callback should not return anything. Instead, you should change
          the node or its children in place, or just read its content for
          inspection purposes.
        </Paragraph>
        <Admonition type="tip">
          You are invited to use{' '}
          <RefLibrary name="domutils" url="https://github.com/fb55/domutils" />{' '}
          library to handle DOM querying and manipulation (see example below).
          This library is already a direct dependency of <RefHtmlparser2 />.
        </Admonition>
        <Section title="Example: Removing Elements">
          <RenderHtmlCard {...removeOlChildrenConfig} />
        </Section>
        <Section title="Example: Altering Data">
          <RenderHtmlCard {...replaceDataConfig} />
        </Section>
        <Section title="Example: Inserting Elements">
          <RenderHtmlCard {...insertingElementConfig} />
        </Section>
      </Chapter>
      <Chapter title="Ignoring nodes">
        <Paragraph>
          Two props can be used to ignore nodes.{' '}
          <RefRenderHtmlProp name="ignoredDomTags" /> is an array of lowercase
          tags to exclude, and <RefRenderHtmlProp name="ignoreDomNode" /> is a
          function taking every parsed DOM node and offering you to reject it by
          returning <InlineCode>true</InlineCode>. Both props are processed at
          parse time.
        </Paragraph>
        <Section title="Example: Ignoring Nodes Conditionally">
          <RenderHtmlCard {...ignoreDomNodeConfig} />
          <Admonition type="caution">
            When <RefRenderHtmlProp name="ignoreDomNode" /> is invoked, the
            passed node has not been attached to his parent yet. But the parent
            is given as a second argument.
          </Admonition>
        </Section>
      </Chapter>
      <Chapter title="Root Selection">
        <Paragraph>
          This library provides <RefRenderHtmlProp name="selectDomRoot" /> prop
          to select a subtree to render. See example below:
        </Paragraph>
        <RenderHtmlCard {...selectDomRootConfig} />
        <Admonition type="note">
          When <RefRenderHtmlProp name="selectDomRoot" /> returns a falsy value,
          the initial root will be selected.
        </Admonition>
      </Chapter>
      <Chapter title="Prerendering">
        <Paragraph>
          In some scenarios, you might want to inspect the DOM{' '}
          <Bold>before</Bold> rendering, and even perform asynchronous
          operations based on your findings. Use cases might involve, for
          example:
        </Paragraph>
        <List>
          <ListItem>Fetching data from a Web API;</ListItem>
          <ListItem>Pre-caching media assets.</ListItem>
        </List>
      </Chapter>
      <Paragraph>
        To do so, we will take advantage of the{' '}
        <RefDoc target="rendering" fragment="composite-rendering-architecture">
          composite rendering architecture
        </RefDoc>{' '}
        and the dom source feature:
      </Paragraph>
      <SourceDisplay
        showLineNumbers={true}
        content={prerenderingSrc}
        lang="jsx"
      />
      <Paragraph>Let's note a few important details in this example:</Paragraph>
      <List>
        <ListItem>
          <RefRenderHTMLExport name="TRenderEngineProvider" /> accepts all{' '}
          <RefRenderHTMLExport name="RenderHTML" /> component props pertaining
          to the <RefDoc target="transient-render-engine" /> layer such as{' '}
          <RefRenderHtmlProp name="customHTMLElementModels" />,{' '}
          <RefRenderHtmlProp name="classesStyles" /> (all styling props) and DOM
          related such as <RefRenderHtmlProp name="domVisitors" />,{' '}
          <RefRenderHtmlProp name="selectDomRoot" />
          ...
        </ListItem>
        <ListItem>
          <RefRenderHTMLExport name="RenderHTMLConfigProvider" /> accepts all{' '}
          <RefRenderHTMLExport name="RenderHTML" /> component props pertaining
          to the <RefDoc target="rendering" /> layer such as{' '}
          <RefRenderHtmlProp name="renderers" />,{' '}
          <RefRenderHtmlProp name="renderersProps" />,{' '}
          <RefRenderHtmlProp name="computeEmbeddedMaxWidth" />, ...
        </ListItem>
        <ListItem>
          <RefRenderHTMLExport name="RenderHTMLSource" /> accepts all{' '}
          <InlineCode>RenderHTML</InlineCode> component props pertaining to the
          document such as <RefRenderHtmlProp name="source" />,{' '}
          <RefRenderHtmlProp name="onTTreeChange" />,{' '}
          <RefRenderHtmlProp name="contentWidth" />
          ...
        </ListItem>
        <ListItem>
          The general recommendation for this three-layers rendering
          architecture is that the engine and configuration should be put near
          the top of your App to factor the cost of instantiating the engine.
          This is especially usefuld for apps which will render hundreds to
          thousands of small snippets such as chat apps.
        </ListItem>
      </List>
    </Page>
  );
}
