import React from "react";
import { Text, StyleSheet } from "react-native";
import HTML from "../index";

export function extractTextFromInstance(instance) {
  const textChunks = [];
  const texts = instance.findAllByType(Text);
  for (const text of texts) {
    if (typeof text.props.children === "string") {
      textChunks.push(text.props.children);
    }
  }
  return textChunks.join("");
}

export function expectTranslatedInlineCSSRuleTo({
  cssInlineRules,
  test,
  render,
}) {
  const { getByText } = render(
    <HTML source={{ html: `<p style="${cssInlineRules}">hello world</p>` }} />
  );
  const text = getByText("hello world");
  // eslint-disable-next-line jest/no-disabled-tests
  test(StyleSheet.flatten(text.props.style));
}

export function expectTranslatedInlineCSSToMatchObject({
  cssInlineRules,
  reactNativeStyle,
  render,
}) {
  expectTranslatedInlineCSSRuleTo({
    render,
    cssInlineRules,
    test: (flatStyle) => expect(flatStyle).toMatchObject(reactNativeStyle),
  });
}

export function expectTranslatedInlineCSSValueToEqual({
  cssInlineRules,
  reactNativePropStyleName,
  render,
  value,
}) {
  expectTranslatedInlineCSSRuleTo({
    cssInlineRules,
    render,
    test: (style) => expect(style[reactNativePropStyleName]).toEqual(value),
  });
}

export function expectTranslatedInlineCSSValueToBeInt({
  cssInlineRules,
  reactNativePropStyleName,
  render,
}) {
  expectTranslatedInlineCSSRuleTo({
    render,
    cssInlineRules,
    test: (flatStyle) =>
      expect(flatStyle[reactNativePropStyleName]).toEqual(expect.any(Number)),
  });
}

export function elementHasAncestorOfType(element, Type) {
  let el = element;
  while ((el = el.parent) != null) {
    if (el.type === Type) {
      return true;
    }
  }
  return false;
}

export function getLastAncestorOfType(element, Type) {
  let el = element;
  const elsOfType = [];
  while ((el = el.parent) != null) {
    if (el.type === Type) {
      elsOfType.push(el);
    }
  }
  if (elsOfType.length > 0) {
    return elsOfType[elsOfType.length - 1];
  }
  return null;
}
