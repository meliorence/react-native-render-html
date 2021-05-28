/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Page from '../Page';
import useToolkit from '../toolkit/useToolkit';

const threeLayersSrc = `<TRenderEngineProvider>
  <RenderHTMLConfigProvider>
    <RenderHTMLSource source={{ html }} />
  </RenderHTMLConfigProvider>
</TRenderEngineProvider>`;

const threeLayersImportStmt = `import {
  TRenderEngineProvider,
  RenderHTMLConfigProvider,
  RenderHTMLSource
} from 'react-native-render-html';`;

export default function PageConceptRendering() {
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
    RefRenderHTMLExport,
    RefTRE,
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
          How <Acronym name="TRT" /> is rendered?
        </Paragraph>
      </Header>
      <Chapter title="Three-layers Rendering Architecture">
        <Paragraph>
          When you consume the <InlineCode>RenderHTML</InlineCode> component,
          you are actually using three distinct components. So this (
          <Bold>implicit 3 layers</Bold>):
        </Paragraph>
        <SourceDisplay
          content="<RenderHTML source={{ html }} />"
          lang="jsx"
          showLineNumbers={false}
        />
        <Paragraph>
          is equivalent to this (<Bold>explicit 3 layers</Bold>):
        </Paragraph>
        <SourceDisplay
          content={threeLayersSrc}
          lang="jsx"
          showLineNumbers={false}
        />
        <Paragraph>
          You can actually use the <Bold>explicit</Bold> three-layer
          architecture by importing those components:
        </Paragraph>
        <SourceDisplay
          lang="js"
          showLineNumbers={false}
          content={threeLayersImportStmt}
        />
        <Admonition type="tip">
          The great benefit of using <Bold>explicitly</Bold> this three-layers
          rendering architecture is that the engine and configuration can be put
          near the top of your App to factor the cost of instantiating the
          engine. This is <Bold>especially usefull</Bold> for apps which will
          render hundreds to thousands of small snippets such as chat apps.
        </Admonition>
        <Paragraph>A few remarks:</Paragraph>
        <List>
          <ListItem>
            <RefRenderHTMLExport name="TRenderEngineProvider" /> accepts all{' '}
            <RefRenderHTMLExport name="RenderHTML" /> component props pertaining
            to the <RefDoc target="transient-render-engine" /> layer such as{' '}
            <RefRenderHtmlProp name="customHTMLElementModels" />,{' '}
            <RefRenderHtmlProp name="classesStyles" /> (all styling props) and
            DOM related such as <RefRenderHtmlProp name="domVisitors" />,{' '}
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
            <InlineCode>RenderHTML</InlineCode> component props pertaining to
            the document such as <RefRenderHtmlProp name="source" />,{' '}
            <RefRenderHtmlProp name="onTTreeChange" />,{' '}
            <RefRenderHtmlProp name="contentWidth" />
            ...
          </ListItem>
        </List>
      </Chapter>
      <Chapter title="Default TNode Renderers">
        <Paragraph>
          Each node of the <Acronym name="TRT" /> is translated to a React
          component in the <InlineCode>TNodeRenderer</InlineCode> component.
          Internally, <InlineCode>TNodeRenderer</InlineCode> will map each type
          of <InlineCode>TNode</InlineCode> to its dedicated component.{' '}
          <InlineCode>TDocumentRenderer</InlineCode> for{' '}
          <InlineCode>TDocument</InlineCode> nodes,{' '}
          <InlineCode>TBlockRenderer</InlineCode> for <RefTRE name="TBlock" />{' '}
          nodes, <InlineCode>TPhrasingRenderer</InlineCode> for{' '}
          <RefTRE name="TPhrasing" /> nodes and{' '}
          <InlineCode>TTextRenderer</InlineCode> for <RefTRE name="TText" />{' '}
          nodes.
        </Paragraph>
        <Paragraph>
          Under the hood, <InlineCode>TPhrasingRenderer</InlineCode> and{' '}
          <InlineCode>TTextRenderer</InlineCode> use React Native{' '}
          <RefRNSymbol name="Text" /> wrapper component, while{' '}
          <InlineCode>TBlockRenderer</InlineCode> and{' '}
          <InlineCode>TDocumentRenderer</InlineCode> use React Native{' '}
          <RefRNSymbol name="View" /> wrapper component.
        </Paragraph>
        <Paragraph>
          Each renderer will pass styles provided by its underlying{' '}
          <InlineCode>TNode</InlineCode> to its React Native wrapper. Children
          are rendered thanks to the <InlineCode>TChildrenRenderer</InlineCode>{' '}
          component.
        </Paragraph>
      </Chapter>
      <Chapter title="Custom Renderers">
        <Paragraph>
          Custom renderers are components defined for specific tags. They can be
          specified with the <RefRenderHtmlProp name="renderers" /> prop, which
          is a mapping of tags with the corresponding components. See the{' '}
          <RefDoc target="custom-renderers" /> page. Also note that props
          targeting those renderers can be passed to a custom renderer via the{' '}
          <RefRenderHtmlProp name="renderersProps" /> prop, which is a mapping
          of tag names with its corresponding props. Those props can be consumed
          from the custom renderer via <InlineCode>useRendererProps</InlineCode>{' '}
          hook.
        </Paragraph>
      </Chapter>
      <Chapter title="Internal Renderers">
        <Paragraph>
          Some tags such as <RefHtmlElement name="img" />,{' '}
          <RefHtmlElement name="ol" />, <RefHtmlElement name="ul" /> and{' '}
          <RefHtmlElement name="a" /> are handled by special renderers, namely{' '}
          <Bold>internal renderers</Bold>. Those renderers can be thought of as
          "internal custom renderers". See the <RefDoc target="images" />,{' '}
          <RefDoc target="lists" /> and <RefDoc target="anchors" />{' '}
          corresponding pages.
        </Paragraph>
      </Chapter>
    </Page>
  );
}
