import domNodeToHTMLString from '../domNodeToHTMLString';
import { parseDOM } from 'htmlparser2';

function parseHTML(html: string) {
  const root = parseDOM(html);
  return root[0];
}

describe('domNodeToHTMLString', () => {
  it('should be bijective regarding toSerializableNode from transient-render-engine', () => {
    const html =
      '<article class="aclass"><p>This is a paragraph.</p><p>This is a paragraph.</p><p>This is a paragraph.</p></article>';
    expect(domNodeToHTMLString(parseHTML(html))).toBe(html);
  });
  it('should call reporter argument with every parsed node', () => {
    const reporter = jest.fn();
    const html =
      '<article><p>This is a paragraph.</p><p>This is a paragraph.</p><p>This is a paragraph.</p></article>';
    domNodeToHTMLString(parseHTML(html), reporter);
    expect(reporter).toHaveBeenCalledTimes(7);
  });
  it('should handle tables', () => {
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
    expect(domNodeToHTMLString(parseHTML(tableSnippet))).toBe(tableSnippet);
  });
  it('should handle null values', () => {
    expect(domNodeToHTMLString(null)).toBe('');
  });
});
