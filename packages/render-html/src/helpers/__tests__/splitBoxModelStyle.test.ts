import splitBoxModelStyle from '../splitBoxModelStyle';

describe('splitBoxModelStyle', () => {
  it('should split styles in two distinct chunks', () => {
    const { boxModelStyle, otherStyle } = splitBoxModelStyle({
      borderBottomColor: 'red',
      color: 'black',
      paddingBottom: 10
    });
    expect(boxModelStyle).toEqual({
      borderBottomColor: 'red',
      paddingBottom: 10
    });
    expect(otherStyle).toEqual({
      color: 'black'
    });
  });
});
