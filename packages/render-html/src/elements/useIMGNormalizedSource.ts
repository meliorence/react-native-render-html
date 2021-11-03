import { useMemo, useRef } from 'react';
import { useSharedProps } from '../context/SharedPropsProvider';
import {
  IncompleteImageDimensions,
  UseIMGElementStateProps
} from './img-types';

export default function useIMGNormalizedSource({
  source,
  specifiedDimensions
}: Pick<UseIMGElementStateProps, 'source'> & {
  specifiedDimensions: IncompleteImageDimensions;
}) {
  const cachedDimensions = useRef(specifiedDimensions);
  const { provideEmbeddedHeaders } = useSharedProps();
  return useMemo(() => {
    if (source.uri && typeof provideEmbeddedHeaders === 'function') {
      const headers = provideEmbeddedHeaders(source.uri, 'img', {
        printWidth: cachedDimensions.current?.width || undefined,
        printHeight: cachedDimensions.current?.height || undefined
      });
      if (headers) {
        return {
          headers,
          ...source
        };
      }
    }
    return source;
  }, [provideEmbeddedHeaders, source]);
}
