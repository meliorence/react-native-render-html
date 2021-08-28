import { TNode } from '@native-html/transient-render-engine';
import {
  CustomRenderer,
  CustomRendererProps,
  TDefaultRenderer,
  TDefaultRendererProps
} from '../shared-types';
import { TNodeSubRendererProps } from '../internal-types';
import mergeCollapsedMargins from '../helpers/mergeCollapsedMargins';
import { useRendererConfig } from '../context/RenderRegistryProvider';
import { useDefaultContainerProps } from '../context/SharedPropsProvider';

/**
 * @internal
 */
export default function useAssembledCommonProps<T extends TNode>(
  {
    tnode,
    propsFromParent,
    sharedProps,
    renderIndex,
    renderLength
  }: TNodeSubRendererProps<T>,
  TDefault: TDefaultRenderer<T>
): {
  Renderer: CustomRenderer<T>;
  assembledProps: CustomRendererProps<T> & TDefaultRendererProps<T>;
} {
  const { Default, Custom } = useRendererConfig(tnode);
  const containerProps = useDefaultContainerProps();
  const assembledProps: CustomRendererProps<T> & TDefaultRendererProps<T> = {
    tnode,
    propsFromParent,
    sharedProps,
    TDefaultRenderer: TDefault,
    style: mergeCollapsedMargins(
      propsFromParent?.collapsedMarginTop,
      tnode.getNativeStyles()
    ) as any,
    type: tnode.type === 'text' || tnode.type === 'phrasing' ? 'text' : 'block',
    propsForChildren: tnode.tagName ? {} : propsFromParent,
    InternalRenderer: Default || (TDefault as any),
    renderIndex,
    renderLength,
    ...containerProps
  };
  return {
    assembledProps,
    Renderer: (Custom ?? Default ?? TDefault) as any
  };
}
