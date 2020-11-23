import { SnippetDeclaration } from '../types';
import { HIGHLIGHT } from './styles';

const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.';

const html = `<p>CSS <em>fontFamily</em> and <em>font</em> properties allow a comma-separated list of fonts, but React Native styles <em>fontFamily</em> allows only one font name. With the new engine, you can instruct the <em>RenderHTML</em> component which fonts are available in the system (or fonts you have added), and it will pick the first match! The prop to achieve that is <em>systemFonts</em>.</p>
<p>By default, a handful of fonts supported by the current system are pre-registered. If you are using expo, just set this prop to <em>Constants.systemFonts</em>. You can also define how special font names are resolved (such as <em>serif</em>, <em>sans-serif</em> and <em>monospace</em> with the <em>fallbackFonts</em> prop).</p>
<hr />
<p><em>font-family: Arial, sans-serif;</em> The below paragraph is set to Arial (will match on iOS) and should fallback to sans-serif otherwise.</p> 
<p class="snippet" style="font-family: Arial, sans-serif;">${lorem}</p>
<hr />
<p><em>font-family: 'Courier New', monospace;</em> The below paragraph is set to 'Courier New' (will match on iOS) and should fallback to monospace otherwise.</p>
<p class="snippet" style="font-family: 'Courier New', monospace;">${lorem}</p>
<hr />
<p><em>font-family: monospace;</em> The below paragraph font will match <code>fallbackFonts['monospace']</code>.</p>
<p class="snippet" style="font-family: monospace;">${lorem}</p>
<hr />
<p><em>font-family: serif;</em> The below paragraph font will match <code>fallbackFonts['serif']</code>.</p>
<p class="snippet" style="font-family: serif;">${lorem}</p>
<hr />
<p><em>font-family: sans-serif;</em> The below paragraph font will match <code>fallbackFonts['sans-serif']</code>.</p>
<p class="snippet" style="font-family: sans-serif;">${lorem}</p>
<hr />
<p><em>font-family: space-mono;</em> The below paragraph font is set to 'space-mono', which has been loaded in this project with expo and <code>systemFonts</code> prop.</p>
<p class="snippet" style="font-family: space-mono;">${lorem}</p>
`;

const fonts: SnippetDeclaration = {
  name: 'Font Selection',
  html,
  props: {
    classesStyles: {
      snippet: {
        backgroundColor: HIGHLIGHT,
        color: 'black'
      }
    }
  }
};

export default fonts;
