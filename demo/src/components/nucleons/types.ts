import { StyleProp, TextProps, ViewStyle } from 'react-native';
import { TextRoleNucleonProps } from './useTextRoleNucleon';

export interface SelectorProps<V extends string | number> {
  selectedValue: V;
  onSelectedValueChange: (v: V) => void;
}

export type SelectorItem<V extends string | number> = {
  value: V;
  label?: string;
};

export interface SelectorListProps<V extends string | number>
  extends SelectorProps<V> {
  readonly items: ReadonlyArray<SelectorItem<V>> | ReadonlyArray<V>;
}

export type PropsWithStyle<P> = {
  style?: StyleProp<ViewStyle>;
} & P;

export type PropsWithStringChild<Target = TextProps> = Omit<
  Target,
  'children'
> & { children: string };

export type RefProps<T = string> = Omit<TextRoleNucleonProps, 'role'> & {
  name: T;
};
