import { Stack } from '@mobily/stacks';
import React, {
  PropsWithChildren,
  RefObject,
  useCallback,
  useEffect,
  useRef
} from 'react';
import BoxNucleon from '../../nucleons/BoxNucleon';
import useSurfaceBackgroundStyleNucleon from '../../nucleons/useSurfaceBackgroundStyleNucleon';
import {
  BODY_CHAPTER_SPACING,
  BODY_PARAGRAPH_SPACING
} from '../../../constants';
import AnimatedContextProvider, {
  useAnimatedContext
} from './AnimatedContextProvider';
import Animated from 'react-native-reanimated';
import ArticleHeader from './ArticleHeader';
import { ImageRequireSource, useWindowDimensions, View } from 'react-native';
import { useFocusEffect, useRoute } from '@react-navigation/core';
import ScrollerProvider, { useScroller } from './ScrollerProvider';
import { useNuclearContentWidth } from '../../nucleons/useContentWidthContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface ArticleTemplateProps {
  imageSource: ImageRequireSource;
  title: string;
  groupLabel: string;
  description: string;
}

interface ArticleProps extends ArticleTemplateProps {
  fragment?: string;
  scrollRef: RefObject<Animated.ScrollView>;
  width: number;
  headerHeight: number;
}

const SCROLL_TO_DELAY = 500;

function Article({
  children,
  fragment,
  scrollRef,
  width,
  headerHeight,
  ...props
}: PropsWithChildren<ArticleProps>) {
  const { onScroll } = useAnimatedContext();
  const { top: offsetTop } = useSafeAreaInsets();
  const scroller = useScroller();
  useEffect(
    function updateOffset() {
      scroller.setOffset(headerHeight - offsetTop);
    },
    [headerHeight, offsetTop, scroller]
  );
  const scrollToFragment = useCallback(
    function scrollToFragment() {
      let timeout: null | NodeJS.Timeout = null;
      function scrollTo() {
        if (fragment) {
          if (scroller.isLoaded) {
            scroller.scrollTo(fragment);
          } else {
            // reschedule
            timeout = setTimeout(scrollTo, SCROLL_TO_DELAY);
          }
        } else {
          scroller.scrollToTop();
        }
      }
      timeout = setTimeout(scrollTo, SCROLL_TO_DELAY);
      return () => {
        timeout !== null && clearTimeout(timeout);
      };
    },
    [fragment, scroller]
  );
  useFocusEffect(scrollToFragment);
  return (
    <View
      onLayout={() => scroller.setIsLoaded()}
      style={{ position: 'relative' }}>
      <Animated.ScrollView
        onScroll={onScroll}
        ref={scrollRef}
        style={{ flexGrow: 1 }}
        contentContainerStyle={[
          useSurfaceBackgroundStyleNucleon(),
          { paddingTop: headerHeight }
        ]}>
        <BoxNucleon marginTop={4} paddingBottom={BODY_PARAGRAPH_SPACING}>
          <Stack space={BODY_CHAPTER_SPACING}>{children}</Stack>
        </BoxNucleon>
      </Animated.ScrollView>
      <ArticleHeader height={headerHeight} width={width} {...props} />
    </View>
  );
}

export default function ArticleTemplate(
  props: PropsWithChildren<ArticleTemplateProps>
) {
  const { params } = useRoute();
  const width = useNuclearContentWidth();
  const { height: windowHeight } = useWindowDimensions();
  const { top: offsetTop } = useSafeAreaInsets();
  const headerHeight = Math.max((9 / 16) * width, windowHeight + offsetTop);
  const scrollRef = useRef<Animated.ScrollView>() as RefObject<Animated.ScrollView>;
  const fragment = (params as any)?.fragment;
  return (
    <ScrollerProvider scrollRef={scrollRef}>
      <AnimatedContextProvider>
        <Article
          {...props}
          width={width}
          headerHeight={headerHeight}
          scrollRef={scrollRef}
          fragment={fragment}
        />
      </AnimatedContextProvider>
    </ScrollerProvider>
  );
}
