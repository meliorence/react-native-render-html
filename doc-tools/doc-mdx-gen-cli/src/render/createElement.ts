import AdmonitionElement from './components/AdmonitionElement';
import CodeBlockElement from './components/CodeBlockElement';
import RenderHTMLCardElement from './components/RenderHTMLCardElement';
import SvgFigureElement from './components/SvgFigureElement';
import H2Element from './components/H2Element';
import HTMLElement from './components/HTMLElement';
import MDXDocument from './components/MDXDocument';
import CodeElement from './components/CodeElement';
import BoldElement from './components/AnchorElement';
import ParagraphElement from './components/ParagraphElement';
import StrongElement from './components/StrongElement';
import H3Element from './components/H3Element';
import TNodeTransformDisplayElement from './components/TNodeTransformDisplayElement';
import ReferenceElement from './components/ReferenceElement';

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
    case 'renderhtmlcard':
      return new RenderHTMLCardElement(props, root!);
    case 'svgfigure':
      return new SvgFigureElement(props, root!);
    case 'tnodetransformdisplay':
      return new TNodeTransformDisplayElement(props, root!);
    case 'reference':
      return new ReferenceElement(props, root!);
    case 'h2':
      return new H2Element();
    case 'h3':
      return new H3Element();
    case 'a':
      return new BoldElement(props);
    case 'code':
      return new CodeElement(props);
    case 'p':
      return new ParagraphElement(props);
    case 'strong':
      return new StrongElement(props);
    default:
      return new HTMLElement(type, props);
  }
}

export { createElement };
