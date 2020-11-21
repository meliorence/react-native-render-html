import { tnodeToString } from '@native-html/transient-render-engine';
import { useMemo, useEffect } from 'react';
import { RenderHTMLProps } from './shared-types';
import useTRenderEngine from './useTRenderEngine';

export default function useTTree(props: RenderHTMLProps) {
  const trenderEngine = useTRenderEngine(props);
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
