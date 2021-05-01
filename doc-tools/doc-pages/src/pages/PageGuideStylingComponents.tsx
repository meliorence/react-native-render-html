/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { RenderHTMLProps } from 'react-native-render-html';
import Page from '../Page';
import useToolkit from '../toolkit/useToolkit';

const mixedStyleExample = `const tagsStyles = {
  body: {
    whiteSpace: 'normal',
    color: 'gray'
  },
  a: {
    color: 'green'
  }
}`;

const mixedStyleRenderCard: RenderHTMLProps = {
  source: {
    html: `
<p style="text-align:center;">
  Hello world!
  <a href="#">A link!</a>
</p>
`
  },
  tagsStyles: {
    body: {
      whiteSpace: 'normal',
      color: 'gray'
    },
    a: {
      color: 'green'
    }
  }
};

export default function PageGuideStylingComponents() {
  const {
    Acronym,
    Admonition,
    Bold,
    Header,
    Paragraph,
    Chapter,
    Section,
    SourceDisplay,
    RefLibrary,
    RefRNSymbol,
    RefHtmlElement,
    RefCssProperty,
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
      <Chapter title="Inline Styles">
        <Paragraph>Blah</Paragraph>
      </Chapter>
      <Chapter title="Props">
        <Paragraph>
          The <InlineCode>RenderHTML</InlineCode> component has three props to
          customize elements styles:
        </Paragraph>
        <List>
          <ListItem>
            <RefRenderHtmlProp name="idsStyles" /> which target elements by the{' '}
            <InlineCode>id</InlineCode> attribute;
          </ListItem>
          <ListItem>
            <RefRenderHtmlProp name="classesStyles" /> which target elements by{' '}
            <InlineCode>class</InlineCode>;
          </ListItem>
          <ListItem>
            <RefRenderHtmlProp name="tagsStyles" /> which target elements by tag
            name.
          </ListItem>
        </List>
        <Paragraph>
          Each of these props is a record mapping identifiers with a{' '}
          <InlineCode>MixedStyleDeclaration</InlineCode>.
        </Paragraph>
        <Admonition type="note">
          There is not (yet) ways to provide{' '}
          <Hyperlink url="https://developer.mozilla.org/docs/Web/CSS/CSS_Selectors">
            CSS selectors
          </Hyperlink>{' '}
          to target elements. Because it would require a full-featured CSS
          parser to build an AST, this feature might be supported in the future
          with an extension.
        </Admonition>
      </Chapter>
      <Chapter title="Mixed style declarations">
        <Section title="Introduction">
          <Paragraph>
            A mixed style declaration is an object similar to{' '}
            <RefRNSymbol name="StyleSheet" />
            's <InlineCode>create</InlineCode> method argument values. However,
            it supports a mix of React Native <InlineCode>ViewStyle</InlineCode>
            , <InlineCode>TextStyle</InlineCode> and camel-cased{' '}
            <Hyperlink url="https://developer.mozilla.org/docs/Web/CSS/CSS_Properties_Reference">
              CSS properties
            </Hyperlink>
            . This is one of the <Bold>most powerful features</Bold> of this
            library, enabling for example <RefCssProperty name="white-space" />{' '}
            collapsing, <RefCssProperty name="list-style-type" /> and font
            selection! Inheritable style properties will be transfered to all
            descending <Acronym name="TNode" />
            s, bypassing React Native own limitations, e.g. you cannot set a{' '}
            <InlineCode>fontSize</InlineCode> style property to a React Native{' '}
            <RefRNSymbol name="View" /> component and expects its{' '}
            <RefRNSymbol name="Text" /> children inherit this property.
          </Paragraph>
          <SourceDisplay
            title="A mixed styles declaration record."
            lang="js"
            showLineNumbers
            content={mixedStyleExample}
          />
          <Paragraph>
            In the above snippet, mixed-style declarations are the objects
            defined as values of the <InlineCode>tagsStyles</InlineCode> record.
            A few important comments:
          </Paragraph>
          <List type="disc">
            <ListItem>
              <Bold>Line 2</Bold>. The <RefHtmlElement name="body" /> will
              always be present and can be confidently targeted, event when
              missing in the HTML snippet.
            </ListItem>
            <ListItem>
              <Bold>Line 3</Bold>. This is the default property, with the
              exception of <RefHtmlElement name="pre" /> and a few other tags.
            </ListItem>
            <ListItem>
              <Bold>Line 4</Bold>. Thanks to CSS inheritence, all textual
              children of <RefHtmlElement name="body" /> will default to this
              property.
            </ListItem>
            <ListItem>
              <Bold>Line 7</Bold>. The <Acronym name="TRE" /> implements CSS
              specificity. A rule targetting the <RefHtmlElement name="a" />{' '}
              element will override rules defined for its ancestors (in this
              case, <RefHtmlElement name="body" />
              ).
            </ListItem>
          </List>
          <Admonition type="warning">
            You should <Bold>never</Bold> provide styles from React Native{' '}
            <RefRNSymbol name="StyleSheet" />. These will not work.
          </Admonition>
        </Section>
        <Section title="Example">
          <RenderHtmlCard
            title="Running The Mixed Style"
            props={mixedStyleRenderCard}
          />
        </Section>
      </Chapter>
    </Page>
  );
}
