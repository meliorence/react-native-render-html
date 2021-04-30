import NodeWithChildren from './NodeWithChildren';

export type ParagraphElementProps = React.AnchorHTMLAttributes<HTMLParagraphElement>;

export default class ParagraphElement extends NodeWithChildren {
  props: ParagraphElementProps;
  constructor(props: ParagraphElementProps) {
    super();
    this.props = props;
  }

  toMdx(): string {
    return `\n\n${this.childrenToMdx()}\n\n`;
  }
}
