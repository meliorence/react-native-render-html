import React from "react";
import { Text } from "react-native";
import HTML from "../HTML";
import renderer from "react-test-renderer";

function extractTextFromInstance(instance) {
  const textChunks = [];
  const texts = instance.findAllByType(Text);
  for (const text of texts) {
    if (typeof text.props.children === "string") {
      textChunks.push(text.props.children);
    }
  }
  return textChunks.join("");
}

describe("HTML component", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<HTML html="<span>Hello world</span>" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  describe("regarding text space behavior", () => {
    it("collapses spaces when first text tag has a trailing space and the second starts with a space", () => {
      const testRenderer = renderer.create(
        <HTML html="<span>random </span> <span>text</span>" />
      );
      const renderedText = extractTextFromInstance(testRenderer.root);
      expect(renderedText).toBe("random text");
    });
    it("preserves spaces when the first text tag has a trailing space and the current one doesn't start with a space", () => {
      const testRenderer = renderer.create(
        <HTML html="<b>bold </b><span>text</span>" />
      );
      const renderedText = extractTextFromInstance(testRenderer.root);
      expect(renderedText).toBe("bold text");
    });
    it("preserves a space between two tags which don't contain spaces", () => {
      const testRenderer = renderer.create(
        <HTML html="<b>bold</b> <span>text</span>" />
      );
      const renderedText = extractTextFromInstance(testRenderer.root);
      expect(renderedText).toBe("bold text");
    });
  });
  describe("regarding text line returns behavior", () => {
     it("replaces newlines with spaces when neither in-between text chunks contain spaces", () => {
      const testRenderer = renderer.create(
        <HTML html="foo\nbar" />
      );
      const renderedText = extractTextFromInstance(testRenderer.root);
      expect(renderedText).toBe("foo bar");
    });
 
  });
  describe("regarding <pre> tags behavior", () => {
    it("preserves tabs, spaces and line returns", () => {
      const testRenderer = renderer.create(<HTML html="<pre>\t\n  </pre>" />);
      const renderedText = extractTextFromInstance(testRenderer.root);
      expect(renderedText).toBe("\t\n  ");
    });
  });
});
