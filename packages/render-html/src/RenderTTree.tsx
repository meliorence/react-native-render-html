import React, { useContext } from 'react';
import domContext from './context/domContext';
import useTTree from './hooks/useTTree';
import { RenderTTreeProps } from './internal-types';
import TDocumentRenderer from './TDocumentRenderer';

export default function RenderTTree(props: RenderTTreeProps) {
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
