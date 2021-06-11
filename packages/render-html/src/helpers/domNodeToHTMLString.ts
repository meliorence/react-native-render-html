import strigifyEntities from 'stringify-entities';
import {
  Node,
  isDomText,
  isDomElement
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
 */
export default function domNodeToHTMLString(
  root: Node | null,
  reporter?: DomNodeToHtmlReporter,
  depth = 0
) {
  let html = '';
  if (isDomElement(root)) {
    const strChildren = root.children.reduce((prev, curr) => {
      const convertedNode = domNodeToHTMLString(curr, reporter, depth + 1);
      return `${prev}${convertedNode}`;
    }, '');
    html = `${renderOpeningTag(root.tagName, root.attribs)}${strChildren}</${
      root.tagName
    }>`;
  } else if (isDomText(root)) {
    const text = strigifyEntities(root.data);
    html = text;
  }
  typeof reporter === 'function' && reporter(root, depth, html);
  return html;
}

/**
 * @public
 */
export interface DomNodeToHtmlReporter {
  /**
   * @param node - The node being parsed.
   * @param depth - How many parents this node have.
   * @param html - The HTML representation of this node and its children.
   */
  (node: Node | null, depth: number, html: string): void;
}
