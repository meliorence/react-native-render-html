import React, { PropsWithChildren, useMemo } from 'react';
import mergeDeepRight from 'ramda/src/mergeDeepRight';

import { RenderersPropsBase, RenderHTMLPassedProps } from '../shared-types';
import defaultRendererProps from './defaultRendererProps';

const RenderersPropsContext = React.createContext<Required<RenderersPropsBase>>(
  defaultRendererProps
);

/**
 * Consume props from {@link RenderHTMLProps.renderersProps}.
 *
 * @param k - The name of the renderer's associated element.
 * @returns props for this renderer.
 *
 * @public
 */
export function useRendererProps<
  RendererProps extends RenderersPropsBase = RenderersPropsBase,
  K extends keyof RendererProps = keyof RendererProps
>(k: K) {
  const userProps = React.useContext(RenderersPropsContext) as RendererProps;
  return userProps[k];
}

/**
 * @internal
 */
export default function RenderersPropsProvider(
  props: PropsWithChildren<RenderHTMLPassedProps<RenderersPropsBase>>
) {
  const mergedRenderersProps = useMemo(
    () => mergeDeepRight(defaultRendererProps, props.renderersProps || {}),
    [props.renderersProps]
  );
  return React.createElement(
    RenderersPropsContext.Provider,
    { value: mergedRenderersProps },
    props.children
  );
}
