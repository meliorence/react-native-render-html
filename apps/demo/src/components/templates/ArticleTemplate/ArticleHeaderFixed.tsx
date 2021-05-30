import { useSpacing } from '@mobily/stacks';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useAnimatedStyle,
  useDerivedValue
} from 'react-native-reanimated';
import { ImageBackground, ImageRequireSource, View } from 'react-native';
import UIAppbarActionAtom from '../../UIAppbarActionAtom';
import { useNavigation } from '@react-navigation/core';
import TextRoleNucleon from '../../nucleons/TextRoleNucleon';
import { useAnimatedContext } from './AnimatedContextProvider';
import HeaderColorRolesProvider from '../../croles/HeaderColorRolesProvider';
import svgAssetsIndex from '../../../svgAssetsIndex';

const AnimatedImageBackground = Animated.createAnimatedComponent(
  ImageBackground
);

export type ArticleHeaderProps = {
  imageSource: ImageRequireSource;
  title: string;
  groupLabel: string;
  width: number;
  height: number;
};

const Logo = svgAssetsIndex.logo as any;

const HEADER_COLL_HEIGHT = 50;

export default function ArticleHeader({
  groupLabel,
  height,
  imageSource,
  title,
  width
}: ArticleHeaderProps) {
  const navigation = useNavigation();
  const { top: safeTop } = useSafeAreaInsets();
  const { scrollAnim } = useAnimatedContext();
  const progress = useDerivedValue(() => {
    return 1 - Math.max(0, height - scrollAnim.value) / height;
  }, [height, scrollAnim]);
  const animatedTitleFull = useAnimatedStyle(() => {
    return {
      textAlign: 'center',
      opacity: 1 - progress.value
    };
  }, [progress, safeTop]);
  const animatedTitleCollapsed = useAnimatedStyle(() => {
    return {
      textAlign: 'center',
      opacity: progress.value,
      flex: 1
    };
  }, [progress, safeTop]);
  const animatedParallaxImage = useAnimatedStyle(() => {
    return {
      width,
      height,
      zIndex: 0,
      transform: [{ translateY: -1 * progress.value * height * 0.65 }]
    };
  });
  const animatedHeader = useAnimatedStyle(() => {
    return {
      height: Math.max(
        height - Math.max(scrollAnim.value, 0),
        HEADER_COLL_HEIGHT + safeTop
      ),
      top: 0,
      position: 'absolute',
      backgroundColor: 'black',
      width,
      overflow: 'hidden',
      opacity: Math.max(1 - progress.value, 0.2)
    };
  }, [scrollAnim, progress, safeTop, width]);
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
  const onMenuPress = React.useCallback(
    () => (navigation as any).openDrawer(),
    [navigation]
  );
  return (
    <HeaderColorRolesProvider>
      <Animated.View pointerEvents="none" style={animatedHeader}>
        <View style={{ overflow: 'hidden', zIndex: 1 }}>
          <AnimatedImageBackground
            source={imageSource}
            style={animatedParallaxImage}>
            <View
              style={{
                backgroundColor: 'rgba(0,0,0,0.55)',
                width,
                height,
                flexGrow: 1,
                justifyContent: 'center'
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1
                }}>
                <Animated.View
                  style={[{ marginBottom: useSpacing(2), opacity: 0.92 }]}>
                  <Logo width={55} height={55} />
                </Animated.View>
                <TextRoleNucleon
                  style={{ textTransform: 'uppercase' }}
                  role="headerSubtitle">
                  {groupLabel !== 'root' ? groupLabel : 'Getting Started'}
                </TextRoleNucleon>
                <Animated.Text style={animatedTitleFull}>
                  <TextRoleNucleon
                    allowFontScaling={false}
                    role="headerTitleFull">
                    {title}
                  </TextRoleNucleon>
                </Animated.Text>
              </View>
            </View>
          </AnimatedImageBackground>
        </View>
      </Animated.View>
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
    </HeaderColorRolesProvider>
  );
}
