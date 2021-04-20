import React, { PropsWithChildren } from 'react';
import TextRoleNucleon from './nucleons/TextRoleNucleon';

export default function BodyListItemAtom({ children }: PropsWithChildren<{}>) {
  return (
    <TextRoleNucleon role="body" style={{ flexShrink: 1 }}>
      {children}
    </TextRoleNucleon>
  );
}
