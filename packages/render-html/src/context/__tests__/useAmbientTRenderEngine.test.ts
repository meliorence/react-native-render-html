import { renderHook } from '@testing-library/react-hooks';
import { useAmbientTRenderEngine } from '../../TRenderEngineProvider';

describe('useAmbientTRenderEngine', () => {
  it('should warn user when there is no ambient TRenderEngine', () => {
    console.error = jest.fn();
    renderHook(() => useAmbientTRenderEngine());
    expect(console.error).toHaveBeenCalledWith(
      'TRenderEngineProvider is missing in the render tree.'
    );
  });
});
