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
        source={{ html: '<img src="https://img.com/1" />' }}
        contentWidth={contentWidth}
      />
    );
    expect(UNSAFE_getByType(HTMLImage).props.contentWidth).toBe(contentWidth);
    update(
      <HTML
        source={{ html: '<img src="https://img.com/1" />' }}
        contentWidth={nextContentWidth}
      />
    );
    expect(UNSAFE_getByType(HTMLImage).props.contentWidth).toBe(
      nextContentWidth
    );
  });
  it("custom renderers should receive a `passProps.domNode` field (4th argument)", () => {
    const hook = jest.fn();
    const renderers = {
      p(htmlAttribs, children, styles, passProps) {
        hook(passProps.domNode);
        return null;
      },
    };
    render(<HTML renderers={renderers} source={{ html: "<p>test<p/>" }} />);
    expect(hook).toHaveBeenCalledWith(expect.any(Object));
  });
});
