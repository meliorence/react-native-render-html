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
import { BODY_CHAPTER_SPACING, BODY_VERTICAL_SPACING } from '../constants';
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
  const flatChildren = Children.toArray(children);
  return (
    <View
      style={{
        paddingVertical: useSpacing(BODY_VERTICAL_SPACING)
      }}>
      {flatChildren.map((c, i) => {
        const styles =
          i < flatChildren.length - 1
            ? { marginBottom: chapterMarginBottom }
            : undefined;
        if (isBodyChapterElement(c)) {
          const chapterEl = React.cloneElement(c, {
            ...c.props,
            prefix: counter.renderMarker(index++)
          });
          return (
            <View
              key={c.props.title!}
              style={styles}
              onLayout={(e) => {
                scrollIndex.registerLayout(e, c.props.title!);
              }}>
              {chapterEl}
            </View>
          );
        }
        return (
          <View key={i} style={styles}>
            {c}
          </View>
        );
      })}
    </View>
  );
}
