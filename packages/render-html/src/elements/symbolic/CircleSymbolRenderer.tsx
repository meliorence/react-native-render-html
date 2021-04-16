import React from 'react';
import { View } from 'react-native';
import { ListPrefixRendererProps } from '../list-types';
import useSymbolicMarkerRendererProps from './useSymbolicMarkerRendererStyles';

export default function CircleSymbolRenderer(props: ListPrefixRendererProps) {
  const { prefixSize, prefixStyle } = useSymbolicMarkerRendererProps(props);
  const style = {
    borderColor: props.color,
    borderWidth: prefixSize / 10,
    borderRadius: prefixSize,
    ...prefixStyle
  };
  return <View style={style} />;
}
