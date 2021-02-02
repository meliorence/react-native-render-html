import { SnippetDeclaration } from '../types';

const html = `
<HTML lang="en">
<HEAD>
<TITLE>Relative URLs</TITLE>
<BASE href="https://i.imgur.com/"></BASE>
</HEAD>
<BODY>
<p>
The HTML standard allows relative URLs, for example when anchors have a <code>href</code> attribute with no origin, such as
<code>&lt;a&nbsp;href="contact.html"&gt;</code>. The new foundry release adheres closely to this standard, by extracting information about
the <code>baseUrl</code> of the current page. Either by the mean of the <code>&lt;base&gt;</code> element, or by information contained in the <code>source</code> prop.
</p>
<p>
You can reuse this normalization logic from any custom renderer thanks to <code>useNormalizedUrl</code> hook.
</p>
<p>
In the below example, images and anchors relative URLs are resolved relative to <code>https://i.imgur.com/</code>:
<hr/>
<img src="gSmWCJF.jpg" />
<hr/>
<a href="gSmWCJF" >A link to the above image.</a>
</p>
</BODY>
</HTML>

`;

const relativeUrls: SnippetDeclaration = {
  name: 'Relative URLs',
  supportsLegacy: true,
  codeSource: '/demo/snippets/relativeUrls.ts',
  props: {
    source: { html }
  }
};

export default relativeUrls;
