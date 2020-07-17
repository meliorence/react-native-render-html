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

export function expectTranslatedInlineCSSRuleTo({ cssInlineRules, test, render }) {
  const { getByText } = render(
    <HTML html={`<p style="${cssInlineRules}">hello world</p>`} />
  );
  const text = getByText("hello world");
  test(StyleSheet.flatten(text.props.style));
}

export function expectTranslatedInlineCSSToMatchObject({ cssInlineRules, reactNativeStyle, render }) {
  expectTranslatedInlineCSSRuleTo({ render, cssInlineRules, test: (flatStyle) =>
    expect(flatStyle).toMatchObject(reactNativeStyle)
  });
}

export function expectTranslatedInlineCSSValueToBeInt({ cssInlineRules, reactNativePropStyleName, render }) {
  expectTranslatedInlineCSSRuleTo({ render, cssInlineRules, test: (flatStyle) =>
    expect(flatStyle[reactNativePropStyleName]).toEqual(expect.any(Number))
  });
}