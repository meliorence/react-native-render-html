import React from 'react';
import { TDefaultRendererProps } from './shared-types';
import GenericPressable from './GenericPressable';
import getNativePropsForTNode from './helpers/getNativePropsForTNode';
import { View } from 'react-native';
import { TBlock } from '@native-html/transient-render-engine';

function renderBlockContent(props: TDefaultRendererProps<TBlock>) {
  const nativeProps = getNativePropsForTNode(props);
  return React.createElement(
    typeof nativeProps.onPress === 'function' ? GenericPressable : View,
    nativeProps
  );
}
export default renderBlockContent;
