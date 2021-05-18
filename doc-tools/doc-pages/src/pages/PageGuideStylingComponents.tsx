/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { RenderHTMLProps } from 'react-native-render-html';
import RefCssProcessor from '../components/RefCssProcessor';
import Page from '../Page';
import useToolkit from '../toolkit/useToolkit';
import inlineStylesConfig from './cards/inlineStylesConfig';

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
    RefDoc,
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
      <Header>
        <Admonition type="tip">
          You are kindly advised to read <RefDoc target="css-processing" />{' '}
          before continuing.
        </Admonition>
      </Header>
      <Chapter title="Inline Styles">
        <Paragraph>
          Inline styles are processed by the <RefCssProcessor /> library. You
          don't need to wonder if a CSS property will break your app: the CSS
          processor acts as a compatibility layer between React Native styles
          and CSS properties. This library gives you leverage on inline CSS
          processing:
        </Paragraph>
        <List>
          <ListItem>
            You can chose to disable inline styles processing altogether with
            the <RefRenderHtmlProp name="enableCSSInlineProcessing" /> prop.
          </ListItem>
          <ListItem>
            You can whitelist CSS properties with the{' '}
            <RefRenderHtmlProp name="allowedStyles" /> prop.
          </ListItem>
          <ListItem>
            Or blacklist CSS properties with the{' '}
            <RefRenderHtmlProp name="ignoredStyles" /> prop.
          </ListItem>
        </List>
        <Paragraph>Let's try it out:</Paragraph>
        <RenderHtmlCard {...inlineStylesConfig} />
      </Chapter>
      <Chapter title="Props">
        <Paragraph>
          The <InlineCode>RenderHTML</InlineCode> component has four props to
          customize elements styles:
        </Paragraph>
        <List>
          <ListItem>
            <RefRenderHtmlProp name="baseStyle" />, the styles for the root
            component. Inheritable styles will be inherited by all children.
          </ListItem>
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
      <Chapter title="Mixed Style Records">
        <Section title="Introduction">
          <Paragraph>
            A mixed style declaration is an object similar to{' '}
            <RefRNSymbol name="StyleSheet" />
            's <InlineCode>create</InlineCode> method argument values. However,
            it supports a blend of React Native{' '}
            <InlineCode>ViewStyle</InlineCode>,{' '}
            <InlineCode>TextStyle</InlineCode> and camel-cased{' '}
            <Hyperlink url="https://developer.mozilla.org/docs/Web/CSS/CSS_Properties_Reference">
              CSS properties
            </Hyperlink>
            . See <RefDoc target="css-processing" /> for a complete reference.
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
