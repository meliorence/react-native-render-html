import { useMemo, useEffect, useRef } from 'react';
import { RenderResolvedHTMLProps } from '../internal-types';
import { useAmbiantTRenderEngine } from '../TRenderEngineProvider';

/**
 * @internal
 */
export default function useTTree(props: RenderResolvedHTMLProps) {
  const { onTTreeChange, debug, html } = props;
  const updateNumber = useRef(0);
  const trenderEngine = useAmbiantTRenderEngine();
  const ttree = useMemo(() => trenderEngine.buildTTree(html), [
    html,
    trenderEngine
  ]);
  useEffect(() => {
    onTTreeChange?.call(null, ttree);
    if (debug && __DEV__) {
      console.info(
        `Transient Render Tree update ${++updateNumber.current}:\n${ttree.snapshot(
          {
            withNodeIndex: false,
            withStyles: false
          }
        )}`
      );
    }
  }, [ttree, onTTreeChange, debug]);
  return ttree;
}
