import React, { ComponentProps, PropsWithChildren, ReactNode } from 'react';
import { Inline, Stack, useSpacing } from '@mobily/stacks';
import { ViewStyle, StyleProp, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import BoxNucleon from '../nucleons/BoxNucleon';
import TextNucleon from '../nucleons/TextNucleon';
import contentWidthContextNucleon from '../nucleons/contentWidthContextNucleon';
import { useNuclearContentWidth } from '../nucleons/useContentWidthContext';
import IconNucleon, { IconName } from '../nucleons/IconNucleon';
import GestureHandlerAdapterNucleon from '../nucleons/GestureHandlerAdapterNucleon';

export interface TideAtomProps {
  style?: StyleProp<ViewStyle>;
  title: string;
  leftIconName: IconName;
  rightIconName?: IconName;
  right?: ReactNode | (() => ReactNode);
  bottom?: ReactNode | (() => ReactNode);
  onPress?: ComponentProps<typeof TouchableRipple>['onPress'];
}

const ICON_SIZE = 25;
const RIGHT_WIDTH = 40;
const COMPONENT_PADDING = 2;
const INLINE_SPACING = 4;

function ConditionalTouchable({
  children,
  onPress
}: PropsWithChildren<{ onPress?: any }>) {
  return onPress ? (
    <GestureHandlerAdapterNucleon onPress={onPress}>
      <TouchableRipple onPress={onPress}>{children}</TouchableRipple>
    </GestureHandlerAdapterNucleon>
  ) : (
    <>{children}</>
  );
}

export default function TideAtom({
  style,
  title,
  leftIconName,
  right,
  bottom,
  onPress,
  rightIconName
}: TideAtomProps) {
  const displayRight = !!(right || rightIconName);
  const displayBottom = !!bottom;
  const inlineSpaces = Number(displayRight) + 1;
  const hzSpace = useSpacing(
    (COMPONENT_PADDING + INLINE_SPACING * inlineSpaces) * 2
  );
  const bottomContentWidth =
    useNuclearContentWidth() -
    ICON_SIZE -
    hzSpace -
    Number(displayRight) * RIGHT_WIDTH;
  return (
    <View style={style}>
      <ConditionalTouchable onPress={onPress}>
        <BoxNucleon padding={COMPONENT_PADDING}>
          <Inline space={INLINE_SPACING}>
            <BoxNucleon alignY="center">
              <IconNucleon size={ICON_SIZE} name={leftIconName} />
            </BoxNucleon>
            <BoxNucleon grow wrap="nowrap">
              <Stack space={2}>
                <TextNucleon>{title}</TextNucleon>
                {displayBottom && (
                  <View style={{ width: bottomContentWidth }}>
                    <contentWidthContextNucleon.Provider
                      value={bottomContentWidth}>
                      {typeof bottom === 'function' ? bottom() : bottom}
                    </contentWidthContextNucleon.Provider>
                  </View>
                )}
              </Stack>
            </BoxNucleon>
            {displayRight && (
              <BoxNucleon style={{ width: RIGHT_WIDTH }} alignY="center">
                {typeof right === 'function'
                  ? right()
                  : right ||
                    (rightIconName ? (
                      <IconNucleon size={ICON_SIZE} name={rightIconName} />
                    ) : null)}
              </BoxNucleon>
            )}
          </Inline>
        </BoxNucleon>
      </ConditionalTouchable>
    </View>
  );
}
