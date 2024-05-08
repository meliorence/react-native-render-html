import { FunctionComponent } from 'react';
import { TChildrenRendererProps } from './shared-types';
import renderChildren from './renderChildren';

/**
 * A component to render collections of tnodes.
 * Especially useful when used with {@link useTNodeChildrenProps}.
 */
const TChildrenRenderer: FunctionComponent<TChildrenRendererProps> =
  renderChildren.bind(null);

export default TChildrenRenderer;
