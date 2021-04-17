import React from 'react';
import { View } from 'react-native';
import { UnitaryCounterRendererProps } from '../../shared-types';
import useSymbolicMarkerRendererProps from './useSymbolicMarkerRendererStyles';

export default function DiscSymbolRenderer(props: UnitaryCounterRendererProps) {
  const { prefixSize, prefixStyle } = useSymbolicMarkerRendererProps(props);
  const style = {
    borderRadius: prefixSize,
    backgroundColor: props.color,
    ...prefixStyle
  };
  return <View style={style} />;
}
