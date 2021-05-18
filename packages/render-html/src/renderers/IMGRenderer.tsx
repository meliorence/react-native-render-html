import React, { ClassAttributes } from 'react';
import { TBlock } from '@native-html/transient-render-engine';
import IMGElement, { IMGElementProps } from '../elements/IMGElement';
import { DefaultBlockRenderer } from '../render/render-types';
import { useComputeMaxWidthForTag } from '../context/SharedPropsProvider';
import { ImageStyle } from 'react-native';
import { DefaultTagRendererProps } from '../shared-types';
import useNormalizedUrl from '../hooks/useNormalizedUrl';
import { useRendererProps } from '../context/RenderersPropsProvider';
import useContentWidth from '../hooks/useContentWidth';

export function useIMGElementProps(
  props: DefaultTagRendererProps<TBlock>
): IMGElementProps & ClassAttributes<any> {
  const { style, tnode, onPress, key } = props;
  const contentWidth = useContentWidth();
  const {
    initialDimensions,
    enableExperimentalPercentWidth
  } = useRendererProps('img');
  const computeImagesMaxWidth = useComputeMaxWidthForTag('img');
  const src = tnode.attributes.src || '';
  return {
    key,
    contentWidth,
    computeMaxWidth: computeImagesMaxWidth,
    enableExperimentalPercentWidth,
    initialDimensions,
    onPress,
    alt: tnode.attributes.alt,
    testID: 'img',
    altColor: tnode.styles.nativeTextFlow.color as string,
    source: { uri: useNormalizedUrl(src) },
    style: style as ImageStyle,
    width: tnode.attributes.width,
    height: tnode.attributes.height,
    objectFit: tnode.styles.webBlockRet.objectFit
  };
}

const IMGRenderer: DefaultBlockRenderer = (props) => {
  return React.createElement(IMGElement, useIMGElementProps(props));
};

export default IMGRenderer;
