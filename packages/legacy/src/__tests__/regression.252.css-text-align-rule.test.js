import { render } from "react-native-testing-library";
import { expectTranslatedInlineCSSValueToEqual } from "./utils";

function testTranslation(cssValue, rnValue) {
  it(`sould translate ${cssValue} value to ${rnValue}`, () => {
    expectTranslatedInlineCSSValueToEqual({
      cssInlineRules: `text-align: ${cssValue};`,
      render,
      reactNativePropStyleName: "textAlign",
      value: rnValue,
    });
  });
}

/**
 * https://github.com/meliorence/react-native-render-html/issues/252
 */
describe("HTML component", () => {
  describe("should pass regression #252 regarding inline text-align CSS rules", () => {
    testTranslation("start", "left");
    testTranslation("end", "right");
    testTranslation("left", "left");
    testTranslation("right", "right");
    testTranslation("auto", "auto");
    testTranslation("justify", "justify");
    testTranslation("center", "center");
    testTranslation("justify-all", undefined);
  });
});
