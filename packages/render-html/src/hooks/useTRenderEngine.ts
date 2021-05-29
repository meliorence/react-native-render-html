import { useMemo } from 'react';
import { TRenderEngineConfig } from '../shared-types';
import buildTREFromConfig from '../helpers/buildTREFromConfig';

/**
 * @internal
 */
export default function useTRenderEngine({
  triggerTREInvalidationPropNames,
  ...props
}: TRenderEngineConfig) {
  const tbuilderDeps = (triggerTREInvalidationPropNames || []).map(
    (key) => props[key]
  );
  return useMemo(
    () => buildTREFromConfig(props),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    tbuilderDeps
  );
}
