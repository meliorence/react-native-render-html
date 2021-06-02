/* eslint-disable react-native/no-inline-styles */
import { Stack, useSpacing } from '@mobily/stacks';
import React, { PropsWithChildren, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  withRepeat,
  useSharedValue
} from 'react-native-reanimated';
import { ImageBackground, ImageRequireSource, View } from 'react-native';
import UIAppbarActionAtom from '../../UIAppbarActionAtom';
import { useNavigation } from '@react-navigation/core';
import TextRoleNucleon from '../../nucleons/TextRoleNucleon';
import { useAnimatedContext } from './AnimatedContextProvider';
import HeaderColorRolesProvider from '../../croles/HeaderColorRolesProvider';
import BoxNucleon from '../../nucleons/BoxNucleon';
import IconNucleon from '../../nucleons/IconNucleon';
import { HEADER_COLL_HEIGHT } from '../../../constants';

export type ArticleHeaderProps = {
  imageSource: ImageRequireSource;
  title: string;
  groupLabel: string;
  width: number;
  height: number;
  description: string;
};

function useAnimatedChevron() {
  const chevronScale = useSharedValue(1);
  useEffect(() => {
    chevronScale.value = 1.15;
  });
  return useAnimatedStyle(() => {
    const scale = withRepeat(
      withSpring(chevronScale.value, {
        velocity: 1,
        damping: 1000,
        stiffness: 10,
        restSpeedThreshold: 0.1
      }),
      -1,
      true
    );
    return {
      transform: [
        {
          scaleX: scale
        },
        {
          scaleY: scale
        }
      ]
    };
  });
}

function AnimatedContainer({
  height,
  width,
  progress,
  children
}: PropsWithChildren<{
  height: number;
  width: number;
  progress: Animated.SharedValue<number>;
}>) {
  const { top: safeTop } = useSafeAreaInsets();
  const { scrollAnim } = useAnimatedContext();
  const animatedHeader = useAnimatedStyle(() => {
    return {
      height: Math.max(
        height - Math.max(scrollAnim.value, 0),
        HEADER_COLL_HEIGHT + safeTop
      ),
      top: 0,
      position: 'absolute',
      backgroundColor: 'rgba(0,0,32,0.92)',
      width,
      overflow: 'hidden',
      opacity: Math.max(1 - progress.value, 0.2)
    };
  }, [scrollAnim, progress, safeTop, width, height]);
  return (
    <Animated.View pointerEvents="none" style={animatedHeader}>
      {children}
    </Animated.View>
  );
}

function AnimatedFixedHeader({
  title,
  progress
}: {
  title: string;
  progress: Animated.SharedValue<number>;
}) {
  const navigation = useNavigation();
  const { top: safeTop } = useSafeAreaInsets();
  const onMenuPress = React.useCallback(
    () => (navigation as any).openDrawer(),
    [navigation]
  );
  const animatedFixedHeader = useAnimatedStyle(
    () => ({
      left: 0,
      right: 0,
      paddingTop: safeTop,
      height: safeTop + HEADER_COLL_HEIGHT,
      position: 'absolute',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: `rgba(0,0,32,${Math.min(progress.value, 0.9)})`,
      flex: 0
    }),
    [safeTop]
  );
  const animatedTitleCollapsed = useAnimatedStyle(() => {
    return {
      textAlign: 'center',
      opacity: progress.value,
      flex: 1
    };
  }, [progress, safeTop]);
  return (
    <Animated.View style={animatedFixedHeader}>
      <UIAppbarActionAtom icon="menu" onPress={onMenuPress} />
      <Animated.Text numberOfLines={1} style={animatedTitleCollapsed}>
        <TextRoleNucleon allowFontScaling={false} role="headerTitle">
          {title}
        </TextRoleNucleon>
      </Animated.Text>
      <UIAppbarActionAtom
        onPress={() => navigation.goBack()}
        icon="chevron-left"
      />
    </Animated.View>
  );
}

function ArticleHeaderFullBody({
  width,
  height,
  progress,
  title,
  description,
  groupLabel,
  imageSource
}: {
  width: number;
  height: number;
  progress: Animated.SharedValue<number>;
  title: string;
  groupLabel: string;
  description: string;
  imageSource: ImageRequireSource;
}) {
  const animatedChevron = useAnimatedChevron();
  const animatedParallaxImage = useAnimatedStyle(() => {
    const translateY = -1 * progress.value * height * 0.65;
    return {
      width,
      height,
      transform: [{ translateY }]
    };
  }, [progress, height, width]);
  return (
    <Animated.View style={animatedParallaxImage}>
      <ImageBackground
        resizeMode="cover"
        resizeMethod="scale"
        source={imageSource}
        style={{ width, height }}>
        <View
          style={{
            backgroundColor: 'rgba(0,0,32,0.5)',
            justifyContent: 'center',
            flex: 1
          }}>
          <View
            style={{
              paddingHorizontal: useSpacing(1),
              alignItems: 'center',
              justifyContent: 'space-between',
              flex: 1
            }}>
            <Stack
              space={4}
              style={{
                flex: 1,
                justifyContent: 'center'
              }}>
              <TextRoleNucleon
                style={{ textAlign: 'center' }}
                allowFontScaling={false}
                textBreakStrategy="highQuality"
                role="headerTitleFull">
                {title}
              </TextRoleNucleon>
              <TextRoleNucleon
                style={{ textTransform: 'uppercase', textAlign: 'center' }}
                role="headerSubtitle">
                {groupLabel !== 'root' ? groupLabel : 'Getting Started'}
              </TextRoleNucleon>
            </Stack>
          </View>
          <BoxNucleon alignX="center" paddingX={1}>
            <TextRoleNucleon
              style={{ textAlign: 'center' }}
              role="headerSubtitle">
              {description}
            </TextRoleNucleon>
            <Animated.View
              style={[animatedChevron, { marginTop: useSpacing(2) }]}>
              <IconNucleon size={48} name="chevron-double-down" />
            </Animated.View>
          </BoxNucleon>
        </View>
      </ImageBackground>
    </Animated.View>
  );
}

export default function ArticleHeader({
  groupLabel,
  height,
  imageSource,
  title,
  width,
  description
}: ArticleHeaderProps) {
  const { scrollAnim } = useAnimatedContext();
  const progress = useDerivedValue(() => {
    return 1 - Math.max(0, height - scrollAnim.value) / height;
  }, [height, scrollAnim]);

  return (
    <HeaderColorRolesProvider>
      <AnimatedContainer height={height} progress={progress} width={width}>
        <ArticleHeaderFullBody
          description={description}
          groupLabel={groupLabel}
          height={height}
          imageSource={imageSource}
          progress={progress}
          title={title}
          width={width}
        />
      </AnimatedContainer>
      <AnimatedFixedHeader progress={progress} title={title} />
    </HeaderColorRolesProvider>
  );
}
