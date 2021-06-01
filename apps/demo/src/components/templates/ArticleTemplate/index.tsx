/* eslint-disable react-native/no-inline-styles */
import { Stack, useSpacing } from '@mobily/stacks';
import React, {
  PropsWithChildren,
  RefObject,
  useCallback,
  useEffect,
  useRef
} from 'react';
import BoxNucleon from '../../nucleons/BoxNucleon';
import useSurfaceBackgroundStyleNucleon from '../../nucleons/useSurfaceBackgroundStyleNucleon';
import AnimatedContextProvider, {
  useAnimatedContext
} from './AnimatedContextProvider';
import Animated from 'react-native-reanimated';
import ArticleHeader from './ArticleHeader';
import { ImageRequireSource, useWindowDimensions, View } from 'react-native';
import {
  useFocusEffect,
  useNavigation,
  useRoute
} from '@react-navigation/core';
import ScrollerProvider, { useScroller } from './ScrollerProvider';
import { useNuclearContentWidth } from '../../nucleons/useContentWidthContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PageSpecs } from '@doc/pages';
import UITideAtom, { UITideAtomProps } from '../../UITideAtom';
import { useColorRoles } from '../../../theme/colorSystem';

export interface ArticleTemplateProps {
  imageSource: ImageRequireSource;
  title: string;
  groupLabel: string;
  description: string;
  prevPage: PageSpecs | null;
  nextPage: PageSpecs | null;
}

interface ArticleProps extends ArticleTemplateProps {
  fragment?: string;
  scrollRef: RefObject<Animated.ScrollView>;
  width: number;
  headerHeight: number;
}

const SCROLL_TO_DELAY = 500;

function SiblingPageTide({
  target,
  direction,
  ...props
}: Omit<UITideAtomProps, 'title'> & {
  target: PageSpecs;
  direction: 'prev' | 'next';
}) {
  const navigation = useNavigation();
  const { selectable } = useColorRoles();
  return (
    <UITideAtom
      {...props}
      style={[
        {
          backgroundColor: selectable.activeBackground,
          minHeight: 60
        },
        props.style
      ]}
      leftIconName={direction === 'prev' ? 'chevron-left' : undefined}
      rightIconName={direction === 'next' ? 'chevron-right' : undefined}
      title={target.title}
      align={direction === 'prev' ? 'left' : 'right'}
      onPress={useCallback(
        () => navigation.navigate(`${target.group}-${target.id}`),
        [navigation, target]
      )}
    />
  );
}

function Article({
  children,
  fragment,
  scrollRef,
  width,
  headerHeight,
  prevPage,
  nextPage,
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
  const gap = useSpacing(1);
  return (
    <>
      <Animated.ScrollView
        onScroll={onScroll}
        ref={scrollRef}
        style={{ width, height: headerHeight }}
        onLayout={() => scroller.setIsLoaded()}
        contentContainerStyle={[
          useSurfaceBackgroundStyleNucleon(),
          { paddingTop: headerHeight }
        ]}>
        <BoxNucleon marginTop={4}>
          <Stack space={0}>
            {children}
            <BoxNucleon alignY="stretch" direction="row">
              {prevPage ? (
                <SiblingPageTide
                  style={{
                    flexGrow: 1,
                    flexShrink: 1,
                    justifyContent: 'center',
                    marginRight: nextPage ? gap : 0
                  }}
                  direction="prev"
                  target={prevPage}
                />
              ) : (
                <View style={{ flexGrow: 1, flexShrink: 0 }} />
              )}
              {nextPage ? (
                <SiblingPageTide
                  style={{
                    flexGrow: 1,
                    flexShrink: 1,
                    justifyContent: 'center'
                  }}
                  direction="next"
                  target={nextPage}
                />
              ) : (
                <View style={{ flexGrow: 1, flexShrink: 0 }} />
              )}
            </BoxNucleon>
          </Stack>
        </BoxNucleon>
      </Animated.ScrollView>
      <ArticleHeader
        key={width}
        height={headerHeight}
        width={width}
        {...props}
      />
    </>
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
