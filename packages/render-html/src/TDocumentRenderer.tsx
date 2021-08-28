import React, { memo, useEffect, useMemo } from 'react';
import { TDocument } from '@native-html/transient-render-engine';
import { DocumentMetadata, RenderHTMLSourceProps } from './shared-types';
import DocumentMetadataProvider from './context/DocumentMetadataProvider';
import TNodeRenderer from './TNodeRenderer';

const TDocumentRenderer = memo(
  ({
    tdoc,
    baseUrl,
    onDocumentMetadataLoaded
  }: {
    baseUrl?: string;
    onDocumentMetadataLoaded?: RenderHTMLSourceProps['onDocumentMetadataLoaded'];
    tdoc: TDocument;
  }) => {
    const metadata: DocumentMetadata = useMemo(() => {
      const { baseHref, baseTarget, lang, links, meta, title, dir } =
        tdoc.context;
      return {
        baseTarget,
        baseUrl: baseUrl ?? baseHref,
        lang,
        dir,
        links,
        meta,
        title
      };
    }, [tdoc.context, baseUrl]);
    useEffect(() => {
      onDocumentMetadataLoaded?.call(null, metadata);
    }, [onDocumentMetadataLoaded, metadata]);
    return (
      <DocumentMetadataProvider value={metadata}>
        <TNodeRenderer renderIndex={0} renderLength={1} tnode={tdoc} />
      </DocumentMetadataProvider>
    );
  }
);
export default TDocumentRenderer;
