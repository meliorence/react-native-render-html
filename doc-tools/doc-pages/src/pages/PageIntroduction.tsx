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
        <Paragraph>This is an introduction</Paragraph>
      </Header>
    </Page>
  );
}
