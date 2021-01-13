import React from "react";
import HTML from "../index";
import { render } from "react-native-testing-library";
import { getLastAncestorOfType } from "./utils";

function expectFirstTextToHaveSelectable(html, matchingString) {
  console.error = jest.fn();
  const { getByText } = render(
    <HTML defaultTextProps={{ selectable: true }} source={{ html }} />
  );
  const text = getByText(matchingString);
  const ancestorText = getLastAncestorOfType(text);
  expect(ancestorText).toBe(null);
  expect(text.props.selectable).toBe(true);
}

/**
 * https://github.com/meliorence/react-native-render-html/issues/193
 */
describe("HTML component", () => {
  describe("should pass regression #193 regarding defaultTextProps.selectable prop", () => {
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
