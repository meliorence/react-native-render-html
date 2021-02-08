import normalizeResourceLocator from '../normalizeResourceLocator';

describe('normalizeResourceLocator', () => {
  it('should handle empty resource', () => {
    expect(normalizeResourceLocator('', '')).toEqual('');
  });
  it('should handle empty base', () => {
    expect(normalizeResourceLocator('https://foo.bar/baz', '')).toEqual(
      'https://foo.bar/baz'
    );
  });
  it('should handle absolute URLs', () => {
    expect(
      normalizeResourceLocator(
        'https://absolute.org/foo.jpg',
        'https://bar.com'
      )
    ).toEqual('https://absolute.org/foo.jpg');
  });
  it('should handle relative URLs with relative paths (1)', () => {
    expect(normalizeResourceLocator('../foo.jpg', 'https://bar.com')).toEqual(
      'https://bar.com/foo.jpg'
    );
  });
  it('should handle relative URLs with relative paths (2)', () => {
    expect(normalizeResourceLocator('foo.jpg', 'https://bar.com/baz/')).toEqual(
      'https://bar.com/baz/foo.jpg'
    );
  });
  it('should handle relative URLs with absolute paths', () => {
    expect(normalizeResourceLocator('/foo.jpg', 'https://bar.com/baz')).toEqual(
      'https://bar.com/foo.jpg'
    );
  });
  it('should handle protocol-relative URLs of same origin', () => {
    expect(
      normalizeResourceLocator('//bar.com/baz', 'https://bar.com/')
    ).toEqual('https://bar.com/baz');
  });
  it('should handle protocol-relative URLs of distinct origins', () => {
    expect(
      normalizeResourceLocator('//bar.com/baz', 'https://foo.com/')
    ).toEqual('https://bar.com/baz');
  });
  it('should pass regression #', () => {
    expect(
      normalizeResourceLocator(
        'https://www.androidpolice.com/wp-content/uploads/2020/09/30/chromecast-2_U8JJw5Ncykak-728x410.jpg',
        ''
      )
    ).toEqual(
      'https://www.androidpolice.com/wp-content/uploads/2020/09/30/chromecast-2_U8JJw5Ncykak-728x410.jpg'
    );
  });
});
