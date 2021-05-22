import MDXDocument from './MDXDocument';
import NodeWithChildren from './NodeWithChildren';

const version = require('react-native-render-html/package.json').version;

export type RenderHTMLCardElementProps = {
  snippet: string;
  expoSource: string;
  title: string;
  html: string;
  snapshot: string;
  caption?: string;
  preferHtmlSrc: boolean;
  extraneousDeps: string[];
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
      expoSource,
      extraneousDeps,
      ...inlineProps
    } = this.props;
    const identifiers = [tagName, ...this.getInlineProps(inlineProps)];
    return `\n<${identifiers.join(
      ' '
    )} version="${version}" html="${encodeURIComponent(
      html
    )}" snippet="${encodeURIComponent(snippet)}" snapshot="${encodeURIComponent(
      snapshot
    )}" expoSource="${encodeURIComponent(
      expoSource
    )}" extraneousDeps={${JSON.stringify(extraneousDeps)}} />\n`;
  }
}
