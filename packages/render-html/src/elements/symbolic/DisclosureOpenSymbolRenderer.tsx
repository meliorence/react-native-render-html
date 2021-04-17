import React from 'react';
import { View } from 'react-native';
import { UnitaryCounterRendererProps } from '../../shared-types';
import useSymbolicMarkerRendererProps from './useSymbolicMarkerRendererStyles';

export default function DisclosureOpenSymbolRenderer(
  props: UnitaryCounterRendererProps
) {
  const {
    prefixStyle: { top },
    prefixSize
  } = useSymbolicMarkerRendererProps(props, 1);
  return React.createElement(View, {
    style: {
      top,
      width: 0,
      height: 0,
      borderStyle: 'solid',
      borderTopWidth: prefixSize,
      borderTopColor: props.color,
      borderLeftWidth: prefixSize / 2,
      borderLeftColor: 'transparent',
      borderRightWidth: prefixSize / 2,
      borderRightColor: 'transparent'
    }
  });
}
