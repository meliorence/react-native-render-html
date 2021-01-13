import { render } from "react-native-testing-library";
import { expectTranslatedInlineCSSRuleTo } from "./utils";

/**
 * https://github.com/meliorence/react-native-render-html/issues/319
 */
describe("HTML component", () => {
  it("should pass regression #319 regarding inline border-style CSS rules", () => {
    expectTranslatedInlineCSSRuleTo({
      cssInlineRules: "border-style: none;",
      render,
      test: (style) => expect(style.borderStyle).toBeUndefined(),
    });
  });
});
