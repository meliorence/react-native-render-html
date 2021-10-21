import React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useColorRoles } from '../theme/colorSystem';
import useTextRoleNucleon from './nucleons/useTextRoleNucleon';

export type UIAppbarContentAtomProps = Omit<
  React.ComponentProps<typeof Appbar.Content>,
  'subtitleStyle' | 'color'
>;

const styles = StyleSheet.create({
  title: {
    letterSpacing: 1.5
  }
});

export default function UIAppbarContentAtom(props: UIAppbarContentAtomProps) {
  const { surface } = useColorRoles();
  const subtitleStyle = useTextRoleNucleon({
    role: 'headerSubtitle',
    color: surface.content
  });
  const titleStyle = useTextRoleNucleon({
    role: 'headerTitle',
    color: surface.content
  });
  return (
    <Appbar.Content
      color={surface.content}
      {...props}
      titleStyle={[titleStyle, styles.title]}
      subtitleStyle={subtitleStyle}
    />
  );
}
