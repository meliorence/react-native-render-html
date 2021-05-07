import { DOMDocument } from '@native-html/transient-render-engine';
import { useMemo, useEffect, useRef, useContext } from 'react';
import domContext from '../context/domContext';
import { RenderDOMProps } from '../internal-types';
import { useAmbientTRenderEngine } from '../TRenderEngineProvider';

/**
 * @internal
 */
export default function useTTree(props: RenderDOMProps) {
  const { dom } = props;
  const { onTTreeChange, debug } = useContext(domContext);
  const updateNumber = useRef(0);
  const trenderEngine = useAmbientTRenderEngine();
  const ttree = useMemo(
    () => trenderEngine.buildTTreeFromDoc(dom as DOMDocument),
    [dom, trenderEngine]
  );
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
