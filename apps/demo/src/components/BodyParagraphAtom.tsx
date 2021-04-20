import React from 'react';
import BoxNucleon from './nucleons/BoxNucleon';
import TextRoleNucleon, {
  TextRoleNucleonProps
} from './nucleons/TextRoleNucleon';

export default function BodyParagraphAtom(
  props: Omit<TextRoleNucleonProps, 'role'>
) {
  return (
    <BoxNucleon paddingX={2}>
      <TextRoleNucleon role="body" {...props} />
    </BoxNucleon>
  );
}
