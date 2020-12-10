import { RenderHTMLSource, RenderHTMLSourceUri } from '../shared-types';
import lookupRecord from './lookupRecord';

export default function isUriSource(
  source: RenderHTMLSource
): source is RenderHTMLSourceUri {
  return lookupRecord(source, 'uri');
}
