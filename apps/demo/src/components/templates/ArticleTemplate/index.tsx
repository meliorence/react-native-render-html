import { Stack } from '@mobily/stacks';
import React, { PropsWithChildren } from 'react';
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
import ArticleHeaderParallax, {
  ArticleHeaderParallaxProps
} from './ArticleHeaderParallax';
import ArticleHeaderFixed from './ArticleHeaderFixed';
import { View } from 'react-native';

export interface ArticleTemplateProps extends ArticleHeaderParallaxProps {}

function Article({
  children,
  ...props
}: PropsWithChildren<ArticleTemplateProps>) {
  const { onScroll } = useAnimatedContext();
  return (
    <View style={{ position: 'relative' }}>
      <Animated.ScrollView
        onScroll={onScroll}
        style={{ flexGrow: 1 }}
        contentContainerStyle={useSurfaceBackgroundStyleNucleon()}>
        <ArticleHeaderParallax {...props} />
        <BoxNucleon marginTop={4} paddingBottom={BODY_PARAGRAPH_SPACING}>
          <Stack space={BODY_CHAPTER_SPACING}>{children}</Stack>
        </BoxNucleon>
      </Animated.ScrollView>
      <ArticleHeaderFixed imageSource={props.imageSource} />
    </View>
  );
}

export default function ArticleTemplate(
  props: PropsWithChildren<ArticleTemplateProps>
) {
  return (
    <AnimatedContextProvider>
      <Article {...props} />
    </AnimatedContextProvider>
  );
}
