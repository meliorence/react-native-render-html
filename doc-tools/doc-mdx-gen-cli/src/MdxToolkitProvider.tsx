import React, { PropsWithChildren, Fragment } from 'react';
import { HTMLSourceInline } from 'react-native-render-html';
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

export default function MdxToolkitProvider({
  children: toolkitChildren,
  docRelativeRoot
}: PropsWithChildren<{ docRelativeRoot: string }>) {
  const config: UIToolkitConfig = {
    Chapter,
    Section: ({ children, title }) => (
      <Fragment>
        <h3>{title}</h3>
        {children}
      </Fragment>
    ),
    Header,
    List: ({ children, type = 'decimal' }) => (
      <ol style={{ listStyleType: type }}>{children}</ol>
    ),
    ListItem: ({ children }) => <li>{children}</li>,
    Paragraph: ({ children }) => <p>{children}</p>,
    Bold: ({ children }) => <strong>{children}</strong>,
    RenderHtmlCard: ({ caption, snippet, title, props, preferHtmlSrc }) => (
      <renderhtmlcard
        preferHtmlSrc={preferHtmlSrc}
        html={(props.source as HTMLSourceInline).html}
        title={title}
        caption={caption}
        snippet={snippet}
      />
    ),
    SourceDisplay: (props) => <codeblockds {...props} />,
    TNodeTransformDisplay: ({ snaphost, ...props }) => {
      return <tnodetransformdisplay snapshot={snaphost} {...props} />;
    },
    Admonition: ({ children, type, title }) => (
      <admonition type={type} title={title}>
        {children}
      </admonition>
    ),
    RefBuilder: ({ name, url }) => <a href={url}>{name}</a>,
    RefDoc: ({ target, children }) => {
      const linkFragments =
        target.group === 'root'
          ? ['/docs', target.id]
          : ['/docs', target.group, target.id];
      return <a href={linkFragments.join('/')}>{children || target.title}</a>;
    },
    Acronym: ({ fullName, name, definition }) => (
      <abbr about={definition} children={name} title={fullName} />
    ),
    SvgFigure: ({ asset, description }) => (
      <svgfigure asset={asset} description={description} />
    ),
    InlineCode: ({ children }) => <code>{children}</code>,
    Hyperlink: ({ children, url }) => <a href={url}>{children}</a>,
    RefRenderHtmlProp: ({ name, docRelativePath, fragment }) => {
      return (
        <a
          href={`${docRelativeRoot}/${docRelativePath}.md${
            fragment ? `#${fragment}` : ''
          }`}>
          {name}
        </a>
      );
    },
    Conditional: ({ platform, children }) =>
      platform === 'web' ? <Fragment>{children}</Fragment> : null
  };
  return <ToolkitProvider config={config}>{toolkitChildren}</ToolkitProvider>;
}
