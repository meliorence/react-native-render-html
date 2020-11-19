import type {
  TBlock,
  TNode
} from '@native-html/transient-render-tree';
import { TStyles } from '@native-html/transient-render-tree/lib/typescript/styles/TStyles';
import { ReactNode } from 'react';
import imgRenderer from './renderers/imgRenderer';
import listRenderer from './renderers/listRenderer';
import type {
  TNodeGenericRendererProps,
  TNodeRendererProps
} from './TNodeRenderer';

export interface RendererProps<T extends TNode>
  extends Pick<
    TNodeRendererProps<T>,
    | 'key'
    | 'tnode'
    | 'syntheticAnchorOnLinkPress'
    | 'passedProps'
    | 'marginCollapsingEnabled'
    | 'collapsedMarginTop'
  > {
  nativeStyle: T extends TBlock
    ? TStyles['nativeBlockFlow'] & TStyles['nativeBlockRet']
    : TStyles['nativeBlockFlow'] &
        TStyles['nativeBlockRet'] &
        TStyles['nativeTextFlow'] &
        TStyles['nativeTextRet'];
  untranslatedStyle: TStyles['webTextFlow'];
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
  Default: (props: RendererProps<T>) => any;
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
