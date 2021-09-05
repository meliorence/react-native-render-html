import React, { useMemo } from 'react';
import { TBlock } from '@native-html/transient-render-engine';
import IMGElement, { IMGElementProps } from '../elements/IMGElement';
import { InternalBlockRenderer } from '../render/render-types';
import { useComputeMaxWidthForTag } from '../context/SharedPropsProvider';
import { ImageStyle, StyleSheet } from 'react-native';
import { InternalRendererProps } from '../shared-types';
import useNormalizedUrl from '../hooks/useNormalizedUrl';
import { useRendererProps } from '../context/RenderersPropsProvider';
import useContentWidth from '../hooks/useContentWidth';
import getNativePropsForTNode from '../helpers/getNativePropsForTNode';

/**
 * A hook to produce props consumable by {@link IMGElement} component
 * from custom renderer props.
 */
export function useIMGElementProps(
  props: InternalRendererProps<TBlock>
): IMGElementProps {
  const { tnode } = props;

  const contentWidth = useContentWidth();
  const { initialDimensions, enableExperimentalPercentWidth } =
    useRendererProps('img');
  const computeImagesMaxWidth = useComputeMaxWidthForTag('img');
  const src = tnode.attributes.src || '';
  const source = { uri: useNormalizedUrl(src) };
  const { style: rawStyle, ...containerProps } = getNativePropsForTNode(props);
  const style = useMemo<ImageStyle>(
    () => (rawStyle ? (StyleSheet.flatten(rawStyle) as ImageStyle) : {}),
    [rawStyle]
  );
  return {
    contentWidth,
    containerProps,
    enableExperimentalPercentWidth,
    initialDimensions,
    source,
    style,
    testID: 'img',
    computeMaxWidth: computeImagesMaxWidth,
    alt: tnode.attributes.alt,
    altColor: tnode.styles.nativeTextFlow.color as string,
    width: tnode.attributes.width,
    height: tnode.attributes.height,
    objectFit: tnode.styles.webBlockRet.objectFit
  };
}

const IMGRenderer: InternalBlockRenderer = (props) => {
  return React.createElement(IMGElement, useIMGElementProps(props));
};

export default IMGRenderer;
