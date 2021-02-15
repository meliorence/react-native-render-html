import {
  TBlock,
  TNode,
  TPhrasing,
  TText
} from '@native-html/transient-render-engine';
import {
  CustomTagRenderer,
  CustomTagRendererProps,
  NativeStyleProp,
  TDefaultRenderer,
  TDefaultRendererProps,
  TNodeRendererProps
} from '../shared-types';
import mergeCollapsedMargins from '../helpers/mergeCollapsedMargins';
import { useRendererConfig } from '../context/RenderRegistryProvider';
import { useDefaultContainerProps } from '../context/SharedPropsContext';

function getStylesForTnode<T extends TNode>(tnode: T): NativeStyleProp<T> {
  if (tnode instanceof TBlock) {
    return {
      ...tnode.styles.nativeBlockFlow,
      ...tnode.styles.nativeBlockRet
    } as any;
  }
  if (tnode instanceof TPhrasing || tnode instanceof TText) {
    return {
      ...tnode.styles.nativeBlockFlow,
      ...tnode.styles.nativeBlockRet,
      ...tnode.styles.nativeTextFlow,
      ...tnode.styles.nativeTextRet
    } as any;
  }
  return {} as any;
}

export default function useAssembledCommonProps<T extends TNode>(
  { tnode, key, propsFromParent, markers }: TNodeRendererProps<T>,
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
    markers,
    propsFromParent,
    TDefaultRenderer: TDefault,
    style: mergeCollapsedMargins(
      propsFromParent.collapsedMarginTop,
      getStylesForTnode(tnode)
    ) as any,
    type: 'text',
    propsForChildren: tnode.tagName ? {} : propsFromParent,
    DefaultTagRenderer: Default || (TDefault as any),
    ...containerProps
  };
  return {
    assembledProps,
    Renderer: (Custom ?? Default ?? TDefault) as any
  };
}
