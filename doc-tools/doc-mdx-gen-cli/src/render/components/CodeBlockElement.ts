import NodeWithChildren from './NodeWithChildren';

export type CodeBlockElementProps = {
  lang: string;
  title?: string;
  content: string;
};

export default class CodeBlockElement extends NodeWithChildren {
  props: CodeBlockElementProps;
  constructor(props: CodeBlockElementProps) {
    super();
    this.props = props;
  }

  toMdx(): string {
    const { lang, title, content } = this.props;
    return `\n\n\`\`\`${lang} ${title ? `title="${title}"` : ''}
${content}
\`\`\`\n\n`;
  }
}
