import React from "react";
import HTML from "../index";
import renderer from "react-test-renderer";
import { extractTextFromInstance } from "./utils";

describe("HTML component regarding <pre> tags behaviors", () => {
  it("preserves tabs and line returns", () => {
    const testRenderer = renderer.create(
      <HTML source={{ html: "<pre>\t\n  a</pre>" }} />
    );
    const renderedText = extractTextFromInstance(testRenderer.root);
    expect(renderedText).toEqual("\t\n  a");
  });
  it("preserves indentation and line returns", () => {
    const preContent = `
    function myJSFunction() {
      console.log("let's go");
      console.log("let's go");
      console.log("let's go");
    }
    `;
    const testRenderer = renderer.create(
      <HTML source={{ html: `<pre>${preContent}</pre>` }} />
    );
    const renderedText = extractTextFromInstance(testRenderer.root);
    expect(renderedText).toEqual(preContent);
  });
});
