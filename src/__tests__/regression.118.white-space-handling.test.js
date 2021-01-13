import React from "react";
import HTML from "../index";
import renderer from "react-test-renderer";
import { extractTextFromInstance } from "./utils";

/**
 * https://github.com/meliorence/react-native-render-html/issues/118
 */
// Skip because a fix is not ready yet
// eslint-disable-next-line jest/no-disabled-tests
describe.skip("HTML component", () => {
  it("should pass regression #118 regarding handling of CSS white-space", () => {
    const testRenderer = renderer.create(
      <HTML source={{ html: "  <div>  foo\n\nbar  baz  </div>" }} />
    );
    const renderedText = extractTextFromInstance(testRenderer.root);
    expect(renderedText).toEqual("foo bar baz");
  });
});
