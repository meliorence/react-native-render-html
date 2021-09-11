import React from 'react';
import { InternalMixedRenderer } from '../render/render-types';
import { TNode, DocumentContext } from '@native-html/transient-render-engine';
import { InternalRendererProps, RenderersProps } from '../shared-types';
import { GestureResponderEvent } from 'react-native';
import useNormalizedUrl from '../hooks/useNormalizedUrl';
import { useDocumentMetadata } from '../context/DocumentMetadataProvider';
import { useRendererProps } from '../context/RenderersPropsProvider';

function useAnchorOnLinkPress(
  tnode: TNode,
  onPress: RenderersProps['a']['onPress']
) {
  const href: string = tnode.attributes.href;
  const normalizedHref = useNormalizedUrl(href);
  const { baseTarget } = useDocumentMetadata();
  const shouldHandleLinkPress =
    tnode.tagName === 'a' &&
    typeof normalizedHref === 'string' &&
    href.length > 0 &&
    typeof onPress === 'function';
  return shouldHandleLinkPress
    ? (e: GestureResponderEvent) =>
        onPress!(
          e,
          normalizedHref,
          tnode.attributes,
          (tnode.attributes.target as DocumentContext['baseTarget']) ||
            baseTarget
        )
    : undefined;
}

export function useAElementProps<T extends TNode>(
  props: InternalRendererProps<T>
): InternalRendererProps<T> {
  const { tnode } = props;
  const { onPress } = useRendererProps('a');
  const syntheticAnchorOnLinkPress = useAnchorOnLinkPress(tnode, onPress);
  if (typeof syntheticAnchorOnLinkPress !== 'function') {
    return props;
  }
  return {
    ...props,
    onPress: syntheticAnchorOnLinkPress
  };
}

const ARenderer: InternalMixedRenderer = (props) => {
  return React.createElement(props.TDefaultRenderer, useAElementProps(props));
};

export default ARenderer;
