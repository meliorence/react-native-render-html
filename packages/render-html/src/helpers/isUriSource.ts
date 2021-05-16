import { RenderHTMLSource, RenderHTMLSourceUri } from '../shared-types';

export default function isUriSource(
  source: RenderHTMLSource
): source is RenderHTMLSourceUri {
  return 'uri' in source && typeof source.uri === 'string';
}
