import React from 'react';
import { useColorRoles } from '../theme/colorSystem';
import { TextRoleNucleonProps } from './nucleons/TextRoleNucleon';
import useTextRoleNucleon from './nucleons/useTextRoleNucleon';
import { Text } from 'react-native';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';

export default function UIHyperlinkAtom({
  children,
  ...props
}: Omit<TextRoleNucleonProps, 'role'>) {
  const { hyperlinkColor } = useColorRoles();
  const textStyle = useTextRoleNucleon({
    color: hyperlinkColor,
    role: 'bodyInlineCode'
  });
  return (
    <NativeViewGestureHandler>
      <Text {...props} style={[props.style, textStyle]} children={children} />
    </NativeViewGestureHandler>
  );
}
