import { SnippetDeclaration } from '../types';
import { BLUE, RED } from './styles';

const html = `
<p>A <em>dl</em> (description list) tag, default styling</p>
<dl>
  <dt>Beast of Bodmin</dt>
  <dd>A large feline inhabiting Bodmin Moor.</dd>

  <dt>Morgawr</dt>
  <dd>A sea serpent.</dd>

  <dt>Owlman</dt>
  <dd>A giant owl-like creature.</dd>
</dl>
<hr />
<p>An <em>ul</em> tag, default styling (<em>list-style-type: disc;</em>)</p>
<ul>
	<li>Easy</li>
	<li>Peasy</li>
	<li>
		<div style="background-color:${RED};width:50px;height:50px;"></div>
	</li>
	<li>Lemon</li>
	<li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </li>
</ul>
<hr />
<p>An 
	<em>ul</em> tag, with 
	<em>list-style-type: circle;</em>
</p>
<ul style="list-style-type: circle;">
	<li>Sneaky</li>
	<li>Beaky</li>
	<li>Like</li>
</ul>
<hr />
<p>An 
	<em>ul</em> tag, with 
	<em>list-style-type: square;</em>
</p>
<ul style="list-style-type: square;">
	<li>Sneaky</li>
	<li>Beaky</li>
	<li>Like</li>
</ul>
<hr />
<p>An 
	<em>ol</em> tag, with 
	<em>color: ${BLUE};</em> (and default <em>list-style-type: decimal;</em>)
</p>
<ol style="color:${BLUE};">
	<li>Sneaky</li>
	<li>Beaky</li>
	<li>Like</li>
</ol>
<hr />
<p>An 
	<em>ol</em> tag, with 
	<em>list-style-type: lower-alpha;</em>
</p>
<ol style="list-style-type: lower-alpha;">
	<li>Sneaky</li>
	<li>Beaky</li>
	<li>Like</li>
</ol>
<hr />
<p>An 
	<em>ol</em> tag, with 
	<em>list-style-type: upper-alpha;</em>
</p>
<ol style="list-style-type: upper-alpha;">
	<li>Sneaky</li>
	<li>Beaky</li>
	<li>Like</li>
</ol>`;

const lists: SnippetDeclaration = {
  name: 'Lists',
  supportsLegacy: true,
  codeSource: '/demo/snippets/lists.ts',
  props: {
    source: { html },
    baseStyle: {}
  }
};

export default lists;
