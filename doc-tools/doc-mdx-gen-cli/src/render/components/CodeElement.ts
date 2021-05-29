import NodeWithChildren from './NodeWithChildren';
import assert from 'assert';

export type CodeElementProps = React.AnchorHTMLAttributes<HTMLDivElement>;

export default class CodeElement extends NodeWithChildren {
  props: CodeElementProps;
  constructor(props: CodeElementProps) {
    super();
    this.props = props;
  }

  toMdx(): string {
    const { children } = this.props;
    assert.strictEqual(
      typeof children,
      'string',
      'Code child must be a string'
    );
    return `\`${this.childrenToMdx(false)}\``;
  }
}
