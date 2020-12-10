const BASE_FONT_SIZE = 14;

export function generateDefaultBlockStyles(baseFontSize = BASE_FONT_SIZE) {
  return {
    div: {},
    ul: {
      paddingLeft: 20,
      marginBottom: baseFontSize,
    },
    ol: {
      paddingLeft: 20,
      marginBottom: baseFontSize,
    },
    iframe: {
      height: 200,
    },
    hr: {
      marginTop: baseFontSize / 2,
      marginBottom: baseFontSize / 2,
      height: 1,
      backgroundColor: "#CCC",
    },
  };
}

export function generateDefaultTextStyles(baseFontSize = BASE_FONT_SIZE) {
  return {
    u: { textDecorationLine: "underline" },
    em: { fontStyle: "italic" },
    i: { fontStyle: "italic" },
    b: { fontWeight: "bold" },
    s: { textDecorationLine: "line-through" },
    strong: { fontWeight: "bold" },
    big: { fontSize: baseFontSize * 1.2 },
    small: { fontSize: baseFontSize * 0.8 },
    a: {
      fontSize: baseFontSize,
      textDecorationLine: "underline",
      color: "#245dc1",
    },
    h1: _generateHeadingStyle(baseFontSize, 2, 0.67),
    h2: _generateHeadingStyle(baseFontSize, 1.5, 0.83),
    h3: _generateHeadingStyle(baseFontSize, 1.17, 1),
    h4: _generateHeadingStyle(baseFontSize, 1, 1.33),
    h5: _generateHeadingStyle(baseFontSize, 0.83, 1.67),
    h6: _generateHeadingStyle(baseFontSize, 0.67, 2.33),
    sub: {
      fontSize: baseFontSize * 0.8,
    },
    sup: {
      fontSize: baseFontSize * 0.8,
    },
    p: {
      marginTop: baseFontSize,
      marginBottom: baseFontSize,
    },
  };
}

/**
 * Small utility for generating heading styles
 * @param baseFontSize: the basic font size
 * @param fontMultiplier: the amount to multiply the font size by
 * @param marginMultiplier: the amount to multiply the margin by
 * @return a style def for a heading
 */
function _generateHeadingStyle(baseFontSize, fontMultiplier, marginMultiplier) {
  return {
    fontSize: baseFontSize * fontMultiplier,
    marginTop: baseFontSize * fontMultiplier * marginMultiplier,
    marginBottom: baseFontSize * fontMultiplier * marginMultiplier,
    fontWeight: "bold",
  };
}
