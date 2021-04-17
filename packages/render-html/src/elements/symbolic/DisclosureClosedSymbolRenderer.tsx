import React from 'react';
import { View } from 'react-native';
import { UnitaryCounterRendererProps } from '../../shared-types';
import useSymbolicMarkerRendererProps from './useSymbolicMarkerRendererStyles';

export default function DisclosureClosedSymbolRenderer(
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
      borderLeftWidth: prefixSize,
      borderLeftColor: props.color,
      borderTopWidth: prefixSize / 2,
      borderTopColor: 'transparent',
      borderBottomWidth: prefixSize / 2,
      borderBottomColor: 'transparent'
    }
  });
}
