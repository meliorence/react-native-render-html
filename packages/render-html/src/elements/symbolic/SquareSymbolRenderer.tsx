import React from 'react';
import { View } from 'react-native';
import { ListCounterRendererProps } from '../list-types';
import useSymbolicMarkerRendererProps from './useSymbolicMarkerRendererStyles';

export default function SquareSymbolRenderer(props: ListCounterRendererProps) {
  const { prefixStyle } = useSymbolicMarkerRendererProps(props, 1.2);
  return React.createElement(View, {
    style: {
      backgroundColor: props.color,
      ...prefixStyle
    }
  });
}
