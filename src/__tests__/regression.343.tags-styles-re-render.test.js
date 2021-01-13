import React from "react";
import { StyleSheet } from "react-native";
import HTML from "../index";
import { render } from "react-native-testing-library";

/**
 * https://github.com/meliorence/react-native-render-html/issues/343
 */
describe("HTML component", () => {
  const letterSpacing2 = {
    letterSpacing: 2,
  };
  const letterSpacing3 = {
    letterSpacing: 3,
  };
  const tagsStylesInstance1 = {
    a: letterSpacing2,
  };
  const tagsStylesInstance2 = {
    a: letterSpacing3,
  };
  it("should pass regression #343 regarding tagsStyles prop", () => {
    const { getByText, update } = render(
      <HTML
        source={{ html: "<a>hello world</a>" }}
        tagsStyles={tagsStylesInstance1}
      />
    );
    update(
      <HTML
        source={{ html: "<a>hello world</a>" }}
        tagsStyles={tagsStylesInstance2}
      />
    );
    const text = getByText("hello world");
    expect(StyleSheet.flatten(text.props.style)).toMatchObject(letterSpacing3);
  });
});
