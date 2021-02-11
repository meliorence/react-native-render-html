import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { perf, wait } from 'react-performance-testing';
import useIMGElementLoader from '../useIMGElementLoader';
import { Image } from 'react-native';

describe('useIMGElementLoader', () => {
  const props = {
    contentWidth: 300,
    source: { uri: 'https://foo.bar/600x300' },
    initialDimensions: { width: 30, height: 30 },
    computeMaxWidth: (contentWidth: number) => contentWidth
  };
  it('should render at most twice when width and height physical dimensions are not provided, prior and after fetching physical dimensions', async () => {
    const { renderCount } = perf<{ TestComponent: unknown }>(React);
    renderHook(() => useIMGElementLoader(props));
    await wait(() => {
      expect(renderCount.current.TestComponent.value).toBeLessThan(2);
    });
  });
  it('should render once when width and height physical dimensions are provided, bypassing the fetching of physical dimensions', async () => {
    const { renderCount } = perf<{ TestComponent: unknown }>(React);
    renderHook(() =>
      useIMGElementLoader({
        ...props,
        width: 600,
        height: 300
      })
    );
    await wait(() => {
      expect(renderCount.current.TestComponent.value).toBe(1);
    });
  });
  it('should start in loading state with dimensions set to initialDimensions', async () => {
    const { result } = renderHook(() => useIMGElementLoader(props));
    expect(result.current.type).toEqual('loading');
    expect(result.current.dimensions).toMatchObject({
      width: 30,
      height: 30
    });
  });
  it('should update to success state with dimensions set to scaled physical image dimensions', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useIMGElementLoader(props)
    );
    await waitForNextUpdate();
    expect(result.current.type).toEqual('success');
    expect(result.current.dimensions).toMatchObject({
      width: 300,
      height: 150
    });
  });
  it('should suport cachedNaturalDimensions prop', async () => {
    Image.getSizeWithHeaders = jest.fn();
    const { result } = renderHook(() =>
      useIMGElementLoader({
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
    expect(Image.getSizeWithHeaders).not.toHaveBeenCalled();
  });
});
