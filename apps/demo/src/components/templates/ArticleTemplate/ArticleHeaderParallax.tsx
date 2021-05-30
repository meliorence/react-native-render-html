import React from 'react';
import Animated, {
  useAnimatedStyle,
  useDerivedValue
} from 'react-native-reanimated';
import {
  ImageBackground,
  ImageRequireSource,
  View,
  ViewStyle
} from 'react-native';
import TextRoleNucleon from '../../nucleons/TextRoleNucleon';
import { useNuclearContentWidth } from '../../nucleons/useContentWidthContext';
import { useAnimatedContext } from './AnimatedContextProvider';
import HeaderColorRolesProvider from '../../croles/HeaderColorRolesProvider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import svgAssetsIndex from '../../../svgAssetsIndex';
import { useSpacing } from '@mobily/stacks';

export type ArticleHeaderParallaxProps = {
  imageSource: ImageRequireSource;
  title: string;
  groupLabel: string;
};

const Logo = svgAssetsIndex.logo as any;

export default function ArticleHeaderParallax({
  imageSource,
  groupLabel,
  title
}: ArticleHeaderParallaxProps) {
  const width = useNuclearContentWidth();
  const height = Math.max((9 / 16) * width, 300);
  const { top: safeTop } = useSafeAreaInsets();
  const { scrollAnim } = useAnimatedContext();
  const scaleTransforms = useDerivedValue(() => {
    const minFactor = 0.65;
    // from 1 to minFactor
    const scaleFactor = Math.max(
      (height - scrollAnim.value) / height,
      minFactor
    );
    const transforms: ViewStyle['transform'] = [
      {
        scaleX: scaleFactor
      },
      {
        scaleY: scaleFactor
      }
    ];
    return transforms;
  }, [height, scrollAnim]);
  const animatedTitle = useAnimatedStyle(() => {
    return {
      textAlign: 'center',
      transform: scaleTransforms.value
    };
  }, [scaleTransforms]);
  const animatedLogo = useAnimatedStyle(() => {
    return {
      transform: scaleTransforms.value
    };
  }, [scaleTransforms]);
  return (
    <HeaderColorRolesProvider>
      <Animated.View>
        <ImageBackground
          source={imageSource}
          style={{ width, height, overflow: 'hidden' }}>
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
                marginTop: safeTop,
                alignItems: 'center'
              }}>
              <Animated.View
                style={[
                  animatedLogo,
                  { marginBottom: useSpacing(2), opacity: 0.92 }
                ]}>
                <Logo width={55} height={55} />
              </Animated.View>
              <TextRoleNucleon
                style={{ textTransform: 'uppercase' }}
                role="headerSubtitle">
                {groupLabel !== 'root' ? groupLabel : 'Getting Started'}
              </TextRoleNucleon>
              <Animated.Text style={animatedTitle}>
                <TextRoleNucleon
                  allowFontScaling={false}
                  role="headerTitleFull">
                  {title}
                </TextRoleNucleon>
              </Animated.Text>
            </View>
          </View>
        </ImageBackground>
      </Animated.View>
    </HeaderColorRolesProvider>
  );
}
