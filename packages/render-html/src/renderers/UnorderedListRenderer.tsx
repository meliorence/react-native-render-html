import React from 'react';
import { defaultHTMLElementModels } from '@native-html/transient-render-engine';
import HTMLListElement from '../elements/HTMLListElement';
import { DefaultBlockRenderer } from '../render/render-types';

const UnorderedListRenderer: DefaultBlockRenderer = (props) => {
  return React.createElement(HTMLListElement, {
    ...props,
    defaultListType: 'disc'
  });
};

UnorderedListRenderer.model = defaultHTMLElementModels.ul;

export default UnorderedListRenderer;
