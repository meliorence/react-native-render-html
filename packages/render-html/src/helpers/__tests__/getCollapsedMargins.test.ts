import { TBlock } from '@native-html/transient-render-engine';
import getCollapsedMarginTop from '../getCollapsedMarginTop';

function getNode(
  marginTop: number | undefined,
  marginBottom: number | undefined
): TBlock {
  const node = {
    styles: {
      nativeBlockFlow: {},
      nativeBlockRet: {
        marginTop,
        marginBottom
      },
      nativeTextFlow: {},
      nativeTextRet: {},
      webTextFlow: {}
    }
  } as any;
  return node;
}

function test(
  topMostBottomMargin: number,
  bottomMostTopMargin: number,
  expectedSum: number
) {
  const topMost = getNode(undefined, topMostBottomMargin);
  const bottomMost = getNode(bottomMostTopMargin, undefined);
  const result = getCollapsedMarginTop(topMost, bottomMost);
  expect((result as number) + topMostBottomMargin).toEqual(expectedSum);
}

describe('getCollapsedMarginTop', () => {
  it('should return null when bottommost has no margin top and topmost has no margin bottom', () => {
    const topmost = getNode(undefined, undefined);
    const bottommost = getNode(undefined, undefined);
    expect(getCollapsedMarginTop(topmost, bottommost)).toBe(null);
  });
  it('should return null when bottommost has a margin top and topmost has no margins', () => {
    const topmost = getNode(undefined, undefined);
    const bottommost = getNode(10, undefined);
    expect(getCollapsedMarginTop(topmost, bottommost)).toBe(null);
  });
  it('should total to the greater of both when the bottom most has a greater margin (1) ', () => {
    test(10, 20, 20);
  });
  it('should total to the greater of both when the top most has a greater margin', () => {
    test(20, 10, 20);
  });
  it('should total to the sum of both when the top most has a negative margin', () => {
    test(-10, 20, 10);
  });
  it('should total to the sum of both when the bottom most has a negative margin', () => {
    test(20, -10, 10);
  });
  it('should total to the minimum of both when both have a negative margin', () => {
    test(-20, -10, -20);
  });
});
