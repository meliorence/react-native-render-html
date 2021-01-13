import React from "react";
import { render } from "react-native-testing-library";
import { StyleSheet } from "react-native";
import HTML from "../HTML";

/**
 * https://github.com/meliorence/react-native-render-html/issues/172
 */
describe("HTMLImage component should pass regression test #172", () => {
  it("passes resizeMode to RN Image component", async () => {
    // const source = { uri: "http://via.placeholder.com/640x360" };
    const tagsStyles = {
      img: {
        resizeMode: "contain",
        width: 100,
        height: 100,
      },
    };
    const { getByTestId } = render(
      <HTML
        source={{
          html:
            '<img width="100" height="100" src="http://via.placeholder.com/100x100" />',
        }}
        tagsStyles={tagsStyles}
      />
    );
    const imageLayout = getByTestId("image-layout");
    expect(StyleSheet.flatten(imageLayout.props.style)).toMatchObject(
      tagsStyles.img
    );
  });
});
