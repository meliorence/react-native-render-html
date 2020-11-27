import React from 'react';
import HTMLImageElement from '../elements/HTMLImageElement';
import { DefaultBlockRenderer } from '../render/render-types';
import { useSharedProps } from '../context/SharedPropsContext';
import { ImageStyle } from 'react-native';
import { defaultHTMLElementModels } from '@native-html/transient-render-engine';

function normalizeUri(uri: string) {
  return uri.startsWith('//') ? `https:${uri}` : uri;
}

const ImageRenderer: DefaultBlockRenderer = (props) => {
  const { style, tnode, TDefaultRenderer, onPress } = props;
  const {
    contentWidth,
    computeImagesMaxWidth,
    enableExperimentalPercentWidth,
    imagesInitialDimensions
  } = useSharedProps();
  const src = tnode.attributes.src;
  if (!src) {
    return React.createElement(TDefaultRenderer, props);
  }
  return (
    <HTMLImageElement
      alt={tnode.attributes.alt}
      testID="img"
      altColor={tnode.styles.nativeTextFlow.color as string}
      contentWidth={contentWidth as number}
      computeImagesMaxWidth={computeImagesMaxWidth}
      enableExperimentalPercentWidth={enableExperimentalPercentWidth}
      imagesInitialDimensions={imagesInitialDimensions}
      onPress={onPress}
      source={{ uri: normalizeUri(src) }}
      style={style as ImageStyle}
      width={tnode.attributes.width}
      height={tnode.attributes.height}
    />
  );
};

ImageRenderer.model = defaultHTMLElementModels.img;

export default ImageRenderer;
