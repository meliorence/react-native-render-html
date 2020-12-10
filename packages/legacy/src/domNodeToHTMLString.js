import strigifyEntities from "stringify-entities";

function renderOpeningTag(tag, attributes) {
  const strAttributes = [];
  Object.keys(attributes).forEach((key) => {
    strAttributes.push(`${key}="${strigifyEntities(`${attributes[key]}`)}"`);
  });
  return `<${tag}${strAttributes.length ? " " : ""}${strAttributes.join(" ")}>`;
}

/**
 * Convert a DOM node to its HTML representation.
 *
 * @param {DOMNode} root - The root to stringify.
 * @param {Function} reporter - An optional function which will receive every
 * parsed node as 1st argument, the depth as 2d argument and the converted html
 * as 3d argument.
 */
export default function domNodeToHTMLString(root, reporter, depth = 0) {
  let html = "";
  if (root.type === "tag") {
    const strChildren = root.children.reduce((prev, curr) => {
      const convertedNode = domNodeToHTMLString(curr, reporter, depth + 1);
      return `${prev}${convertedNode}`;
    }, "");
    html = `${renderOpeningTag(root.name, root.attribs)}${strChildren}</${
      root.name
    }>`;
  } else if (root.type === "text") {
    const text = strigifyEntities(root.data);
    html = text;
  }
  typeof reporter === "function" && reporter(root, depth, html);
  return html;
}
