/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Page from '../Page';
import useToolkit from '../toolkit/useToolkit';

export default function PageGuideStylingComponents() {
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
        <Paragraph>How to style components?</Paragraph>
      </Header>
    </Page>
  );
}
