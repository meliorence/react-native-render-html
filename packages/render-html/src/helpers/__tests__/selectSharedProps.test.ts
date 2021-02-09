import selectSharedProps from '../selectSharedProps';

describe('selectSharedProps', () => {
  it('should default to default values', () => {
    expect(selectSharedProps({ contentWidth: undefined }).contentWidth).toEqual(
      expect.any(Number)
    );
  });
  it('should retain non-nil values', () => {
    expect(selectSharedProps({ contentWidth: 300 }).contentWidth).toEqual(300);
  });
});
