import { useMemo } from 'react';
import { TransientRenderEngineConfig } from '../shared-types';
import buildTREFromConfig from '../helpers/buildTREFromConfig';

/**
 * @internal
 */
export default function useTRenderEngine({
  triggerTREInvalidationPropNames,
  ...props
}: TransientRenderEngineConfig) {
  const tbuilderDeps = (triggerTREInvalidationPropNames || []).map(
    (key) => props[key]
  );
  return useMemo(
    () => buildTREFromConfig(props),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    tbuilderDeps
  );
}
