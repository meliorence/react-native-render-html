import React, { PropsWithChildren, ReactElement, useMemo } from 'react';
import RenderersPropsProvider from './context/RenderersPropsProvider';
import SharedPropsProvider from './context/SharedPropsProvider';
import TChildrenRenderersContext from './context/TChildrenRendererContext';
import { RenderHTMLConfig } from './shared-types';
import TNodeChildrenRenderer from './TNodeChildrenRenderer';
import TChildrenRenderer from './TChildrenRenderer';
import sourceLoaderContext, {
  defaultRenderError,
  defaultRenderLoading
} from './context/sourceLoaderContext';
import RenderRegistryProvider from './context/RenderRegistryProvider';
import { useAmbientTRenderEngine } from './TRenderEngineProvider';
import useProfiler from './hooks/useProfiler';
import ListStyleSpecsProvider from './context/ListStyleSpecsProvider';

const childrenRendererContext = {
  TChildrenRenderer,
  TNodeChildrenRenderer
};

/**
 * A component to provide configuration for {@link RenderHTMLSource}
 * descendants, to be used in conjunction with {@link TRenderEngineProvider}.
 */
export default function RenderHTMLConfigProvider(
  props: PropsWithChildren<RenderHTMLConfig>
): ReactElement {
  const {
    remoteErrorView,
    remoteLoadingView,
    renderersProps,
    children,
    renderers,
    ...sharedProps
  } = props;
  const engine = useAmbientTRenderEngine();
  const profile = useProfiler({ prop: 'remoteErrorView or remoteLoadingView' });
  const sourceLoaderConfig = useMemo(() => {
    typeof __DEV__ === 'boolean' && __DEV__ && profile();
    return {
      remoteErrorView: remoteErrorView || defaultRenderError,
      remoteLoadingView: remoteLoadingView || defaultRenderLoading
    };
  }, [remoteErrorView, remoteLoadingView, profile]);
  return (
    <RenderRegistryProvider
      renderers={renderers}
      elementModels={engine.getHTMLElementsModels()}>
      <SharedPropsProvider {...sharedProps}>
        <ListStyleSpecsProvider>
          <RenderersPropsProvider renderersProps={renderersProps}>
            <TChildrenRenderersContext.Provider value={childrenRendererContext}>
              <sourceLoaderContext.Provider value={sourceLoaderConfig}>
                {children}
              </sourceLoaderContext.Provider>
            </TChildrenRenderersContext.Provider>
          </RenderersPropsProvider>
        </ListStyleSpecsProvider>
      </SharedPropsProvider>
    </RenderRegistryProvider>
  );
}
