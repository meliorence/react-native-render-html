/**
 * This function normalize relative and protocol-relative URLs to absolute
 * URLs as per {@link https://tools.ietf.org/html/rfc1808 RFC1808}.
 *
 * @param resource - The URL to normalize.
 * @param baseUrl - The base URL to resolve relative and protocol-relative URLs.
 */
export default function normalizeResourceLocator(
  resource: string,
  baseUrl: string
) {
  try {
    return new URL(resource, baseUrl).href;
  } catch (e) {
    return resource;
  }
}
