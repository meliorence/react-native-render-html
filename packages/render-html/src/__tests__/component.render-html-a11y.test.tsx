import { render } from '@testing-library/react-native';
import React from 'react';
import AccessibilityEngine from 'react-native-accessibility-engine';
import RenderHTML from '../RenderHTML';

describe('RenderHTML a11y', () => {
  describe('regarding anchors', () => {
    describe('should add accessibility features to anchors when href is non-empty', () => {
      const snippets = [
        // Block
        `<a href="https://domain.com">test</a>`,
        // Inline
        `<span><a href="https://domain.com">test</a> other text</span>`
      ];
      for (const snippet of snippets) {
        it(`should pas snippet "${snippet}"`, () => {
          const element = (
            <RenderHTML
              source={{
                html: `<a href="https://domain.com">test</a>`
              }}
              debug={false}
              contentWidth={0}
            />
          );
          const { getByTestId } = render(element);
          expect(getByTestId('a').props.accessibilityRole).toBe('link');
          expect(getByTestId('a').props.accessible).toBe(true);
          expect(() => AccessibilityEngine.check(element)).not.toThrow();
        });
      }
    });
    it('should not add accessibility features to anchors when href is empty', () => {
      const element = (
        <RenderHTML
          source={{
            html: `<a href="">test</a>`
          }}
          debug={false}
          contentWidth={0}
        />
      );
      const { getByTestId } = render(element);
      expect(getByTestId('a').props.accessibilityRole).not.toBeDefined();
      expect(getByTestId('a').props.accessible).not.toBeDefined();
      expect(() => AccessibilityEngine.check(element)).not.toThrow();
    });
  });
  describe('regarding headings', () => {
    it("should add accessibility role 'header' to headings", () => {
      for (const header of ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']) {
        const element = (
          <RenderHTML
            source={{
              html: `<${header}>test</${header}>`
            }}
            debug={false}
            contentWidth={0}
          />
        );
        const { getByTestId } = render(element);
        expect(getByTestId(header).props.accessibilityRole).toBe('header');
        expect(() => AccessibilityEngine.check(element)).not.toThrow();
      }
    });
  });
  describe('regarding images', () => {
    it('should provide accessibility properties to <img> renderer', () => {
      const element = (
        <RenderHTML
          source={{
            html: '<img alt="An image" src="https://img.com/1" />'
          }}
          debug={false}
          contentWidth={200}
        />
      );
      const { getByA11yRole } = render(element);
      const imgProps = getByA11yRole('image').props;
      expect(imgProps.accessibilityRole).toBe('image');
      expect(imgProps.accessibilityLabel).toBe('An image');
      expect(() => AccessibilityEngine.check(element)).not.toThrow();
    });
  });
});
