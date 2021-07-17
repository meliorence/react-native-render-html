/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Page from '../Page';
import useToolkit from '../toolkit/useToolkit';

export default function PageIntroduction() {
  const {
    Acronym,
    Bold,
    Admonition,
    Conditional,
    Header,
    Paragraph,
    Chapter,
    SourceDisplay,
    RefLibrary,
    RefRNSymbol,
    RefHtmlElement,
    RefCssProperty,
    RefDoc,
    RefRenderHtmlProp,
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
      <Chapter title="Should I use?">
        <Section title="Yes!">
          <List type="disc">
            <ListItem>
              HTML markup is translated into React Native views. See the{' '}
              <RefDoc target="architecture" /> page for more details.
            </ListItem>
            <ListItem>
              Its design balances compliance to HTML and CSS standards with
              lightweightness, despite some limitations and caveats.
            </ListItem>
            <ListItem>
              It aims at being extremely customizable. For example, you can{' '}
              <RefDoc target="custom-renderers">define custom renderers</RefDoc>{' '}
              targetting specific tags with a mean to define children rendering,
              provide{' '}
              <RefDoc target="styling">styles for tags, classes and ids</RefDoc>
              , and <RefDoc target="dom-tampering">tamper with the DOM</RefDoc>.
            </ListItem>
          </List>
        </Section>
        <Section title="No">
          <List type="disc">
            <ListItem>
              If your use-case is pretty straightforward, you might implement{' '}
              <RefDoc target="reinvent-the-wheel">
                your own, lightweight HTML renderer.
              </RefDoc>
            </ListItem>
            <ListItem>
              This is not a Web engine! If you need to load JavaScript along, or
              you need all features of the Web standards, you should use{' '}
              <RefLibrary
                name="react-native-webview"
                url="https://github.com/react-native-webview/react-native-webview"
              />{' '}
              instead. Beware that it will certainly have a bigger impact on
              your App's performances, since it will use the system's Web View.
            </ListItem>
          </List>
        </Section>
        <Section title="Synthesis">
          <List type="disc">
            <ListItem>
              The best use case for library is when the content to render is
              predictable (e.g. you know in advance the tags and classes to
              support), such as rendering content from a CMS, or via API
              endpoints.
            </ListItem>
            <ListItem>
              You might also benefit from this library if you need to render
              sections of a web page such as articles which content is
              reasonably predictable, (see{' '}
              <RefDoc target="dom-tampering" fragment="root-selection">
                Root Selection
              </RefDoc>{' '}
              to select an element of the DOM to render).
            </ListItem>
            <ListItem>
              You should probably not use this library if you need to render
              arbitrary, unpredictable content.
            </ListItem>
          </List>
        </Section>
      </Chapter>
      <Chapter title="Install">
        <Paragraph>
          Install <InlineCode>react-native-render-html</InlineCode> Foundry
          release (v6) on your project:
        </Paragraph>
        <SourceDisplay
          lang="bash"
          content="npm install --save-prod react-native-render-html"
          showLineNumbers={false}
        />
      </Chapter>
      <Chapter title="Simple Usage">
        <Paragraph>Let's start with a simple example:</Paragraph>
        <RenderHtmlCard
          title="Minimal working example"
          caption="This example shows the rendering of simple HTML code snippet."
          props={{
            source: {
              html: `
<p style='text-align:center;'>
  Hello World!
</p>`
            }
          }}
        />
        <Conditional platform="web">
          <Admonition type="tip">
            Press the <Bold>Run on Your Device with Expo</Bold> button to try it
            out on your device, and change the HTML from the Expo editor.
          </Admonition>
          <Admonition type="tip">
            Inspect the pre-render tree representation with the{' '}
            <Bold>TRT Snapshot</Bold> tab.
          </Admonition>
        </Conditional>
        <Paragraph>
          The <RefRenderHtmlProp name="source" /> prop specifies the HTML
          content to load. This prop also supports an{' '}
          <InlineCode>uri</InlineCode> field for remote loading and a{' '}
          <InlineCode>dom</InlineCode> field for asynchronous DOM pre-processing
          (see{' '}
          <RefDoc target="dom-tampering" fragment="prerendering">
            Prerendering
          </RefDoc>
          ).
        </Paragraph>
        <Admonition type="important">
          The <RefRenderHtmlProp name="contentWidth" /> prop allows proper image
          scaling. See <RefDoc target="images" /> page for more details.
        </Admonition>
      </Chapter>
    </Page>
  );
}
