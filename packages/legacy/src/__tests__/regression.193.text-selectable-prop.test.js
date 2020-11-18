import React from "react";
import HTML from "../index";
import { render } from "react-native-testing-library";
import { getLastAncestorOfType } from "./utils";

function expectFirstTextToHaveSelectable(html, matchingString) {
  const { getByText } = render(<HTML textSelectable html={html} />);
  const text = getByText(matchingString);
  const ancestorText = getLastAncestorOfType(text);
  expect(ancestorText).toBe(null);
  expect(text.props.selectable).toBe(true);
}

/**
 * https://github.com/archriss/react-native-render-html/issues/193
 */
describe("HTML component", () => {
  describe("should pass regression #193 regarding textSelectable prop", () => {
    it("should pass example #1", () => {
      expectFirstTextToHaveSelectable("<div>selectable</div>", "selectable");
    });
    it("should pass example #2", () => {
      expectFirstTextToHaveSelectable(
        '<div>selectable<img src=""/></div>',
        "selectable"
      );
    });
    it("should pass example #3", () => {
      expectFirstTextToHaveSelectable(
        '<div><div>selectable</div><img src=""/></div>',
        "selectable"
      );
    });
  });
});
