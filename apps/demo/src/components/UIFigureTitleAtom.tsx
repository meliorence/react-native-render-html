import React from 'react';
import { PropsWithChildren } from 'react';
import { useColorPrimitives } from '../theme/colorSystem';
import BoxNucleon from './nucleons/BoxNucleon';
import TextRoleNucleon from './nucleons/TextRoleNucleon';
import { PropsWithStyle } from './nucleons/types';

export default function UIFigureTitleAtom(
  props: PropsWithStyle<PropsWithChildren<{}>>
) {
  const { accent } = useColorPrimitives();
  return (
    <BoxNucleon
      grow={true}
      backgroundColor={accent.color}
      style={[
        {
          alignSelf: 'stretch'
        },
        props.style
      ]}
      padding={2}>
      <TextRoleNucleon
        style={{
          flexGrow: 0
        }}
        color={accent.content}
        role="bodyFigureTitle">
        {props.children}
      </TextRoleNucleon>
    </BoxNucleon>
  );
}
