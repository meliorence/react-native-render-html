import React from "react";
import { StyleSheet } from "react-native";
import HTML from "../index";
import { render } from "react-native-testing-library";

/**
 * https://github.com/meliorence/react-native-render-html/issues/344
 */
// Skipped because a fix will require an important refactoring
// eslint-disable-next-line jest/no-disabled-tests
describe.skip("HTML component should pass regression #344", () => {
  it("when anchors nested in paragraphs have their tagStyles overriden by inline inheritance", () => {
    const tagsStyles = {
      p: {
        color: "red",
      },
      a: {
        color: "green",
      },
    };
    const { getByTestId } = render(
      <HTML
        tagsStyles={tagsStyles}
        source={{ html: '<p><img src="https://img.com/1"/>foo<a>bar</a></p>' }}
      />
    );
    const text = getByTestId("a-renderer");
    expect(StyleSheet.flatten(text.props.style)).toMatchObject({
      color: "green",
    });
  });
});
