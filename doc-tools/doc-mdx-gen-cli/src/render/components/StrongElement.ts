import NodeWithChildren from './NodeWithChildren';
import assert from 'assert';

export type StrongElementProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export default class StrongElement extends NodeWithChildren {
  props: StrongElementProps;
  constructor(props: StrongElementProps) {
    super();
    this.props = props;
  }

  toMdx(): string {
    const { children } = this.props;
    assert.strictEqual(
      typeof children,
      'string',
      'Bold children must be a string'
    );
    return `**${this.childrenToMdx()}**`;
  }
}
