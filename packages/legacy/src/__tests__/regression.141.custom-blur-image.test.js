import React from "react";
import { render } from "react-native-testing-library";
import HTMLImage from "../HTMLImage";

/**
 * https://github.com/meliorence/react-native-render-html/issues/141
 */
describe("HTMLImage component should pass regression test #141", () => {
  it("doesn't display the image prior to receiving original dimensions", async () => {
    const source = { uri: "http://via.placeholder.com/640x360" };
    const style = {};
    const { findByTestId, getByTestId, queryByTestId } = render(
      <HTMLImage key="1" style={style} source={source} />
    );
    const placeholder = getByTestId("image-placeholder");
    expect(placeholder).toBeTruthy();
    const imageLayout = queryByTestId("image-layout");
    expect(imageLayout).toBeFalsy();
    await expect(
      findByTestId("image-layout", { timeout: 100 })
    ).resolves.toBeTruthy();
  });
});
