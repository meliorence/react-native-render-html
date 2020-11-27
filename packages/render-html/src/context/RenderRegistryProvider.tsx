import { TNode, TText } from '@native-html/transient-render-engine';
import React, { PropsWithChildren, useMemo } from 'react';
import { CustomTagRendererRecord } from '../render/render-types';
import RenderRegistry from '../render/RenderRegistry';

export const RenderRegistryContext = React.createContext<RenderRegistry>(
  null as any
);

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
  renderers
}: PropsWithChildren<{
  renderers?: CustomTagRendererRecord;
}>) {
  const registry = useMemo(() => new RenderRegistry(renderers), [renderers]);
  return (
    <RenderRegistryContext.Provider value={registry}>
      {children}
    </RenderRegistryContext.Provider>
  );
}
