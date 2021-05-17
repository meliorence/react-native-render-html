import { HTMLSource, HTMLSourceUri } from '../shared-types';

export default function isUriSource(
  source: HTMLSource
): source is HTMLSourceUri {
  return 'uri' in source && typeof source.uri === 'string';
}
