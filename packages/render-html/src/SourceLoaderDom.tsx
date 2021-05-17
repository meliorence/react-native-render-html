import React from 'react';
import { SourceLoaderProps } from './internal-types';
import RenderTTree from './RenderTTree';
import { HTMLSourceDom } from './shared-types';

export type DomSourceLoaderProps = {
  source: HTMLSourceDom;
} & SourceLoaderProps;

export default function SourceLoaderDom(props: DomSourceLoaderProps) {
  return React.createElement(RenderTTree, {
    document: props.source.dom,
    baseUrl: props.source.baseUrl
  });
}
