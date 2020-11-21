import { TBlock, TPhrasing } from '@native-html/transient-render-engine';
import { GestureResponderEvent } from 'react-native';
import { RenderHTMLPassedProps } from './shared-types';

export default function extractAnchorOnLinkPress(
  tnode: TBlock | TPhrasing,
  onLinkPress: RenderHTMLPassedProps['onLinkPress']
) {
  // @ts-ignore
  const href: string = tnode.href;
  const shouldHandleLinkPress =
    tnode.isAnchor &&
    typeof href === 'string' &&
    typeof onLinkPress === 'function';
  return shouldHandleLinkPress
    ? (e: GestureResponderEvent) => onLinkPress!(e, href, tnode.attributes)
    : undefined;
}
