import React from 'react';
import { render as renderTestingLib } from '@testing-library/react-native';
import { Text, StyleSheet } from 'react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import RenderHTML from '../RenderHTML';
import { RenderHTMLProps } from '../shared-types';

export function extractTextFromInstance(instance: ReactTestInstance) {
  const textChunks = [];
  const texts = instance.findAllByType(Text);
  for (const text of texts) {
    if (typeof text.props.children === 'string') {
      textChunks.push(text.props.children);
    }
  }
  return textChunks.join('');
}

export function expectTranslatedInlineCSSRuleTo({
  cssInlineRules,
  test,
  render,
  extraProps
}: {
  cssInlineRules: string;
  extraProps?: Partial<RenderHTMLProps>;
  render: typeof renderTestingLib;
  test: (v: any) => void;
}) {
  const { getByText } = render(
    <RenderHTML
      debug={false}
      enableUserAgentStyles={false}
      enableCSSInlineProcessing={true}
      baseStyle={{}}
      source={{ html: `<span style="${cssInlineRules}">hello world</span>` }}
      {...extraProps}
    />
  );
  const text = getByText('hello world');
  // eslint-disable-next-line jest/no-disabled-tests
  test(StyleSheet.flatten(text.props.style));
}

export function expectTranslatedInlineCSSToMatchObject({
  cssInlineRules,
  reactNativeStyle,
  render
}: {
  cssInlineRules: string;
  reactNativeStyle: any;
  render: typeof renderTestingLib;
}) {
  expectTranslatedInlineCSSRuleTo({
    render,
    cssInlineRules,
    test: (flatStyle) => expect(flatStyle).toMatchObject(reactNativeStyle)
  });
}

export function expectTranslatedInlineCSSValueToEqual({
  cssInlineRules,
  reactNativePropStyleName,
  render,
  value,
  extraProps
}: {
  cssInlineRules: string;
  extraProps?: Partial<RenderHTMLProps>;
  reactNativePropStyleName: string;
  render: typeof renderTestingLib;
  value: any;
}) {
  expectTranslatedInlineCSSRuleTo({
    cssInlineRules,
    render,
    test: (style) => expect(style[reactNativePropStyleName]).toEqual(value),
    extraProps
  });
}

export function elementHasAncestorOfType(
  element: ReactTestInstance | null | undefined,
  Type: React.ElementType<any> | string
) {
  let el = element;
  while ((el = el?.parent) != null) {
    if (el.type === Type) {
      return true;
    }
  }
  return false;
}

export function getLastAncestorOfType(
  element: ReactTestInstance | null | undefined,
  Type?: React.ElementType<any>
) {
  let el = element;
  const elsOfType = [];
  while ((el = el?.parent) != null) {
    if (el.type === Type) {
      elsOfType.push(el);
    }
  }
  if (elsOfType.length > 0) {
    return elsOfType[elsOfType.length - 1];
  }
  return null;
}
