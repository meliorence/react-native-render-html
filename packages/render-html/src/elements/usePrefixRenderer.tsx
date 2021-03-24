/* eslint-disable react-native/no-inline-styles */
import { Text, View } from 'react-native';
import React, { ComponentType } from 'react';
import numOfCharsInPrefix from './numOfCharsInPrefix';
import { getStringPrefixFromIndex } from './getStringListPrefixFromIndex';
import { TNode } from '@native-html/transient-render-engine';

export interface HTMLListElementProps {
  listStyleType: SupportedListStyleType;
  tnode: TNode;
  paddingLeft: number;
  fontSize: number;
  color: string;
  lineHeight: number;
  tagName?: string;
}

interface ListPrefixRendererProps {
  color?: string;
  fontSize: number;
  lineHeight: number;
  index: number;
}

const TextualPrefixRenderer = ({
  color,
  fontSize,
  lineHeight,
  prefix
}: Pick<ListPrefixRendererProps, 'color' | 'fontSize' | 'lineHeight'> & {
  prefix: string;
}) => {
  return (
    <Text
      selectable={false}
      style={{
        lineHeight,
        color,
        fontSize,
        textAlign: 'right'
      }}
      children={prefix}
    />
  );
};

function useViewPrefixRendererStyles(
  props: ListPrefixRendererProps,
  shrinkFactor = 1
) {
  const prefixSize = props.fontSize / (shrinkFactor * 2.8);
  return {
    prefixSize,
    prefixStyle: {
      width: prefixSize,
      height: prefixSize,
      // center the item vertically, relative to line height
      top: (props.lineHeight - prefixSize) / 2
    }
  };
}

const DiscPrefixRenderer = (props: ListPrefixRendererProps) => {
  const { prefixSize, prefixStyle } = useViewPrefixRendererStyles(props);
  const style = {
    borderRadius: prefixSize,
    backgroundColor: props.color,
    ...prefixStyle
  };
  return <View style={style} />;
};

const CirclePrefixRenderer = (props: ListPrefixRendererProps) => {
  const { prefixSize, prefixStyle } = useViewPrefixRendererStyles(props);
  const style = {
    borderColor: props.color,
    borderWidth: prefixSize / 10,
    borderRadius: prefixSize,
    ...prefixStyle
  };
  return <View style={style} />;
};

const SquarePrefixRenderer = (props: ListPrefixRendererProps) => {
  const { prefixStyle } = useViewPrefixRendererStyles(props, 1.2);
  return React.createElement(View, {
    style: {
      backgroundColor: props.color,
      ...prefixStyle
    }
  });
};

const LowerAlphaPrefixRenderer = ({
  index,
  ...props
}: ListPrefixRendererProps) => {
  return (
    <TextualPrefixRenderer
      {...props}
      prefix={getStringPrefixFromIndex(index, 97, 26) + '.'}
    />
  );
};

const UpperAlphaPrefixRenderer = ({
  index,
  ...props
}: ListPrefixRendererProps) => {
  return (
    <TextualPrefixRenderer
      {...props}
      prefix={getStringPrefixFromIndex(index, 65, 26) + '.'}
    />
  );
};

const LowerGreekPrefixRenderer = ({
  index,
  ...props
}: ListPrefixRendererProps) => {
  return (
    <TextualPrefixRenderer
      {...props}
      prefix={getStringPrefixFromIndex(index, 0x3b1, 0x3c9) + '.'}
    />
  );
};

const NoPrefixRenderer = () => null;

const DecimalPrefixRenderer = ({
  index,
  ...props
}: ListPrefixRendererProps) => {
  return <TextualPrefixRenderer {...props} prefix={index + 1 + '.'} />;
};

const DecimalLeadingZeroPrefixRenderer = ({
  index,
  ...props
}: ListPrefixRendererProps) => {
  const syntheticIndex = index + 1;
  return (
    <TextualPrefixRenderer
      {...props}
      prefix={`${syntheticIndex < 10 ? `0${syntheticIndex}` : syntheticIndex}.`}
    />
  );
};

interface PrefixSpecs {
  Component: ComponentType<ListPrefixRendererProps>;
  computeStrSize(length: number): number;
}

const none: PrefixSpecs = {
  Component: NoPrefixRenderer,
  computeStrSize: () => 0
};

const disc: PrefixSpecs = {
  Component: DiscPrefixRenderer,
  computeStrSize: () => 1
};

const circle: PrefixSpecs = {
  Component: CirclePrefixRenderer,
  computeStrSize: () => 1
};

const square: PrefixSpecs = {
  Component: SquarePrefixRenderer,
  computeStrSize: () => 1
};

const decimal: PrefixSpecs = {
  Component: DecimalPrefixRenderer,
  computeStrSize: (length) => numOfCharsInPrefix(length, 10)
};

const decimalLeadingZero: PrefixSpecs = {
  Component: DecimalLeadingZeroPrefixRenderer,
  computeStrSize: (length) => numOfCharsInPrefix(length < 10 ? 10 : length, 10)
};

const lowerAlpha: PrefixSpecs = {
  Component: LowerAlphaPrefixRenderer,
  computeStrSize: (length) => numOfCharsInPrefix(length, 26)
};

const upperAlpha: PrefixSpecs = {
  Component: UpperAlphaPrefixRenderer,
  computeStrSize: (length) => numOfCharsInPrefix(length, 26)
};

const lowerGreek: PrefixSpecs = {
  Component: LowerGreekPrefixRenderer,
  computeStrSize: (length) => numOfCharsInPrefix(length, 24)
};

const prefixRenderersMap: Record<SupportedListStyleType, PrefixSpecs> = ({
  none,
  disc,
  circle,
  square,
  decimal,
  'lower-alpha': lowerAlpha,
  'upper-alpha': upperAlpha,
  'lower-latin': lowerAlpha,
  'upper-latin': upperAlpha,
  'lower-greek': lowerGreek,
  'decimal-leading-zero': decimalLeadingZero
} as Partial<Record<SupportedListStyleType, PrefixSpecs>>) as Record<
  SupportedListStyleType,
  PrefixSpecs
>;

export type SupportedListStyleType =
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

export interface HTMLListPrefixProps {
  listStyleType?: string;
  nestLevel: number;
  getListStyleTypeFromNestLevel: (nestLevel: number) => SupportedListStyleType;
}

export default function usePrefixRenderer({
  listStyleType,
  getListStyleTypeFromNestLevel,
  nestLevel
}: HTMLListPrefixProps): PrefixSpecs {
  const selectedListType = getListStyleTypeFromNestLevel(nestLevel);
  return listStyleType
    ? prefixRenderersMap[listStyleType as SupportedListStyleType] ||
        prefixRenderersMap[selectedListType]
    : prefixRenderersMap[selectedListType];
}
