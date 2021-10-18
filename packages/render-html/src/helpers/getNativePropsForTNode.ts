import { TBlock, TPhrasing, TText } from '@native-html/transient-render-engine';
import { TextProps, ViewProps } from 'react-native';
import { TDefaultRendererProps } from '../shared-types';

const empty: any = {};

/**
 * Extract React Native props for a given {@link TNode}. Native props target
 * either `Text` or `View` elements, with an optional `onPress` prop for
 * interactive elements.
 *
 * @public
 */
export default function getNativePropsForTNode<
  T extends TPhrasing | TText | TBlock
>(
  props: TDefaultRendererProps<T>
): T extends TBlock ? ViewProps & { onPress?: () => void } : TextProps {
  const { tnode, style, type, nativeProps, onPress } = props;
  const switchProp = type === 'block' ? props.viewProps : props.textProps;
  const propsFromModel =
    tnode.getReactNativeProps()?.[type === 'block' ? 'view' : 'text'] || empty;
  const syntheticOnPress =
    onPress ?? nativeProps?.onPress ?? propsFromModel.onPress;
  const nextProps: TextProps | ViewProps = {
    ...(typeof syntheticOnPress === 'function'
      ? ({ accessibilityRole: type === 'block' ? 'button' : 'link' } as const)
      : null),
    ...propsFromModel,
    ...nativeProps,
    ...switchProp,
    onPress: syntheticOnPress,
    style: [style, nativeProps?.style, switchProp.style],
    testID: tnode.tagName || undefined
  };
  return nextProps as any;
}
