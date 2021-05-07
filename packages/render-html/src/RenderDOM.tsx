import React, { useContext } from 'react';
import domContext from './context/domContext';
import useTTree from './hooks/useTTree';
import { RenderDOMProps } from './internal-types';
import TDocumentRenderer from './TDocumentRenderer';

export default function RenderDOM(props: RenderDOMProps) {
  const ttree = useTTree(props);
  const { onDocumentMetadataLoaded } = useContext(domContext);
  return (
    <TDocumentRenderer
      tdoc={ttree}
      baseUrl={props.baseUrl}
      onDocumentMetadataLoaded={onDocumentMetadataLoaded}
    />
  );
}
