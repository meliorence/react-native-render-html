import React, { useCallback, useState } from 'react';
import {
  BlockRenderer,
  defaultHTMLElementModels,
  useTNodeChildrenProps,
  TChildrenRenderer,
  HTMLContentModel
} from 'react-native-render-html';
import { View, Text } from 'react-native';
import { SnippetDeclaration } from '../types';
import { Snackbar } from 'react-native-paper';

const html = `
<h2>Introduction</h2>
<h3>Transient Render Tree</h3>
<p>
The new renderer API is at the same time more strict and more flexible. To get ready for this new API, you must understands some basics of the transient render tree produced by the transient render engine:

<ul>
  <li>During the transient render tree generation, every DOM node is translated to a TNode.</li>
  <li>TText nodes correspond to DOM text nodes (<em>anonymous</em> TText nodes) or DOM elements which children are DOM text nodes (<em>named</em> TText nodes). So a TText node cannot have children, and its content is a string.</li>
  <li>TPhrasing nodes can only have TText and TPhrasing nodes as children.</li>
  <li>TBlock nodes can have any children.</li>
</ul>

<div class="tip">Inspect the transient render tree for this HTML code by pressing the ttree button on the top of this screen.</div>

<h3>Element Model</h3>

When you register a renderer in the new API, you must attach a model. The model corresponds to the constrains on this element.
The recommended way to attach the model is to assign the corresponding model from <code>defaultHTMLElementModels</code>.
The important field of this model is <code>contentModel</code>, which can have 4 values:

<ol>
<li><strong>textual</strong> for elements which can be translated to TText or TPhrasing. Examples: &lt;em&gt;, &lt;strong&gt; ...</li>
<li><strong>block</strong> for elements which can only be translated to TBlock. Examples: &lt;div&gt;, &lt;p&gt; ...</li>
<li><strong>mixed</strong> (rare) for elements which can be translated to TText, TPhrasing or TBlock. The sole mixed elements are &lt;a&gt;, &lt;ins&gt; and &lt;del&gt;.</li>
<li><strong>none</strong> for element which shall not be rendered.</li>
</ol>

<h3>Renderers</h3>

With the new renderer API, you pass a <code>renderers</code> object which keys are React components.
This is different from the old API where you passed functions taking four arguments. Notable props your renderer will receive:

<ol>
<li><code>tnode</code>: the TNode to render;</li>
<li><code>TDefaultRenderer</code>: the default renderer for this TNode;</li>
<li><code>key</code>: the key which shall be passed to the root element returned by this component.</li>
</ol>

<div class="tip">Your component won't receive shared props. Shared props can be consumed with <code>useSharedProps</code> hook.</div>
<div class="tip"><code>TDefaultRenderer</code> can receive <code>onPress</code> prop and any prop for <code>Text</code> or <code>View</code> components, depending on the rendered TNode.</div>

<h2>Taking advantage of <code>onPress</code> prop</h2>
<p>
The below custom renderer for <code>button</code> takes advantage of the fact <code>TDefaultRenderer</code> can take <code>onPress</code> prop as argument and react to press events! And this is true for TText, TPhrasing and TBlock nodes.
</p>

<button>Press me!</button>

<h2>Tampering TChildren</h2>
</p>
<p>
The new API is powerful in terms of rendering customization. It is very easy to insert child elements, while preserving the internal rendering logic.
</p>
<hr/>
<p>
In the below example, a renderer has been registered for the <code>article</code> tag, which inserts "ads" after the second and 4th child.
The renderer takes advantage of <code>TChildrenRenderer</code> to slice tnode children and insert React elements in-between.
</p>
<article>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
  <p>Paragraph 3</p>
  <p>Paragraph 4</p>
  <p>Paragraph 5</p>
</article>`;

function AdComponent() {
  return (
    <View
      style={{ backgroundColor: 'purple', padding: 10, alignSelf: 'stretch' }}>
      <Text style={{ color: 'white' }}>I am an AD!</Text>
    </View>
  );
}

const ArticleRenderer: BlockRenderer = function ArticleRenderer(props) {
  const { tnode, TDefaultRenderer, ...defaultRendererProps } = props;
  const tchildrenProps = useTNodeChildrenProps(props);
  const firstChildrenChunk = tnode.children.slice(0, 2);
  const secondChildrenChunk = tnode.children.slice(2, 4);
  const thirdChildrenChunk = tnode.children.slice(4, 5);
  return (
    <TDefaultRenderer tnode={tnode} {...defaultRendererProps}>
      <TChildrenRenderer {...tchildrenProps} tchildren={firstChildrenChunk} />
      {firstChildrenChunk.length === 2 ? <AdComponent /> : null}
      <TChildrenRenderer {...tchildrenProps} tchildren={secondChildrenChunk} />
      {secondChildrenChunk.length === 2 ? <AdComponent /> : null}
      <TChildrenRenderer {...tchildrenProps} tchildren={thirdChildrenChunk} />
    </TDefaultRenderer>
  );
};

const ButtonRenderer: BlockRenderer = function ({
  TDefaultRenderer,
  ...props
}) {
  const [isVisible, setIsVisible] = useState(false);
  const onPress = useCallback(() => {
    setIsVisible(true);
  }, []);
  return (
    <>
      <TDefaultRenderer {...props} onPress={onPress} />
      <Snackbar
        duration={1200}
        visible={isVisible}
        onDismiss={() => setIsVisible(false)}>
        <Text>Button has been clicked!</Text>
      </Snackbar>
    </>
  );
};

ButtonRenderer.model = defaultHTMLElementModels.button.extend({
  contentModel: HTMLContentModel.block,
  mixedUAStyles: {
    textAlign: 'center',
    padding: 10,
    backgroundColor: 'rgba(125, 125, 125, 0.5)'
  }
});

ArticleRenderer.model = defaultHTMLElementModels.article;

const customRenderers: SnippetDeclaration = {
  name: 'Custom Renderers',
  html,
  props: {
    renderers: {
      article: ArticleRenderer,
      button: ButtonRenderer
    },
    classesStyles: {
      tip: {
        fontStyle: 'italic',
        borderColor: 'orange',
        padding: 10,
        borderWidth: 2,
        marginVertical: 10
      }
    }
  }
};

export default customRenderers;
