import { RenderHTMLSource, RenderHTMLSourceDom } from '../shared-types';

export default function isDomSource(
  source: RenderHTMLSource
): source is RenderHTMLSourceDom {
  return 'dom' in source && typeof source.dom === 'object' && !!source.dom;
}
