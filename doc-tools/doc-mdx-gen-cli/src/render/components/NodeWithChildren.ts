import { encode } from 'html-entities';
import encodeAttributeVal from '../encodeAttributeVal';

abstract class NodeWithChildren {
  children: Array<NodeWithChildren | string>;
  constructor() {
    this.children = [];
  }

  appendChild(child: NodeWithChildren | string) {
    this.children.push(child);
  }

  childrenToMdx() {
    return this.children
      .map((c) =>
        typeof c === 'string' ? encode(c, { level: 'all' }) : c.toMdx()
      )
      .join('');
  }

  renderPropVal(val: unknown) {
    if (typeof val === 'string') {
      return `"${encodeAttributeVal(val)}"`;
    } else {
      return `{${JSON.stringify(val)}}`;
    }
  }

  getInlineProps(props: any) {
    return Object.entries(props)
      .filter(([name]) => name !== 'children' && name !== 'key')
      .map(([name, value]) => `${name}=${this.renderPropVal(value)}`);
  }

  abstract toMdx(): string;
}

export default NodeWithChildren;
