/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Page from '../Page';
import useToolkit from '../toolkit/useToolkit';
import anchorsMinimalConfig from './cards/anchorsMinimalConfig';
import anchorsBlockConfig from './cards/anchorsBlockConfig';
import anchorsCustomConfig from './cards/anchorsCustomConfig';
import anchorsRelativeConfig from './cards/anchorsRelativeConfig';

export default function PageContentAnchors() {
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
    RefTRE,
    RefRenderHTMLExport,
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
          Anchors are rendered with an <Bold>internal renderer</Bold>. See{' '}
          <RefDoc target="rendering" /> page. The <Bold>content model</Bold> of
          anchors is <Bold>mixed</Bold>, see{' '}
          <RefDoc target="transient-render-engine" fragment="element-models">
            Element Models
          </RefDoc>
          .
        </Paragraph>
      </Header>
      <Chapter title="Minimal Example">
        <RenderHtmlCard {...anchorsMinimalConfig} />
        <Admonition type="note">
          By default, pressing an anchor will open the link in the system
          browser. This is done with React Native <RefRNSymbol name="Linking" />{' '}
          API.
        </Admonition>
      </Chapter>
      <Chapter title="Block Example">
        <Paragraph>
          In the below example, the anchor will be translated to a{' '}
          <RefTRE name="TNode" /> node, because some of its children (
          <RefHtmlElement name="img" />) have a <Bold>block</Bold> content
          model. This is a feature of the <Bold>mixed content model</Bold>.
        </Paragraph>
        <RenderHtmlCard {...anchorsBlockConfig} />
      </Chapter>
      <Chapter title="Relative URLs">
        <Paragraph>
          The HTML standard allows relative URLs, for example when anchors have
          a <InlineCode>href</InlineCode> attribute with no origin, such as{' '}
          <InlineCode>&lt;a&nbsp;href="contact.html"&gt;</InlineCode>. The new
          foundry release adheres closely to this standard, by extracting
          information about the <InlineCode>baseUrl</InlineCode> of the current
          page. Either by the mean of the <RefHtmlElement name="base" />{' '}
          element, or by information contained in the{' '}
          <RefRenderHtmlProp name="source" /> prop. Example:
        </Paragraph>
        <RenderHtmlCard {...anchorsRelativeConfig} />
        <Admonition type="tip">
          You can use the same URL normalization mechanism in your custom
          renderers thanks to <InlineCode>useNormalizedUrl</InlineCode> hook.
        </Admonition>
      </Chapter>
      <Chapter title="Configuring">
        <Paragraph>
          We can take advantage of the{' '}
          <RefRenderHtmlProp name="renderersProps" /> to customize anchors
          behavior (see{' '}
          <RefRenderHTMLExport name="RenderersPropsBase" member="a" full />
          ). Anchors support <InlineCode>onPress</InlineCode> prop to handle
          press events.
        </Paragraph>
        <RenderHtmlCard {...anchorsCustomConfig} />
      </Chapter>
    </Page>
  );
}
