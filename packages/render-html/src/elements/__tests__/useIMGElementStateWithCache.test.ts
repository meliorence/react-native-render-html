import { renderHook } from '@testing-library/react-hooks';
import useIMGElementStateWithCache from '../useIMGElementStateWithCache';

const props = {
  contentWidth: 300,
  source: { uri: 'https://foo.bar/600x300' },
  initialDimensions: { width: 30, height: 30 },
  computeMaxWidth: (contentWidth: number) => contentWidth,
  tnode: {} as any
};

describe('useIMGElementStateWithCache', () => {
  it('should support cachedNaturalDimensions prop', async () => {
    const { result } = renderHook(() =>
      useIMGElementStateWithCache({
        ...props,
        cachedNaturalDimensions: {
          width: 600,
          height: 300
        }
      })
    );
    expect(result.current.type).toEqual('success');
    expect(result.current.dimensions).toMatchObject({
      width: 300,
      height: 150
    });
  });
  it('should use default initial dimensions', () => {
    const { result } = renderHook(() =>
      useIMGElementStateWithCache({
        ...props,
        initialDimensions: undefined,
        cachedNaturalDimensions: {
          width: 600,
          height: 300
        }
      })
    );
    expect(result.current.type).toEqual('success');
  });
});
