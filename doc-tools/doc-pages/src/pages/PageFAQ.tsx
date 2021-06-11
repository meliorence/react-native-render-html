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

export default function PageFAQ() {
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
      <Chapter title="How To">
        <Section title="How to intercept press events on links?">
          <Paragraph>
            Use <InlineCode>renderersProps.a.onPress</InlineCode>, see{' '}
            <Hyperlink url="https://stackoverflow.com/q/63114501/2779871">
              Stack Overflow | How to open the browser when a link is pressed?
            </Hyperlink>{' '}
            and <RefRenderHTMLExport name="RenderersProps" member="a" full />.
          </Paragraph>
        </Section>
        <Section title="I want to use a custom component to render some tags, how to do that?">
          <Paragraph>
            You can define custom renderers for that purpose. See{' '}
            <RefDoc target="custom-renderers" />.
          </Paragraph>
        </Section>
        <Section title="How to access the raw HTML from a custom renderer?">
          <Paragraph>
            Use <RefRenderHTMLExport name="domNodeToHTMLString" /> utility. See{' '}
            <Hyperlink url="https://stackoverflow.com/q/63979897/2779871">
              Stack Overflow | Extract raw HTML in react-native-render-html
              custom renderers
            </Hyperlink>
            .
          </Paragraph>
        </Section>
        <Section title="How to render iframes?">
          <Paragraph>
            That's really a piece of cake. See{' '}
            <Hyperlink url="https://github.com/native-html/plugins/tree/master/packages/iframe-plugin#readme">
              @native-html/iframe-plugin
            </Hyperlink>
            .
          </Paragraph>
        </Section>
        <Section title="How to set the default font size and family?">
          <Paragraph>
            You should use <RefRenderHtmlProp name="baseStyle" /> prop.
          </Paragraph>
        </Section>
        <Section title="How to render inline images?">
          <Paragraph>
            See this example from the docs:{' '}
            <RefDoc
              fragment="example-displaying-inline-images"
              target="custom-renderers">
              Example: Displaying Inline Images
            </RefDoc>
            .
          </Paragraph>
        </Section>
        <Section title="Aren't there better renderers for tables?">
          <Paragraph>
            Sure! The default renderer is very limitted. Check-out{' '}
            <Hyperlink url="https://github.com/native-html/plugins/tree/master/packages/table-plugin#readme">
              @native-html/table-plugin
            </Hyperlink>{' '}
            and{' '}
            <Hyperlink url="https://github.com/native-html/plugins/tree/master/packages/heuristic-table-plugin#readme">
              @native-html/heuristic-table-plugin
            </Hyperlink>
            .
          </Paragraph>
        </Section>
      </Chapter>
      <Chapter title="Troubleshooting">
        <Section title="Some props such as styling props don't cause a re-render, what's wrong?">
          <Paragraph>
            Props for the <RefRenderHTMLExport name="TRenderEngineConfig" />{' '}
            component such as styling props are "cold", because a rebuild of the
            engine is costly. To circumvent the issue, you can whitelist props
            which should be reactive via{' '}
            <RefRenderHtmlProp name="triggerTREInvalidationPropNames" /> prop.
          </Paragraph>
        </Section>
        <Section title="Custom font families don't work, what's happening?">
          <Paragraph>
            You must register fonts available in your app with{' '}
            <RefRenderHtmlProp name="systemFonts" /> prop. This feature is
            called <Bold>font selection</Bold> and prevents native crashes
            caused by missing fonts! See{' '}
            <RefDoc target="textual" fragment="font-selection">
              Font Selection
            </RefDoc>
            .
          </Paragraph>
        </Section>
        <Section title="The application crashes on Android with react-native-screens">
          <Paragraph>
            Likely a bug between <InlineCode>react-native-webview</InlineCode>{' '}
            and <InlineCode>react-native-screens</InlineCode>. See{' '}
            <Hyperlink url="https://stackoverflow.com/q/63171131/2779871">
              Stack Overflow | When rendering iframes, Android crashes while
              navigating back to stack screen
            </Hyperlink>
            .
          </Paragraph>
        </Section>
        <Section title="Unable to resolve XXX from node_modules/YYY">
          <Paragraph>
            Probably an issue with your package manager. See{' '}
            <Hyperlink url="https://stackoverflow.com/q/63053425/2779871">
              Stack Overflow | Unable to resolve XXX from module YYY
            </Hyperlink>
            .
          </Paragraph>
        </Section>
        <Section title="Long image can not show in full screen on Android">
          <Paragraph>
            This is a limitation of FaceBook's fresco library and React Native{' '}
            <RefRNSymbol name="Image" /> component. You need to downsize the
            image.
          </Paragraph>
        </Section>
      </Chapter>
    </Page>
  );
}
