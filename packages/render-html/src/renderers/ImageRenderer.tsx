import React from 'react';
import { TBlock } from '@native-html/transient-render-engine';
import HTMLImageElement, {
  HTMLImageElementProps
} from '../elements/HTMLImageElement';
import { DefaultBlockRenderer } from '../render/render-types';
import {
  useComputeMaxWidthForTag,
  useSharedProps
} from '../context/SharedPropsContext';
import { ImageStyle } from 'react-native';
import { defaultHTMLElementModels } from '@native-html/transient-render-engine';
import { DefaultTagRendererProps } from '../shared-types';

function normalizeUri(uri: string) {
  return uri.startsWith('//') ? `https:${uri}` : uri;
}

export function useImageRendererProps(
  props: DefaultTagRendererProps<TBlock>
): HTMLImageElementProps {
  const { style, tnode, onPress } = props;
  const {
    contentWidth,
    enableExperimentalPercentWidth,
    imagesInitialDimensions
  } = useSharedProps();
  const computeImagesMaxWidth = useComputeMaxWidthForTag('img');
  const src = (tnode.attributes.src as string) || '';
  return {
    contentWidth,
    computeImagesMaxWidth,
    enableExperimentalPercentWidth,
    imagesInitialDimensions,
    onPress,
    alt: tnode.attributes.alt,
    testID: 'img',
    altColor: tnode.styles.nativeTextFlow.color as string,
    source: { uri: normalizeUri(src) },
    style: style as ImageStyle,
    width: tnode.attributes.width,
    height: tnode.attributes.height
  };
}

const ImageRenderer: DefaultBlockRenderer = (props) => {
  return React.createElement(HTMLImageElement, useImageRendererProps(props));
};

ImageRenderer.model = defaultHTMLElementModels.img;

export default ImageRenderer;
