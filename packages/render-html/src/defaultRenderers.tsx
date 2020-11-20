import type { TBlock } from '@native-html/transient-render-tree';
import imgRenderer from './renderers/imgRenderer';
import listRenderer from './renderers/listRenderer';
import type { RendererProps } from './types';

export interface DefaultRenderers {
  block: Record<string, (props: RendererProps<TBlock>) => any>;
  text: Record<string, () => string>;
}

const defaultRenderers: DefaultRenderers = {
  block: {
    img: imgRenderer,
    ul: listRenderer,
    ol: listRenderer
  },
  text: {
    br: () => '\n',
    wbr: () => '\u200b'
  }
};

export default defaultRenderers;
