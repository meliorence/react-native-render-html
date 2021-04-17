import React from 'react';
import { View } from 'react-native';
import { ListCounterRendererProps } from '../list-types';
import useSymbolicMarkerRendererProps from './useSymbolicMarkerRendererStyles';

export default function DiscSymbolRenderer(props: ListCounterRendererProps) {
  const { prefixSize, prefixStyle } = useSymbolicMarkerRendererProps(props);
  const style = {
    borderRadius: prefixSize,
    backgroundColor: props.color,
    ...prefixStyle
  };
  return <View style={style} />;
}
