import React from "react";
import HTML from "../index";
import renderer from "react-test-renderer";
import { extractTextFromInstance } from "./utils";

describe("HTML component regarding <pre> tags behaviors", () => {
  it("preserves tabs, spaces and line returns", () => {
    const testRenderer = renderer.create(<HTML html="<pre>\t\n  </pre>" />);
    const renderedText = extractTextFromInstance(testRenderer.root);
    expect(renderedText).toEqual("\t\n  ");
  });
});
