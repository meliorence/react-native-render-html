import React from 'react';
import { View } from 'react-native';
import { UnitaryCounterRendererProps } from '../../shared-types';
import useSymbolicMarkerRendererProps from './useSymbolicMarkerRendererStyles';

export default function SquareSymbolRenderer(
  props: UnitaryCounterRendererProps
) {
  const { prefixStyle } = useSymbolicMarkerRendererProps(props, 1.2);
  return React.createElement(View, {
    style: {
      backgroundColor: props.color,
      ...prefixStyle
    }
  });
}
