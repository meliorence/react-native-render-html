import { useCallback, useRef } from 'react';
import identity from 'ramda/src/identity';

declare const performance: { now: () => number };

const useProfiler =
  typeof __DEV__ === 'boolean' && __DEV__ && typeof performance === 'object'
    ? function useProfiler({ name, prop }: { name?: string; prop?: string }) {
        const lastUpdate = useRef(0);
        const profile = useCallback(
          function onUpdate() {
            const now = performance.now();
            const diff = now - lastUpdate.current;
            if (diff < 60) {
              console.warn(
                `You seem to update ${
                  prop ? `the ${prop} prop(s)` : 'props'
                } of the "${
                  name ? name : 'RenderHTML'
                }" component in short periods of time, causing costly tree rerenders (last update was ${diff.toFixed(
                  2
                )}ms ago). See https://stackoverflow.com/q/68966120/2779871`
              );
            }
            lastUpdate.current = now;
          },
          [name, prop]
        );
        return profile;
      }
    : /* istanbul ignore next */
      function useProfiler() {
        return identity as () => void;
      };

export default useProfiler;
