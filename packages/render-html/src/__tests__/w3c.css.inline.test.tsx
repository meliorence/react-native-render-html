import { render } from '@testing-library/react-native';
import {
  expectTranslatedInlineCSSRuleTo,
  expectTranslatedInlineCSSToMatchObject,
  expectTranslatedInlineCSSValueToEqual
} from './utils';

describe('HTML component regarding inline CSS styles', () => {
  describe('should ignore rules unknown to React Native styles', () => {
    it('such as vendor-prefixed rules', () => {
      expectTranslatedInlineCSSRuleTo({
        cssInlineRules: '-webkit-box-reflect: above;',
        test: (style) => {
          expect(Object.keys(style).sort()).toStrictEqual([].sort());
        },
        render
      });
    });
  });
  describe('should handle sizes', () => {
    it('should translate size rules with a 1px = 1dip correspondence', () => {
      expectTranslatedInlineCSSToMatchObject({
        cssInlineRules: 'padding-top: 1px;',
        reactNativeStyle: { paddingTop: 1 },
        render
      });
    });
    it('should translate size rules with a 1em = 14dpi correspondence', () => {
      expectTranslatedInlineCSSToMatchObject({
        cssInlineRules: 'padding-top: 1em;',
        reactNativeStyle: { paddingTop: 14 },
        render
      });
    });
    it('should handle floating point values', () => {
      expectTranslatedInlineCSSToMatchObject({
        cssInlineRules: 'padding-top: 1.1em;',
        reactNativeStyle: { paddingTop: 14 * 1.1 },
        render
      });
    });
    it('should translate size rules with a 1pt = 1.33...dpi correspondence', () => {
      expectTranslatedInlineCSSToMatchObject({
        cssInlineRules: 'padding-top: 1pt;',
        reactNativeStyle: { paddingTop: 1 + 1 / 3 },
        render
      });
    });
    it('should transfer percent size rules', () => {
      expectTranslatedInlineCSSToMatchObject({
        cssInlineRules: 'width: 50%;',
        reactNativeStyle: { width: '50%' },
        render
      });
    });
  });
  describe('should ignore special values', () => {
    it('such as “normal”', () => {
      expectTranslatedInlineCSSValueToEqual({
        render,
        cssInlineRules: 'padding-top: normal;',
        reactNativePropStyleName: 'paddingTop',
        value: undefined
      });
    });
    it('such as “inherit”', () => {
      expectTranslatedInlineCSSValueToEqual({
        render,
        cssInlineRules: 'padding-top: inherit;',
        reactNativePropStyleName: 'paddingTop',
        value: undefined
      });
    });
    it('such as “none”', () => {
      expectTranslatedInlineCSSValueToEqual({
        render,
        cssInlineRules: 'padding-top: none;',
        reactNativePropStyleName: 'paddingTop',
        value: undefined
      });
    });
  });
  describe('should ignore special CSS functions', () => {
    it('such as “calc”', () => {
      expectTranslatedInlineCSSValueToEqual({
        render,
        cssInlineRules: 'padding-top: calc(100% - 80px);',
        reactNativePropStyleName: 'paddingTop',
        value: undefined
      });
    });
    it('such as “var”', () => {
      expectTranslatedInlineCSSValueToEqual({
        render,
        cssInlineRules: 'background-color: var(--main-bg-color);',
        reactNativePropStyleName: 'backgroundColor',
        value: undefined
      });
    });
  });
  describe('should pass color CSS functions', () => {
    it('such as “rgb”', () => {
      expectTranslatedInlineCSSValueToEqual({
        render,
        cssInlineRules: 'background-color: rgb(0,0,0);',
        reactNativePropStyleName: 'backgroundColor',
        value: 'rgb(0,0,0)'
      });
    });
    it('such as “rgba”', () => {
      expectTranslatedInlineCSSValueToEqual({
        render,
        cssInlineRules: 'background-color: rgba(0,0,0,1);',
        reactNativePropStyleName: 'backgroundColor',
        value: 'rgba(0,0,0,1)'
      });
    });
  });
  it('such as “hsla”', () => {
    expectTranslatedInlineCSSValueToEqual({
      render,
      cssInlineRules: 'background-color: hsla(360,100%,100%,1.0);',
      reactNativePropStyleName: 'backgroundColor',
      value: 'hsla(360,100%,100%,1.0)'
    });
  });
  it('such as “hsl”', () => {
    expectTranslatedInlineCSSValueToEqual({
      render,
      cssInlineRules: 'background-color: hsl(360,100%,100%);',
      reactNativePropStyleName: 'backgroundColor',
      value: 'hsl(360,100%,100%)'
    });
  });
});
