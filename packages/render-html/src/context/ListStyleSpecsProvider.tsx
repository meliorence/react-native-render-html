/* eslint-disable react-native/no-inline-styles */
import { MarkerBoxProps } from '@jsamr/react-native-li';
import { mapObjIndexed } from 'ramda';
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo
} from 'react';
import { Text, View } from 'react-native';
import defaultListStyleSpecs from '../elements/defaultListStyleSpecs';
import { ListStyleSpec, UnitaryListStyleSpec } from '../shared-types';
import { useSharedProps } from './SharedPropsProvider';

const listStyleSpecsContext = createContext<
  Record<
    string,
    ListStyleSpec & { renderMarker?: (props: MarkerBoxProps) => any }
  >
>(defaultListStyleSpecs);

export function useListStyleSpecs() {
  return useContext(listStyleSpecsContext);
}

function createSymbolicMarkerRenderer({
  Component,
  counterStyleRenderer
}: UnitaryListStyleSpec) {
  const prefix = counterStyleRenderer.renderPrefix();
  const suffix = counterStyleRenderer.renderSuffix();
  return ({
    style,
    markerTextStyle,
    counterIndex,
    rtlMarkerReversed
  }: MarkerBoxProps) => {
    return (
      <View
        style={[
          style,
          {
            flexDirection: rtlMarkerReversed ? 'row-reverse' : 'row',
            justifyContent: 'flex-end'
          }
        ]}>
        {!!prefix && <Text style={markerTextStyle}>{prefix}</Text>}
        {React.createElement(Component, {
          ...(markerTextStyle as any),
          index: counterIndex
        })}
        {!!suffix && <Text style={markerTextStyle}>{suffix}</Text>}
      </View>
    );
  };
}

const makeMarkerRenderers = mapObjIndexed((value: ListStyleSpec) => {
  if (value.type === 'unitary') {
    return {
      ...value,
      renderMarker: createSymbolicMarkerRenderer(value)
    };
  }
  return value;
});

export default function ListStyleSpecsProvider({
  children
}: PropsWithChildren<{}>) {
  const { customListStyleSpecs } = useSharedProps();
  const mergedListStyleSpecs = useMemo(() => {
    return makeMarkerRenderers(
      customListStyleSpecs != null
        ? { ...defaultListStyleSpecs, ...customListStyleSpecs }
        : defaultListStyleSpecs
    );
  }, [customListStyleSpecs]);
  return (
    <listStyleSpecsContext.Provider value={mergedListStyleSpecs}>
      {children}
    </listStyleSpecsContext.Provider>
  );
}
