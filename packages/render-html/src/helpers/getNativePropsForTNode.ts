import { TBlock, TPhrasing, TText } from '@native-html/transient-render-engine';
import { TextProps, ViewProps } from 'react-native';
import { TDefaultRendererProps } from '../shared-types';

/**
 * Extract React Native props for a given {@link TNode}. Native props target
 * either `Text` or `View` elements, with an optional `onPress` prop for
 * interactive elements.
 *
 * @public
 */
export default function getNativePropsForTNode<
  T extends TPhrasing | TText | TBlock
>(props: TDefaultRendererProps<T>): T extends TBlock ? ViewProps : TextProps {
  const { tnode, style, type, nativeProps, onPress } = props;
  const switchProp = type === 'block' ? props.viewProps : props.textProps;
  const nextProps: TextProps | ViewProps = {
    ...(typeof onPress === 'function'
      ? ({ accessibilityRole: type === 'block' ? 'button' : 'link' } as const)
      : null),
    ...tnode.getReactNativeProps()?.[type === 'block' ? 'view' : 'text'],
    ...nativeProps,
    ...switchProp,
    onPress,
    style: [style, nativeProps?.style, switchProp.style],
    testID: tnode.tagName || undefined
  };
  return nextProps as any;
}
