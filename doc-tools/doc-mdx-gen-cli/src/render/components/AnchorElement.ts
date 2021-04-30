import NodeWithChildren from './NodeWithChildren';
import assert from 'assert';

export type AnchorElementProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export default class AnchorElement extends NodeWithChildren {
  props: AnchorElementProps;
  constructor(props: AnchorElementProps) {
    super();
    this.props = props;
  }

  toMdx(): string {
    const { href, children } = this.props;
    assert.strictEqual(
      typeof children,
      'string',
      'Anchor child must be a string'
    );
    return `[${this.childrenToMdx()}](${href})`;
  }
}
