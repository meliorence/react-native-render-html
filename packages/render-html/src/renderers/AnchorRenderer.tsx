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
import { RenderHTMLPassedProps, TDefaultRendererProps } from '../shared-types';
import { GestureResponderEvent } from 'react-native';

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

export function useAnchorProps<T extends TNode>(
  props: TDefaultRendererProps<T>
): TDefaultRendererProps<T> {
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

const AnchorRenderer: DefaultMixedRenderer = (props) => {
  return React.createElement(props.TDefaultRenderer, useAnchorProps(props));
};

AnchorRenderer.model = defaultHTMLElementModels.a;

export default AnchorRenderer;
