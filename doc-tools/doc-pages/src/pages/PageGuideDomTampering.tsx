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

export default function PageGuideCustomRenderers() {
  const {
    Acronym,
    Admonition,
    Bold,
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
          <Bold>
            a DOM node next sibling and parent won't have been parsed yet
          </Bold>
          . However, the children of this node are guaranteed to be ready.
        </Admonition>
      </Header>
      <Chapter title="Altering the DOM Tree">
        <Paragraph>
          The API offers one prop, <RefRenderHtmlProp name="domVisitors" />,
          which is a record of 3 optional fields:
        </Paragraph>
        <List>
          <ListItemCode name="onDocument">
            Triggered when the root element has been parsed, at the very end of
            the parsing phase.
          </ListItemCode>
          <ListItemCode name="onElement">
            Triggered when a DOM element has been parsed along with its
            children.
          </ListItemCode>
          <ListItemCode name="onText">
            Triggered when a DOM Text node has been parsed along with its
            content.
          </ListItemCode>
        </List>
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
            As stated before, <InlineCode>node.parent</InlineCode> will always
            be <InlineCode>null</InlineCode> at parse time. If you need to
            ignore a node based on its parents, you have to use an{' '}
            <InlineCode>onElement</InlineCode> callback (
            <RefRenderHtmlProp name="domVisitors" />
            ) and remove anchors children of <RefHtmlElement name="div" />{' '}
            elements, or ignore this node at render time.
          </Admonition>
        </Section>
      </Chapter>
      <Chapter title="Root Selection"></Chapter>
      <Chapter title="Prerendering">
        <Paragraph>
          In some scenarios, you might want to inspect the DOM{' '}
          <Bold>before</Bold> rendering, and even perform asynchronous
          operations based on your findings. This is possible thanks to the
          extremely flexible Rendering layer (see <RefDoc target="rendering" />
          ). Use cases might involve, for example:
        </Paragraph>
        <List>
          <ListItem>Fetching data from a Web API;</ListItem>
          <ListItem>Pre-caching media assets.</ListItem>
        </List>
      </Chapter>
    </Page>
  );
}
