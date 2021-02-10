import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { perf, wait } from 'react-performance-testing';
import useIMGElementLoader from '../useIMGElementLoader';

describe('useIMGElementLoader', () => {
  const props = {
    contentWidth: 300,
    source: { uri: 'https://foo.bar/600x300' },
    imagesInitialDimensions: { width: 30, height: 30 },
    computeImagesMaxWidth: (contentWidth: number) => contentWidth
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
  it('should start in loading state with imageBoxModel set to imagesInitialDimensions', async () => {
    const { result } = renderHook(() => useIMGElementLoader(props));
    expect(result.current.type).toEqual('loading');
    expect(result.current.imageBoxDimensions).toMatchObject({
      width: 30,
      height: 30
    });
  });
  it('should undate to success state with imageBoxModel set to scaled physical image dimensions', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useIMGElementLoader(props)
    );
    await waitForNextUpdate();
    expect(result.current.type).toEqual('success');
    expect(result.current.imageBoxDimensions).toMatchObject({
      width: 300,
      height: 150
    });
  });
});
