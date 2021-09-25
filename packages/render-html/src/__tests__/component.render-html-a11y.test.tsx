import React from 'react';
import {
  defaultHTMLElementModels,
  HTMLContentModel,
  TBlock
} from '@native-html/transient-render-engine';
import { render } from '@testing-library/react-native';
import AccessibilityEngine from 'react-native-accessibility-engine';
import RenderHTML from '../RenderHTML';
import { CustomRendererProps } from '../shared-types';

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
    it('should provide accessibility properties to <img> renderer', async () => {
      const element = (
        <RenderHTML
          source={{
            html: '<img alt="An image" src="https://img.com/1x1" />'
          }}
          debug={false}
          contentWidth={200}
        />
      );
      const { getByA11yRole, findByTestId } = render(element);
      await findByTestId('image-success');
      const imgProps = getByA11yRole('image').props;
      expect(imgProps.accessibilityRole).toBe('image');
      expect(imgProps.accessibilityLabel).toBe('An image');
      // Waiting for AccessibilityEngine to support async udpates
      // see https://github.com/aryella-lacerda/react-native-accessibility-engine/issues/97
      // await waitFor(() =>
      //   expect(() => AccessibilityEngine.check(element)).not.toThrow()
      // );
    });
  });
  describe('regarding pressable custom renderers', () => {
    it('should add a button role if onPress is defined for custom renderers with a block content model', () => {
      const element = (
        <RenderHTML
          source={{
            html: '<button aria-label="Click me!"></button>'
          }}
          customHTMLElementModels={{
            ...defaultHTMLElementModels,
            button: defaultHTMLElementModels.button.extend({
              contentModel: HTMLContentModel.block
            })
          }}
          renderers={{
            button: ({
              TDefaultRenderer,
              ...props
            }: CustomRendererProps<TBlock>) => (
              <TDefaultRenderer onPress={() => {}} {...props} />
            )
          }}
          debug={false}
          contentWidth={200}
        />
      );
      const { getByA11yRole } = render(element);
      const buttonProps = getByA11yRole('button').props;
      expect(buttonProps.accessibilityRole).toBe('button');
      expect(() => AccessibilityEngine.check(element)).not.toThrow();
    });
    it('should add a button role if onPress is defined for custom renderers with a textual content model', () => {
      const element = (
        <RenderHTML
          source={{
            html: '<span><customlink aria-label="Click me!"></customlink></span>'
          }}
          customHTMLElementModels={{
            ...defaultHTMLElementModels,
            customlink: defaultHTMLElementModels.span
          }}
          renderers={{
            customlink: ({
              TDefaultRenderer,
              ...props
            }: CustomRendererProps<any>) => (
              <TDefaultRenderer onPress={() => {}} {...props} />
            )
          }}
          debug={false}
          contentWidth={200}
        />
      );
      const { getByA11yRole } = render(element);
      const buttonProps = getByA11yRole('link').props;
      expect(buttonProps.accessibilityRole).toBe('link');
      expect(() => AccessibilityEngine.check(element)).not.toThrow();
    });
  });
});
