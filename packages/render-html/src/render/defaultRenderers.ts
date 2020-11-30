import AnchorRenderer from '../renderers/AnchorRenderer';
import ImageRenderer from '../renderers/ImageRenderer';
import OrderedListRenderer from '../renderers/OrderedListRenderer';
import UnorderedListRenderer from '../renderers/UnorderedListRenderer';
import { DefaultTagRendererRecord } from './render-types';

const defaultRenderers: DefaultTagRendererRecord = {
  img: ImageRenderer,
  ul: UnorderedListRenderer,
  ol: OrderedListRenderer,
  a: AnchorRenderer
};

export default defaultRenderers;
