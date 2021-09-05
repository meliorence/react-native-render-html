import React, { ReactNode } from 'react';
import { Text } from 'react-native';
import { TPhrasing, TText } from '@native-html/transient-render-engine';
import { TDefaultRendererProps } from './shared-types';

const renderTextualContent = (
  {
    tnode,
    style,
    textProps,
    nativeProps,
    onPress
  }: TDefaultRendererProps<TPhrasing | TText>,
  children: ReactNode
) => {
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

export default renderTextualContent;
