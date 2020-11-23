import { SnippetDeclaration } from '../types';

const html = `<pre>  ___________________________
< I'm an expert in my field. >
  ---------------------------
    \\   ^__^ 
    \\  (oo)\\_______
       (__)\\       )\\/\\
           ||----w |
           ||     ||
</pre>
<figcaption>
  A cow saying, "I'm an expert in my field." The cow is illustrated using preformatted text characters. 
</figcaption>`;

const pre: SnippetDeclaration = {
  name: 'Preformatted',
  html: html
};

export default pre;
