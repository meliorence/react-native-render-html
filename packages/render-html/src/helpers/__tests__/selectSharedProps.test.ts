import selectSharedProps from '../selectSharedProps';

describe('selectSharedProps', () => {
  it('should default to default values', () => {
    expect(selectSharedProps({ debug: undefined }).debug).toEqual(false);
  });
  it('should retain non-nil values', () => {
    expect(selectSharedProps({ debug: true }).debug).toEqual(true);
  });
});
