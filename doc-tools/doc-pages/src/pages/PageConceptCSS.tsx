/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Page from '../Page';
import useToolkit from '../toolkit/useToolkit';

export default function PageConceptCSS() {
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
          There are significant differences between the CSS standard and how
          styles are handled in React Native. Most notably,{' '}
          <RefRNSymbol name="Text" /> styles don't inherit from{' '}
          <RefRNSymbol name="View" /> styles. The reconciliation is handled by
          the <Acronym name="TRE" />.
        </Paragraph>
      </Header>
      <Chapter title="Inheritance"></Chapter>
      <Chapter title="Translation"></Chapter>
      <Chapter title="Mixed Styles"></Chapter>
    </Page>
  );
}
