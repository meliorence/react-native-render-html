import React, { PropsWithChildren, useCallback, useMemo } from 'react';
import { TextProps, ViewProps } from 'react-native';
import selectSharedProps from '../helpers/selectSharedProps';
import {
  RenderHTMLFragmentProps,
  RenderHTMLSharedProps,
  TRendererBaseProps
} from '../shared-types';
import defaultSharedProps from './defaultSharedProps';

const SharedPropsContext = React.createContext<Required<RenderHTMLSharedProps>>(
  defaultSharedProps
);

export function useSharedProps<
  RendererProps extends Record<string, any> = Record<string, any>
>() {
  return React.useContext(SharedPropsContext) as Required<
    RenderHTMLSharedProps<RendererProps>
  >;
}

export function useRendererProps<
  RendererProps extends Record<string, any> = Record<string, any>,
  K extends keyof RendererProps = any
>(k: K) {
  return useSharedProps<RendererProps>().renderersProps[k];
}

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
export function useDefaultTextProps(): TextProps {
  return {
    ...defaultSharedProps.defaultTextProps,
    ...useSharedProps().defaultTextProps
  };
}

export function useDefaultViewProps(): ViewProps {
  return {
    ...defaultSharedProps.defaultViewProps,
    ...useSharedProps().defaultViewProps
  };
}

export function useComputeMaxWidthForTag(tagName: string) {
  const { computeEmbeddedMaxWidth } = useSharedProps();
  return useCallback(
    (cw: number) => {
      return computeEmbeddedMaxWidth(cw, tagName);
    },
    [computeEmbeddedMaxWidth, tagName]
  );
}

export default function SharedPropsProvider(
  props: PropsWithChildren<RenderHTMLFragmentProps>
) {
  const memoizedSharedProps = useMemo(
    () => selectSharedProps(props),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    Object.values(selectSharedProps(props))
  );
  return React.createElement(
    SharedPropsContext.Provider,
    { value: memoizedSharedProps },
    props.children
  );
}
