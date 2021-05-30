import React, {
  Children,
  FunctionComponentElement,
  PropsWithChildren
} from 'react';
import { useSpacing } from '@mobily/stacks';
import BodyChapterMolecule, {
  BodyChapterMoleculeProps
} from './BodyChapterMolecule';
import upperRoman from '@jsamr/counter-style/presets/upperRoman';
import { BODY_CHAPTER_SPACING } from '../constants';
import { useScroller } from './templates/ArticleTemplate/ScrollerProvider';
import { View } from 'react-native';

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
  const scrollIndex = useScroller();
  const chapterMarginBottom = useSpacing(BODY_CHAPTER_SPACING);
  return (
    <View>
      {Children.map(children, (c) => {
        if (isBodyChapterElement(c)) {
          const chapterEl = React.cloneElement(c, {
            ...c.props,
            prefix: counter.renderMarker(index++)
          });
          return (
            <View
              style={{ marginBottom: chapterMarginBottom }}
              onLayout={(e) => {
                scrollIndex.registerLayout(e, c.props.title!);
              }}>
              {chapterEl}
            </View>
          );
        }
        return c;
      })}
    </View>
  );
}
