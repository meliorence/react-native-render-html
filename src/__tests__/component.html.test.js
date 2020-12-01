import React from "react";
import { render } from "react-native-testing-library";
import HTML from "../HTML";
import HTMLImage from "../HTMLImage";

describe("HTML component", () => {
  it("should update HTMLImage contentWidth when contentWidth prop changes", () => {
    const contentWidth = 300;
    const nextContentWidth = 200;
    const { UNSAFE_getByType, update } = render(
      <HTML
        html='<img src="https://img.com/1" />'
        contentWidth={contentWidth}
      />
    );
    expect(UNSAFE_getByType(HTMLImage).props.contentWidth).toBe(contentWidth);
    update(
      <HTML
        html='<img src="https://img.com/1" />'
        contentWidth={nextContentWidth}
      />
    );
    expect(UNSAFE_getByType(HTMLImage).props.contentWidth).toBe(
      nextContentWidth
    );
  });
});
