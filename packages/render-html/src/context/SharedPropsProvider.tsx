import React, { PropsWithChildren, useCallback, useMemo } from 'react';
import defaultListStyleSpecs from '../elements/defaultListStyleSpecs';
import selectSharedProps from '../helpers/selectSharedProps';
import { RenderHTMLSharedProps, RendererBaseProps } from '../shared-types';
import defaultSharedProps from './defaultSharedProps';

const SharedPropsContext = React.createContext(defaultSharedProps);

/**
 * Use shared props. See {@link RenderHTMLSharedProps}.
 *
 * @public
 */
export function useSharedProps() {
  return React.useContext(SharedPropsContext);
}

/**
 * @internal
 */
export function useDefaultContainerProps(): Pick<
  RendererBaseProps<any>,
  'viewProps' | 'textProps'
> {
  const sharedProps = useSharedProps();
  return {
    viewProps: {
      ...defaultSharedProps.defaultViewProps,
      ...sharedProps.defaultViewProps
    },
    textProps: {
      ...defaultSharedProps.defaultTextProps,
      ...sharedProps.defaultTextProps
    }
  };
}

/**
 * Compute max width for a given tag. Uses
 * {@link RenderHTMLProps.computeEmbeddedMaxWidth}
 * and {@link RenderHTMLProps.contentWidth} under the hood.
 *
 * @param tagName - The tag to target.
 *
 * @public
 */
export function useComputeMaxWidthForTag(tagName: string) {
  const { computeEmbeddedMaxWidth } = useSharedProps();
  return useCallback(
    (cw: number) => {
      return computeEmbeddedMaxWidth(cw, tagName);
    },
    [computeEmbeddedMaxWidth, tagName]
  );
}

/**
 * @internal
 */
export default function SharedPropsProvider(
  props: PropsWithChildren<RenderHTMLSharedProps>
) {
  const memoizedSharedProps = useMemo(
    () => ({
      ...selectSharedProps(props),
      customListStyleSpecs: {
        ...defaultListStyleSpecs,
        ...props.customListStyleSpecs
      }
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    Object.values(selectSharedProps(props))
  );
  return React.createElement(
    SharedPropsContext.Provider,
    { value: memoizedSharedProps },
    props.children
  );
}
