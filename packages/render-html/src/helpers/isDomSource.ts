import { HTMLSource, HTMLSourceDom } from '../shared-types';

export default function isDomSource(
  source: HTMLSource
): source is HTMLSourceDom {
  return 'dom' in source && typeof source.dom === 'object' && !!source.dom;
}
