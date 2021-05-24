import URI from 'urijs';

/**
 * This function normalize relative and protocol-relative URLs to absolute
 * URLs as per {@link https://tools.ietf.org/html/rfc1808 | RFC1808}.
 *
 * @param url - The URL to normalize.
 * @param baseUrl - The base URL to resolve relative and protocol-relative URLs.
 */
export default function normalizeResourceLocator(
  url: string,
  baseUrl?: string
) {
  try {
    return baseUrl ? URI(url).absoluteTo(URI(baseUrl)).href() : URI(url).href();
  } catch (e) {
    return url;
  }
}
