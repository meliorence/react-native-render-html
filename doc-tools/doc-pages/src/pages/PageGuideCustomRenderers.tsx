/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Page from '../Page';
import useToolkit from '../toolkit/useToolkit';
import ListItemCode from '../components/ListItemCode';
import simpleCustomRenderersConfig from './cards/simpleCustomRenderersConfig';
import adsRenderersConfig from './cards/adsRenderersConfig';
import inlineImagesConfig from './cards/inlineImagesConfig';
import bluecircleConfig from './cards/bluecircleConfig';

export default function PageGuideCustomRenderers() {
  const {
    Acronym,
    Admonition,
    Bold,
    Header,
    Paragraph,
    Chapter,
    DList,
    DListItem,
    DListTitle,
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
    RefDOM,
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
            translated to a <RefTRE name="TNode" />.
          </ListItem>
          <ListItem>
            <RefTRE name="TText" /> nodes correspond to DOM{' '}
            <RefDOM name="Text" /> nodes (<Bold>anonymous</Bold>{' '}
            <RefTRE name="TText" /> nodes) or DOM elements which children are
            DOM <RefDOM name="Text" /> nodes (<Bold>named</Bold>{' '}
            <RefTRE name="TText" /> nodes). So a <RefTRE name="TText" /> node
            cannot have children, and its content is a string accessible with
            the <RefDOM name="Text" member="data" /> field.
          </ListItem>
          <ListItem>
            Thanks to <Bold>hoisting</Bold>, <RefTRE name="TPhrasing" /> nodes
            can only have <RefTRE name="TText" /> and{' '}
            <RefTRE name="TPhrasing" /> nodes as children.
          </ListItem>
          <ListItem>
            <RefTRE name="TBlock" /> nodes can have any children.
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
            During <Acronym name="TRT" /> generation. via HTML model definition.
          </ListItem>
          <ListItem>At (React) render time via custom renderers.</ListItem>
        </List>
        <Paragraph>
          These customizations are not exclusive, so you can use both approaches
          at the same time.
        </Paragraph>
      </Chapter>
      <Chapter title="Model-based Custom Rendering">
        <Admonition type="tip">
          You are kindly advised to read the{' '}
          <RefDoc target="transient-render-engine" /> page before continuing,
          especially the chapter related to elements models.
        </Admonition>
        <Section title="Example: Registering a New Tag">
          <Paragraph>
            Let's say we have defined an advanced, powerful{' '}
            <InlineCode>&lt;bluecircle&gt;</InlineCode> Web Component for our
            website and we need to register a custom renderer for this tag. If
            we don't, the <InlineCode>&lt;bluecircle&gt;</InlineCode> elements
            will be translated to <InlineCode>TEmpty</InlineCode> and won't be
            rendered.
          </Paragraph>
          <Admonition type="important">
            We <Bold>must</Bold> register an <Bold>element model</Bold> for this
            tag because it is non-standard.
          </Admonition>
          <Admonition type="tip">
            We <Bold>may</Bold> register a custom component renderer, but this
            is not mandatory (see next chapter).
          </Admonition>
          <RenderHtmlCard {...bluecircleConfig} />
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
            We used <RefTRE name="HTMLElementModel" member="extend" /> method to
            change the <Bold>content model</Bold> for the{' '}
            <RefHtmlElement name="img" /> tag. This method is immutable: it
            creates a new <RefTRE name="HTMLElementModel" /> instance. It is
            thus safe to use this method to create models for new tags derived
            from models of existing tags.
          </Admonition>
          <Admonition type="warning">
            You cannot set the <InlineCode>contentModel</InlineCode>{' '}
            dynamically. This is currently a limitation of the{' '}
            <Acronym name="TRE" />.
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
            <InlineCode>onPress</InlineCode> for <RefTRE name="TBlock" /> nodes
            is defined by the <RefRenderHtmlProp name="GenericPressable" />{' '}
            prop. You can also customize the highlight color with{' '}
            <RefRenderHtmlProp name="pressableHightlightColor" />. Also note
            that <InlineCode>onPress</InlineCode> works with textual nodes, in
            which case the eponym prop of React Native{' '}
            <RefRNSymbol name="Text" /> element will be used instead.
          </Admonition>
          <Admonition type="tip">
            <RefRenderHTMLExport name="TDefaultRenderer" /> can receive{' '}
            <InlineCode>textProps</InlineCode> prop which will be used when
            rendering a React Native <RefRNSymbol name="Text" /> element, and{' '}
            <InlineCode>viewProps</InlineCode> for <RefRNSymbol name="View" />{' '}
            elements.
          </Admonition>
        </Section>
        <Section title="Children Tampering">
          <Paragraph>
            Let's continue with a common requirement: injecting ads in the body
            of an article. More precisely, after the 2d and 4th children. To
            achieve our goal, we are going to use the{' '}
            <RefRenderHTMLExport name="TChildrenRenderer" /> component:
          </Paragraph>
          <RenderHtmlCard {...adsRenderersConfig} />
          <Paragraph>
            The foundry API is powerful in terms of rendering customization. It
            is very easy to insert child elements, while preserving the internal
            rendering logic.
          </Paragraph>
          <Admonition type="tip">
            <RefRenderHTMLExport name="TChildrenRenderer" /> can receive a{' '}
            <RefRenderHTMLExport
              name="TChildrenRendererProps"
              member="renderChild"
            />{' '}
            prop to customize the rendering logic for each child.
          </Admonition>
        </Section>
        <Section title="Renderer Props Summary">
          <Paragraph>A custom renderer will receive the below props:</Paragraph>
          <DList>
            <DListTitle>
              <RefRenderHTMLExport name="CustomRendererProps" member="tnode" />
            </DListTitle>
            <DListItem>
              The <RefTRE name="TNode" /> to render.
            </DListItem>
            <DListTitle>
              <RefRenderHTMLExport
                name="CustomRendererProps"
                member="TDefaultRenderer"
              />
            </DListTitle>
            <DListItem>
              The default fallback renderer for this <RefTRE name="TNode" />.
            </DListItem>
            <DListTitle>
              <RefRenderHTMLExport
                name="CustomRendererProps"
                member="InternalRenderer"
              />
            </DListTitle>
            <DListItem>
              The internal renderer for this <InlineCode>tagName</InlineCode>.
              An internal renderer is like a custom renderer, but registered
              internally. If there is no internal renderer registered for this
              tag, <InlineCode>InternalRenderer</InlineCode> will be equal to{' '}
              <InlineCode>TDefaultRenderer</InlineCode>.
            </DListItem>
            <DListTitle>
              <RefRenderHTMLExport name="CustomRendererProps" member="style" />
            </DListTitle>
            <DListItem>
              The flatten style object which should be passed to the{' '}
              <InlineCode>TDefaultRenderer</InlineCode> or{' '}
              <InlineCode>InternalRenderer</InlineCode>
              element returned by this component.
            </DListItem>
            <DListTitle>
              <RefRenderHTMLExport name="CustomRendererProps" member="key" />
            </DListTitle>
            <DListItem>
              React <InlineCode>key</InlineCode> which shall be passed to the
              root element returned by this component.
            </DListItem>
            <DListTitle>
              <RefRenderHTMLExport
                name="CustomRendererProps"
                member="textProps"
              />
            </DListTitle>
            <DListItem>
              To use when you render a <InlineCode>Text</InlineCode>
              -based element (e.g. the <InlineCode>type</InlineCode> prop is{' '}
              <InlineCode>"text"</InlineCode>).
            </DListItem>
            <DListTitle>
              <RefRenderHTMLExport
                name="CustomRendererProps"
                member="viewProps"
              />
            </DListTitle>
            <DListItem>
              To use when you render a <InlineCode>View</InlineCode>
              -based element (e.g. the <InlineCode>type</InlineCode> prop is{' '}
              <InlineCode>"block"</InlineCode>).
            </DListItem>
            <DListTitle>
              <RefRenderHTMLExport name="CustomRendererProps" member="type" />
            </DListTitle>
            <DListItem>
              To check whether a <InlineCode>Text</InlineCode> or{' '}
              <InlineCode>View</InlineCode> is expected as the root element
              returned by this component.
            </DListItem>
            <DListTitle>
              <RefRenderHTMLExport
                name="CustomRendererProps"
                member="propsFromParent"
              />
            </DListTitle>
            <DListItem>
              Props passed directly from the parent custom renderer.
            </DListItem>
          </DList>
          <Paragraph>
            See <RefRenderHTMLExport name="TChildrenRendererProps" /> for a
            complete reference.
          </Paragraph>
        </Section>
      </Chapter>
    </Page>
  );
}
