import React, { ClassAttributes } from 'react';
import { TBlock } from '@native-html/transient-render-engine';
import IMGElement, { IMGElementProps } from '../elements/IMGElement';
import { DefaultBlockRenderer } from '../render/render-types';
import {
  useComputeMaxWidthForTag,
  useSharedProps
} from '../context/SharedPropsContext';
import { ImageStyle } from 'react-native';
import { defaultHTMLElementModels } from '@native-html/transient-render-engine';
import { DefaultTagRendererProps } from '../shared-types';
import useNormalizedUrl from '../hooks/useNormalizedUrl';

export function useIMGElementProps(
  props: DefaultTagRendererProps<TBlock>
): IMGElementProps & ClassAttributes<any> {
  const { style, tnode, onPress, key } = props;
  const {
    contentWidth,
    enableExperimentalPercentWidth,
    imagesInitialDimensions
  } = useSharedProps();
  const computeImagesMaxWidth = useComputeMaxWidthForTag('img');
  const src = tnode.attributes.src || '';
  return {
    key,
    contentWidth,
    computeMaxWidth: computeImagesMaxWidth,
    enableExperimentalPercentWidth,
    initialDimensions: imagesInitialDimensions,
    onPress,
    alt: tnode.attributes.alt,
    testID: 'img',
    altColor: tnode.styles.nativeTextFlow.color as string,
    source: { uri: useNormalizedUrl(src) },
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
