import strigifyEntities from 'stringify-entities';
import {
  SerializableNode,
  isSerializableElement,
  isSerializableText
} from '@native-html/transient-render-engine';

function renderOpeningTag(tag: string, attributes: Record<string, string>) {
  const strAttributes: string[] = [];
  Object.keys(attributes).forEach((key) => {
    strAttributes.push(`${key}="${strigifyEntities(`${attributes[key]}`)}"`);
  });
  return `<${tag}${strAttributes.length ? ' ' : ''}${strAttributes.join(' ')}>`;
}

/**
 * Convert a DOM node to its HTML representation.
 *
 * @param root - The root to stringify.
 * @param reporter - An optional function which will receive every
 * parsed node as 1st argument, the depth as 2d argument and the converted html
 * as 3d argument.
 *
 * @remarks To have access to a DOM node from a custom renderer, the element
 * model of the rendered tag must have `isOpaque` field set to `true`.
 */
export default function domNodeToHTMLString(
  root: SerializableNode | null,
  reporter?: DomNodeToHtmlReporter,
  depth = 0
) {
  let html = '';
  if (isSerializableElement(root)) {
    const strChildren = root.children.reduce((prev, curr) => {
      const convertedNode = domNodeToHTMLString(curr, reporter, depth + 1);
      return `${prev}${convertedNode}`;
    }, '');
    html = `${renderOpeningTag(root.tagName, root.attribs)}${strChildren}</${
      root.tagName
    }>`;
  } else if (isSerializableText(root)) {
    const text = strigifyEntities(root.data);
    html = text;
  }
  typeof reporter === 'function' && reporter(root, depth, html);
  return html;
}

export interface DomNodeToHtmlReporter {
  /**
   * @param node - The node being parsed.
   * @param depth - How many parents this node have.
   * @param html - The HTML representation of this node and its children.
   */
  (node: SerializableNode | null, depth: number, html: string): void;
}
