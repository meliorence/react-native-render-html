import React from 'react';
import path from 'path';
import { PageSpecs } from '@doc/pages';
import MdxToolkitProvider from './MdxToolkitProvider';
import { renderMdx } from './render';

export default async function genPage(pageSpecs: PageSpecs, genFolder: string) {
  const genPath =
    pageSpecs.group === 'root'
      ? [genFolder, `${pageSpecs.id}.mdx`]
      : [genFolder, pageSpecs.group, `${pageSpecs.id}.mdx`];
  return renderMdx(
    <MdxToolkitProvider
      docRelativeRoot={pageSpecs.group === 'root' ? '../..' : '../../..'}>
      {React.createElement(pageSpecs.component)}
    </MdxToolkitProvider>,
    pageSpecs,
    path.join(...genPath)
  );
}
