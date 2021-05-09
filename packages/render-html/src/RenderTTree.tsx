import React, { useContext } from 'react';
import ttreeEventsContext from './context/ttreeEventsContext';
import useTTree from './hooks/useTTree';
import { RenderTTreeProps } from './internal-types';
import TDocumentRenderer from './TDocumentRenderer';

export default function RenderTTree(props: RenderTTreeProps) {
  const ttree = useTTree(props);
  const { onDocumentMetadataLoaded } = useContext(ttreeEventsContext);
  return (
    <TDocumentRenderer
      tdoc={ttree}
      baseUrl={props.baseUrl}
      onDocumentMetadataLoaded={onDocumentMetadataLoaded}
    />
  );
}
