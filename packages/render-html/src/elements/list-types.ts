import type { MixedStyleDeclaration } from '@native-html/css-processor';

export type ListCounterRendererProps = {
  color: string;
  fontSize: number;
  lineHeight: number;
  index: number;
} & Pick<
  MixedStyleDeclaration,
  'fontFamily' | 'fontStyle' | 'fontWeight' | 'fontVariant'
>;

export type DefaultSupportedListStyleType =
  | 'none'
  | 'disc'
  | 'circle'
  | 'square'
  | 'decimal'
  | 'decimal-leading-zero'
  | 'lower-roman'
  | 'upper-roman'
  | 'lower-greek'
  | 'lower-alpha'
  | 'lower-latin'
  | 'upper-alpha'
  | 'upper-latin'
  | 'disclosure-open'
  | 'disclosure-closed';
