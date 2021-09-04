import React from 'react';
import { Text } from 'react-native';
import { TPhrasing, TText } from '@native-html/transient-render-engine';
import { TDefaultRenderer } from './shared-types';

const TDefaultTextualRenderer: TDefaultRenderer<TPhrasing | TText> = ({
  tnode,
  style,
  children,
  textProps,
  nativeProps,
  onPress
}) => {
  const resolvedStyles = [style, nativeProps?.style, textProps.style];
  return React.createElement(
    Text,
    {
      ...tnode.getReactNativeProps()?.text,
      ...nativeProps,
      ...textProps,
      onPress,
      style: resolvedStyles,
      testID: tnode.tagName || undefined
    },
    children
  );
};

export default TDefaultTextualRenderer;
