/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Page from '../Page';
import useToolkit from '../toolkit/useToolkit';

export default function PageGuideDomTampering() {
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
        <Paragraph>How to implement custom renderers?</Paragraph>
      </Header>
      <Chapter title="Prerequisites">
        <Paragraph>
          The renderer API shipped since v6 is at the same time more strict and
          more flexible. To get ready for this new API, you must understands
          some basics of the transient render tree produced by the transient
          render engine:
        </Paragraph>
        <List>
          <ListItem>
            During the transient render tree generation, every DOM node is
            translated to a TNode.
          </ListItem>
          <ListItem>
            TText nodes correspond to DOM text nodes (<Bold>anonymous</Bold>{' '}
            TText nodes) or DOM elements which children are DOM text nodes (
            <Bold>named</Bold> TText nodes). So a TText node cannot have
            children, and its content is a string.
          </ListItem>
          <ListItem>
            TPhrasing nodes can only have TText and TPhrasing nodes as children.
          </ListItem>
          <ListItem>TBlock nodes can have any children.</ListItem>
        </List>
      </Chapter>
      <Chapter title="Options for Custom Rendering">
        <Paragraph>
          You can customize rendering at two steps of the flow:
        </Paragraph>
      </Chapter>
      <Chapter title="Model-based Custom Rendering">
        <List>
          <ListItem>
            <Bold>textual</Bold> for elements which can be translated to TText
            or TPhrasing. Examples: &lt;Bold&gt;, &lt;Bold&gt; ...
          </ListItem>
          <ListItem>
            <Bold>block</Bold> for elements which can only be translated to
            TBlock. Examples: &lt;div&gt;, &lt;p&gt; ...
          </ListItem>
          <ListItem>
            <Bold>mixed</Bold> (rare) for elements which can be translated to
            TText, TPhrasing or TBlock. The sole mixed elements are &lt;a&gt;,
            &lt;ins&gt; and &lt;del&gt;.
          </ListItem>
          <ListItem>
            <Bold>none</Bold> for element which shall not be rendered.
          </ListItem>
        </List>
        <Admonition type="tip">
          <InlineCode>TDefaultRenderer</InlineCode> can receive{' '}
          <InlineCode>onPress</InlineCode> prop,{' '}
          <InlineCode>textProps</InlineCode> when rendering a{' '}
          <InlineCode>Text</InlineCode> element, and{' '}
          <InlineCode>viewProps</InlineCode> when rendering a{' '}
          <InlineCode>View</InlineCode> element.
        </Admonition>
      </Chapter>
      <Chapter title="Component-based Custom Rendering">
        <List>
          <ListItem>
            <InlineCode>tnode</InlineCode>: the <InlineCode>TNode</InlineCode>{' '}
            to render;
          </ListItem>
          <ListItem>
            <InlineCode>TDefaultRenderer</InlineCode>: the default renderer for
            this TNode;
          </ListItem>
          <ListItem>
            <InlineCode>InternalRenderer</InlineCode>: the internal renderer for
            this tagName;
          </ListItem>
          <ListItem>
            <InlineCode>style</InlineCode>: the flatten style object which
            should be passed to the root element returned by this component;
          </ListItem>
          <ListItem>
            <InlineCode>key</InlineCode>: the key which shall be passed to the
            root element returned by this component;
          </ListItem>
          <ListItem>
            <InlineCode>textProps</InlineCode> to use when you render a{' '}
            <InlineCode>Text</InlineCode>
            -based element;
          </ListItem>
          <ListItem>
            <InlineCode>viewProps</InlineCode> to use when you render a{' '}
            <InlineCode>View</InlineCode>
            -based element.
          </ListItem>
          <ListItem>
            <InlineCode>type</InlineCode> to check if a{' '}
            <InlineCode>Text</InlineCode> or <InlineCode>View</InlineCode> is
            expected as the root element returned by this component.
          </ListItem>
        </List>
      </Chapter>
    </Page>
  );
}
