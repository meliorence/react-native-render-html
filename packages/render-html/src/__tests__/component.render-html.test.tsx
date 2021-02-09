import React from 'react';
import { render } from 'react-native-testing-library';
import RenderHTML from '../RenderHTML';
import ImgTag from '../elements/IMGElement';

describe('RenderHTML', () => {
  it('should render without error when providing a source', () => {
    expect(() =>
      render(
        <RenderHTML source={{ html: '<p>Hello world</p>' }} debug={false} />
      )
    ).not.toThrow();
  });
  it('should render without error when missing a source', () => {
    expect(() => render(<RenderHTML debug={false} />)).not.toThrow();
  });
  it('should update ImgTag contentWidth when contentWidth prop changes', () => {
    const contentWidth = 300;
    const nextContentWidth = 200;
    const { UNSAFE_getByType, update } = render(
      <RenderHTML
        source={{ html: '<img src="https://img.com/1" />' }}
        debug={false}
        contentWidth={contentWidth}
      />
    );
    expect(UNSAFE_getByType(ImgTag).props.contentWidth).toBe(contentWidth);
    update(
      <RenderHTML
        source={{ html: '<img src="https://img.com/1" />' }}
        debug={false}
        contentWidth={nextContentWidth}
      />
    );
    expect(UNSAFE_getByType(ImgTag).props.contentWidth).toBe(nextContentWidth);
  });
});
