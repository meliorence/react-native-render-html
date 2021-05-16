import React from 'react';
import { Alert } from 'react-native';
import { CustomBlockRenderer, RenderHTMLProps } from 'react-native-render-html';
import { UIRenderHtmlCardProps } from '../../toolkit/toolkit-types';

const H1Renderer: CustomBlockRenderer = function H1Renderer({
  TDefaultRenderer,
  ...props
}) {
  const onPress = () => Alert.alert('pressed!');
  return <TDefaultRenderer {...props} onPress={onPress} />;
};

const h1RendererSrc = `function H1Renderer({
  TDefaultRenderer,
  ...props
}) {
  const onPress = () => Alert.alert('pressed!');
  return (
    <TDefaultRenderer
      {...props}
      onPress={onPress}
    />
  );
}`;

const props: RenderHTMLProps = {
  tagsStyles: {
    article: {
      marginHorizontal: 10
    }
  },
  source: {
    html: `
<article>
  <h1>Press me!</h1>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    Ut enim ad minim veniam.
  </p>
</article>
`
  },
  renderers: {
    h1: H1Renderer
  }
};

const simpleCustomRenderersConfig: UIRenderHtmlCardProps = {
  title: 'A Custom Renderer Making H1 Interactive',
  caption:
    'A custom renderer taking advantage of onPress prop available in TDefaultRenderer passed component.',
  props,
  config: {
    importStatements: ["import { Alert } from 'react-native';"],
    fnSrcMap: { H1Renderer: h1RendererSrc }
  }
};

export default simpleCustomRenderersConfig;
