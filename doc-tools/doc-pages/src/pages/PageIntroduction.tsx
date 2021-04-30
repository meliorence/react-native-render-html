/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Page from '../Page';
import useToolkit from '../toolkit/useToolkit';

export default function PageIntroduction() {
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
    RefRenderHtmlProp,
    RenderHtmlCard,
    InlineCode,
    Hyperlink,
    List,
    ListItem,
    SvgFigure
  } = useToolkit();
  return (
    <Page>
      <Chapter title="Install">
        <Paragraph>
          Install <InlineCode>react-native-render-html</InlineCode> on your
          system:
        </Paragraph>
        <SourceDisplay
          lang="sh"
          content="npm add react-native-render-html"
          showLineNumbers={false}
        />
      </Chapter>
      <Chapter title="Simple Usage">
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
          We are using the <RefRenderHtmlProp name="source" /> prop to specify
          the HTML content to load. This prop also supports an{' '}
          <InlineCode>uri</InlineCode> field for remote loading!
        </Paragraph>
        <Admonition type="important">
          We are using <RefRenderHtmlProp name="contentWidth" /> prop to allow
          proper image scaling. See <RefDoc target="images" /> page for more
          details.
        </Admonition>
      </Chapter>
    </Page>
  );
}
