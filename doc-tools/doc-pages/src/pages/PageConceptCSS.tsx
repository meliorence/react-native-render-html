/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Page from '../Page';
import useToolkit from '../toolkit/useToolkit';
import cssInheritanceConfig from './cards/cssInheritanceConfig';
import RefCssProcessor from '../components/RefCssProcessor';
import RefTRE from '../components/RefTRE';
import { RenderHTMLProps } from 'react-native-render-html';

const mixedStyleExample = `const mixedStyles = {
  whiteSpace: 'normal',
  color: 'gray'
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
      <Chapter title="Inheritance">
        <Paragraph>
          As stated before, a React Native <RefRNSymbol name="View" /> cannot
          receive <InlineCode>textAlign</InlineCode> style. It could even crash
          the native app. The <RefCssProcessor /> and <RefTRE /> libraries
          handle{' '}
          <Hyperlink url="https://developer.mozilla.org/en-US/docs/Web/CSS/inheritance">
            inheritable CSS properties
          </Hyperlink>{' '}
          by merging inheritable properties in the <Acronym name="TRT" />.
        </Paragraph>
        <RenderHtmlCard {...cssInheritanceConfig} />
      </Chapter>
      <Chapter title="Translation">
        <Paragraph>
          Every CSS property has a validator registered in the CSS processor, in
          charge of validating values for those rules. Validators are
          multipurposed:
        </Paragraph>
        <List type="disc">
          <ListItem>
            Handle special units such as absolute (<InlineCode>pt</InlineCode>),{' '}
            relative (<InlineCode>rem</InlineCode>) and keywords such as{' '}
            <InlineCode>small</InlineCode> (font-size) and{' '}
            <InlineCode>thin</InlineCode> (for borders) and translate those
            values in DIP (device independent pixels).
          </ListItem>
          <ListItem>
            Group properties by inheritability, native target (
            <Bold>block</Bold> for <RefRNSymbol name="View" /> and{' '}
            <Bold>text</Bold> for <RefRNSymbol name="Text" />
            ), and compatibility (<Bold>native</Bold> for properties
            translatable as native styles and <Bold>web</Bold> for other
            properties).
          </ListItem>
          <ListItem>Discard properties which values are invalid.</ListItem>
        </List>
        <Admonition type="important">
          Note that special <InlineCode>inherit</InlineCode>,{' '}
          <InlineCode>initial</InlineCode> and <InlineCode>unset</InlineCode>{' '}
          values are not supported.
        </Admonition>
      </Chapter>
      <Chapter title="Mixed Styles Declaration">
        <Paragraph>
          Mixed styles declarations are a blend between React Native styles (
          <InlineCode>ViewStyle</InlineCode>,{' '}
          <InlineCode>TextStyles</InlineCode>) and{' '}
          <Hyperlink url="https://developer.mozilla.org/docs/Web/CSS/CSS_Properties_Reference">
            CSS properties
          </Hyperlink>{' '}
          such as those handled by the CSS processor. This format enables
          features that cannot be handled directly by React Native style engine.
          For example <RefCssProperty name="white-space" /> collapsing,{' '}
          <RefCssProperty name="list-style-type" />, font selection (see{' '}
          <RefDoc target="textual" /> page) or{' '}
          <RefCssProperty name="object-fit" /> support in images (see{' '}
          <RefDoc target="images" /> page).
        </Paragraph>
        <SourceDisplay
          title="A mixed styles declaration."
          lang="js"
          showLineNumbers
          content={mixedStyleExample}
        />
      </Chapter>
      <Chapter title="Specificity">
        <Paragraph>
          Despite its lack of complex selectors,{' '}
          <Hyperlink url="https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity">
            CSS specificity
          </Hyperlink>{' '}
          will be honoured by this library. Most notably, a CSS property will be
          resolved by applying the following precedence in ascending order
          (latest will override formers):
        </Paragraph>
        <List>
          <ListItem>Inherited styles</ListItem>
          <ListItem>
            User Agent styles (see <RefDoc target="transient-render-engine" />,{' '}
            <Bold>element model</Bold>)
          </ListItem>
          <ListItem>
            Tags styles (<RefRenderHtmlProp name="tagsStyles" /> prop)
          </ListItem>
          <ListItem>
            Classes styles (<RefRenderHtmlProp name="classesStyles" /> prop)
          </ListItem>
          <ListItem>
            IDs styles (<RefRenderHtmlProp name="idsStyles" /> prop)
          </ListItem>
          <ListItem>
            Inline styles (<RefHtmlAttr name="style" /> DOM node attribute)
          </ListItem>
        </List>
        <Paragraph>
          So inline styles will take precedence over IDs styles, which will take
          precedence over classes styles, ...etc.
        </Paragraph>
        <Admonition type="important">
          <InlineCode>important!</InlineCode> directives, complex selectors such
          as <InlineCode>div &gt; *</InlineCode>, pseudo-classes and
          pseudo-elements are not supported.
        </Admonition>
      </Chapter>
    </Page>
  );
}
