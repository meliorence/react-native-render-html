import React from 'react';
import { defaultHTMLElementModels } from '@native-html/transient-render-engine';
import HTMLListElement from '../elements/HTMLListElement';
import { DefaultBlockRenderer } from '../render/render-types';

const OrderedListRenderer: DefaultBlockRenderer = (props) => {
  return React.createElement(HTMLListElement, {
    ...props,
    defaultListType: 'decimal'
  });
};

OrderedListRenderer.model = defaultHTMLElementModels.ol;

export default OrderedListRenderer;
