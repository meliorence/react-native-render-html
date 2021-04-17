import React from 'react';
import useTTree from './hooks/useTTree';
import { RenderResolvedHTMLProps } from './internal-types';
import TDocumentRenderer from './TDocumentRenderer';

export default function RenderResolvedHTML(props: RenderResolvedHTMLProps) {
  const ttree = useTTree(props);
  return (
    <TDocumentRenderer
      tdoc={ttree}
      baseUrl={props.baseUrl}
      onDocumentMetadataLoaded={props.onDocumentMetadataLoaded}
    />
  );
}
