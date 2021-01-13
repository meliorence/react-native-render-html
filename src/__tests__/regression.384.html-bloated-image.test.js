import React from "react";
import HTML from "../HTML";
import { render } from "react-native-testing-library";
import HTMLImage from "../HTMLImage";

/**
 * https://github.com/meliorence/react-native-render-html/issues/384
 **/
describe("HTML component", () => {
  describe("should pass regression regarding HTML props passed to image renderer", () => {
    it("translated image elements should not contain a renderers prop", () => {
      const { UNSAFE_getByType } = render(
        <HTML
          renderers={{}}
          source={{ html: '<img src="https://img.com/1"/>' }}
        />
      );
      const image = UNSAFE_getByType(HTMLImage);
      expect(image.props.renderers).toBeUndefined();
    });
  });
});
