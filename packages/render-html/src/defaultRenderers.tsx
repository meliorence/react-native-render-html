import type { TBlock, TNode } from '@native-html/transient-render-tree';
import { ReactNode } from 'react';
import { GestureResponderEvent, StyleProp } from 'react-native';
import imgRenderer from './renderers/imgRenderer';
import listRenderer from './renderers/listRenderer';
import type { TNodeGenericRendererProps } from './TNodeRenderer';
import { RenderHTMLPassedProps } from './types';

export interface RendererProps<T extends TNode> {
  key?: string | number;
  nativeStyle: StyleProp<any>;
  untranslatedStyle: StyleProp<any>;
  tnode: T;
  /**
   * If no children is provided, the default renderer will use this method to
   * render children TNodes.
   */
  renderTChildren: TNodeGenericRendererProps<T>['renderTChildren'];
  /**
   * Helper to render one specific transient node.
   */
  renderTNode: TNodeGenericRendererProps<T>['renderTNode'];
  /**
   * When children is present, renderChildren will not be invoked.
   */
  children?: ReactNode;
  /**
   * If one of the parent is an anchor element, this method will be present to
   * customize link presses.
   */
  syntheticAnchorOnLinkPress?: (e: GestureResponderEvent) => void; 
  Default: (props: RendererProps<T>) => any;
  passedProps: RenderHTMLPassedProps;
}

export interface DefaultRenderers {
  block: Record<string, (props: RendererProps<TBlock>) => any>;
  text: Record<string, () => string>;
}

const defaultRenderers: DefaultRenderers = {
  block: {
    img: imgRenderer,
    ul: listRenderer,
    ol: listRenderer
  },
  text: {
    br: () => '\n',
    wbr: () => '\u200b'
  }
};

export default defaultRenderers;
