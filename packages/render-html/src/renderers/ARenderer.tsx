import React from 'react';
import { DefaultMixedRenderer } from '../render/render-types';
import {
  TBlock,
  TNode,
  TPhrasing,
  TText,
  defaultHTMLElementModels,
  DocumentContext
} from '@native-html/transient-render-engine';
import { useSharedProps } from '../context/SharedPropsContext';
import {
  DefaultTagRendererProps,
  RenderHTMLPassedProps
} from '../shared-types';
import { AccessibilityProps, GestureResponderEvent } from 'react-native';
import AElement from '../elements/AElement';
import useNormalizedUrl from '../hooks/useNormalizedUrl';
import { useDocumentMetadata } from '../context/DocumentMetadataProvider';

function useAnchorOnLinkPress(
  tnode: TBlock | TPhrasing | TText,
  onLinkPress: RenderHTMLPassedProps['onLinkPress']
) {
  const href: string = tnode.attributes.href;
  const normalizedHref = useNormalizedUrl(href);
  const { baseTarget } = useDocumentMetadata();
  const shouldHandleLinkPress =
    tnode.tagName === 'a' &&
    typeof normalizedHref === 'string' &&
    typeof onLinkPress === 'function';
  return shouldHandleLinkPress
    ? (e: GestureResponderEvent) =>
        onLinkPress!(
          e,
          normalizedHref,
          tnode.attributes,
          (tnode.attributes.target as DocumentContext['baseTarget']) ||
            baseTarget
        )
    : undefined;
}

export function useAElementProps<T extends TNode>(
  props: DefaultTagRendererProps<T>
): DefaultTagRendererProps<T> {
  const { tnode } = props;
  const { onLinkPress } = useSharedProps();
  const syntheticAnchorOnLinkPress = useAnchorOnLinkPress(tnode, onLinkPress);
  if (typeof syntheticAnchorOnLinkPress !== 'function') {
    return props;
  }
  const accessibilityProps: AccessibilityProps = {
    accessible: true,
    accessibilityRole: 'link'
  };
  return {
    ...props,
    onPress: syntheticAnchorOnLinkPress,
    textProps: accessibilityProps,
    viewProps: accessibilityProps
  };
}

const ARenderer: DefaultMixedRenderer = (props) => {
  return React.createElement(AElement, useAElementProps(props));
};

ARenderer.model = defaultHTMLElementModels.a;

export default ARenderer;
