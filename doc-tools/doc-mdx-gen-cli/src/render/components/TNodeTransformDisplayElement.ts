import MDXDocument from './MDXDocument';
import NodeWithChildren from './NodeWithChildren';

export interface TNodeTransformDisplayElementProps {
  title?: string;
  caption?: string;
  html: string;
  snapshot: string;
}

export default class TNodeTransformDisplayElement extends NodeWithChildren {
  props: TNodeTransformDisplayElementProps;
  constructor(props: TNodeTransformDisplayElementProps, root: MDXDocument) {
    super();
    this.props = props;
    root.registerImport('TNodeTransformDisplay');
  }

  toMdx(): string {
    const tagName = 'TNodeTransformDisplay';
    const { snapshot, html, ...inlineProps } = this.props;
    const identifiers = [tagName, ...this.getInlineProps(inlineProps)];
    return `\n<${identifiers.join(' ')} html="${encodeURIComponent(
      html
    )}" snapshot="${encodeURIComponent(snapshot)}" />\n`;
  }
}
