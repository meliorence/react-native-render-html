import React from 'react';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
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

export type ArticleHeaderParallaxProps = {
  imageSource: ImageRequireSource;
  title: string;
  groupLabel: string;
};

export default function ArticleHeaderParallax({
  imageSource,
  groupLabel,
  title
}: ArticleHeaderParallaxProps) {
  const width = useNuclearContentWidth();
  const height = Math.max((9 / 16) * width, 300);
  const { top: safeTop } = useSafeAreaInsets();
  const { scrollAnim } = useAnimatedContext();
  const animatedStyle = useAnimatedStyle(() => {
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
    return {
      textAlign: 'center',
      transform: transforms
    };
  }, [scrollAnim, height]);
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
              <TextRoleNucleon
                style={{ textTransform: 'uppercase' }}
                role="headerSubtitle">
                {groupLabel !== 'root' ? groupLabel : 'Getting Started'}
              </TextRoleNucleon>
              <Animated.Text style={[animatedStyle]}>
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
