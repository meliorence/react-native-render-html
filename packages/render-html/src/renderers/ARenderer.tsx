import React from 'react';
import { DefaultMixedRenderer } from '../render/render-types';
import {
  TBlock,
  TNode,
  TPhrasing,
  TText,
  defaultHTMLElementModels
} from '@native-html/transient-render-engine';
import { useSharedProps } from '../context/SharedPropsContext';
import {
  DefaultTagRendererProps,
  RenderHTMLPassedProps
} from '../shared-types';
import { GestureResponderEvent } from 'react-native';
import AElement from '../elements/AElement';

function extractAnchorOnLinkPress(
  tnode: TBlock | TPhrasing | TText,
  onLinkPress: RenderHTMLPassedProps['onLinkPress']
) {
  const href: string = tnode.attributes.href;
  const shouldHandleLinkPress =
    tnode.tagName === 'a' &&
    typeof href === 'string' &&
    typeof onLinkPress === 'function';
  return shouldHandleLinkPress
    ? (e: GestureResponderEvent) => onLinkPress!(e, href, tnode.attributes)
    : undefined;
}

export function useAElementProps<T extends TNode>(
  props: DefaultTagRendererProps<T>
): DefaultTagRendererProps<T> {
  const { tnode } = props;
  const { onLinkPress } = useSharedProps();
  const syntheticAnchorOnLinkPress = extractAnchorOnLinkPress(
    tnode,
    onLinkPress
  );
  if (typeof syntheticAnchorOnLinkPress !== 'function') {
    return props;
  }
  return {
    ...props,
    onPress: syntheticAnchorOnLinkPress
  };
}

const ARenderer: DefaultMixedRenderer = (props) => {
  return React.createElement(AElement, useAElementProps(props));
};

ARenderer.model = defaultHTMLElementModels.a;

export default ARenderer;
