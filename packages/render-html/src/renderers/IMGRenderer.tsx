import React from 'react';
import { TBlock } from '@native-html/transient-render-engine';
import IMGElement, {
  IMGElementProps
} from '../elements/IMGElement';
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

export function useIMGElementProps(
  props: DefaultTagRendererProps<TBlock>
): IMGElementProps {
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

const IMGRenderer: DefaultBlockRenderer = (props) => {
  return React.createElement(IMGElement, useIMGElementProps(props));
};

IMGRenderer.model = defaultHTMLElementModels.img;

export default IMGRenderer;
