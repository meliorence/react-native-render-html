import React, { PropsWithChildren, Fragment } from 'react';
import { ToolkitProvider, UIToolkitConfig } from '@doc/pages';

const Chapter = ({ children, title }: PropsWithChildren<{ title: string }>) => (
  <Fragment>
    <h2>{title}</h2>
    {children}
  </Fragment>
);

const Header = ({ children }: PropsWithChildren<{}>) => (
  <Fragment>{children}</Fragment>
);

const config: UIToolkitConfig = {
  Chapter,
  Header,
  List: ({ children, type = 'decimal' }) => (
    <ol style={{ listStyleType: type }}>{children}</ol>
  ),
  ListItem: ({ children }) => <li>{children}</li>,
  Paragraph: ({ children }) => <p>{children}</p>,
  RenderHtmlCard: ({ caption, html, snippet, title }) => (
    <exposnippet
      title={title}
      caption={caption}
      snippet={snippet}
      html={html}
    />
  ),
  SourceDisplay: ({ content, lang, title }) => (
    <codeblockds lang={lang} title={title} content={content} />
  ),
  Admonition: ({ children, type, title }) => (
    <admonition type={type} title={title}>
      {children}
    </admonition>
  ),
  RefBuilder: ({ name, url }) => <a href={url}>{name}</a>,
  RefDoc: ({ target, children }) => (
    <a href={`../${target.group}/${target.id}`}>{children || target.title}</a>
  ),
  Acronym: ({ fullName, name, definition }) => (
    <abbr about={definition} children={name} title={fullName} />
  ),
  SvgFigure: ({ asset, description }) => (
    <svgfigure asset={asset} description={description} />
  ),
  InlineCode: ({ children }) => <code>{children}</code>,
  Hyperlink: ({ children, url }) => <a href={url}>{children}</a>
};

export default function MdxToolkitProvider({
  children
}: PropsWithChildren<{}>) {
  return <ToolkitProvider config={config}>{children}</ToolkitProvider>;
}
