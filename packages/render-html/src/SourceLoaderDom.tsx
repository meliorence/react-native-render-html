import React from 'react';
import { SourceLoaderProps } from './internal-types';
import RenderTTree from './RenderTTree';
import { RenderHTMLSourceDom } from './shared-types';

export type DomSourceLoaderProps = {
  source: RenderHTMLSourceDom;
} & SourceLoaderProps;

export default function SourceLoaderDom(props: DomSourceLoaderProps) {
  return React.createElement(RenderTTree, {
    document: props.source.dom,
    baseUrl: props.source.baseUrl
  });
}
