import NodeWithChildren from './NodeWithChildren';

export interface MDXDocMetadata {
  title: string;
  description: string;
  position: number;
  id: string;
}

export default class MDXDocument extends NodeWithChildren {
  expoImport = false;
  svgImport = false;
  imports: Set<string>;
  props: MDXDocMetadata;

  constructor(props: MDXDocMetadata) {
    super();
    this.props = props;
    this.imports = new Set();
  }

  registerImport(name: string) {
    this.imports.add(name);
  }

  renderFrontMatter() {
    const { id, title, description } = this.props;
    return `---
id: ${id}
title: ${title}
description: ${description}
---
`;
  }

  renderImports() {
    let importsString = '';
    for (const imp of this.imports) {
      importsString += `import ${imp} from "@site/src/components/${imp}";\n`;
    }
    return importsString + '\n';
  }

  toMdx(): string {
    return (
      this.renderFrontMatter() + this.renderImports() + this.childrenToMdx()
    );
  }
}
