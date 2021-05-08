import { useMemo, useEffect, useRef, useContext } from 'react';
import domContext from '../context/domContext';
import { RenderTTreeProps } from '../internal-types';
import { useAmbientTRenderEngine } from '../TRenderEngineProvider';

/**
 * @internal
 */
export default function useTTree(props: RenderTTreeProps) {
  const { html } = props;
  const { onTTreeChange, debug } = useContext(domContext);
  const updateNumber = useRef(0);
  const trenderEngine = useAmbientTRenderEngine();
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
