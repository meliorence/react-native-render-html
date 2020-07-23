import React from "react";
import { Image } from "react-native";
import { render } from "react-native-testing-library";
import HTMLImage from "../HTMLImage";

function getSize(source, callback) {
    setTimeout(() => callback(640, 360), 1)
}

Image.getSize = getSize.bind(Image);

/**
 * https://github.com/archriss/react-native-render-html/issues/141
 */
describe("HTMLImage component should pass regression test #141", () => {
    it("doesn't display the image prior to receiving original dimensions", () => {
        const {} = render(<HTMLImage source={{ uri: "http://via.placeholder.com/640x360" }} />);
    })
});