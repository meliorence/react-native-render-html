import React from 'react';
import { View } from 'react-native';
import { ListPrefixRendererProps } from '../list-types';
import useSymbolicMarkerRendererProps from './useSymbolicMarkerRendererStyles';

export default function DiscSymbolRenderer(props: ListPrefixRendererProps) {
  const { prefixSize, prefixStyle } = useSymbolicMarkerRendererProps(props);
  const style = {
    borderRadius: prefixSize,
    backgroundColor: props.color,
    ...prefixStyle
  };
  return <View style={style} />;
}
