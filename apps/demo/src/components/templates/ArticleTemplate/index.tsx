/* eslint-disable react-native/no-inline-styles */
import { useSpacing } from '@mobily/stacks';
import React, {
  PropsWithChildren,
  RefObject,
  useCallback,
  useEffect,
  useRef
} from 'react';
import BoxNucleon from '../../nucleons/BoxNucleon';
import AnimatedContextProvider, {
  useAnimatedContext
} from './AnimatedContextProvider';
import Animated from 'react-native-reanimated';
import ArticleHeader from './ArticleHeader';
import { ImageRequireSource, View } from 'react-native';
import {
  useFocusEffect,
  useNavigation,
  useRoute
} from '@react-navigation/core';
import ScrollerProvider, { useScroller } from './ScrollerProvider';
import {
  useSafeAreaInsets,
  useSafeAreaFrame
} from 'react-native-safe-area-context';
import { PageSpecs } from '@doc/pages';
import UITideAtom, { UITideAtomProps } from '../../UITideAtom';

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
  return (
    <UITideAtom
      {...props}
      style={[
        {
          minHeight: 60
        },
        props.style
      ]}
      active
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
  const { top: offsetTop, bottom: offsetBottom } = useSafeAreaInsets();
  const scroller = useScroller();
  useEffect(
    function updateOffset() {
      scroller.setOffset(headerHeight - offsetTop);
    },
    [headerHeight, offsetTop, scroller]
  );
  const scrollToFragment = useCallback(
    function scrollToFragment() {
      let timeout: any = null;
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
        scrollEventThrottle={16}
        contentContainerStyle={[
          { paddingTop: headerHeight, paddingBottom: offsetBottom }
        ]}>
        <BoxNucleon>
          {children}
          <BoxNucleon padding={1} alignY="stretch" direction="row">
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
              <View style={{ flexGrow: 1, flexShrink: 0, minWidth: '50%' }} />
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
              <View style={{ flexGrow: 1, flexShrink: 0, minWidth: '50%' }} />
            )}
          </BoxNucleon>
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
  const { height: safeFrameHeight, width: safeFrameWidth } = useSafeAreaFrame();
  const scrollRef = useRef<Animated.ScrollView>() as RefObject<Animated.ScrollView>;
  const fragment = (params as any)?.fragment;
  return (
    <ScrollerProvider scrollRef={scrollRef}>
      <AnimatedContextProvider>
        <Article
          {...props}
          width={safeFrameWidth}
          headerHeight={safeFrameHeight}
          scrollRef={scrollRef}
          fragment={fragment}
        />
      </AnimatedContextProvider>
    </ScrollerProvider>
  );
}
