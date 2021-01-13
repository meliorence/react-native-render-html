import React from "react";
import { Text, View } from "react-native";
import HTML from "../index";
import { render } from "react-native-testing-library";

/**
 * https://github.com/meliorence/react-native-render-html/issues/276
 */
describe("HTML component", () => {
  describe("should pass regression #276 regarding customRenderer prop", () => {
    it("when provided, should use View wrapper to render a tag which has been defined in customRenderers and which default wrapper is Text", () => {
      const Span = ({ children, ...props }) => (
        <View {...props}>
          <Text>{children}</Text>
        </View>
      );
      const customRenderers = {
        span: {
          renderer: (_styles, children, _attrs, { key }) => (
            <Span key={key}>{children}</Span>
          ),
          wrapper: "View",
        },
      };
      const { UNSAFE_getByType } = render(
        <HTML
          source={{ html: "<p>foo<span>hello world</span></p>" }}
          renderers={customRenderers}
        />
      );
      const span = UNSAFE_getByType(Span);
      expect(span.parent.type).toBe("View");
    });
  });
});
