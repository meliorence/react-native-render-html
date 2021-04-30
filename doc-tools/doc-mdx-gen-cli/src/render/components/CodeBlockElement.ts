import NodeWithChildren from './NodeWithChildren';

export type CodeBlockElementProps = {
  lang: string;
  content: string;
  title?: string;
  showLineNumbers: boolean;
};

export default class CodeBlockElement extends NodeWithChildren {
  props: CodeBlockElementProps;
  constructor(props: CodeBlockElementProps) {
    super();
    this.props = props;
  }

  toMdx(): string {
    const { lang, title, content, showLineNumbers } = this.props;
    return `<div class="${
      showLineNumbers ? 'codeblock--with-line-numbers' : ''
    }">\n\n\`\`\`${lang} ${title ? `title="${title}"` : ''}
${content}
\`\`\`\n\n</div>`;
  }
}
