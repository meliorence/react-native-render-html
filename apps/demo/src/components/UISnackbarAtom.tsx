import React, { ComponentProps } from 'react';
import { Falsy } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { useColorPrimitives } from '../theme/colorSystem';
import TextRoleNucleon, {
  TextRoleNucleonProps
} from './nucleons/TextRoleNucleon';

export type UISnackbarAtomProps = Omit<
  ComponentProps<typeof Snackbar>,
  'style' | 'children'
> & {
  children?: string | Falsy;
  textProps?: TextRoleNucleonProps;
};

export default function UISnackbarAtom({
  children,
  textProps,
  role = 'uiLabel',
  ...props
}: UISnackbarAtomProps & Pick<Partial<TextRoleNucleonProps>, 'role'>) {
  const { surface } = useColorPrimitives();
  return (
    <Snackbar style={{ backgroundColor: surface.content }} {...props}>
      <TextRoleNucleon role={role} color={surface.color} {...textProps}>
        {children}
      </TextRoleNucleon>
    </Snackbar>
  );
}
