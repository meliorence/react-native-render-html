import { UIRenderHtmlCardProps } from '../../toolkit/toolkit-types';

const html = `<html>
  <head>
    <base href="https://developer.mozilla.org/"></base>
  </head>
  <body style="margin: 10px;">
    <header>
      <nav>
        <strong>MDN Technologies</strong>
        <a href="docs/Web/HTML">HTML</a>
        <a href="docs/Web/CSS">CSS</a>
        <a href="docs/Web/JavaScript">JavaScript</a>
        <a href="docs/Web/HTTP">HTTP</a>
        <a href="docs/Web/API">APIs</a>
        <a href="docs/Web/MathML">MathML</a>
      </nav>
    </header>
  </body>
</html>`;

const anchorsRelativeConfig: UIRenderHtmlCardProps = {
  title: 'Relative URLs Resolution Example',
  caption:
    'Press any of the anchors and notice that the URL is being normalized from the base URL.',
  props: {
    source: {
      html
    }
  },
  preferHtmlSrc: true
};

export default anchorsRelativeConfig;
