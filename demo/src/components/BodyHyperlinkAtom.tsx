import React from 'react';
import { useColorRoles } from '../theme/colorSystem';
import TextRoleNucleon, {
  TextRoleNucleonProps
} from './nucleons/TextRoleNucleon';

export default function BodyHyperlinkAtom(
  props: Omit<TextRoleNucleonProps, 'role'>
) {
  const { hyperlinkColor } = useColorRoles();
  return (
    <TextRoleNucleon {...props} color={hyperlinkColor} role="bodyInlineCode" />
  );
}
