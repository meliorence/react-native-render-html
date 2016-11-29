export const RE = Object.freeze({
    MULT_WHITESPACE: new RegExp(/\s+/g),
    MULT_NEWLINE: new RegExp(/\n+/g),

    PREFIX_NEWLINE: new RegExp(/^\n/g),
    PREFIX_WHITESPACE: new RegExp(/^\s/g),

    SUFFIX_NEWLINE: new RegExp(/\n$/g)
});

export const TEXT_TAG_NAMES = [
    'p', 'span', 'li', 'a',
    'em', 'i', 'u', 'b', 'strong', 'big', 'small',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
].reduce((acc, n) => { acc.add(n); return acc; }, new Set());

export const PRE_TAG_NAMES = [
    'pre', 'code'
].reduce((acc, n) => { acc.add(n); return acc; }, new Set());
