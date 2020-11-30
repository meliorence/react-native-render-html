import { getStringPrefixFromIndex } from '../getStringListPrefixFromIndex';

describe('getStringPrefixFromIndex', () => {
  it('should return a one-length caracter when index < modulo', () => {
    expect(getStringPrefixFromIndex(0, 97, 26)).toEqual('a');
    expect(getStringPrefixFromIndex(1, 97, 26)).toEqual('b');
  });
  it('should return a two-length caracter when index > 1 mod && index < 2 mod', () => {
    expect(getStringPrefixFromIndex(26, 97, 26)).toEqual('aa');
    expect(getStringPrefixFromIndex(26 * 8, 97, 26)).toEqual('ha');
    expect(getStringPrefixFromIndex(27, 97, 26)).toEqual('ab');
    expect(getStringPrefixFromIndex(26 * 2 + 2, 97, 26)).toEqual('bc');
    expect(getStringPrefixFromIndex(26 * 27, 97, 26)).toEqual('aaa');
  });
});
