import NodeWithChildren from './NodeWithChildren';

class HTMLElement extends NodeWithChildren {
  props: any;
  tagName: string;
  inlineTags = ['abbr'];
  constructor(tagName: string, props: any) {
    super();
    this.props = props || {};
    this.tagName = tagName;
  }

  toMdx(): string {
    const identifiers = [this.tagName, ...this.getInlineProps(this.props)];
    const tagOpen = `<${identifiers.join(' ')}>`;
    const tagClose = `</${this.tagName}>`;
    if (this.inlineTags.includes(this.tagName)) {
      // Circumvent MDX bug, see https://git.io/J3GEt
      return `&ZeroWidthSpace;${tagOpen}${this.childrenToMdx()}${tagClose}`;
    }
    // Surround children with a line gap for proper Markdown parsing.
    return `${tagOpen}

${this.childrenToMdx()}

${tagClose}`;
  }
}

export default HTMLElement;
