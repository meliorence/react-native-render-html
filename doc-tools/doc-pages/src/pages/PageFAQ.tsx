/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Page from '../Page';
import useToolkit from '../toolkit/useToolkit';
import selectableTextConfig from './cards/selectableTextConfig';

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
            Sure! The default renderer is very limited. Check-out{' '}
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
        <Section title="How can I make textual content selectable?">
          <Paragraph>
            You can take advantage of{' '}
            <RefRenderHtmlProp name="defaultTextProps" /> prop to set{' '}
            <InlineCode>selectable</InlineCode> to all{' '}
            <RefRNSymbol name="Text" /> instances.
          </Paragraph>
          <RenderHtmlCard {...selectableTextConfig} />
          <Paragraph>
            However, the end-user won't be able to select across multiple
            blocks: this is a limitation of React Native.
          </Paragraph>
        </Section>
      </Chapter>
      <Chapter title="Troubleshooting">
        <Section title="Warning: You seem to update the X prop of the Y component in short periods of time...">
          <Paragraph>
            There is a detailed explaination for this warning here:{' '}
            <Hyperlink url="https://stackoverflow.com/q/68966120/2779871">
              Stack Overflow | react-native-render-html, "You seem to update
              ..."
            </Hyperlink>
            .
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
          <Paragraph>
            Also note that <InlineCode>fontWeight</InlineCode> and{' '}
            <InlineCode>fontStyle</InlineCode> typefaces modifiers, which might
            be set by default for some tags such as <RefHtmlElement name="h1" />
            , will cause the font to be missed on Android if you haven't
            registered your font with typefaces, e.g. via{' '}
            <Hyperlink url="https://developer.android.com/guide/topics/ui/look-and-feel/fonts-in-xml">
              XML fonts
            </Hyperlink>
            . See{' '}
            <Hyperlink url="https://stackoverflow.com/a/70247374/2779871">
              this StackOverflow answer for a step-by-step guide
            </Hyperlink>
            .
          </Paragraph>
        </Section>
        <Section title="Line breaks (<br>) seem to take up too much vertical space">
          <Paragraph>
            This is a known bug, but hopefully we have the{' '}
            <RefRenderHtmlProp name="enableExperimentalBRCollapsing" /> prop to
            fix it. See{' '}
            <RefDoc target="textual" fragment="caveats">
              Textual | Caveats | Line Breaks
            </RefDoc>
            .
          </Paragraph>
        </Section>
        <Section title="Isolated empty textual tags take up vertical space">
          <Paragraph>
            This is another known bug, but hopefully we have the{' '}
            <RefRenderHtmlProp name="enableExperimentalGhostLinesPrevention" />{' '}
            prop to fix it. See{' '}
            <RefDoc target="textual" fragment="caveats">
              Textual | Caveats | Empty Tags
            </RefDoc>
            .
          </Paragraph>
        </Section>
        <Section title="Content after custom tags is not displayed or displayed inside instead of below?">
          <Paragraph>
            That would often happen in the HTML markup when your custom tags is
            self-closing such as in <InlineCode>{'<customtag />'}</InlineCode>.
            The HTML5 standard strictly prohibits non-void elements to be
            self-closing, and the required behavior for a parser is to ignore
            the <InlineCode>{'/'}</InlineCode> character in that case. Abding by
            this standard, the HTML parser will end up considering{' '}
            <InlineCode>{'<customtag />'}</InlineCode> as equivlent to{' '}
            <InlineCode>{'<customtag >'}</InlineCode>. Therefore, any content
            below it will be considered as children of{' '}
            <InlineCode>{'<customtag>'}</InlineCode>. Because it is forgiving,
            the parser will close this tag when it reaches the end of the
            stream. To overcome this issue, <Bold>you have two options</Bold>:
          </Paragraph>
          <List type="decimal">
            <ListItem>
              Replace <InlineCode>{'<customtag />'}</InlineCode> with{' '}
              <InlineCode>{'<customtag></customtag>'}</InlineCode> in your HTML
              markup.
            </ListItem>
            <ListItem>
              Set <InlineCode>recognizeSelfClosing</InlineCode> option to{' '}
              <InlineCode>true</InlineCode> in{' '}
              <RefRenderHtmlProp name="htmlParserOptions" /> prop.
            </ListItem>
          </List>
        </Section>
        <Section title="Sub and sup tags are not vertically shifted">
          <Paragraph>
            This is caused by a known limitation in React Native.{' '}
            <Hyperlink url="https://github.com/meliorence/react-native-render-html/issues/76#issuecomment-660702309">
              The issue is being tracked on Github.
            </Hyperlink>
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
        <Section title="Long image cannot show in full screen on Android">
          <Paragraph>
            This is a limitation of FaceBook's fresco library and React Native{' '}
            <RefRNSymbol name="Image" /> component. You need to downsize the
            image.
          </Paragraph>
        </Section>
        <Section title="Some anchors (<a>) are not accessible to screen readers">
          <Paragraph>
            Because of a{' '}
            <Hyperlink url="https://github.com/facebook/react-native/issues/32004">
              React Native bug
            </Hyperlink>
            , nested `Text` elements are not accessible, which means that the
            screen reader will not be able to identify{' '}
            <RefHtmlElement name="a" /> tags as links when grouped with other
            textual elements. Below is an example:
          </Paragraph>
          <SourceDisplay
            lang="html"
            showLineNumbers={false}
            content={`<p>
  Unfortunately,
  <a href="https://domain.com">this hyperlink is not accessible</a>
</p>`}
          />
          <Paragraph>
            Luke Walczak from Callstack{' '}
            <Hyperlink url="https://callstack.com/blog/react-native-android-accessibility-tips/">
              explains how to circumvent this issue in a great post
            </Hyperlink>
            . Unfortunately, this workaround cannot be genericized and we will
            have to wait for a fix in React Native codebase.
          </Paragraph>
        </Section>
      </Chapter>
    </Page>
  );
}
