import { useMemo, useRef } from 'react';
import { useSharedProps } from '../context/SharedPropsProvider';
import { ImageDimensions } from '../shared-types';
import { UseIMGElementStateProps } from './img-types';

export default function useIMGNormalizedSource({
  source,
  concreteDimensions
}: Pick<UseIMGElementStateProps, 'source'> & {
  concreteDimensions: ImageDimensions | null;
}) {
  const cachedDimensions = useRef(concreteDimensions);
  const { provideEmbeddedHeaders } = useSharedProps();
  return useMemo(() => {
    if (source.uri && typeof provideEmbeddedHeaders === 'function') {
      const headers = provideEmbeddedHeaders(source.uri, 'img', {
        printWidth: cachedDimensions.current?.width,
        printHeight: cachedDimensions.current?.height
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
