import React, { useContext } from 'react';
import { DocumentMetadata } from '../shared-types';

const DocumentMetadataContext = React.createContext<DocumentMetadata>({
  baseUrl: '',
  baseTarget: '_self',
  lang: 'en',
  links: [],
  meta: [],
  title: '',
  dir: 'ltr'
});

const DocumentMetadataProvider = DocumentMetadataContext.Provider;

export function useDocumentMetadata() {
  return useContext(DocumentMetadataContext);
}

export default DocumentMetadataProvider;
