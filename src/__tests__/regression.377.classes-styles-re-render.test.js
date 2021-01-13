import React from "react";
import { StyleSheet } from "react-native";
import HTML from "../index";
import { render } from "react-native-testing-library";

/**
 * https://github.com/meliorence/react-native-render-html/issues/377
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
    const { getByText, update } = render(
      <HTML
        source={{ html: '<p class="highlight">hello world</p>' }}
        classesStyles={tagsStylesInstance1}
      />
    );
    update(
      <HTML
        source={{ html: '<p class="highlight">hello world</p>' }}
        classesStyles={tagsStylesInstance2}
      />
    );
    const text = getByText("hello world");
    expect(StyleSheet.flatten(text.props.style)).toMatchObject(colorGreen);
  });
});
