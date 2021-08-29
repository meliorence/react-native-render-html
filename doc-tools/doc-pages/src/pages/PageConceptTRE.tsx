/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Page from '../Page';
import ListItemCode from '../components/ListItemCode';
import useToolkit from '../toolkit/useToolkit';
import { TRenderEngine } from '@native-html/transient-render-engine';

const translateEngine = new TRenderEngine({
  dangerouslyDisableHoisting: true,
  dangerouslyDisableWhitespaceCollapsing: true
});

const hoistingEngine = new TRenderEngine({
  dangerouslyDisableHoisting: false,
  dangerouslyDisableWhitespaceCollapsing: true
});

const collapsingEngine = new TRenderEngine({
  dangerouslyDisableHoisting: false,
  dangerouslyDisableWhitespaceCollapsing: false
});

const source = `<a href="https://domain.com">
This is
<span>phrasing content</span>
<img src="https://domain.com/logo.jpg" />
    and this is <strong>too</strong>.
</a>`;

export default function PageConceptTRE() {
  const {
    Acronym,
    Admonition,
    Bold,
    DList,
    DListItem,
    DListTitle,
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
    RefTRE,
    RenderHtmlCard,
    Section,
    InlineCode,
    Hyperlink,
    List,
    ListItem,
    TNodeTransformDisplay,
    SvgFigure
  } = useToolkit();
  return (
    <Page>
      <Header>
        <Paragraph>
          This article is an introduction to the <Acronym name="TRE" />{' '}
          architecture.
        </Paragraph>
      </Header>
      <Chapter title="Element Models">
        <Paragraph>
          <Bold>Element models</Bold> form the building block of the engine.
          These models specify how a DOM element of a peculiar tag should be
          translated. You can tamper with those models and add you own models,
          making this library extremely customizable.
        </Paragraph>
        <Section title="HTMLElementModel">
          <Paragraph>
            To each standard tag is attached an <Bold>element model</Bold>,
            instance of the <RefTRE name="HTMLElementModel" /> class. Such model
            has multiple fields describing different behaviors related to
            translation of those DOM elements:
          </Paragraph>
          <DList>
            <DListTitle>
              <RefTRE name="HTMLElementModel" member="contentModel" />
            </DListTitle>
            <DListItem>
              How should this tag be translated? See next chapter.
            </DListItem>
            <DListTitle>
              <RefTRE name="HTMLElementModel" member="isVoid" />
            </DListTitle>
            <DListItem>
              Will be <InlineCode>true</InlineCode> for{' '}
              <Hyperlink url="https://html.spec.whatwg.org/multipage/syntax.html#void-elements">
                void elements
              </Hyperlink>{' '}
              , e.g. DOM elements which can't have children.
            </DListItem>
            <DListTitle>
              <RefTRE name="HTMLElementModel" member="isOpaque" />
            </DListTitle>
            <DListItem>
              Will be <InlineCode>true</InlineCode> for those elements which
              children should not be translated. Useful for{' '}
              <RefHtmlElement name="svg" /> and other custom markups.
            </DListItem>
            <DListTitle>
              <RefTRE name="HTMLElementModel" member="mixedUAStyles" />
            </DListTitle>
            <DListItem>
              Mixed User-Agent styles, e.g. default styles for this element.
              This is how default styles are set for tags.
            </DListItem>
            <DListTitle>
              <RefTRE
                name="HTMLElementModel"
                member="getUADerivedStyleFromAttributes"
              />
            </DListTitle>
            <DListItem>
              A function which returns mixed UA styles given the DOM node{' '}
              <Bold>attributes</Bold> and <RefTRE name="TNode" />{' '}
              <RefTRE name="Markers" />.
            </DListItem>
          </DList>
        </Section>
        <Section title="HTMLContentModel">
          <Paragraph>
            There are 4 content models that can be attached to a tag:
          </Paragraph>
          <DList>
            <DListTitle>
              <RefTRE name="HTMLContentModel" member="textual" full />
            </DListTitle>
            <DListItem>
              For elements which can be translated to <RefTRE name="TText" /> or{' '}
              <RefTRE name="TPhrasing" />. Examples:{' '}
              <RefHtmlElement name="span" />, <RefHtmlElement name="strong" />{' '}
              ...
            </DListItem>
            <DListTitle>
              <RefTRE name="HTMLContentModel" member="block" full />
            </DListTitle>
            <DListItem>
              For elements which can only be translated to{' '}
              <RefTRE name="TBlock" />. Examples: <RefHtmlElement name="div" />,{' '}
              <RefHtmlElement name="p" />, <RefHtmlElement name="article" /> ...
            </DListItem>
            <DListTitle>
              <RefTRE name="HTMLContentModel" member="mixed" full />
            </DListTitle>
            <DListItem>
              (rare) for elements which can be translated to{' '}
              <RefTRE name="TText" />, <RefTRE name="TPhrasing" /> or{' '}
              <RefTRE name="TBlock" />. The sole mixed elements are{' '}
              <RefHtmlElement name="a" />, <RefHtmlElement name="ins" /> and{' '}
              <RefHtmlElement name="del" />.
            </DListItem>
            <DListTitle>
              <RefTRE name="HTMLContentModel" member="none" full />
            </DListTitle>
            <DListItem>
              For element which shall not be rendered and will be translated to{' '}
              <RefTRE name="TEmpty" />. Examples:{' '}
              <RefHtmlElement name="button" />, <RefHtmlElement name="map" />{' '}
              ...
            </DListItem>
          </DList>
          <Paragraph>
            A powerful feature of the <Bold>Foundry</Bold> engine is that the
            models attached to a tag name can be customized! See the{' '}
            <RefDoc target="custom-renderers" /> page.
          </Paragraph>
        </Section>
      </Chapter>
      <Chapter title="Steps">
        <Paragraph>
          The <Acronym name="TRT" /> construction is broadly comprised of three
          steps.
        </Paragraph>
        <Section title="Translation">
          <Paragraph>
            Each DOM element is translated to a <RefTRE name="TNode" />. The
            translation will obide by the following rules:
          </Paragraph>
          <List type="disc">
            <ListItem>
              The root of the document will be translated to a{' '}
              <RefTRE name="TDocument" /> node. This node has a special{' '}
              <InlineCode>context</InlineCode> field which holds metadata
              harvested in the <RefHtmlElement name="head" /> DOM element (see{' '}
              <RefTRE name="DocumentMetadata" />
              ).
            </ListItem>
            <ListItem>
              Text nodes will be translated to <RefTRE name="TText" />, and will
              be merged with a parent DOM element if the parent's{' '}
              <Bold>content model</Bold> is <Bold>textual</Bold> or{' '}
              <Bold>mixed</Bold> when they are its only child. For example, a
              Text node with no siblings which parent is a{' '}
              <RefHtmlElement name="span" /> will be merged into a{' '}
              <RefTRE name="TText" /> with <InlineCode>tagName</InlineCode> set
              to "span".
            </ListItem>
            <ListItem>
              DOM elements which content model is <Bold>textual</Bold> with
              multiple children will be translated to{' '}
              <RefTRE name="TPhrasing" /> nodes.
            </ListItem>
            <ListItem>
              DOM elements with children which <Bold>content model</Bold> is{' '}
              <Bold>mixed</Bold> will be translated to{' '}
              <RefTRE name="TPhrasing" /> if they only have{' '}
              <RefTRE name="TPhrasing" /> or <RefTRE name="TText" /> children,{' '}
              <RefTRE name="TBlock" /> otherwise.
            </ListItem>
            <ListItem>
              DOM elements which <Bold>content model</Bold> is{' '}
              <Bold>block</Bold> will be translated to <RefTRE name="TBlock" />{' '}
              nodes.
            </ListItem>
            <ListItem>
              Finally, DOM elements which <Bold>content model</Bold> is{' '}
              <Bold>none</Bold> will be translated to <RefTRE name="TEmpty" />.
            </ListItem>
            <ListItem>
              <RefHtmlElement name="script" />, comments and{' '}
              <RefHtmlElement name="style" /> DOM nodes will be ignored.
            </ListItem>
          </List>
          <Admonition type="note">
            A DOM element might be untranslatable for a variety of reasons. For
            example, its name is not a standard HTML5 element and there is no
            custom HTML element model registered for it. An other reason is that
            it is an interactive element such as a form, input or button.
          </Admonition>
          <Paragraph>
            In addition, inline styles, User Agent styles and mixed styles are
            processed by the CSS Processor, see{' '}
            <RefDoc target="css-processing" /> for more details.
          </Paragraph>
          <Paragraph>
            Below is an example of a <Bold>translation</Bold> transformation
            from HTML to <Acronym name="TRT" />:
          </Paragraph>
          <TNodeTransformDisplay
            html={source}
            snaphost={translateEngine.buildTTree(source).snapshot()}
            caption="This flow depicts the translation step. The TRT is represented in a JSX-like format thanks to TNode.snapshot() method."
          />
          <Admonition type="note">
            You will notice that a <RefHtmlElement name="body" /> has been
            added, and the root is an instance of <RefTRE name="TDocument" />.
            This process is called <Bold>normalization</Bold>, and is also
            performed by Web browsers.
          </Admonition>
        </Section>
        <Section title="Hoisting">
          <Paragraph>
            The <Bold>hoisting phase</Bold> consists in enforcing a basic
            constraint:
          </Paragraph>
          <Admonition type="important" title="The Hoisting Constraint">
            A <RefTRE name="TPhrasing" /> node should only have{' '}
            <RefTRE name="TText" />, <RefTRE name="TPhrasing" /> and{' '}
            <RefTRE name="TEmpty" /> nodes as children.
          </Admonition>
          <Paragraph>
            Therefore, any <RefTRE name="TBlock" /> child of a{' '}
            <RefTRE name="TPhrasing" /> node will be recursively{' '}
            <Bold>hoisted</Bold> to the parent, until it meets that constraint.
            This constraint must be enforced to insure that a React Native{' '}
            <RefRNSymbol name="Text" /> elements have no{' '}
            <RefRNSymbol name="View" /> children, since it will break the
            default box model and might lead to bugs and inconsistencies. This
            constraint is depicted below:
          </Paragraph>
          <Admonition type="important" title="The View Constraint">
            React Native <RefRNSymbol name="Text" /> elements should not have{' '}
            <RefRNSymbol name="View" /> elements as children.
          </Admonition>
          <Paragraph>
            On one hand <RefTRE name="TBlock" /> will be translated to{' '}
            <RefRNSymbol name="View" /> elements and on the other hand{' '}
            <RefTRE name="TPhrasing" /> and <RefTRE name="TText" /> nodes will
            be translated to <RefRNSymbol name="Text" /> elements. Therefore,
            enforcing <Bold>The Hoisting Constraint</Bold> in the{' '}
            <Acronym name="TRT" /> results in enforcing{' '}
            <Bold>The View Constraint</Bold> at render time. You can disable{' '}
            <Bold>hoisting</Bold> via{' '}
            <RefRenderHtmlProp name="dangerouslyDisableHoisting" /> prop, but be
            advised this is yet experimental.
          </Paragraph>
          <Paragraph>
            Below is an example of <Bold>translation + hoisting</Bold>{' '}
            transformation from HTML to <Acronym name="TRT" />:
          </Paragraph>
          <TNodeTransformDisplay
            html={source}
            snaphost={hoistingEngine.buildTTree(source).snapshot()}
            caption="Notice that contrary to the translate-only example, the <a> element is now wrapped in a TBlock. Also, text preceding and following the <img> tag are wrapped in an anonymous TPhrasing node."
          />
        </Section>
        <Section title="Whitespace Collapsing">
          <Paragraph>
            The <Bold>whitespace collapsing phase</Bold> consists in
            implementing the algorithm associated with the{' '}
            <RefCssProperty name="white-space" /> CSS property, depicted in the{' '}
            <Hyperlink url="https://www.w3.org/TR/css-text-3/">
              CSS Text Module Level 3
            </Hyperlink>{' '}
            standard, by which unsignificant white-spaces are removed from the{' '}
            <Acronym name="TRT" />. You can disable <Bold>hoisting</Bold> via{' '}
            <RefRenderHtmlProp name="dangerouslyDisableWhitespaceCollapsing" />{' '}
            prop, but be advised this is yet experimental.
          </Paragraph>
          <Paragraph>
            Below is an example of{' '}
            <Bold>translating + hoisting + collapsing</Bold> transformation from
            HTML to <Acronym name="TRT" />:
          </Paragraph>
          <TNodeTransformDisplay
            html={source}
            snaphost={collapsingEngine.buildTTree(source).snapshot()}
            caption="Notice when comparing with the previous example, the line breaks and extraneous spaces have been removed."
          />
        </Section>
      </Chapter>
      <Chapter title="Anatomy of a TNode">
        <Paragraph>
          A <RefTRE name="TNode" /> has the following relevant fields (see{' '}
          <RefTRE name="TNodeShape" /> for a reference):
        </Paragraph>
        <DList>
          <DListTitle>
            <RefTRE name="TNodeShape" member="attributes" />
          </DListTitle>
          <DListItem>
            The list of attributes attached to the underlying DOM Node.
          </DListItem>
          <DListTitle>
            <RefTRE name="TNodeShape" member="id" />
          </DListTitle>
          <DListItem>The id attached to the underlying DOM Node.</DListItem>
          <DListTitle>
            <RefTRE name="TNodeShape" member="classes" />
          </DListTitle>
          <DListItem>
            An array of classes associated with the underlying DOM Node.
          </DListItem>
          <DListTitle>
            <RefTRE name="TNodeShape" member="domNode" />
          </DListTitle>
          <DListItem>The underlying DOM Node, if present.</DListItem>
          <DListTitle>
            <RefTRE name="TNodeShape" member="tagName" />
          </DListTitle>
          <DListItem>
            The tag name attached to the underlying DOM Node.
          </DListItem>
          <DListTitle>
            <RefTRE name="TNodeShape" member="parent" />
          </DListTitle>
          <DListItem>
            The parent <RefTRE name="TNode" />, if present, determined{' '}
            <Bold>before hoisting</Bold>.
          </DListItem>
          <DListTitle>
            <RefTRE name="TNodeShape" member="nodeIndex" />
          </DListTitle>
          <DListItem>
            The position of this element relative to its parent,{' '}
            <Bold>before hoisting</Bold> and{' '}
            <Bold>after whitespace collapsing</Bold>.
          </DListItem>
          <DListTitle>
            <RefTRE name="TNodeShape" member="children" />
          </DListTitle>
          <DListItem>
            An array of <RefTRE name="TNode" /> descendents to this node.
          </DListItem>
          <DListTitle>
            <RefTRE name="TNodeShape" member="type" />
          </DListTitle>
          <DListItem>
            The <Bold>type</Bold> of this <RefTRE name="TNode" />. Either{' '}
            <Bold>text</Bold>, <Bold>phrasing</Bold>, <Bold>block</Bold>,{' '}
            <Bold>document</Bold> or <Bold>empty</Bold>.
          </DListItem>
          <DListTitle>
            <RefTRE name="TNodeShape" member="markers" />
          </DListTitle>
          <DListItem>
            A registry of markers for this <RefTRE name="TNode" />. See
            explaination in below section.
          </DListItem>
          <DListTitle>
            <RefTRE name="TNodeShape" member="hasClass" />
          </DListTitle>
          <DListItem>
            A utility function to check if this node has the provided CSS class.
          </DListItem>
          <DListTitle>
            <RefTRE name="TNodeShape" member="snapshot" />
          </DListTitle>
          <DListItem>
            A utility function to create a JSX-like string representation of
            this node and its children. <Bold>Very handy for debugging.</Bold>
          </DListItem>
        </DList>
        <Admonition type="warning">
          The <InlineCode>styles</InlineCode> field which is not listed here{' '}
          <Bold>is not</Bold> consumable as a React Native component{' '}
          <InlineCode>style</InlineCode> prop.
        </Admonition>
      </Chapter>
      <Chapter title="Markers">
        <Paragraph>
          <RefTRE name="Markers" /> form an abstraction in which one{' '}
          <RefTRE name="TNode" /> provides semantic information to itself and
          all its descendants. For example, <RefHtmlElement name="ins" />{' '}
          elements, which stand for "insertion" of content in the context of an
          edit will provide the <InlineCode>edits</InlineCode> marker with value{' '}
          <InlineCode>"ins"</InlineCode> to all its descendants. Similarly,{' '}
          <RefHtmlElement name="a" />, <RefHtmlElement name="ol" /> and{' '}
          <RefHtmlElement name="ul" /> elements will set their own markers. List
          markers such as <InlineCode>olNestLevel</InlineCode> are integers
          which are incremented each time a list is nested.
        </Paragraph>
        <Paragraph>
          Markers can also be derived from attributes. This is the case with{' '}
          <RefHtmlAttr name="dir" /> and <RefHtmlAttr name="lang" /> attributes.
          Finally, you can customize the markers extraction logic with{' '}
          <RefRenderHtmlProp name="setMarkersForTNode" /> prop.
        </Paragraph>
      </Chapter>
    </Page>
  );
}
