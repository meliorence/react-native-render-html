import pick from 'ramda/src/pick';
import omit from 'ramda/src/omit';
import { TNodeShape, TNodeType } from '@native-html/transient-render-engine';

const borderBoxProps = [
  'backgroundColor',
  'borderBottomColor',
  'borderBottomLeftRadius',
  'borderBottomRightRadius',
  'borderBottomWidth',
  'borderLeftColor',
  'borderLeftWidth',
  'borderRightColor',
  'borderRightWidth',
  'borderStyle',
  'borderTopColor',
  'borderTopLeftRadius',
  'borderTopRightRadius',
  'borderTopWidth',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'marginBottom',
  'marginLeft',
  'marginRight',
  'marginTop'
];

const pickBorderBox = pick(borderBoxProps);
const omitBorderBox = omit(borderBoxProps);

/**
 * A utility to separate box model styles and other styles. Useful when one wants
 * to wrap a text element in a view to benefit from padding vertical,
 * borders... etc.
 *
 * @param styles - The native styles to split.
 */
export default function splitBoxModelStyle(
  style: ReturnType<TNodeShape<TNodeType>['getNativeStyles']>
) {
  return {
    boxModelStyle: pickBorderBox(style),
    otherStyle: omitBorderBox(style)
  };
}
