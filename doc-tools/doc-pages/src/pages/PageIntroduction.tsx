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
    InlineCode,
    Hyperlink,
    List,
    ListItem,
    SvgFigure
  } = useToolkit();
  return (
    <Page>
      <Chapter title="Should I use?">
        <Paragraph>
          <Bold>Pros</Bold>
        </Paragraph>
        <List type="disc">
          <ListItem>
            HTML markup is translated into React Native views. See the{' '}
            <RefDoc target="architecture" /> page for more details.
          </ListItem>
          <ListItem>
            Its design balances compliance to HTML and CSS standards and
            lightweightness, despite some limitations and caveats.
          </ListItem>
          <ListItem>
            It aims at being extremely customizable. For example, you can{' '}
            <RefDoc target="custom-renderers">define custom renderers</RefDoc>{' '}
            targetting specific tags with a mean to define children rendering,
            provide{' '}
            <RefDoc target="styling-components">
              styles for tags, classes and ids
            </RefDoc>
            , and <RefDoc target="dom-tampering">tamper with the DOM</RefDoc>.
          </ListItem>
        </List>
        <Paragraph>
          <Bold>Cons</Bold>
        </Paragraph>
        <List type="disc">
          <ListItem>
            If your use-case is pretty straightforward, you might implement{' '}
            <RefDoc target="reinvent-the-wheel">
              your own, lightweight HTML renderer.
            </RefDoc>
          </ListItem>
          <ListItem>
            This is not a Web engine! If you need to load JavaScript along, you
            should use{' '}
            <RefLibrary
              name="react-native-webview"
              url="https://github.com/react-native-webview/react-native-webview"
            />{' '}
            instead. Beware that it will certainly have a bigger impact on your
            App's performances, since it will use the system's Web View.
          </ListItem>
        </List>
      </Chapter>
      <Chapter title="Install">
        <Paragraph>
          Install <InlineCode>react-native-render-html</InlineCode> on your
          project:
        </Paragraph>
        <SourceDisplay
          lang="sh"
          content="npm install --save-dev react-native-render-html"
          showLineNumbers={false}
        />
      </Chapter>
      <Chapter title="Simple Usage">
        <Paragraph>Let's start with a simple example:</Paragraph>
        <RenderHtmlCard
          title="Minimal working example"
          caption="This card shows the result of rendering a simple HTML code snippet."
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
            Play with the html constant and see how it renders! You can try it
            out in your device, just press the "My Device" button.
          </Admonition>
        </Conditional>
        <Paragraph>
          The <RefRenderHtmlProp name="source" /> prop specifies the HTML
          content to load. This prop also supports an{' '}
          <InlineCode>uri</InlineCode> field for remote loading!
        </Paragraph>
        <Admonition type="important">
          The <RefRenderHtmlProp name="contentWidth" /> prop allows proper image
          scaling. See <RefDoc target="images" /> page for more details.
        </Admonition>
        <Conditional platform="web">
          <Admonition type="note">
            You won't be able to load external resources such as with{' '}
            <InlineCode>source.uri</InlineCode> prop from the Expo playground
            Web preview because of CORS restrictions, but you can try it out on
            your device, just press the "My Device" button.
          </Admonition>
        </Conditional>
      </Chapter>
    </Page>
  );
}
