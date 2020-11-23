import React from 'react';
import {
  TBlock,
  TEmpty,
  TNode,
  TPhrasing,
  TText
} from '@native-html/transient-render-engine';
import TBlockRenderer from './TBlockRenderer';
import TPhrasingRenderer from './TPhrasingRenderer';
import TTextRenderer from './TTextRenderer';
import { TNodeGenericRendererProps } from './shared-types';

export type TNodeRendererProps<T extends TNode> = Omit<
  TNodeGenericRendererProps<T>,
  'renderTNode' | 'renderTChildren'
>;

const TNodeRenderer: React.FunctionComponent<TNodeRendererProps<
  TNode
>> = function TNodeRenderer(props) {
  const { tnode, hasAnchorAncestor } = props;
  const childrenProps: TNodeGenericRendererProps<any> = {
    ...props,
    hasAnchorAncestor
  };
  if (tnode instanceof TBlock) {
    return React.createElement(TBlockRenderer, childrenProps);
  }
  if (tnode instanceof TPhrasing) {
    return React.createElement(
      TPhrasingRenderer,
      childrenProps as TNodeGenericRendererProps<TPhrasing>
    );
  }
  if (tnode instanceof TText) {
    return React.createElement(
      TTextRenderer,
      childrenProps as TNodeGenericRendererProps<TText>
    );
  }
  if (tnode instanceof TEmpty && tnode.isUnregistered && __DEV__) {
    console.warn(
      `There is no custom renderer registered for tag "${tnode.tagName}". The tag will not be rendered.`
    );
  }
  return null;
};

export default TNodeRenderer;
