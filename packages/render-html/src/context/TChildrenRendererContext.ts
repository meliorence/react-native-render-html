import React from 'react';
import type TNodeChildrenRenderer from '../TNodeChildrenRenderer';
import type TChildrenRenderer from '../TChildrenRenderer';

const DummyChildrenRenderer = () => null as any;

DummyChildrenRenderer.defaultProps = {} as any;

/**
 * This context allows dependency injection to avoid circular dependencies.
 */
const TChildrenRenderersContext = React.createContext<{
  TChildrenRenderer: typeof TChildrenRenderer;
  TNodeChildrenRenderer: typeof TNodeChildrenRenderer;
}>({
  TChildrenRenderer: DummyChildrenRenderer,
  TNodeChildrenRenderer: DummyChildrenRenderer
});

export function useTNodeChildrenRenderer() {
  return React.useContext(TChildrenRenderersContext).TNodeChildrenRenderer;
}

export function useTChildrenRenderer() {
  return React.useContext(TChildrenRenderersContext).TChildrenRenderer;
}

export default TChildrenRenderersContext;
