/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Page from '../Page';
import useToolkit from '../toolkit/useToolkit';

const inlineExample = `<img
  width="1200" height="800"
  style="width: 50%; height: 100px; align-self: center;"
  src="http://placeimg.com/1200/800/nature"
/>`;

const autoSizeExample = `<img
  width="1200" height="800"
  src="http://placeimg.com/1200/800/nature"
/>`;

const unreachableExample = `<img
  width="200" height="100"
  alt="The Void"
  src="http://example.tld/image.jpg"
/>`;

export default function PageContentImages() {
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
    RefESSymbol,
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
        <Admonition type="note">
          This article covers the <RefHtmlElement name="img" /> element
          renderer. <RefHtmlElement name="picture" /> is not yet supported.
        </Admonition>
      </Header>
      <Chapter title={'Sizing'}>
        <Paragraph>
          To determine the display size of an image, the renderer will go
          through the following steps:{'\n'}
          1. 2. 3.
        </Paragraph>
      </Chapter>
      <Chapter title={'Scaling'}>
        <Paragraph>
          The renderer will automatically scale images down to the available
          width, even when the provided inline style width is greater than the
          container width.
        </Paragraph>
        <Admonition type="important">
          You are strongly advised to provide a{' '}
          <RefRenderHtmlProp name="contentWidth" /> property from{' '}
          <RefRNSymbol name="useWindowDimensions" /> official hook to help this
          component handle the scaling.
        </Admonition>
        <RenderHtmlCard
          title="Image with inline styles"
          caption={
            'This image dimensions are set with inline styles. Note that both the width/height couple and the style attributes are evaluated, but the style attribute takes precedence. The relative width (50%) is computed against contentWidth.'
          }
          props={{ source: { html: inlineExample } }}
          preferHtmlSrc
        />
        <Paragraph>
          The next image will be sized automatically thanks to the{' '}
          <RefRenderHtmlProp name="contentWidth" /> and{' '}
          <RefRenderHtmlProp name="computeEmbeddedMaxWidth" /> props. The latter
          allows you to set the maximum width from{' '}
          <RefRenderHtmlProp name="contentWidth" />, or disabling scaling by
          returning <RefESSymbol name="Infinity" />.
        </Paragraph>
        <RenderHtmlCard
          title="Image with width and height attributes"
          caption={
            "This image has no inline style. Its width and height are determined by the width and height attributes, scaled down to fit the result of computeEmbeddedMaxWidth('img')."
          }
          props={{ source: { html: autoSizeExample } }}
          preferHtmlSrc
        />
      </Chapter>
      <Chapter title="Preloading">
        <Paragraph>
          Similarly to browsers, this library will place a print box before
          fetching image dimensions when both <RefHtmlAttr name="width" /> and{' '}
          <RefHtmlAttr name="height" /> attributes are provided, or the two
          dimensions are set in the <RefHtmlAttr name="style" /> attribute. This
          is great to avoid images "jumping" from zero height to their computed
          height, and is a hint to good web design.
        </Paragraph>
      </Chapter>
      <Chapter title="Error Handling">
        <RenderHtmlCard
          title="Unreachable image"
          caption={
            'When an image is unreachable, the image renderer will print a box while preserving its requested dimensions. It will also display at the center of the box the content of alt attribute.'
          }
          props={{ source: { html: unreachableExample } }}
          preferHtmlSrc
        />
      </Chapter>
    </Page>
  );
}
