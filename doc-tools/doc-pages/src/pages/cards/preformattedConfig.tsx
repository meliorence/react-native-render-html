import { UIRenderHtmlCardProps } from '../../toolkit/toolkit-types';

const html = `
<figure>
  <pre>  ___________________________
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
  </figcaption>
</figure>`;

const preformattedConfig: UIRenderHtmlCardProps = {
  title: 'Preformatted Text',
  caption:
    'Notice that every white-space inside the <pre> tag is preserved while white-spaces outside are collapsed.',
  props: {
    source: {
      html
    }
  },
  preferHtmlSrc: true
};

export default preformattedConfig;
