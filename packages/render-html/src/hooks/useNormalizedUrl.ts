import { useDocumentMetadata } from '../context/DocumentMetadataProvider';
import normalizeResourceLocator from '../helpers/normalizeResourceLocator';

/**
 * This hook transforms relative and protocol-relative URLs to absolute URLs as
 * per {@link https://tools.ietf.org/html/rfc1808 RFC1808}. The base URL is
 * determined by the `<base />` element, `source.uri` or `source.baseUrl`. If
 * there is no `baseUrl`, this hook will return the original URL.
 *
 * @param url - The URL to normalize.
 */
export default function useNormalizedUrl(url: string) {
  const { baseUrl } = useDocumentMetadata();
  return baseUrl ? normalizeResourceLocator(url, baseUrl) : url;
}
