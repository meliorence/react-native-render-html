import React, { Dispatch } from 'react';
import { PropsWithChildren, Reducer, useCallback, useReducer } from 'react';
import { Platform } from 'react-native';
import {
  createContext,
  useContextSelector,
  useContext
} from 'use-context-selector';

export const olListTypes = [
  'default',
  'decimal',
  'lower-alpha',
  'upper-alpha',
  'lower-greek',
  'lower-roman',
  'upper-roman',
  'decimal-leading-zero',
  'none'
] as const;

export const ulListTypes = [
  'default',
  'disk',
  'circle',
  'square',
  'disclosure-open',
  'disclosure-closed',
  'none'
] as const;

type OlListType = typeof olListTypes[number];
type UlListType = typeof ulListTypes[number];

export interface PlaygroundMutableState<Sk extends string> {
  fontSize: number;
  color: string | undefined;
  lineHeight: number;
  olListType: OlListType;
  ulListType: UlListType;
  isBold: boolean;
  isItalic: boolean;
  dynamicMarkerBox: boolean;
  fontFamily: string;
  selectedSource: Sk;
}

export interface PlaygroundState<Sk extends string>
  extends PlaygroundMutableState<Sk> {
  sourceMap: SourceMap<Sk>;
}

type Mutate<Sk extends string, K extends keyof PlaygroundMutableState<Sk>> = {
  target: K;
  value: PlaygroundMutableState<Sk>[K];
};

export type SourceMap<Sk extends string> = Record<
  Sk,
  {
    label: string;
    source: string;
  }
>;
export interface PlaygroundInitParams<Sk extends string> {
  sourceMap: SourceMap<Sk>;
  initialSource: Sk;
}

const playgroundStoreContext = createContext<PlaygroundMutableState<string>>(
  {} as any
);
const playgroundDispatchContext = createContext<
  Dispatch<Mutate<string, keyof PlaygroundMutableState<string>>>
>(() => {});

function getInitialState<Sk extends string>({
  sourceMap,
  initialSource
}: PlaygroundInitParams<Sk>): PlaygroundState<Sk> {
  return {
    fontSize: 14,
    lineHeight: 1.2,
    olListType: 'default',
    ulListType: 'default',
    color: undefined,
    fontFamily: Platform.select({
      android: 'Roboto',
      ios: 'San Francisco',
      macos: 'San Francisco',
      windows: 'Segoe UI',
      default: 'sans-serif'
    }),
    isBold: false,
    isItalic: false,
    dynamicMarkerBox: false,
    selectedSource: initialSource,
    sourceMap
  };
}

export function usePlaygroundStateSlice<
  Sk extends string,
  K extends keyof PlaygroundState<Sk>
>(k: K): PlaygroundState<Sk>[K] {
  const selector = useCallback((s: PlaygroundState<Sk>) => s[k], [k]);
  return useContextSelector(playgroundStoreContext as any, selector);
}

export function usePlaygroundSource() {
  const selectedSource = usePlaygroundStateSlice('selectedSource');
  const sourceMap = usePlaygroundStateSlice('sourceMap');
  return sourceMap[selectedSource];
}

export function usePlaygroundState() {
  return useContext(playgroundStoreContext);
}

export function usePlaygroundSetter<
  Sk extends string,
  K extends keyof PlaygroundMutableState<Sk>
>(k: K): (v: PlaygroundMutableState<Sk>[K]) => void {
  const dispatch = useContext(playgroundDispatchContext);
  return useCallback(
    (v: PlaygroundMutableState<Sk>[K]) => dispatch({ value: v, target: k }),
    [k, dispatch]
  );
}

const reducer: Reducer<
  PlaygroundMutableState<any>,
  Mutate<any, keyof PlaygroundMutableState<any>>
> = function reducer(state, action) {
  return {
    ...state,
    [action.target]: action.value
  };
};

export default function PlaygroundStoreProvider<Sk extends string>({
  children,
  ...initParams
}: PropsWithChildren<PlaygroundInitParams<Sk>>) {
  const [state, dispatch] = useReducer<
    typeof reducer,
    PlaygroundInitParams<Sk>
  >(reducer, initParams, getInitialState);
  return (
    <playgroundDispatchContext.Provider value={dispatch}>
      <playgroundStoreContext.Provider value={state}>
        {children}
      </playgroundStoreContext.Provider>
    </playgroundDispatchContext.Provider>
  );
}
