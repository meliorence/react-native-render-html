import React, { useState } from 'react';
import {
  useInternalRenderer,
  DefaultTagRendererProps
} from 'react-native-render-html';
import { SnippetDeclaration } from '../../types';
import UISnackbarAtom from '../components/UISnackbarAtom';

const html = `
<h2>Introduction</h2>

<p>
The vast majority of tags are rendered automatically by following the Transient Render Engine translations, basically only computing styles, displaying Text when the node is textual and displaying View elements otherwise.
This is what happens in custom renderers when you use <code>TDefaultRenderer</code> in addition with the remaining props. 
</p>

<p>
However, a handful of tags are rendered with a special internal renderer. For example, this is the case for <code>img</code>, <code>ol</code>, <code>ul</code> and <code>a</code> tags.
In such situation, <code>useInternalRenderer</code> becomes handy to reuse this internal renderer component and props within custom renderers.
</p>

<h2>Example</h2>
<p>If you wish to reuse special internal renderers, such as for <code>img</code> and <code>ol</code> tags, you can use
<code>useInternalRenderer</code> hook. In the example below, <code>img</code> tags can be pressed to display a snackbar.
</p>
<img width="1200" height="800" src="https://i.imgur.com/gSmWCJF.jpg" />
<p class="tip">This is a powerful tool to benefit from internal renderers and leaves the door open to fine-grained customizations!</p>
`;

function CustomImageRenderer(props: DefaultTagRendererProps<any>) {
  const [isSnackVisible, setIsSnackVisible] = useState(false);
  const { Renderer, rendererProps } = useInternalRenderer('img', props);
  return (
    <>
      <Renderer {...rendererProps} onPress={() => setIsSnackVisible(true)} />
      <UISnackbarAtom
        visible={isSnackVisible}
        onDismiss={() => setIsSnackVisible(false)}>
        I pressed an IMG element!
      </UISnackbarAtom>
    </>
  );
}

const internalRenderers: SnippetDeclaration = {
  name: 'Reusing Internal Renderers',
  supportsLegacy: false,
  codeSource: '/demo/snippets/internalRenderers.tsx',
  props: {
    source: { html },
    renderers: {
      img: CustomImageRenderer
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

export default internalRenderers;
