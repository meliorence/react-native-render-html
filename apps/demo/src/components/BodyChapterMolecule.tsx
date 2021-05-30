import { Stack, useSpacing } from '@mobily/stacks';
import React, {
  Children,
  FunctionComponentElement,
  PropsWithChildren
} from 'react';
import {
  BODY_CHAPTER_SPACING,
  BODY_HZ_SPACING,
  BODY_PARAGRAPH_SPACING
} from '../constants';
import { useColorRoles } from '../theme/colorSystem';
import BodyDividerAtom from './BodyDividerAtom';
import BodySectionMolecule, {
  BodySectionMoleculeProps
} from './BodySectionMolecule';
import MaxWidthContainerAtom from './MaxWidthContainerAtom';
import BoxNucleon from './nucleons/BoxNucleon';
import TextRoleNucleon from './nucleons/TextRoleNucleon';
import { PropsWithStyle } from './nucleons/types';
import { useScroller } from './templates/ArticleTemplate/ScrollerProvider';
import lowerAlpha from '@jsamr/counter-style/presets/lowerAlpha';
import { View } from 'react-native';

function isBodySectionElement(
  candidate: unknown
): candidate is FunctionComponentElement<BodySectionMoleculeProps> {
  return (
    typeof candidate === 'object' &&
    candidate != null &&
    (candidate as any).type === BodySectionMolecule
  );
}

function BodyHeader({
  children,
  style,
  prefix
}: PropsWithStyle<PropsWithChildren<{ prefix: string }>>) {
  const { surface } = useColorRoles();
  const color = surface.content;
  return (
    <Stack space={1}>
      <BoxNucleon paddingX={BODY_HZ_SPACING}>
        <BoxNucleon>
          <TextRoleNucleon color={surface.secondaryContent} role="body">
            Chapter {prefix}
          </TextRoleNucleon>
        </BoxNucleon>
        <BodyDividerAtom />
      </BoxNucleon>
      <BoxNucleon paddingX={BODY_HZ_SPACING}>
        <TextRoleNucleon color={color} role="bodyHeader1" style={style}>
          {children}
        </TextRoleNucleon>
      </BoxNucleon>
    </Stack>
  );
}

export type BodyChapterMoleculeProps = PropsWithChildren<
  PropsWithStyle<{ title: string; prefix?: string }>
>;

export default function BodyChapterMolecule({
  title,
  style,
  prefix,
  children
}: BodyChapterMoleculeProps) {
  let index = 1;
  const counter = lowerAlpha;
  const scrollIndex = useScroller();
  const chapterMarginBottom = useSpacing(BODY_CHAPTER_SPACING);
  const sectionStyle = { marginBottom: chapterMarginBottom };
  return (
    <MaxWidthContainerAtom style={style}>
      <Stack space={BODY_PARAGRAPH_SPACING}>
        <BodyHeader prefix={prefix!}>{title}</BodyHeader>
        {Children.map(children, (c) => {
          if (isBodySectionElement(c)) {
            const chapterEl = React.cloneElement(c, {
              ...c.props,
              prefix: counter.renderMarker(index++)
            });
            return (
              <View
                style={sectionStyle}
                onLayout={(e) => {
                  scrollIndex.registerLayout(e, c.props.title!);
                }}>
                {chapterEl}
              </View>
            );
          }
          return c;
        })}
      </Stack>
    </MaxWidthContainerAtom>
  );
}
