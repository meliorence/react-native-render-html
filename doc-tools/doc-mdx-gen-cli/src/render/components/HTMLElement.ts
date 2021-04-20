import NodeWithChildren from './NodeWithChildren';

class HTMLElement extends NodeWithChildren {
  props: any;
  tagName: string;
  constructor(tagName: string, props: any) {
    super();
    this.props = props || {};
    this.tagName = tagName;
  }

  toMdx(): string {
    const identifiers = [this.tagName, ...this.getInlineProps(this.props)];
    return `<${identifiers.join(' ')}>${this.childrenToMdx()}</${
      this.tagName
    }>`;
  }
}

export default HTMLElement;
