import React, {
  Children,
  FunctionComponentElement,
  PropsWithChildren
} from 'react';
import { Stack } from '@mobily/stacks';
import BodyChapterMolecule, {
  BodyChapterMoleculeProps
} from './BodyChapterMolecule';
import upperRoman from '@jsamr/counter-style/presets/upperRoman';
import { BODY_CHAPTER_SPACING } from '../constants';

function isBodyChapterElement(
  candidate: unknown
): candidate is FunctionComponentElement<BodyChapterMoleculeProps> {
  return (
    typeof candidate === 'object' &&
    candidate != null &&
    (candidate as any).type === BodyChapterMolecule
  );
}

export default function ArticleContainerAtom({
  children
}: PropsWithChildren<{}>) {
  const counter = upperRoman;
  let index = 1;
  return (
    <Stack space={BODY_CHAPTER_SPACING}>
      {Children.map(children, (c) => {
        if (isBodyChapterElement(c)) {
          return React.cloneElement(c, {
            ...c.props,
            prefix: counter.renderMarker(index++)
          });
        }
        return c;
      })}
    </Stack>
  );
}
