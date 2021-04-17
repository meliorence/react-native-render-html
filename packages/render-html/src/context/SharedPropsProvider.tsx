import React, { PropsWithChildren, useCallback, useMemo } from 'react';
import { TextProps, ViewProps } from 'react-native';
import defaultListStyleSpecs from '../elements/defaultListStyleSpecs';
import selectSharedProps from '../helpers/selectSharedProps';
import { RenderHTMLSharedProps, TRendererBaseProps } from '../shared-types';
import defaultSharedProps from './defaultSharedProps';

const SharedPropsContext = React.createContext<Required<RenderHTMLSharedProps>>(
  defaultSharedProps
);

export function useSharedProps() {
  return React.useContext(SharedPropsContext) as Required<
    Omit<RenderHTMLSharedProps, 'rendererProps'>
  >;
}

/**
 * @internal
 */
export function useDefaultContainerProps(): Pick<
  TRendererBaseProps<any>,
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
 * @internal
 */
export function useDefaultTextProps(): TextProps {
  return {
    ...defaultSharedProps.defaultTextProps,
    ...useSharedProps().defaultTextProps
  };
}

/**
 * @internal
 */
export function useDefaultViewProps(): ViewProps {
  return {
    ...defaultSharedProps.defaultViewProps,
    ...useSharedProps().defaultViewProps
  };
}
/**
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
