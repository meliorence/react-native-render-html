import AnchorRenderer from '../renderers/AnchorRenderer';
import ImageRenderer from '../renderers/ImageRenderer';
import ListRenderer from '../renderers/ListRenderer';
import { DefaultTagRendererRecord } from './render-types';

const defaultRenderers: DefaultTagRendererRecord = {
  img: ImageRenderer,
  ul: ListRenderer,
  ol: ListRenderer,
  a: AnchorRenderer
};

export default defaultRenderers;
