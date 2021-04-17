import { UnitaryCounterRendererProps } from '../../shared-types';

export default function useSymbolicMarkerRendererProps(
  props: UnitaryCounterRendererProps,
  shrinkFactor = 1
) {
  const prefixSize = props.fontSize / (shrinkFactor * 2.8);
  return {
    prefixSize,
    prefixStyle: {
      width: prefixSize,
      height: prefixSize,
      // center the item vertically, relative to line height
      top: (props.lineHeight - prefixSize) / 2
    }
  };
}
