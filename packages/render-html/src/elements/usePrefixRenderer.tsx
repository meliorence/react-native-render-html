/* eslint-disable react-native/no-inline-styles */
import { Platform, Text, View } from 'react-native';
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
  /**
   * The number of parents of the same tag
   */
  // nestLevel: number;
}

const TextualPrefixRenderer = ({
  color,
  fontSize,
  prefix
}: Pick<ListPrefixRendererProps, 'color' | 'fontSize'> & {
  prefix: string;
}) => {
  return (
    <Text
      selectable={false}
      style={{
        color: color,
        fontSize: fontSize,
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
      top:
        (props.lineHeight - prefixSize) / 2 +
        props.fontSize * BASESLINE_OFFSET_MULTI
    }
  };
}

const BASESLINE_OFFSET_MULTI = Platform.select({ android: 0.1, default: 0 });

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
  color,
  fontSize,
  index
}: ListPrefixRendererProps) => {
  return (
    <TextualPrefixRenderer
      color={color}
      fontSize={fontSize}
      prefix={getStringPrefixFromIndex(index, 97, 26) + '.'}
    />
  );
};

const UpperAlphaPrefixRenderer = ({
  color,
  fontSize,
  index
}: ListPrefixRendererProps) => {
  return (
    <TextualPrefixRenderer
      color={color}
      fontSize={fontSize}
      prefix={getStringPrefixFromIndex(index, 65, 26) + '.'}
    />
  );
};

const NoPrefixRenderer = () => null;

const DecimalPrefixRenderer = ({
  color,
  fontSize,
  index
}: ListPrefixRendererProps) => {
  return (
    <TextualPrefixRenderer
      color={color}
      fontSize={fontSize}
      prefix={index + 1 + '.'}
    />
  );
};

interface PrefixSepcs {
  Component: ComponentType<ListPrefixRendererProps>;
  computeStrSize(length: number): number;
}

const prefixRenderersMap: Record<SupportedListStyleType, PrefixSepcs> = ({
  none: {
    Component: NoPrefixRenderer,
    computeStrSize: () => 0
  },
  disc: {
    Component: DiscPrefixRenderer,
    computeStrSize: () => 1
  },
  circle: {
    Component: CirclePrefixRenderer,
    computeStrSize: () => 1
  },
  square: {
    Component: SquarePrefixRenderer,
    computeStrSize: () => 1
  },
  decimal: {
    Component: DecimalPrefixRenderer,
    computeStrSize: (length) => numOfCharsInPrefix(length, 10)
  },
  'lower-alpha': {
    Component: LowerAlphaPrefixRenderer,
    computeStrSize: (length) => numOfCharsInPrefix(length, 26)
  },
  'upper-alpha': {
    Component: UpperAlphaPrefixRenderer,
    computeStrSize: (length) => numOfCharsInPrefix(length, 26)
  }
} as Partial<Record<SupportedListStyleType, PrefixSepcs>>) as Record<
  SupportedListStyleType,
  PrefixSepcs
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
}: HTMLListPrefixProps): PrefixSepcs {
  const selectedListType = getListStyleTypeFromNestLevel(nestLevel);
  console.info('selected style type', selectedListType);
  return listStyleType
    ? prefixRenderersMap[listStyleType as SupportedListStyleType] ||
        prefixRenderersMap[selectedListType]
    : prefixRenderersMap[selectedListType];
}
