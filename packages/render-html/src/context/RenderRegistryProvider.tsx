import { TNode, TText } from '@native-html/transient-render-engine';
import React, { PropsWithChildren, useMemo } from 'react';
import useProfiler from '../hooks/useProfiler';
import { CustomTagRendererRecord } from '../render/render-types';
import RenderRegistry from '../render/RenderRegistry';
import { HTMLElementModelRecord } from '../shared-types';

export const RenderRegistryContext = React.createContext<RenderRegistry>(
  null as any
);

export function useRendererRegistry() {
  return React.useContext(RenderRegistryContext);
}

export function useRendererConfig<T extends TNode>(tnode: T) {
  return React.useContext(RenderRegistryContext).getRendererConfigForTNode<T>(
    tnode
  );
}

export function useInternalTextRenderer(tnode: TText) {
  return React.useContext(RenderRegistryContext).getInternalTextRenderer(
    tnode.tagName
  );
}

export default function RenderRegistryProvider({
  children,
  elementModels,
  renderers
}: PropsWithChildren<{
  elementModels: HTMLElementModelRecord;
  renderers?: CustomTagRendererRecord;
}>) {
  const profile = useProfiler({ prop: 'renderers' });
  const registry = useMemo(() => {
    typeof __DEV__ === 'boolean' && __DEV__ && profile();
    return new RenderRegistry(renderers, elementModels);
  }, [renderers, elementModels, profile]);
  return (
    <RenderRegistryContext.Provider value={registry}>
      {children}
    </RenderRegistryContext.Provider>
  );
}
