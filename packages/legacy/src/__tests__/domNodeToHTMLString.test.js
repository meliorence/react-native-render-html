import domNodeToHTMLString from "../domNodeToHTMLString";
import { parseDOM } from "htmlparser2";

describe("domNodeToHTMLString", () => {
  it("should be bijective regarding parseDOM from htmlparser2", () => {
    const html = `<article class="aclass"><p>This is a paragraph.</p><p>This is a paragraph.</p><p>This is a paragraph.</p></article>`;
    const root = parseDOM(html);
    expect(domNodeToHTMLString(root[0])).toBe(html);
  });
  it("should call reporter argument with every parsed node", () => {
    const reporter = jest.fn();
    const html = `<article><p>This is a paragraph.</p><p>This is a paragraph.</p><p>This is a paragraph.</p></article>`;
    const root = parseDOM(html);
    domNodeToHTMLString(root[0], reporter);
    expect(reporter).toHaveBeenCalledTimes(7);
  });
  it("should handle tables", () => {
    const tableSnippet = `<table>
    <tr>
      <th>Entry Header 1</th>
      <th>Entry Header 2</th>
      <th>Entry Header 3</th>
    </tr>
    <tr>
      <td>Entry First Line 1</td>
      <td>Entry First Line 2</td>
      <td>Entry First Line 3</td>
    </tr>
  </table>`;
    const root = parseDOM(tableSnippet);
    expect(domNodeToHTMLString(root[0])).toBe(tableSnippet);
  });
});
