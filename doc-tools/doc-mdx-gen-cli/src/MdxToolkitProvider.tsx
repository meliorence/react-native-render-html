import React, { PropsWithChildren, Fragment } from 'react';
import { HTMLSourceInline } from 'react-native-render-html';
import { ToolkitProvider, UIToolkitConfig } from '@doc/pages';
import { TRenderEngine } from '@native-html/transient-render-engine';

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
    RenderHtmlCard: ({
      caption,
      snippet,
      expoSource,
      title,
      props,
      preferHtmlSrc,
      extraneousDeps
    }) => {
      const html = (props.source as HTMLSourceInline).html;
      return (
        <renderhtmlcard
          preferHtmlSrc={preferHtmlSrc}
          html={html}
          title={title}
          caption={caption}
          snippet={snippet}
          expoSource={expoSource}
          extraneousDeps={extraneousDeps}
          snapshot={new TRenderEngine(props).buildTTree(html).snapshot()}
        />
      );
    },
    SourceDisplay: (props) => <codeblockds {...props} />,
    TNodeTransformDisplay: ({ snaphost, ...props }) => {
      return <tnodetransformdisplay snapshot={snaphost} {...props} />;
    },
    Admonition: ({ children, type, title }) => (
      <admonition type={type} title={title}>
        {children}
      </admonition>
    ),
    RefBuilder: ({ name, url, type }) => (
      <reference name={name} url={url} type={type} />
    ),
    RefDoc: ({ target, children }) => {
      const linkFragments =
        target.group === 'root'
          ? ['/docs', target.id]
          : ['/docs', target.group, target.id];
      return (
        <reference
          name={(children as string) || target.title}
          url={linkFragments.join('/')}
          type={'doc'}
        />
      );
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
      const url = `/${docRelativePath}${fragment ? `#${fragment}` : ''}`;
      return <reference name={name} url={url} type={'rnrh-prop'} />;
    },
    Conditional: ({ platform, children }) =>
      platform === 'web' ? <Fragment>{children}</Fragment> : null
  };
  return <ToolkitProvider config={config}>{toolkitChildren}</ToolkitProvider>;
}
