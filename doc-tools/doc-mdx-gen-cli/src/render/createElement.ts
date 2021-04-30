import AdmonitionElement from './components/AdmonitionElement';
import CodeBlockElement from './components/CodeBlockElement';
import ExpoSnippetElement from './components/ExpoSnippetElement';
import SvgFigureElement from './components/SvgFigureElement';
import H2Element from './components/H2Element';
import HTMLElement from './components/HTMLElement';
import MDXDocument from './components/MDXDocument';
import CodeElement from './components/CodeElement';
import AnchorElement from './components/AnchorElement';
import ParagraphElement from './components/ParagraphElement';

export type NodeType = 'ROOT' | keyof JSX.IntrinsicElements;

/**
 * Creates an element for a document
 */
function createElement(type: NodeType, props: any, root: MDXDocument) {
  switch (type) {
    case 'ROOT':
      return new MDXDocument(props);
    case 'admonition':
      return new AdmonitionElement(props);
    case 'codeblockds':
      return new CodeBlockElement(props);
    case 'exposnippet':
      return new ExpoSnippetElement(props, root!);
    case 'svgfigure':
      return new SvgFigureElement(props, root!);
    case 'h2':
      return new H2Element();
    case 'a':
      return new AnchorElement(props);
    case 'code':
      return new CodeElement(props);
    case 'p':
      return new ParagraphElement(props);
    default:
      return new HTMLElement(type, props);
  }
}

export { createElement };
