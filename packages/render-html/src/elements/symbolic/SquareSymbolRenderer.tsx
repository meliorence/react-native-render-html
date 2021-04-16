import React from 'react';
import { View } from 'react-native';
import { ListPrefixRendererProps } from '../list-types';
import useSymbolicMarkerRendererProps from './useSymbolicMarkerRendererStyles';

export default function SquareSymbolRenderer(props: ListPrefixRendererProps) {
  const { prefixStyle } = useSymbolicMarkerRendererProps(props, 1.2);
  return React.createElement(View, {
    style: {
      backgroundColor: props.color,
      ...prefixStyle
    }
  });
}
