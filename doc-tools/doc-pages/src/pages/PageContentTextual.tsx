/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Page from '../Page';
import useToolkit from '../toolkit/useToolkit';
import paragraphsConfig from './cards/paragraphsConfig';
import whiteSpaceNormalConfig from './cards/whiteSpaceNormalConfig';
import whiteSpacePreConfig from './cards/whiteSpacePreConfig';
import preformattedConfig from './cards/preformattedConfig';
import fontSelectionArial from './cards/fontSelectionArial';
import fontSelectionCourierNewConfig from './cards/fontSelectionCourierNewConfig';
import fontSelectionSpaceMonoConfig from './cards/fontSelectionSpaceMonoConfig';

export default function PageContentTextual() {
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
      {/* <Header>
        <Paragraph></Paragraph>
      </Header> */}
      <Chapter title="Paragraphs">
        <Paragraph>
          Paragraphs have a default top and bottom margin. If you use{' '}
          <RefRenderHtmlProp name="enableExperimentalMarginCollapsing" /> prop,
          margins of adjacents blocks will collapse{' '}
          <Hyperlink url="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing">
            as per the CSS standard
          </Hyperlink>
          .
        </Paragraph>
        <RenderHtmlCard {...paragraphsConfig} />
        <Admonition type="caution">
          <RefRenderHtmlProp name="enableExperimentalMarginCollapsing" /> is
          considered experimental because the <Acronym name="TRE" /> doesn't
          support <RefCssProperty name="display" /> CSS property yet. However,
          margin collapsing should not apply to flex flows while this prop will
          apply margin collapsing indiscriminitly.
        </Admonition>
      </Chapter>
      <Chapter title="Whitespace Collapsing">
        <Paragraph>
          White space collasping occurs in the eponym phase of the{' '}
          <RefDoc target="transient-render-engine" /> processing step.
          Insignificant whitespaces are removed from the tree, as per the
          algorithm depicted in{' '}
          <Hyperlink url="https://www.w3.org/TR/css-text-3/">
            CSS Text Module Level 3
          </Hyperlink>
          .
        </Paragraph>
        <Admonition type="note">
          The <Acronym name="TRE" /> strictly complies with this standard,
          although only <InlineCode>white-space:&nbsp;normal;</InlineCode> and{' '}
          <InlineCode>white-space:&nbsp;pre;</InlineCode> are supported at the
          moment.
        </Admonition>
        <Section title="Example: 'white-space: normal'">
          <Paragraph>
            This is the default behavior, with the exception of a handful of
            tags such as <RefHtmlElement name="pre" />.
          </Paragraph>
          <RenderHtmlCard {...whiteSpaceNormalConfig} />
        </Section>
        <Section title="Example: 'white-space: pre'">
          <Paragraph>
            You can set the <RefCssProperty name="white-space" /> CSS property
            with inline styles <Bold>or</Bold> with classes, id and tags styles.
          </Paragraph>
          <RenderHtmlCard {...whiteSpacePreConfig} />
        </Section>
      </Chapter>
      <Chapter title="Preformatted Content">
        <RenderHtmlCard {...preformattedConfig} />
        <Admonition type="note">
          The default font for the <RefHtmlElement name="pre" /> tag is
          monospace and <RefCssProperty name="white-space" /> property is "pre".
          These default styles are set via the{' '}
          <InlineCode>mixedUAStyles</InlineCode> associated with this tag. See{' '}
          <RefDoc target="transient-render-engine" /> page, element model
          section.
        </Admonition>
      </Chapter>
      <Chapter title="Font Selection">
        <Paragraph>
          CSS <RefCssProperty name="font-family" /> and{' '}
          <RefCssProperty name="font" /> properties allow a comma-separated list
          of fonts, but React Native styles <InlineCode>fontFamily</InlineCode>{' '}
          allows only one font name. With the <Acronym name="TRE" />, you can
          instruct which fonts are available in the system (or fonts you have
          added), and it will pick the first match! The prop to achieve that is{' '}
          <RefRenderHtmlProp name="systemFonts" />.
        </Paragraph>
        <Paragraph>
          By default, a handful of fonts supported by the current platform are
          pre-registered (Android, iOS, MacOS and Windows). If you are using
          expo, just set this prop to{' '}
          <Hyperlink url="https://docs.expo.io/versions/latest/sdk/constants/#constantssystemfonts">
            Constants.systemFonts
          </Hyperlink>
          . You can also define how{' '}
          <Hyperlink url="https://developer.mozilla.org/en-US/docs/Web/CSS/font-family#generic-name">
            generic font names
          </Hyperlink>{' '}
          are resolved with the <RefRenderHtmlProp name="fallbackFonts" /> prop.
        </Paragraph>
        <Section title="Example: Arial Font Selection">
          <RenderHtmlCard {...fontSelectionArial} />
        </Section>
        <Section title="Example: Courier New Font Selection">
          <RenderHtmlCard {...fontSelectionCourierNewConfig} />
        </Section>
        <Section title="Example: Space Mono Font Selection">
          <RenderHtmlCard {...fontSelectionSpaceMonoConfig} />
        </Section>
        <Admonition type="caution">
          Fonts registered in <InlineCode>systemFonts</InlineCode> should not be
          surrounded with quotes; however you <Bold>must</Bold> surround the
          font name with quotes in inline and mixed styles, as per CSS standard.
        </Admonition>
      </Chapter>
    </Page>
  );
}
