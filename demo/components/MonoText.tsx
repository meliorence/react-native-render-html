import * as React from 'react';
import { Platform, TextProps } from 'react-native';
import Text from './Text';

export default function MonoText(props: React.PropsWithChildren<TextProps>) {
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
