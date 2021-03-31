import * as React from 'react';
import { Text as NativeText } from 'react-native';
import { TextProps } from 'react-native';
import useTextRoleNucleon, {
  TextRoleNucleonProps as T
} from './useTextRoleNucleon';

export type TextRoleNucleonProps = React.PropsWithChildren<TextProps & T>;

export default function TextRoleNucleon({
  style,
  ...props
}: TextRoleNucleonProps) {
  const generatedStyle = useTextRoleNucleon(props);
  return <NativeText {...props} style={[generatedStyle, style]} />;
}
