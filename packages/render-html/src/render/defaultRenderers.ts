import AnchorRenderer from '../renderers/AnchorRenderer';
import ImageRenderer from '../renderers/ImageRenderer';
import ListRenderer from '../renderers/ListRenderer';
import { RendererRecord } from './render-types';

const defaultRenderers: RendererRecord = {
  img: ImageRenderer,
  ul: ListRenderer,
  ol: ListRenderer,
  a: AnchorRenderer
};

export default defaultRenderers;
