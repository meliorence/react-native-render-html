/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Page from '../Page';
import useToolkit from '../toolkit/useToolkit';
import ListItemCode from '../components/ListItemCode';
import simpleCustomRenderersConfig from './cards/simpleCustomRenderersConfig';
import adsRenderersConfig from './cards/adsRenderersConfig';
import inlineImagesConfig from './cards/inlineImagesConfig';

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
          The renderer API shipped since <Bold>Foundry</Bold> (v6) is at the
          same time more strict and more flexible. To get ready for this new
          API, you must understand some basics of the transient render tree
          produced by the <Acronym name="TRE" />:
        </Paragraph>
        <List>
          <ListItem>
            During the transient render tree generation, every DOM node is
            translated to a <InlineCode>TNode</InlineCode>.
          </ListItem>
          <ListItem>
            <InlineCode>TText</InlineCode> nodes correspond to DOM text nodes (
            <Bold>anonymous</Bold> <InlineCode>TText</InlineCode> nodes) or DOM
            elements which children are DOM text nodes (<Bold>named</Bold>{' '}
            <InlineCode>TText</InlineCode> nodes). So a{' '}
            <InlineCode>TText</InlineCode> node cannot have children, and its
            content is a string accessible with the{' '}
            <InlineCode>data</InlineCode> field.
          </ListItem>
          <ListItem>
            Thanks to <Bold>hoisting</Bold>, <InlineCode>TPhrasing</InlineCode>{' '}
            nodes can only have <InlineCode>TText</InlineCode> and{' '}
            <InlineCode>TPhrasing</InlineCode> nodes as children.
          </ListItem>
          <ListItem>
            <InlineCode>TBlock</InlineCode> nodes can have any children.
          </ListItem>
        </List>
        <Admonition type="tip">
          You are kindly advised to read{' '}
          <RefDoc target="transient-render-engine" /> page before continuing!
        </Admonition>
      </Header>
      <Chapter title="Options for Custom Rendering">
        <Paragraph>
          You can customize rendering at two steps of the flow:
        </Paragraph>
        <List>
          <ListItem>
            During{' '}
            <Bold>
              <Acronym name="TRT" /> generation.
            </Bold>{' '}
            via HTML model definition.
          </ListItem>
          <ListItem>At (React) render time via custom renderers.</ListItem>
        </List>
        <Paragraph>
          These customizations are not exclusive, so you can use both approaches
          at the same time.
        </Paragraph>
      </Chapter>
      <Chapter title="Model-based Custom Rendering">
        <Section title="HTMLElementModel">
          <Paragraph>
            To each standard tag is attached an <Bold>element model</Bold>. Such
            model has multiple fields describing different behaviors related to
            translation of those DOM elements:
          </Paragraph>
          <List>
            <ListItemCode name="contentModel">
              How should this tag be considered for <Bold>hoisting</Bold>? See
              next section.
            </ListItemCode>
            <ListItemCode name="isVoid">
              Will be <InlineCode>true</InlineCode> for void aka{' '}
              <Hyperlink url="https://developer.mozilla.org/en-US/docs/Glossary/Empty_element">
                empty elements
              </Hyperlink>{' '}
              , e.g. DOM elements which can't have children.
            </ListItemCode>
            <ListItemCode name="isOpaque">
              Will be <InlineCode>true</InlineCode> for those elements which
              children should not be translated. Useful for{' '}
              <RefHtmlElement name="svg" /> and other custom markups.
            </ListItemCode>
            <ListItemCode name="mixedUAStyles">
              Mixed User-Agent styles, e.g. default styles for this element.
              This is how default styles are set for tags.
            </ListItemCode>
            <ListItemCode name="getUADerivedStyleFromAttributes">
              A function which returns mixed UA styles given the DOM node{' '}
              <Bold>attributes</Bold> and <InlineCode>TNode</InlineCode>{' '}
              <Bold>markers</Bold>.
            </ListItemCode>
          </List>
        </Section>
        <Section title="HTMLContentModel">
          <Paragraph>
            There are 4 content models that can be attached to a tag:
          </Paragraph>
          <List>
            <ListItem>
              <Bold>textual</Bold> for elements which can be translated to{' '}
              <InlineCode>TText</InlineCode> or{' '}
              <InlineCode>TPhrasing</InlineCode>. Examples:{' '}
              <RefHtmlElement name="span" />, <RefHtmlElement name="strong" />{' '}
              ...
            </ListItem>
            <ListItem>
              <Bold>block</Bold> for elements which can only be translated to
              <InlineCode>TBlock</InlineCode>. Examples:{' '}
              <RefHtmlElement name="div" />, <RefHtmlElement name="p" />,{' '}
              <RefHtmlElement name="article" /> ...
            </ListItem>
            <ListItem>
              <Bold>mixed</Bold> (rare) for elements which can be translated to
              <InlineCode>TText</InlineCode>, <InlineCode>TPhrasing</InlineCode>{' '}
              or <InlineCode>TBlock</InlineCode>. The sole mixed elements are{' '}
              <RefHtmlElement name="a" />, <RefHtmlElement name="ins" /> and{' '}
              <RefHtmlElement name="del" />.
            </ListItem>
            <ListItem>
              <Bold>none</Bold> for element which shall not be rendered.
              Examples: <RefHtmlElement name="button" />,{' '}
              <RefHtmlElement name="map" /> ...
            </ListItem>
          </List>
          <Paragraph>
            A powerful feature of the <Bold>Foundry</Bold> engine is that the
            models attached to a tag name can be customized! In the next
            example, we are going to display inline images.
          </Paragraph>
        </Section>
        <Section title="Example: Displaying Inline Images">
          <Paragraph>
            In the below example, we are changing the element model of the
            <RefHtmlElement name="img" /> tag to support inline rendering. For
            this purpose, we take advantage of the{' '}
            <RefRenderHtmlProp name="customHTMLElementModels" /> prop!
          </Paragraph>
          <RenderHtmlCard {...inlineImagesConfig} />
          <Admonition type="note">
            We used <InlineCode>HTMLElementModel.extend()</InlineCode> method to
            change the <Bold>content model</Bold> for the{' '}
            <RefHtmlElement name="img" /> tag. This method is immutable: it
            creates a new <InlineCode>HTMLElementModel</InlineCode> instance.
            It's thus safe to use this method to create models for new tags
            derived from models for existing tags.
          </Admonition>
        </Section>
      </Chapter>
      <Chapter title="Component-based Custom Rendering">
        <Section title="Minimal Example">
          <Paragraph>
            You can register custom renderers components with the{' '}
            <RefRenderHtmlProp name="renderers" /> prop.
          </Paragraph>
          <Paragraph>
            Stop talking, let's try it out. We're going to define a renderer for
            the <RefHtmlElement name="h1" /> element which supports press
            interactions:
          </Paragraph>
          <RenderHtmlCard {...simpleCustomRenderersConfig} />
          <Admonition type="tip">
            The wrapper component injected when handling{' '}
            <InlineCode>onPress</InlineCode> for non-textual{' '}
            <InlineCode>TNodes</InlineCode> is defined by the{' '}
            <RefRenderHtmlProp name="GenericPressable" /> prop. You can also
            customize the highlight color with{' '}
            <RefRenderHtmlProp name="pressableHightlightColor" />.
          </Admonition>
        </Section>
        <Section title="Children Tampering">
          <Paragraph>
            Let's continue with a common requirement: injecting ads in the body
            of an article. More precisely, after the 2d and 4th children. To
            achieve our goal, we are going to use the{' '}
            <InlineCode>TChildrenRenderer</InlineCode> component:
          </Paragraph>
          <RenderHtmlCard {...adsRenderersConfig} />
          <Paragraph>
            The foundry API is powerful in terms of rendering customization. It
            is very easy to insert child elements, while preserving the internal
            rendering logic.
          </Paragraph>
          <Admonition type="tip">
            <InlineCode>TDefaultRenderer</InlineCode> can receive{' '}
            <InlineCode>onPress</InlineCode> prop,{' '}
            <InlineCode>textProps</InlineCode> when rendering a{' '}
            <InlineCode>Text</InlineCode> element, and{' '}
            <InlineCode>viewProps</InlineCode> when rendering a{' '}
            <InlineCode>View</InlineCode> element.
          </Admonition>
        </Section>
        <Section title="Renderer Props Summary">
          <Paragraph>A custom renderer will receive the below props:</Paragraph>
          <List type="disc">
            <ListItemCode name="tnode">
              the <InlineCode>TNode</InlineCode> to render;
            </ListItemCode>
            <ListItemCode name="TDefaultRenderer">
              the default renderer for this <InlineCode>TNode</InlineCode>;
            </ListItemCode>
            <ListItemCode name="InternalRenderer">
              the internal renderer for this <InlineCode>tagName</InlineCode>.
              An internal renderer is like a custom renderer, but registered
              internally. If there is no internal renderer registered for this
              tag, <InlineCode>InternalRenderer</InlineCode> will be equal to{' '}
              <InlineCode>TDefaultRenderer</InlineCode>.
            </ListItemCode>
            <ListItemCode name="style">
              the flatten style object which should be passed to the{' '}
              <InlineCode>TDefaultRenderer</InlineCode> or{' '}
              <InlineCode>InternalRenderer</InlineCode>
              element returned by this component;
            </ListItemCode>
            <ListItemCode name="key">
              the key which shall be passed to the root element returned by this
              component;
            </ListItemCode>
            <ListItemCode name="textProps">
              to use when you render a <InlineCode>Text</InlineCode>
              -based element;
            </ListItemCode>
            <ListItemCode name="viewProps">
              to use when you render a <InlineCode>View</InlineCode>
              -based element.
            </ListItemCode>
            <ListItemCode name="type">
              to check whether a <InlineCode>Text</InlineCode> or{' '}
              <InlineCode>View</InlineCode> is expected as the root element
              returned by this component.
            </ListItemCode>
            <ListItemCode name="propsFromParent">
              props passed directly by the parent renderer.
            </ListItemCode>
          </List>
        </Section>
      </Chapter>
      <Chapter title="Registering Renderers for Arbitrary Tags">
        <Paragraph>
          Let's say we have defined an advanced, powerful{' '}
          <InlineCode>&lt;bluecircle&gt;</InlineCode> Web Component for our
          website and we need to register a custom renderer for this tag.
        </Paragraph>
      </Chapter>
    </Page>
  );
}
