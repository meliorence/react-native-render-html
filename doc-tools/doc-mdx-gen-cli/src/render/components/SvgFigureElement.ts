import { SvgAssetType } from '@doc/pages';
import MDXDocument from './MDXDocument';
import NodeWithChildren from './NodeWithChildren';

export type SvgFigureElementProps = {
  asset: SvgAssetType;
  description: string;
};

export default class SvgFigureElement extends NodeWithChildren {
  props: SvgFigureElementProps;
  constructor(props: SvgFigureElementProps, root: MDXDocument) {
    super();
    this.props = props;
    root.registerImport('SvgFigure');
  }

  toMdx(): string {
    const tagName = 'SvgFigure';
    const identifiers = [tagName, ...this.getInlineProps(this.props)];
    return `\n<${identifiers.join(' ')} />\n`;
  }
}
