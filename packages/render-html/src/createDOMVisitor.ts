import { isTag, isText, isDocument, NodeWithChildren } from 'domhandler';
import {
  DOMDocument,
  DOMElement,
  DOMNode,
  DOMText
} from '@native-html/transient-render-engine';

const abort = Symbol('Visit Aborted!');

/**
 * A record of callback to visit the DOM.
 *
 * @public
 */
export interface DomVisitorCallbacks {
  /**
   * A callback invoked when encountering a DOMDocument.
   *
   * @param document - The document to visit.
   *
   * @returns - Nothing if the walk should continue, `true` if the walk
   * should stop.
   */
  onDocument?(document: DOMDocument): void | boolean;
  /**
   * A callback invoked when encountering a DOMElement.
   *
   * @param document - The element to visit.
   *
   * @returns - Nothing if the walk should continue, `true` if the walk
   * should stop.
   */
  onElement?(element: DOMElement): void | boolean;
  /**
   * A callback invoked when encountering a DOMText.
   *
   * @param text - The text to visit.
   *
   * @returns - Nothing if the walk should continue, `true` if the walk
   * should stop.
   */
  onText?(text: DOMText): void | boolean;
}

/**
 * Create a function which recursively visit a DOM tree from root to bottom.
 *
 * @param callbacks - A record of callback to visit specific nodes. These
 * callback should return nothing to signal the walk should continue, e.g.
 * iterate over children, and `true` if the walk should stop early.
 *
 * @returns A function to visit the DOM tree.
 *
 * @remarks Never mutate the state of your component in the body of this
 * function! This would be an improper usage of hooks.
 *
 * @public
 */
export default function createDOMVisitor(
  callbacks: DomVisitorCallbacks
): (node: DOMNode) => DOMNode {
  let res: void | boolean;
  return function visitNode(node: DOMNode) {
    try {
      if (isText(node)) {
        res = callbacks.onText?.(node);
      } else if (isDocument(node)) {
        res = callbacks.onDocument?.(node);
      } else if (isTag(node)) {
        res = callbacks.onElement?.(node);
      }
      // Stop the walk if one of the callbacks signals it should stop.
      if (res === true) {
        throw abort;
      }
      if ('children' in node) {
        (node as NodeWithChildren).children.forEach(visitNode);
      }
    } catch (e) {
      if (e !== abort) {
        throw e;
      }
    }
    return node;
  };
}
