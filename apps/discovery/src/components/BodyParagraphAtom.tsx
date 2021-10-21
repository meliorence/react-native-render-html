import React from 'react';
import { BODY_HZ_SPACING } from '../constants';
import BoxNucleon from './nucleons/BoxNucleon';
import TextRoleNucleon, {
  TextRoleNucleonProps
} from './nucleons/TextRoleNucleon';

export default function BodyParagraphAtom(
  props: Omit<TextRoleNucleonProps, 'role'>
) {
  return (
    <BoxNucleon paddingX={BODY_HZ_SPACING}>
      <TextRoleNucleon role="body" {...props} />
    </BoxNucleon>
  );
}
