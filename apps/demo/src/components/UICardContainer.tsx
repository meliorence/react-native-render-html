import { useSpacing } from '@mobily/stacks';
import React, { PropsWithChildren } from 'react';
import { useColorRoles } from '../theme/colorSystem';
import CardColorRolesProvider from './croles/CardColorRolesProvider';
import BoxNucleon from './nucleons/BoxNucleon';
import TextRoleNucleon from './nucleons/TextRoleNucleon';
import { PropsWithStyle } from './nucleons/types';
import UIFigureTitleAtom from './UIFigureTitleAtom';

export type UICardContainerProps = PropsWithStyle<
  PropsWithChildren<{ title?: string; caption?: string }>
>;

function UICardInner({ children, style, caption }: UICardContainerProps) {
  const borderBottomWidth = useSpacing(2);
  const { surface } = useColorRoles();
  const cardBg = surface.background;
  return (
    <BoxNucleon
      grow={false}
      style={[
        {
          backgroundColor: cardBg,
          borderBottomColor: cardBg,
          borderBottomWidth
        },
        style
      ]}>
      {children}
      {!!caption && (
        <BoxNucleon grow={false} padding={2}>
          <TextRoleNucleon
            role="caption"
            style={{ flexShrink: 1 }}
            color={surface.secondaryContent}>
            {caption}
          </TextRoleNucleon>
        </BoxNucleon>
      )}
    </BoxNucleon>
  );
}

export default function UICardContainer(props: UICardContainerProps) {
  return (
    <>
      {props.title && <UIFigureTitleAtom children={props.title} />}
      <CardColorRolesProvider>
        <UICardInner {...props} />
      </CardColorRolesProvider>
    </>
  );
}
