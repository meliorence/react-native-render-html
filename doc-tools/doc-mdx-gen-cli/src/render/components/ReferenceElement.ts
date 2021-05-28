import MDXDocument from './MDXDocument';
import NodeWithChildren from './NodeWithChildren';

export interface ReferenceElementProps {
  name: string;
  full: boolean;
  url: string;
  member?: string;
  type: string;
  library?: string;
  plural?: boolean;
}

export default class ReferenceElement extends NodeWithChildren {
  props: ReferenceElementProps;
  constructor(props: ReferenceElementProps, root: MDXDocument) {
    super();
    this.props = props;
    root.registerImport('Reference');
  }

  toMdx(): string {
    const tagName = 'Reference';
    const identifiers = [tagName, ...this.getInlineProps(this.props)];
    return `&ZeroWidthSpace;<${identifiers.join(' ')} />`;
  }
}
