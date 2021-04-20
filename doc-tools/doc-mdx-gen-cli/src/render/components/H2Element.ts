import NodeWithChildren from './NodeWithChildren';

export default class H2Element extends NodeWithChildren {
  constructor() {
    super();
  }

  toMdx(): string {
    return `\n\n## ${this.childrenToMdx()}\n\n`;
  }
}
