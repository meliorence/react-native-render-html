import { render } from "react-native-testing-library";
import { expectTranslatedInlineCSSToMatchObject } from "./utils";

/**
 * https://github.com/meliorence/react-native-render-html/issues/257
 */
describe("HTML component", () => {
  it("should pass regression #257 regarding inline display CSS rules", () => {
    expectTranslatedInlineCSSToMatchObject({
      cssInlineRules: "display: inline-block;",
      render,
      reactNativeStyle: { display: "flex" },
    });
  });
});
