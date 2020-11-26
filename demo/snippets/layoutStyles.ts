import { SnippetDeclaration } from '../types';
import { BLUE, RED } from './styles';

const html = `
<p>Nested rectangle with percentage dimensions and positionning</p>
<div style="background-color: ${RED}; height: 200px">
	<div
    style="background-color: ${BLUE}; width: 80%; height: 80%; top: 10%; left: 10%"></div>
</div>
<hr />
<div
style="background-color: ${RED}; height: 200px; padding: 20%; margin-top: 30px">
  <span style="color: white;">Text inside a rectangle with a 20% padding</span>
</div>
`;

const layoutStyles: SnippetDeclaration = {
  name: 'Layout Styles',
  source: '/demo/snippets/layoutStyles.ts',
  html: html
};

export default layoutStyles;
