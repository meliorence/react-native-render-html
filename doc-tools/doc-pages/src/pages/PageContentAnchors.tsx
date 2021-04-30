/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Page from '../Page';
import useToolkit from '../toolkit/useToolkit';

export default function PageContentAnchors() {
  const {
    Header,
    Paragraph,
    Chapter,
    Admonition,
    RefHtmlElement,
    RefRenderHtmlProp,
    RefRNSymbol,
    RefESSymbol,
    RefHtmlAttr,
    RenderHtmlCard
  } = useToolkit();
  return (
    <Page>
      <Header>
        <Paragraph>Lists content!</Paragraph>
      </Header>
    </Page>
  );
}
