import React from 'react';
import {
  defaultHTMLElementModels,
  TBlock
} from '@native-html/transient-render-engine';
import HTMLListElement, {
  HTMLListElementProps
} from '../elements/HTMLListElement';
import { DefaultBlockRenderer } from '../render/render-types';
import { DefaultTagRendererProps } from '../shared-types';

export function useOrderedListRendererProps(
  props: DefaultTagRendererProps<TBlock>
): HTMLListElementProps {
  return {
    ...props,
    defaultListType: 'decimal'
  };
}

const OrderedListRenderer: DefaultBlockRenderer = (props) => {
  return React.createElement(
    HTMLListElement,
    useOrderedListRendererProps(props)
  );
};

OrderedListRenderer.model = defaultHTMLElementModels.ol;

export default OrderedListRenderer;
