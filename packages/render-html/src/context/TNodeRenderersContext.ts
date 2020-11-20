import React from 'react';
import type TNodeRenderer from '../TNodeRenderer';
import type TChildrenRenderer from '../TChildrenRenderer';

const TNodeRenderersContext = React.createContext({
  TChildrenRenderer: (() => null) as typeof TChildrenRenderer,
  TNodeRenderer: (() => null) as typeof TNodeRenderer
});

export function useTNodeRenderer() {
  return React.useContext(TNodeRenderersContext).TNodeRenderer;
}

export function useTChildrenRenderer() {
  return React.useContext(TNodeRenderersContext).TChildrenRenderer;
}

export default TNodeRenderersContext;
