import React, { PropsWithChildren, Fragment } from 'react';
import { HTMLSourceInline } from 'react-native-render-html';
import { ToolkitProvider, UIToolkitConfig } from '@doc/pages';
import { TRenderEngine } from '@native-html/transient-render-engine';
import { WEBSITE_BASE } from '@doc/constants';

const Chapter = ({ children, title }: PropsWithChildren<{ title: string }>) => (
  <Fragment>
    <h2>{title}</h2>
    {children}
  </Fragment>
);

const Header = ({ children }: PropsWithChildren<{}>) => (
  <Fragment>{children}</Fragment>
);

function normalizeUrl(url: string, fragment?: string) {
  const normalizedFragment = fragment ? `#${fragment}` : '';
  if (url.startsWith('/')) {
    return WEBSITE_BASE + url.substr(1) + normalizedFragment;
  }
  return WEBSITE_BASE + url + normalizedFragment;
}

export default function MdxToolkitProvider({
  children: toolkitChildren
}: PropsWithChildren<{}>) {
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
      <reference full={false} name={name} url={url} type={type} />
    ),
    RefDoc: ({ target, children, fragment }) => {
      const linkFragments =
        target.group === 'root'
          ? ['/docs', target.id]
          : ['/docs', target.group, target.id];
      return (
        <reference
          library="react-native-render-html"
          name={(children as string) || target.title}
          url={normalizeUrl(linkFragments.join('/'), fragment)}
          type={'doc'}
          full={false}
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    RefAPI: ({ library, name, url, member, full, plural }) => {
      const isRNProp = url.match(/^\/api\/renderhtmlprops/);
      return (
        <reference
          library={library}
          name={name}
          url={normalizeUrl(url, member?.toLowerCase())}
          member={member}
          full={full || false}
          type={isRNProp ? 'rnrh-prop' : 'api-def'}
          plural={plural}
        />
      );
    },
    DList: ({ children }) => <dl>{children}</dl>,
    DListTitle: ({ children }) => <dt>{children}</dt>,
    DListItem: ({ children }) => <dd>{children}</dd>,
    Conditional: ({ platform, children }) =>
      platform === 'web' ? <Fragment>{children}</Fragment> : null
  };
  return <ToolkitProvider config={config}>{toolkitChildren}</ToolkitProvider>;
}
