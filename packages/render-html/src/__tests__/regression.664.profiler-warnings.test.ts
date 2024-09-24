import { renderHook } from '@testing-library/react-hooks';
import useProfiler from '../hooks/useProfiler';

jest.useFakeTimers();
console.warn = jest.fn();

describe('useProfiler', () => {
  it('should log no warnings', () => {
    const { result } = renderHook(useProfiler, {
      initialProps: { prop: 'TEST' }
    });
    result.current();
    expect(console.warn).not.toHaveBeenCalled();
  });
});
