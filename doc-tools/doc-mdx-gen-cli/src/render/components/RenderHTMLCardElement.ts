import MDXDocument from './MDXDocument';
import NodeWithChildren from './NodeWithChildren';

const version = require('react-native-render-html/package.json').version;

export type RenderHTMLCardElementProps = {
  snippet: string;
  title: string;
  html: string;
  snapshot: string;
  caption?: string;
  preferHtmlSrc: boolean;
};

export default class RenderHTMLCardElement extends NodeWithChildren {
  props: RenderHTMLCardElementProps;
  constructor(props: RenderHTMLCardElementProps, root: MDXDocument) {
    super();
    this.props = props;
    root.registerImport('RenderHTMLCard');
  }

  toMdx(): string {
    const tagName = 'RenderHTMLCard';
    const {
      snippet,
      html,
      preferHtmlSrc,
      snapshot,
      ...inlineProps
    } = this.props;
    const identifiers = [tagName, ...this.getInlineProps(inlineProps)];
    return `\n<${identifiers.join(
      ' '
    )} version="${version}" html="${encodeURIComponent(
      html
    )}" snippet="${encodeURIComponent(snippet)}" snapshot="${encodeURIComponent(
      snapshot
    )}" />\n`;
  }
}
