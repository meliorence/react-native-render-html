import React from "react";
import HTML from "../HTML";
import { render } from "react-native-testing-library";

/**
 * https://github.com/archriss/react-native-render-html/issues/383
 **/
describe("HTML component", () => {
  describe("should pass regression regarding HTML props passed to anchor renderer", () => {
    it("translated anchor elements should not contain a renderers prop", () => {
      const { getByText } = render(<HTML renderers={{}} html="<a>bar</a>" />);
      const anchor = getByText("bar");
      expect(anchor.props.renderers).toBeUndefined();
    });
  });
});
