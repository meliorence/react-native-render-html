import React from 'react';
import type TNodeChildrenRenderer from '../TNodeChildrenRenderer';

/**
 * This context allows dependency injection to avoid circular dependencies.
 */
const TChildrenRenderersContext = React.createContext<
  typeof TNodeChildrenRenderer
>(() => null);

export function useTChildrenRenderer() {
  return React.useContext(TChildrenRenderersContext);
}

export default TChildrenRenderersContext;
