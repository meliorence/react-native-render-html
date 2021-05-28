/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import ListItemCode from '../components/ListItemCode';
import Page from '../Page';
import useToolkit from '../toolkit/useToolkit';
import olUpperRomanConfig from './cards/olUpperRomanConfig';
import ulSquareConfig from './cards/ulSquareConfig';
import customListKatanaConfig from './cards/customListThaiConfig';
import customListRussianConfig from './cards/customListRussianConfig';
import rtlListArabicConfig from './cards/rtlListArabicConfig';
import rtlListDiscConfig from './cards/rtlListDiscConfig';

function RefCounterStyle() {
  const { RefLibrary } = useToolkit();
  return (
    <RefLibrary
      name="@jsamr/counter-style"
      url="https://github.com/jsamr/react-native-li/tree/master/packages/counter-style#readme"
    />
  );
}

export default function PageContentLists() {
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
    RefRenderHTMLExport,
    RefTRE,
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
          Lists (<RefHtmlElement name="ol" /> and <RefHtmlElement name="ul" />)
          are rendered with an <Bold>internal renderer</Bold>. See{' '}
          <RefDoc target="rendering" /> page. The <Bold>content model</Bold> of
          anchors is <Bold>block</Bold>, see the{' '}
          <RefDoc target="transient-render-engine" /> page,{' '}
          <Bold>element model</Bold> section.
        </Paragraph>
        <Admonition type="tip">
          Lists marker rendering logic has been extracted to{' '}
          <RefLibrary
            name="@jsamr/react-native-li"
            url="https://github.com/jsamr/react-native-li/tree/master/packages/react-native-li#readme"
          />{' '}
          and <RefCounterStyle /> libraries for convinience! Fell free to use
          these outside of a <RefRenderHTMLExport name="RenderHTML" />{' '}
          component.
        </Admonition>
      </Header>
      <Chapter title="List Style Type">
        <Paragraph>
          List elements support <RefCssProperty name="list-style-type" /> CSS
          property, which defines how the marker pseudo-element of a list item
          should be rendered. In CSS terminology, a marker is a pseudo-element
          situated before elements with a <RefCssProperty name="display" />{' '}
          property set to <InlineCode>list-item</InlineCode>. See{' '}
          <Hyperlink url="https://www.w3.org/TR/css-lists-3/#propdef-list-style-type">
            CSS Lists and Counters Module Level 3
          </Hyperlink>{' '}
          for a standard reference and{' '}
          <RefRenderHTMLExport name="DefaultSupportedListStyleType" /> for a
          list of types supported by this library.
        </Paragraph>
      </Chapter>
      <Chapter title="Ordered Lists">
        <Paragraph>
          Ordered lists <RefHtmlElement name="ol" /> elements support by default
          6 list style types:
        </Paragraph>
        <List type="disc">
          <ListItemCode name="decimal">1, 2, 3 ... (the default)</ListItemCode>
          <ListItemCode name="lower-alpha">a, b, c ...</ListItemCode>
          <ListItemCode name="upper-alpha">A, B, C ...</ListItemCode>
          <ListItemCode name="lower-greek">α, β, γ ...</ListItemCode>
          <ListItemCode name="lower-roman">i, ii, iii ...</ListItemCode>
          <ListItemCode name="upper-roman">I, II, III ...</ListItemCode>
        </List>
        <RenderHtmlCard {...olUpperRomanConfig} />
        <Admonition type="tip">
          You can actually very easily plug-in one of the dozens presets from{' '}
          <RefCounterStyle />, including Persian, Arabic, Hebrew, Thai,
          Katana... see the below chapter.
        </Admonition>
      </Chapter>
      <Chapter title="Unordered Lists">
        <Paragraph>
          Unordered lists <RefHtmlElement name="ul" /> elements support by
          default 5 list style types:
        </Paragraph>
        <List type="disc">
          <ListItemCode name="disc"> "•" (the default)</ListItemCode>
          <ListItemCode name="square">"■"</ListItemCode>
          <ListItemCode name="circle">"○"</ListItemCode>
          <ListItemCode name="disclosure-open">"▼"</ListItemCode>
          <ListItemCode name="disclosure-closed">"▶"</ListItemCode>
        </List>
        <Admonition type="note">
          Those markers are not rendered with UTF-8 characters, which might have
          a significant variety of shapes and sizes depending on fonts. Instead,
          geometric shapes are rendered.
        </Admonition>
        <RenderHtmlCard {...ulSquareConfig} />
      </Chapter>
      <Chapter title="Defining and Customizing Markers Pseudo-Elements">
        <Section title="Using a Preset from @jsamr/counter-style">
          <Paragraph>
            The <RefRenderHtmlProp name="customListStyleSpecs" /> prop allows
            you to create as many list type styles as you wish. Combined with
            the power of <RefCounterStyle />, you can plug-in one of the dozens
            of presets with a one-liner! See below example with the{' '}
            <Bold>Thai</Bold> preset:
          </Paragraph>
          <RenderHtmlCard {...customListKatanaConfig} />
        </Section>
        <Section title="Creating a Counter Style">
          <Paragraph>
            <RefCounterStyle /> allows you to create any counter style,
            translating strictly the <RefCssProperty name="@counter-style" />{' '}
            at-rule API defined in{' '}
            <Hyperlink url="https://www.w3.org/TR/css-counter-styles-3/#the-counter-style-rule">
              CSS Counter Styles Level 3
            </Hyperlink>{' '}
            in a JavaScript API. In the below example, we are going to create an
            alphabetic counter style for the Russian alphabet:
          </Paragraph>
          <RenderHtmlCard {...customListRussianConfig} />
        </Section>
        {/* TODO: add a section about custom "unitary" counter styles. */}
      </Chapter>
      <Chapter title="Experimental RTL Mode">
        <Paragraph>
          Thanks to <RefRenderHtmlProp name="renderersProps" /> prop, you can
          enable experimental RTL support for lists (see{' '}
          <RefRenderHTMLExport name="RenderersProps" member="ol" full /> and{' '}
          <RefRenderHTMLExport name="RenderersProps" member="ul" full />
          ).
        </Paragraph>
        <Admonition type="note">
          For RTL mode to take effect, you need to have a{' '}
          <RefHtmlAttr name="dir" /> attribute set for the list tag or one of
          its parents, or the <RefCssProperty name="direction" /> style set for
          the list tag or one of its parents.
        </Admonition>
        <Section title="Example: Unordered Lists">
          <RenderHtmlCard {...rtlListDiscConfig} />
        </Section>
        <Section title="Example: Ordered Lists Arabic">
          <RenderHtmlCard {...rtlListArabicConfig} />
        </Section>
      </Chapter>
    </Page>
  );
}
