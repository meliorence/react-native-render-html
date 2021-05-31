/* eslint-disable react-native/no-inline-styles */
import React, { ComponentProps, memo, ReactNode } from 'react';
import { Stack, useSpacing } from '@mobily/stacks';
import { ViewStyle, StyleProp, View, AccessibilityProps } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import BoxNucleon, { BoxNucleonProps } from './nucleons/BoxNucleon';
import TextRoleNucleon from './nucleons/TextRoleNucleon';
import contentWidthContextNucleon from './nucleons/contentWidthContextNucleon';
import { useNuclearContentWidth } from './nucleons/useContentWidthContext';
import IconNucleon, {
  IconName,
  IconNucleonProps
} from './nucleons/IconNucleon';
import GestureHandlerAdapterNucleon from './nucleons/GestureHandlerAdapterNucleon';
import { useColorRoles } from '../theme/colorSystem';

export interface TideAtomProps extends AccessibilityProps {
  style?: StyleProp<ViewStyle>;
  title: string;
  leftIconName?: IconName;
  rightIconName?: IconName;
  active?: boolean;
  right?: ReactNode | (({ width }: { width: number }) => ReactNode);
  bottom?: ReactNode | (() => ReactNode);
  onPress?: ComponentProps<typeof TouchableRipple>['onPress'];
}

const ICON_SIZE = 25;
const RIGHT_WIDTH = 60;
const COMPONENT_PADDING = 2;
const INLINE_SPACING = 2;

function ConditionalTouchable({ children, onPress, ...other }: any) {
  const { pressable } = useColorRoles();
  return onPress ? (
    <GestureHandlerAdapterNucleon
      underlayColor={pressable.ripple}
      onPress={onPress}
      {...other}>
      <TouchableRipple rippleColor={pressable.ripple} {...other}>
        {children}
      </TouchableRipple>
    </GestureHandlerAdapterNucleon>
  ) : (
    <>{children}</>
  );
}

function LefIcon({
  color,
  name,
  ...nucProps
}: Pick<IconNucleonProps, 'name' | 'color'> & BoxNucleonProps) {
  return (
    <BoxNucleon alignY="center" {...nucProps}>
      <IconNucleon color={color} size={ICON_SIZE} name={name} />
    </BoxNucleon>
  );
}

function Right({
  right,
  rightIconName,
  ...nucProps
}: Pick<TideAtomProps, 'right' | 'rightIconName'> & BoxNucleonProps) {
  return (
    <BoxNucleon
      alignX="center"
      alignY="center"
      {...nucProps}
      style={[{ width: RIGHT_WIDTH }, nucProps.style]}>
      {typeof right === 'function'
        ? right({ width: RIGHT_WIDTH })
        : right ||
          (rightIconName ? (
            <IconNucleon size={ICON_SIZE} name={rightIconName} />
          ) : null)}
    </BoxNucleon>
  );
}

function Title({ title, color }: { color: string; title: string }) {
  return (
    <TextRoleNucleon
      style={{ flexGrow: 1, flexShrink: 0 }}
      role="uiLabel"
      color={color}>
      {title}
    </TextRoleNucleon>
  );
}

function CenterBottom({
  availableWidth,
  bottom
}: {
  availableWidth: number;
  bottom: TideAtomProps['bottom'];
}) {
  return (
    <View style={{ width: availableWidth }}>
      <contentWidthContextNucleon.Provider value={availableWidth}>
        {typeof bottom === 'function' ? bottom() : bottom}
      </contentWidthContextNucleon.Provider>
    </View>
  );
}

const UITideAtom = memo(function UITideAtom({
  style,
  title,
  leftIconName,
  right,
  bottom,
  onPress,
  rightIconName,
  active,
  ...accessibilityProps
}: TideAtomProps) {
  const isSelectable = typeof active === 'boolean';
  const { pressable, selectable, softIconColor } = useColorRoles();
  const displayRight = !!(right || rightIconName);
  const displayBottom = !!bottom;
  const displayLeft = !!leftIconName;
  const inlineSpaces = Number(displayRight) + Number(displayLeft);
  const hzSpace = useSpacing(
    (COMPONENT_PADDING + INLINE_SPACING * inlineSpaces) * 2
  );
  const backgroundColor = isSelectable
    ? active && onPress
      ? selectable.activeBackground
      : selectable.inactiveBackground
    : pressable.background;
  const contentColor = isSelectable
    ? active
      ? selectable.activeTint
      : selectable.inactiveTint
    : pressable.tint;
  const iconColor =
    isSelectable && active ? selectable.activeTint : softIconColor;
  const middleWidth =
    useNuclearContentWidth() -
    ICON_SIZE * Number(displayLeft) -
    hzSpace -
    Number(displayRight) * RIGHT_WIDTH;
  return (
    <View
      style={[
        style,
        {
          backgroundColor
        }
      ]}>
      <ConditionalTouchable onPress={onPress} {...accessibilityProps}>
        <View
          style={{
            flexGrow: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'row',
            padding: useSpacing(COMPONENT_PADDING)
          }}>
          {displayLeft && (
            <LefIcon
              marginRight={INLINE_SPACING}
              color={iconColor}
              name={leftIconName!}
            />
          )}
          <BoxNucleon
            style={{
              flexGrow: 1
            }}
            alignY="center"
            wrap="nowrap">
            <Stack style={{ flexGrow: 1, justifyContent: 'center' }} space={1}>
              <Title color={contentColor} title={title} />
              {displayBottom && (
                <CenterBottom availableWidth={middleWidth} bottom={bottom} />
              )}
            </Stack>
          </BoxNucleon>
          {displayRight && (
            <Right
              marginLeft={INLINE_SPACING}
              right={right}
              rightIconName={rightIconName}
            />
          )}
        </View>
      </ConditionalTouchable>
    </View>
  );
});

UITideAtom.displayName = 'MemoizedUITideAtom';

export default UITideAtom;
