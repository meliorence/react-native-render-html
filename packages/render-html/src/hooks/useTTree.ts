import { tnodeToString } from '@native-html/transient-render-engine';
import { useMemo, useEffect } from 'react';
import { RenderResolvedHTMLProps } from '../shared-types';
import { useAmbiantTRenderEngine } from '../TRenderEngineProvider';

export default function useTTree(props: RenderResolvedHTMLProps) {
  const trenderEngine = useAmbiantTRenderEngine();
  const ttree = useMemo(() => trenderEngine.buildTTree(props.html), [
    props.html,
    trenderEngine
  ]);
  const { onTTreeChange, debug } = props;
  useEffect(() => {
    onTTreeChange?.call(null, ttree);
    if (debug && __DEV__) {
      console.info(
        `Transient Render Tree update:\n${tnodeToString(ttree, {
          isChild: false,
          isLast: false,
          parentLeftPrefix: ' '
        })}`
      );
    }
  }, [ttree, onTTreeChange, debug]);
  return ttree;
}
