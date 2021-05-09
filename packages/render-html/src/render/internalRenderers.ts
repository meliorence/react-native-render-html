import ARenderer from '../renderers/ARenderer';
import IMGRenderer from '../renderers/IMGRenderer';
import OLRenderer from '../renderers/OLRenderer';
import ULRenderer from '../renderers/ULRenderer';

const internalRenderers = {
  img: IMGRenderer,
  ul: ULRenderer,
  ol: OLRenderer,
  a: ARenderer
};

export default internalRenderers;
