import type { TBlock } from '@native-html/transient-render-engine';
import React from 'react';
import ImgRenderer from './renderers/ImgRenderer';
import ListRenderer from './renderers/ListRenderer';
import type { RendererProps } from './shared-types';

export interface DefaultRenderers {
  block: Record<string, React.FunctionComponent<RendererProps<TBlock>>>;
  text: Record<string, () => string>;
}

const defaultRenderers: DefaultRenderers = {
  block: {
    img: ImgRenderer,
    ul: ListRenderer,
    ol: ListRenderer
  },
  text: {
    br: () => '\n',
    wbr: () => '\u200b'
  }
};

export default defaultRenderers;
