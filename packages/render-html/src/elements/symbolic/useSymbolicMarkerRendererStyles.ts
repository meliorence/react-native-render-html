import { ListPrefixRendererProps } from '../list-types';

export default function useSymbolicMarkerRendererProps(
  props: ListPrefixRendererProps,
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
