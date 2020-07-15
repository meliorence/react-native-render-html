import React from "react";
import { Text, StyleSheet } from "react-native";
import HTML from "../index";
import Renderer from "react-test-renderer";

/**
 * https://github.com/archriss/react-native-render-html/issues/343
 */
describe("HTML component", () => {
  const letterSpacing2 = {
    letterSpacing: 2,
  };
  const letterSpacing3 = {
    letterSpacing: 3
  };
  const tagsStylesInstance1 = {
    a: letterSpacing2,
  };
  const tagsStylesInstance2 = {
    a: letterSpacing3,
  };
  it("should pass regression #343 regarding tagsStyles prop", () => {
    const testRenderer = Renderer.create(
      <HTML html={"<a>hello world</a>"} tagsStyles={tagsStylesInstance1} />
    );
    testRenderer.update(
      <HTML html={"<a>hello world</a>"} tagsStyles={tagsStylesInstance2} />
    );
    const text = testRenderer.root.findByType(Text);
    expect(StyleSheet.flatten(text.props.style)).toMatchObject(letterSpacing3);
  });
});
