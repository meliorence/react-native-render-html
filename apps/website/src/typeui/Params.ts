import type { JSONOutput } from 'typedoc';

export default class Params {
  indent: number;
  resolveMembersLinks: boolean;
  resolveTypeParamsLinks: boolean;
  resolveReflection: (id: number) => JSONOutput.DeclarationReflection;

  constructor(
    resolveReflection: (id: number) => JSONOutput.DeclarationReflection,
    resolveInternalLinks = false,
    resolveTypeParamsLinks = false,
    indent = 0
  ) {
    this.resolveReflection = resolveReflection;
    this.resolveMembersLinks = resolveInternalLinks;
    this.resolveTypeParamsLinks = resolveTypeParamsLinks;
    this.indent = indent;
  }

  withIndent() {
    return new Params(
      this.resolveReflection,
      this.resolveMembersLinks,
      this.resolveTypeParamsLinks,
      this.indent + 2
    );
  }

  withMemberLinks() {
    return new Params(
      this.resolveReflection,
      true,
      this.resolveTypeParamsLinks,
      this.indent
    );
  }

  withoutMemberLinks() {
    return new Params(
      this.resolveReflection,
      false,
      this.resolveTypeParamsLinks,
      this.indent
    );
  }

  withTypeParamsLinks() {
    return new Params(
      this.resolveReflection,
      this.resolveMembersLinks,
      true,
      this.indent
    );
  }
}
