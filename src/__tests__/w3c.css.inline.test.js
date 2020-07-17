import { render } from "react-native-testing-library";
import {
  expectTranslatedInlineCSSRuleTo,
  expectTranslatedInlineCSSToMatchObject,
} from "./utils";

describe("HTML component regarding inline CSS styles", () => {
  describe("should ignore rules unknown to React Native styles", () => {
    it("such as vendor-prefixed rules", () => {
      expectTranslatedInlineCSSRuleTo({
        cssInlineRules: "-webkit-box-reflect: above;",
        test: (style) =>
          expect(Object.keys(style).sort()).toStrictEqual(
            ["marginBottom", "marginTop"].sort()
          ),
        render,
      });
    });
  });
  describe("should translate compatible rules", () => {
    it("should translate spacing rules with a 1px = 1dip correspondence", () => {
      expectTranslatedInlineCSSToMatchObject({
        cssInlineRules: "margin-top: 18px;",
        reactNativeStyle: { marginTop: 18 },
        render,
      });
    });
  });
});
