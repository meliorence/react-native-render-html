import React, { ReactNode } from 'react';
import { View, ActivityIndicator } from 'react-native';
import {
  IMGElementContainer,
  IMGElementContentError,
  useIMGElementProps,
  useIMGElementState,
  CustomBlockRenderer,
  IMGElementStateLoading,
  IMGElementStateSuccess
} from 'react-native-render-html';
import { UIRenderHtmlCardProps } from '../../toolkit/toolkit-types';

const html = '<img src="http://placeimg.com/1200/800/architecture">';

function IMGElementContentLoading({
  dimensions,
  altColor
}: IMGElementStateLoading | IMGElementStateSuccess) {
  return (
    <View
      style={[dimensions, { justifyContent: 'center', alignItems: 'center' }]}>
      <ActivityIndicator color={altColor} size="large" />
    </View>
  );
}

const Renderer: CustomBlockRenderer = function CustomImageRenderer(
  props
) {
  const imgElementProps = useIMGElementProps(props);
  const state = useIMGElementState(imgElementProps);
  let content: ReactNode = false;
  if (state.type === 'error') {
    content = React.createElement(IMGElementContentError, state);
    // } else if (state.type === 'success') {
    //   content = React.createElement(IMGElementContentSuccess, state);
  } else {
    content = React.createElement(IMGElementContentLoading, state as any);
  }
  return (
    <IMGElementContainer
      onPress={imgElementProps.onPress}
      style={state.containerStyle}>
      {content}
    </IMGElementContainer>
  );
};

const imgElementContentLoadingSrc = `function IMGElementContentLoading({ dimensions, altColor }) {
  const loadingStyles = { justifyContent: 'center', alignItems: 'center' };
  return (
    <View style={[dimensions, loadingStyles]}>
    <ActivityIndicator color={altColor} size="large" />
  </View>
  );
}`;

const customImageRendererSrc = `function CustomImageRenderer(
  props
) {
  const imgElementProps = useIMGElementProps(props);
  const state = useIMGElementState(imgElementProps);
  let content: ReactNode = false;
  if (state.type === 'error') {
    content = React.createElement(IMGElementContentError, state);
  } else {
    content = React.createElement(IMGElementContentLoading, state);
  }
  return (
    <IMGElementContainer
      onPress={imgElementProps.onPress}
      style={state.containerStyle}>
      {content}
    </IMGElementContainer>
  );
}`;

const importRNStmt = `import {
  IMGElementContainer,
  IMGElementContentError,
  IMGElementContentSuccess,
  useIMGElementProps,
  useIMGElementState
} from 'react-native-render-html';`;

const customImageRendererConfig: UIRenderHtmlCardProps = {
  title: 'A Custom Tag Example',
  caption:
    'A Custom image renderer which renders a spinner on "loading" and "success" states.',
  props: {
    source: { html },
    renderers: {
      img: Renderer
    }
  },
  config: {
    importStatements: [
      "import { View, ActivityIndicator } from 'react-native';",
      importRNStmt
    ],
    fnSrcMap: {
      IMGElementContentLoading: imgElementContentLoadingSrc,
      CustomImageRenderer: customImageRendererSrc
    }
  }
};

export default customImageRendererConfig;
