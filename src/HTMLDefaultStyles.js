import { StyleSheet } from 'react-native';

const BASE_FONT_SIZE = 14;

export const defaultBlockStyles = StyleSheet.create({
    div: { },
    ul: {
        paddingLeft: 40,
        marginBottom: BASE_FONT_SIZE
    },
    ol: {
        paddingLeft: 40,
        marginBottom: BASE_FONT_SIZE
    },
    iframe: {
        width: 200,
        height: 200
    },
    hr: {
        marginTop: BASE_FONT_SIZE / 2,
        marginBottom: BASE_FONT_SIZE / 2,
        height: 1,
        backgroundColor: '#CCC'
    }
});

export const defaultTextStyles = StyleSheet.create({
    p: {
        fontSize: BASE_FONT_SIZE,
        marginTop: BASE_FONT_SIZE,
        marginBottom: BASE_FONT_SIZE
    },
    u: { textDecorationLine: 'underline' },
    em: { fontStyle: 'italic' },
    i: { fontStyle: 'italic' },
    b: { fontWeight: 'bold' },
    strong: { fontWeight: 'bold' },
    big: { fontSize: BASE_FONT_SIZE * 1.2 },
    small: { fontSize: BASE_FONT_SIZE * 0.8 },
    a: {
        textDecorationLine: 'underline',
        color: '#245dc1'
    },
    h1: _generateHeadingStyle(BASE_FONT_SIZE, 2, 0.67),
    h2: _generateHeadingStyle(BASE_FONT_SIZE, 1.5, 0.83),
    h3: _generateHeadingStyle(BASE_FONT_SIZE, 1.17, 1),
    h4: _generateHeadingStyle(BASE_FONT_SIZE, 1, 1.33),
    h5: _generateHeadingStyle(BASE_FONT_SIZE, 0.83, 1.67),
    h6: _generateHeadingStyle(BASE_FONT_SIZE, 0.67, 2.33),
    sub: {
        textAlignVertical: 'top',
        fontSize: BASE_FONT_SIZE * 0.8,
        marginTop: BASE_FONT_SIZE / 2
    },
    sup: {
        textAlignVertical: 'top',
        fontSize: BASE_FONT_SIZE * 0.8,
        marginBottom: BASE_FONT_SIZE / 2
    }
});

/**
* Small utility for generating heading styles
* @param baseFontSize: the basic font size
* @param fontMultiplier: the amount to multiply the font size by
* @param marginMultiplier: the amount to multiply the margin by
* @return a style def for a heading
*/
function _generateHeadingStyle (baseFontSize, fontMultiplier, marginMultiplier) {
    return {
        fontSize: baseFontSize * fontMultiplier,
        marginTop: (baseFontSize * fontMultiplier) * marginMultiplier,
        marginBottom: (baseFontSize * fontMultiplier) * marginMultiplier,
        fontWeight: 'bold'
    };
}
