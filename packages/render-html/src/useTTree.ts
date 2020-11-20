import { tnodeToString } from '@native-html/transient-render-tree';
import { useMemo, useEffect } from 'react';
import { RenderHTMLProps } from './shared-types';
import useTTreeBuilder from './useTTreeBuilder';

export default function useTTree(props: RenderHTMLProps) {
  const ttreebuilder = useTTreeBuilder(props);
  const ttree = useMemo(() => ttreebuilder.buildTTree(props.html), [
    props.html,
    ttreebuilder
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
