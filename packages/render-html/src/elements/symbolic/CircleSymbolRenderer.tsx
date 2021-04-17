import React from 'react';
import { View } from 'react-native';
import { ListCounterRendererProps } from '../../shared-types';
import useSymbolicMarkerRendererProps from './useSymbolicMarkerRendererStyles';

export default function CircleSymbolRenderer(props: ListCounterRendererProps) {
  const { prefixSize, prefixStyle } = useSymbolicMarkerRendererProps(props);
  const style = {
    borderColor: props.color,
    borderWidth: prefixSize / 10,
    borderRadius: prefixSize,
    ...prefixStyle
  };
  return <View style={style} />;
}
