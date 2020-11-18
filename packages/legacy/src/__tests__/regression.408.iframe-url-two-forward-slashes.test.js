import React from "react";
import HTML from "../index";
import { render } from "react-native-testing-library";
import { getLastAncestorOfType } from "./utils";
import HTMLImage from "../HTMLImage";

/**
 * https://github.com/archriss/react-native-render-html/issues/408
 */
describe("HTML component", () => {
  describe("should pass regression #408 regarding two forward slashes in src", () => {
    it("should prepend 'https:' to an iframe src attribute with two forward slashes", () => {
      const { getByTestId } = render(<HTML html={'<iframe src="//youtube.com/" />'} />);
      const webview = getByTestId('iframe');
      expect(webview.props.source).toMatchObject({ uri: "https://youtube.com/" });
    });
    it("should prepend 'https:' to an image src attribute with two forward slashes", () => {
      const { UNSAFE_getByType } = render(<HTML html={'<img src="//domain.com/" />'} />);
      const image = UNSAFE_getByType(HTMLImage);
      expect(image.props.source).toMatchObject({ uri: "https://domain.com/" });
    });
  });
});
