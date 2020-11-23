import React from 'react';
import { MixedRenderer } from '../render/render-types';
import {
  TBlock,
  TNode,
  TPhrasing,
  TText,
  defaultHTMLElementModels
} from '@native-html/transient-render-engine';
import { useSharedProps } from '../context/SharedPropsContext';
import { GenericPressableProps } from '../GenericPressable';
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

function useAnchorProps<T extends TNode>(
  props: TDefaultRendererProps<T>
): TDefaultRendererProps<T> & { onPress?: GenericPressableProps['onPress'] } {
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

const AnchorRenderer: MixedRenderer = (props) => {
  return React.createElement(props.TDefaultRenderer, useAnchorProps(props));
};

AnchorRenderer.model = defaultHTMLElementModels.a;

export default AnchorRenderer;
