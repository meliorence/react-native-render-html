import React from "react";
import { Text, StyleSheet } from "react-native";
import HTML from "../index";
import Renderer from "react-test-renderer";

/**
 * https://github.com/archriss/react-native-render-html/issues/377
 */
describe("HTML component", () => {
  const colorYellow = {
    color: "yellow",
  };
  const colorGreen = {
    color: "green",
  };
  const tagsStylesInstance1 = {
    highlight: colorYellow,
  };
  const tagsStylesInstance2 = {
    highlight: colorGreen,
  };
  it("should pass regression #377 regarding classesStyles prop", () => {
    const testRenderer = Renderer.create(
      <HTML
        html={'<p class="highlight">hello world</p>'}
        classesStyles={tagsStylesInstance1}
      />
    );
    testRenderer.update(
      <HTML
        html={'<p class="highlight">hello world</p>'}
        classesStyles={tagsStylesInstance2}
      />
    );
    const text = testRenderer.root.findByType(Text);
    expect(StyleSheet.flatten(text.props.style)).toMatchObject(colorGreen);
  });
});
