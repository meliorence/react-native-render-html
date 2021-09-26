import React, { PropsWithChildren, useMemo } from 'react';
import mergeDeepRight from 'ramda/src/mergeDeepRight';

import { RenderersProps, RenderHTMLPassedProps } from '../shared-types';
import defaultRendererProps from './defaultRendererProps';
import useProfiler from '../hooks/useProfiler';

const RenderersPropsContext =
  React.createContext<Required<RenderersProps>>(defaultRendererProps);

/**
 * Consume props from {@link RenderHTMLProps.renderersProps}.
 *
 * @param tagName - The name of the element.
 * @typeParam K - The type literal corresponding to the element name.
 * @returns props for this renderer.
 *
 * @public
 */
export function useRendererProps<
  RendererProps extends RenderersProps = RenderersProps,
  K extends keyof RendererProps = keyof RendererProps
>(tagName: K) {
  const userProps = React.useContext(RenderersPropsContext) as RendererProps;
  return userProps[tagName];
}

/**
 * @internal
 */
export default function RenderersPropsProvider(
  props: PropsWithChildren<RenderHTMLPassedProps>
) {
  const profile = useProfiler({ prop: 'renderersProps' });
  const mergedRenderersProps = useMemo(() => {
    typeof __DEV__ === 'boolean' && __DEV__ && profile();
    return mergeDeepRight(defaultRendererProps, props.renderersProps || {});
  }, [props.renderersProps, profile]);
  return React.createElement(
    RenderersPropsContext.Provider,
    { value: mergedRenderersProps as Required<RenderersProps> },
    props.children
  );
}
