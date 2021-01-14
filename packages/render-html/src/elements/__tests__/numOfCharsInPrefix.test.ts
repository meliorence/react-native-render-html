import numOfCharsInPrefix from '../numOfCharsInPrefix';

describe('numOfCharsInPrefix', () => {
  it('should handle length of 1', () => {
    expect(numOfCharsInPrefix(1, 10)).toEqual(1);
  });
});
