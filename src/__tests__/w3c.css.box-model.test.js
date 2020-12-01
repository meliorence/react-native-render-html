import React from "react";
import HTML from "../HTML";
import HTMLImage from "../HTMLImage";
import { render } from "react-native-testing-library";
import { View } from "react-native";
import { elementHasAncestorOfType } from "./utils";

/**
 * This library cannot offer strict compliance with CSS2 and CSS3 box models and formatting
 * contexts because of React Native constrains. However, at least two
 * formatting contexts are expected to work:
 *
 * - inline for phrasing;
 * - flex for other types of content;
 *
 * Also, it is expected that, given RN limitations, embedded content such as
 * images will break inline context into new boxes. Formatting contexts are described in
 * chapters 9 and 10 of CSS2, see https://www.w3.org/TR/CSS2
 *
 **/
describe("HTML component should honor formatting context of the DOM tree", () => {
  it("should wrap text elements into a box formed by a View component", () => {
    const { getByText } = render(
      <HTML source={{ html: `<span>hello world</span>` }} />
    );
    const text = getByText("hello world");
    expect(text.parent.type).toBe("View");
  });
  it("should wrap sibling text elements into a box formed by a Text component", () => {
    const { getByText } = render(
      <HTML source={{ html: `<span>hello world</span><span>foo bar</span>` }} />
    );
    const span1 = getByText("hello world");
    expect(span1.parent.type).toBe("Text");
  });
  /*
   * We're asserting the following structure:
   *
   *
   *        View -- Text(hello world)
   *       /
   * Root /-View -- HTMLImage
   *      \
   *       \
   *        View -- Text(foo bar)
   */
  it("should cut embedded images inside inline formatting contexts into boxes", () => {
    const { getByText, UNSAFE_getByType } = render(
      <HTML
        source={{
          html: `<span><b>hello world</b><img src="https://img.com/1"/>foo bar</span>`,
        }}
      />
    );
    const b = getByText("hello world");
    const img = UNSAFE_getByType(HTMLImage);
    const anonymousText = getByText("foo bar");
    expect(img.parent.type).toBe("View");
    expect(b.parent).toBe(img.parent);
    expect(anonymousText.parent).toBe(img.parent);
    expect(b.parent.children[1]).toBe(img);
    expect(img.parent.children[2]).toBe(anonymousText);
    expect(elementHasAncestorOfType(img, "Text")).toBe(false);
  });

  /*
   * We're asserting the following structure:
   *
   *
   *        Text(foo)
   *       /
   * Root /-Text(hello world)
   *      \
   *       \
   *        View --HTMLImage
   */
  it("should cut embedded images inside inline formatting context provided by a custom Text-wrapped renderer into boxes", () => {
    const Custom = ({ children, ...props }) => (
      <View {...props}>{children}</View>
    );
    const customRenderers = {
      custom: {
        renderer: (_styles, children, _attrs, { key }) => (
          <Custom key={key}>{children}</Custom>
        ),
        wrapper: "Text",
      },
    };
    const { UNSAFE_getByType } = render(
      <HTML
        source={{
          html: `foo<custom><b>hello world</b><img src="https://img.com/1" /></custom>`,
        }}
        renderers={customRenderers}
      />
    );
    const img = UNSAFE_getByType(HTMLImage);
    expect(img.parent.type).toBe("View");
    expect(elementHasAncestorOfType(img, "Text")).toBe(false);
  });
});
