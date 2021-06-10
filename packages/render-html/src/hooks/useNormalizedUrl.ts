import { useDocumentMetadata } from '../context/DocumentMetadataProvider';
import normalizeResourceLocator from '../helpers/normalizeResourceLocator';

/**
 * This hook transforms relative and protocol-relative URLs to absolute URLs as
 * per {@link https://tools.ietf.org/html/rfc1808 | RFC1808}. The base URL is
 * determined by the `<base />` element, `source.uri` or `source.baseUrl`.
 *
 * @remarks
 * - If there is no `baseUrl` and the initial URL is relative, this hook will
 *   return the initial URL.
 * - If the initial URL is absolute, this hook will return this initial URL.
 *
 * @param initialUrl - The URL before normalization.
 *
 * @public
 */
export default function useNormalizedUrl(initialUrl: string) {
  const { baseUrl } = useDocumentMetadata();
  return normalizeResourceLocator(initialUrl, baseUrl);
}
