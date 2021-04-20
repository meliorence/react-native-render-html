import React from 'react';
import path from 'path';
import { PageSpecs } from '@doc/pages';
import MdxToolkitProvider from './MdxToolkitProvider';
import { renderMdx } from './render';

export default async function genPage(pageSpecs: PageSpecs, genFolder: string) {
  return renderMdx(
    <MdxToolkitProvider>
      {React.createElement(pageSpecs.component)}
    </MdxToolkitProvider>,
    pageSpecs,
    path.join(genFolder, pageSpecs.group, `${pageSpecs.id}.mdx`)
  );
}
