import { useMemo, useEffect, useRef, useContext } from 'react';
import ttreeEventsContext from '../context/ttreeEventsContext';
import { useSharedProps } from '../context/SharedPropsProvider';
import { RenderTTreeProps } from '../internal-types';
import { useAmbientTRenderEngine } from '../TRenderEngineProvider';
import { TDocument } from '@native-html/transient-render-engine';

function useTTreeChangeEffect(ttree: TDocument) {
  const { onTTreeChange } = useContext(ttreeEventsContext);
  const { debug } = useSharedProps();
  const updateNumber = useRef(0);
  useEffect(() => {
    onTTreeChange?.call(null, ttree);
    if (debug && typeof __DEV__ === 'boolean' && __DEV__) {
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
}

/**
 * @internal
 */
export default function useTTree(props: RenderTTreeProps) {
  const { document } = props;
  const trenderEngine = useAmbientTRenderEngine();
  const ttree = useMemo(
    () =>
      typeof document === 'string'
        ? trenderEngine.buildTTree(document)
        : trenderEngine.buildTTreeFromDoc(document),
    [document, trenderEngine]
  );
  useTTreeChangeEffect(ttree);
  return ttree;
}
