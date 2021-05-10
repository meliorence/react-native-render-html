import { TNode } from '@native-html/transient-render-engine';
import {
  CustomTagRenderer,
  CustomTagRendererProps,
  NativeStyleProp,
  TDefaultRenderer,
  TDefaultRendererProps,
  TNodeSubRendererProps
} from '../shared-types';
import mergeCollapsedMargins from '../helpers/mergeCollapsedMargins';
import { useRendererConfig } from '../context/RenderRegistryProvider';
import { useDefaultContainerProps } from '../context/SharedPropsProvider';

function getStylesForTnode<T extends TNode>(tnode: T): NativeStyleProp<T> {
  if (tnode.type === 'block' || tnode.type === 'document') {
    return {
      ...tnode.styles.nativeBlockFlow,
      ...tnode.styles.nativeBlockRet
    } as any;
  }
  if (tnode.type === 'phrasing' || tnode.type === 'text') {
    return {
      ...tnode.styles.nativeBlockFlow,
      ...tnode.styles.nativeBlockRet,
      ...tnode.styles.nativeTextFlow,
      ...tnode.styles.nativeTextRet
    } as any;
  }
  return {} as any;
}

/**
 * @internal
 */
export default function useAssembledCommonProps<T extends TNode>(
  { tnode, key, propsFromParent, sharedProps }: TNodeSubRendererProps<T>,
  TDefault: TDefaultRenderer<T>
): {
  assembledProps: CustomTagRendererProps<T> & TDefaultRendererProps<T>;
  Renderer: CustomTagRenderer<T>;
} {
  const { Default, Custom } = useRendererConfig(tnode);
  const containerProps = useDefaultContainerProps();
  const assembledProps: CustomTagRendererProps<T> & TDefaultRendererProps<T> = {
    key,
    tnode,
    propsFromParent,
    sharedProps,
    TDefaultRenderer: TDefault,
    style: mergeCollapsedMargins(
      propsFromParent.collapsedMarginTop,
      getStylesForTnode(tnode)
    ) as any,
    type: tnode.type === 'text' || tnode.type === 'phrasing' ? 'text' : 'block',
    propsForChildren: tnode.tagName ? {} : propsFromParent,
    InternalRenderer: Default || (TDefault as any),
    ...containerProps
  };
  return {
    assembledProps,
    Renderer: (Custom ?? Default ?? TDefault) as any
  };
}
