import React from 'react';
import { defaultHTMLElementModels } from '@native-html/transient-render-engine';
import HTMLListElement, {
  HTMLListElementProps
} from '../elements/HTMLListElement';
import { DefaultBlockRenderer } from '../render/render-types';
import { DefaultTagRendererProps } from '../shared-types';
import { TBlock } from '@native-html/transient-render-engine';

export function useUnorderedListRendererProps(
  props: DefaultTagRendererProps<TBlock>
): HTMLListElementProps {
  return {
    ...props,
    defaultListType: 'disc'
  };
}

const UnorderedListRenderer: DefaultBlockRenderer = (props) => {
  return React.createElement(
    HTMLListElement,
    useUnorderedListRendererProps(props)
  );
};

UnorderedListRenderer.model = defaultHTMLElementModels.ul;

export default UnorderedListRenderer;
