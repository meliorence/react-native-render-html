import React, { ComponentType } from 'react';
import { Text, View } from 'react-native';
import { DefaultRenderers } from '../defaultRenderers';
import { getStringPrefixFromIndex } from './getStringListPrefixFromIndex';
import numOfCharsInPrefix from './numOfCharsInPrefix';

interface ListPrefixRendererProps {
  color?: string;
  fontSize: number;
  index: number;
  nestLevel: number;
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
      style={{ color: color, fontSize }}
      children={prefix}
    />
  );
};

const DiscPrefixRenderer = (props: ListPrefixRendererProps) => {
  return <TextualPrefixRenderer {...props} prefix={'•'} />;
};

const CirclePrefixRenderer = (props: ListPrefixRendererProps) => {
  return <TextualPrefixRenderer {...props} prefix={'◦'} />;
};

const SquarePrefixRenderer = (props: ListPrefixRendererProps) => {
  return <TextualPrefixRenderer {...props} prefix={'▪'} />;
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

type SupportedListStyleType =
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

const listRenderer: DefaultRenderers['block'][string] = (props) => {
  const { nativeStyle, tnode, Default, passedProps, renderTNode } = props;
  // Map children to horizontal rows with prefixes
  const rendererSpecs =
    prefixRenderersMap[
      tnode.styles.webTextFlow.listStyleType as SupportedListStyleType
    ] ||
    (tnode.tagName === 'ol'
      ? prefixRenderersMap['decimal']
      : prefixRenderersMap['disc']);
  const prefixLength = rendererSpecs.computeStrSize(tnode.children.length);
  const bulletWidth =
    (tnode.styles.nativeTextFlow.fontSize || 12) * prefixLength;
  const paddingLeft =
    typeof tnode.styles.nativeBlockRet.paddingLeft === 'number'
      ? Math.max(tnode.styles.nativeBlockRet.paddingLeft, bulletWidth)
      : bulletWidth * 1.5;
  const PrefixRenderer = rendererSpecs.Component;
  return (
    <Default {...props} nativeStyle={[nativeStyle, { paddingLeft }]}>
      {tnode.children.map((childTNode, i) => (
        <View
          key={i}
          style={{
            flexDirection: 'row',
            flexWrap: 'nowrap'
          }}>
          <View
            style={{
              width: bulletWidth,
              marginLeft: -bulletWidth
            }}>
            <PrefixRenderer
              index={i}
              nestLevel={0}
              color={tnode.styles.nativeTextFlow.color as string}
              fontSize={tnode.styles.nativeTextFlow.fontSize || 14}
            />
          </View>
          <View>{renderTNode(childTNode, passedProps)}</View>
        </View>
      ))}
    </Default>
  );
};

export default listRenderer;
