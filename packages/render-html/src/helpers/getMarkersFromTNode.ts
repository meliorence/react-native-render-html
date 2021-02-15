import { TNode } from '@native-html/transient-render-engine';
import { Markers } from '../shared-types';

export const defaultMarkers: Markers = {
  anchor: false,
  direction: 'ltr',
  edits: 'none',
  lang: 'en',
  olNestLevel: -1,
  ulNestLevel: -1
};

function getMarkerFromTagName(
  tagName: TNode['tagName']
): Partial<Markers> | null {
  const anchor = tagName === 'a' || null;
  const edits = tagName === 'ins' ? 'ins' : tagName === 'del' ? 'del' : null;
  if (anchor !== null) {
    return { anchor: true };
  }
  if (edits !== null) {
    return { edits };
  }
  return null;
}

function getMarkersFromAttributes(
  attributes: TNode['attributes']
): Partial<Markers> | null {
  const direction = attributes.dir;
  const lang = attributes.lang;
  if (direction != null || lang != null) {
    const markers: Partial<Markers> = {};
    markers.lang = lang;
    if (direction === 'rtl' || direction === 'ltr') {
      markers.direction = direction;
    }
    return markers;
  }
  return null;
}

export function getMarkersFromTNode(
  tnode: TNode,
  parentMarkers: Markers
): Markers | null {
  const markersFromAttrs = getMarkersFromAttributes(tnode.attributes);
  const markersFromTagName = getMarkerFromTagName(tnode.tagName);
  return markersFromAttrs != null || markersFromTagName || null
    ? {
        ...parentMarkers,
        ...markersFromAttrs,
        ...markersFromTagName
      }
    : null;
}
