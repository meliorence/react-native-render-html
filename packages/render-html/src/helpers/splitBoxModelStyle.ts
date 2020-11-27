import { NativeStyleProp } from '../shared-types';

/**
 * A utility to separate box model styles and other styles. Useful when one wants
 * to wrap a text element in a view to benefit from padding vertical,
 * borders... etc.
 *
 * @param styles - The native styles to split.
 */
export default function splitBoxModelStyle({
  backgroundColor,
  borderBottomColor,
  borderBottomLeftRadius,
  borderBottomRightRadius,
  borderBottomWidth,
  borderLeftColor,
  borderLeftWidth,
  borderRightColor,
  borderRightWidth,
  borderStyle,
  borderTopColor,
  borderTopLeftRadius,
  borderTopRightRadius,
  borderTopWidth,
  paddingBottom,
  paddingLeft,
  paddingRight,
  paddingTop,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  ...rest
}: NativeStyleProp<any>) {
  return {
    boxModel: {
      backgroundColor,
      borderBottomColor,
      borderBottomLeftRadius,
      borderBottomRightRadius,
      borderBottomWidth,
      borderLeftColor,
      borderLeftWidth,
      borderRightColor,
      borderRightWidth,
      borderStyle,
      borderTopColor,
      borderTopLeftRadius,
      borderTopRightRadius,
      borderTopWidth,
      paddingBottom,
      paddingLeft,
      paddingRight,
      paddingTop,
      marginBottom,
      marginLeft,
      marginRight,
      marginTop
    },
    rest
  };
}
