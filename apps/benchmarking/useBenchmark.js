import { transitions, exec } from 'react-states';
import { useEffect, useReducer, useCallback } from 'react';
import profiles from './profiles';

function now() {
  // eslint-disable-next-line no-undef
  return performance.now();
}

const reducer = transitions({
  WAIT_BENCH: {
    LAUNCH_BENCH: ({ runs, numOfProfiles }) => ({
      state: 'RUNNING',
      runId: 0,
      profileId: 0,
      runs,
      numOfProfiles,
      last: now(),
      benchmarks: profiles.map((n) => ({ name: n.name, values: [] }))
    })
  },
  WAIT_RUN: {
    NEXT_RUN: (action, context) => {
      const { runs, numOfProfiles } = context;
      const shared = {
        last: now(),
        state: 'RUNNING'
      };
      if (context.runId < runs - 1) {
        return { ...context, runId: context.runId + 1, ...shared };
      }
      if (context.profileId < numOfProfiles - 1) {
        return {
          ...context,
          runId: 0,
          profileId: context.profileId + 1,
          ...shared
        };
      }
      return { state: 'WAIT_BENCH', benchmarks: context.benchmarks };
    }
  },
  RUNNING: {
    REGISTER_RUN: (action, context) => {
      console.info(
        `Running sample ${context.runId} for profile #${context.profileId}`
      );
      context.benchmarks[context.profileId].values.push(now() - context.last);
      return { ...context, state: 'WAIT_RUN' };
    }
  }
});

const numOfProfiles = profiles.length;

export default function useBenchmark({ runs = 10 }) {
  const [state, dispatch] = useReducer(reducer, {
    state: 'WAIT_BENCH',
    benchmarks: null
  });
  const onLayout = useCallback(() => {
    requestAnimationFrame(() => dispatch({ type: 'REGISTER_RUN' }));
  }, []);
  const launch = useCallback(() => {
    dispatch({ type: 'LAUNCH_BENCH', runs, numOfProfiles });
  }, [runs]);
  useEffect(
    () =>
      exec(state, {
        WAIT_RUN: () => {
          requestAnimationFrame(() => dispatch({ type: 'NEXT_RUN' }));
        }
      }),
    [state, runs]
  );
  return {
    ...state,
    launch,
    onLayout,
    profile:
      typeof state.profileId === 'number' ? profiles[state.profileId] : null
  };
}
