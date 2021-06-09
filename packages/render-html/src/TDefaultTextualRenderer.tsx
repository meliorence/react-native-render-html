import React from 'react';
import { Text } from 'react-native';
import { TPhrasing, TText } from '@native-html/transient-render-engine';
import { TDefaultRenderer } from './shared-types';

const TDefaultTextualRenderer: TDefaultRenderer<TPhrasing | TText> = ({
  tnode,
  key,
  style,
  children,
  textProps,
  onPress
}) => {
  const resolvedStyles = textProps?.style ? [style, textProps.style] : style;
  return React.createElement(
    Text,
    {
      key,
      ...textProps,
      onPress,
      style: resolvedStyles,
      testID: tnode.tagName || undefined
    },
    children
  );
};

export default TDefaultTextualRenderer;
