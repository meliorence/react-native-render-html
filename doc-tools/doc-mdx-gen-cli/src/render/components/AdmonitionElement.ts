import type { PropsWithChildren } from 'react';
import NodeWithChildren from './NodeWithChildren';

export type AdmonitionProps = PropsWithChildren<{
  type: string;
  title?: string;
}>;

export default class AdmonitionElement extends NodeWithChildren {
  props: AdmonitionProps;
  constructor(props: AdmonitionProps) {
    super();
    this.props = props;
  }

  toMdx(): string {
    const { type, title } = this.props;
    return `\n\n:::${type} ${title || ''}

${this.childrenToMdx()}
    
:::\n\n`;
  }
}
