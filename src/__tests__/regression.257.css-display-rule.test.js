import React from "react";
import { StyleSheet } from "react-native";
import HTML from "../index";
import { render } from "react-native-testing-library";

/**
 * https://github.com/archriss/react-native-render-html/issues/257
 */
describe("HTML component", () => {
  it("should pass regression #257 regarding inline display CSS rules", () => {
    const { getByText } = render(
      <HTML
        html={'<p style="display: inline-block;">hello world</p>'}
      />
    );
    const text = getByText("hello world");
    expect(StyleSheet.flatten(text.props.style)).toMatchObject({ display: 'flex' });
  });
});
