/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PropsWithChildren } from 'react';
import Page from '../Page';
import ListItemCode from '../components/ListItemCode';
import useToolkit from '../toolkit/useToolkit';

export default function PageConceptTRE() {
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
      <Paragraph>
        This article is an introduction to the <Acronym name="TRE" />{' '}
        architecture.
      </Paragraph>
      <Chapter title="Element Models">
        <Paragraph>
          <Bold>Element models</Bold> form the building block of the engine.
          These models specify how a DOM element of a peculiar tag should be
          translated. You can tamper with those models and add you own models,
          making this library extremly customizable.
        </Paragraph>
        <Section title="HTMLElementModel">
          <Paragraph>
            To each standard tag is attached an <Bold>element model</Bold>,
            instance of the <InlineCode>HTMLElementModel</InlineCode> class.
            Such model has multiple fields describing different behaviors
            related to translation of those DOM elements:
          </Paragraph>
          <List>
            <ListItemCode name="contentModel">
              How should this tag be translated? See next chapter.
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
            Each DOM element is translated to a <InlineCode>TNode</InlineCode>.
            The translation will obide by the following rules:
          </Paragraph>
          <List type="disc">
            <ListItem>
              The root of the document will be translated to a{' '}
              <InlineCode>TDocument</InlineCode> node. This node has a special{' '}
              <InlineCode>context</InlineCode> field which holds metadata
              harvested in the <RefHtmlElement name="head" /> DOM element.
            </ListItem>
            <ListItem>
              Text nodes will be translated to <InlineCode>TText</InlineCode>,
              and will be merged with a parent DOM element if the parent's{' '}
              <Bold>content model</Bold> is <Bold>textual</Bold> or{' '}
              <Bold>mixed</Bold> when they are its only child. For example, a
              Text node with no siblings which parent is a{' '}
              <RefHtmlElement name="span" /> will be merged into a{' '}
              <InlineCode>TText</InlineCode> with
              <InlineCode>tagName</InlineCode> set to "span".
            </ListItem>
            <ListItem>
              DOM elements which content model is <Bold>textual</Bold> with
              multiple children will be translated to{' '}
              <InlineCode>TPhrasing</InlineCode> nodes.
            </ListItem>
            <ListItem>
              DOM elements with children which <Bold>content model</Bold> is{' '}
              <Bold>mixed</Bold> will be translated to{' '}
              <InlineCode>TPhrasing</InlineCode> if they only have{' '}
              <InlineCode>TPhrasing</InlineCode> or{' '}
              <InlineCode>TText</InlineCode> children,
              <InlineCode>TBlock</InlineCode> otherwise.
            </ListItem>
            <ListItem>
              DOM elements which <Bold>content model</Bold> is{' '}
              <Bold>block</Bold> will be translated to{' '}
              <InlineCode>TBlock</InlineCode> nodes.
            </ListItem>
            <ListItem>
              Finally, DOM elements which <Bold>content model</Bold> is{' '}
              <Bold>none</Bold> will be translated to{' '}
              <InlineCode>TEmpty</InlineCode>.
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
        </Section>
        <Section title="Hoisting">
          <Paragraph>
            The <Bold>hoisting phase</Bold> consists in enforcing a basic
            constraint:
          </Paragraph>
          <Admonition type="important" title="The Hoisting Constraint">
            A <InlineCode>TPhrasing</InlineCode> node should only have{' '}
            <InlineCode>TText</InlineCode>, <InlineCode>TPhrasing</InlineCode>{' '}
            and <InlineCode>TEmpty</InlineCode> nodes as children.
          </Admonition>
          <Paragraph>
            Therefore, any <InlineCode>TBlock</InlineCode> child of a{' '}
            <InlineCode>TPhrasing</InlineCode> node will be recursively{' '}
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
            On one hand <InlineCode>TBlock</InlineCode> will be translated to{' '}
            <RefRNSymbol name="View" /> elements and on the other hand{' '}
            <InlineCode>TPhrasing</InlineCode> and{' '}
            <InlineCode>TText</InlineCode> nodes will be translated to{' '}
            <RefRNSymbol name="Text" /> elements. Therefore, enforcing{' '}
            <Bold>The Hoisting Constraint</Bold> in the <Acronym name="TRT" />{' '}
            results in enforcing <Bold>The View Constraint</Bold> at render
            time. You can disable <Bold>hoisting</Bold> via{' '}
            <RefRenderHtmlProp name="dangerouslyDisableHoisting" /> prop, but be
            advised this is yet experimental.
          </Paragraph>
        </Section>
        <Section title="Whitespace Collapsing">
          <Paragraph>
            The <Bold>whitespace collapsing phrase</Bold> consists in
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
        </Section>
      </Chapter>
      <Chapter title="Anatomy of a TNode">
        <Paragraph>
          A <InlineCode>TNode</InlineCode> has the following relevant fields:
        </Paragraph>
        <List>
          <ListItemCode name="attributes">
            The list of attributes attached to the underlying DOM Node.
          </ListItemCode>
          <ListItemCode name="id">
            The id attached to the underlying DOM Node.
          </ListItemCode>
          <ListItemCode name="classes">
            An array of classes associated with the underlying DOM Node.
          </ListItemCode>
          <ListItemCode name="domNode">
            The underlying DOM Node, if present.
          </ListItemCode>
          <ListItemCode name="tagName">
            The tag name attached to the underlying DOM Node.
          </ListItemCode>
          <ListItemCode name="parent">
            The parent <InlineCode>TNode</InlineCode>, if present, determined{' '}
            <Bold>before hoisting</Bold>.
          </ListItemCode>
          <ListItemCode name="nodeIndex">
            The position of this element relative to its parent,{' '}
            <Bold>before hoisting</Bold> and{' '}
            <Bold>after whitespace collapsing</Bold>.
          </ListItemCode>
          <ListItemCode name="children">
            An array of <InlineCode>TNode</InlineCode> descendents to this node.
          </ListItemCode>
          <ListItemCode name="type">
            The <Bold>type</Bold> of this <InlineCode>TNode</InlineCode>. Either{' '}
            <Bold>text</Bold>, <Bold>phrasing</Bold>, <Bold>block</Bold>,{' '}
            <Bold>document</Bold> or <Bold>empty</Bold>.
          </ListItemCode>
          <ListItemCode name="markers">
            A registry of markers for this <InlineCode>TNode</InlineCode>. See
            explaination in below section.
          </ListItemCode>
          <ListItemCode name="snapshot()">
            A utility function to create a JSX-like string representation of
            this node and its children. <Bold>Very handy for debugging.</Bold>
          </ListItemCode>
        </List>
        <Admonition type="warning">
          The <InlineCode>styles</InlineCode> field which is not listed here{' '}
          <Bold>is not</Bold> consumable as a React Native component{' '}
          <InlineCode>style</InlineCode> prop.
        </Admonition>
      </Chapter>
      <Chapter title="Markers">
        <Paragraph>
          Markers form an abstraction in which one{' '}
          <InlineCode>TNode</InlineCode> provides semantic information to itself
          and all its descendants. For example, <RefHtmlElement name="ins" />{' '}
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
