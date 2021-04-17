import React from 'react';
import { View } from 'react-native';
import { UnitaryCounterRendererProps } from '../../shared-types';
import useSymbolicMarkerRendererProps from './useSymbolicMarkerRendererStyles';

export default function CircleSymbolRenderer(
  props: UnitaryCounterRendererProps
) {
  const { prefixSize, prefixStyle } = useSymbolicMarkerRendererProps(props);
  const style = {
    borderColor: props.color,
    borderWidth: prefixSize / 10,
    borderRadius: prefixSize,
    ...prefixStyle
  };
  return <View style={style} />;
}
