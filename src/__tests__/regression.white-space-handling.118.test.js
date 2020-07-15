import React from "react";
import HTML from "../index";
import renderer from "react-test-renderer";
import { extractTextFromInstance } from "./utils";

// Skip because a fix is not ready yet
describe.skip("HTML component", () => {
  it("should pass regression #118", () => {
    const testRenderer = renderer.create(
      <HTML html={"  <div>  foo\n\nbar  baz  </div>"} />
    );
    const renderedText = extractTextFromInstance(testRenderer.root);
    expect(renderedText).toEqual("foo bar baz");
  });
});
