import React from 'react';
import { render } from 'react-native-testing-library';
import HTML from '../RenderHTML';
import ImgTag from '../elements/IMGElement';

describe('ImgTag', () => {
  it('should update ImgTag contentWidth when contentWidth prop changes', () => {
    const contentWidth = 300;
    const nextContentWidth = 200;
    const { UNSAFE_getByType, update } = render(
      <HTML
        source={{ html: '<img src="https://img.com/1" />' }}
        debug={false}
        contentWidth={contentWidth}
      />
    );
    expect(UNSAFE_getByType(ImgTag).props.contentWidth).toBe(contentWidth);
    update(
      <HTML
        source={{ html: '<img src="https://img.com/1" />' }}
        debug={false}
        contentWidth={nextContentWidth}
      />
    );
    expect(UNSAFE_getByType(ImgTag).props.contentWidth).toBe(nextContentWidth);
  });
});
