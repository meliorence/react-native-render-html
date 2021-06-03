import React from 'react';
import { PropsWithChildren } from 'react';
import BoxNucleon from './nucleons/BoxNucleon';
import TextRoleNucleon from './nucleons/TextRoleNucleon';
import { PropsWithStyle } from './nucleons/types';

export default function UIFigureTitleAtom(
  props: PropsWithStyle<PropsWithChildren<{}>>
) {
  return (
    <BoxNucleon
      grow={false}
      style={[
        {
          alignSelf: 'flex-start'
        },
        props.style
      ]}
      paddingX={2}
      marginX={2}
      paddingBottom={1}>
      <TextRoleNucleon
        style={{
          flexGrow: 0
        }}
        role="bodyFigureTitle">
        {props.children}
      </TextRoleNucleon>
    </BoxNucleon>
  );
}
