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

  childrenToMdx(encodeEntities: boolean = true) {
    return this.children
      .map((c) => {
        if (typeof c === 'string') {
          if (encodeEntities) {
            return encode(c, { level: 'all' });
          }
          return c;
        }
        return c.toMdx();
      })
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
