import * as React from 'react';
import { Platform } from 'react-native';

import { Text, TextProps } from './Themed';

export function MonoText(props: TextProps) {
  return (
    <Text
      {...props}
      style={[
        props.style,
        {
          fontFamily: Platform.select({
            ios: 'Menlo',
            default: 'monospace'
          })
        }
      ]}
    />
  );
}
