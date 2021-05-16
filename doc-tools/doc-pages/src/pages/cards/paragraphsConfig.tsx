import { UIRenderHtmlCardProps } from '../../toolkit/toolkit-types';

const html = `<p style="font-size: 1.2rem; padding: 10px;">
  Lorem ipsum dolor sit amet, consectetur adipiscing
  elit, sed do eiusmod tempor incididunt ut labore et
  dolore magna aliqua. Ut enim ad minim veniam, quis
  nostrud exercitation ullamco laboris nisi ut aliquip
  ex ea commodo consequat. 
</p>
<p style="color: purple; padding: 10px;">
  Duis aute irure dolor in
  reprehenderit in voluptate velit esse cillum dolore
  eu fugiat nulla pariatur. Excepteur sint occaecat
  cupidatat non proident, sunt in culpa qui officia
  deserunt mollit anim id est laborum.
</p>`;

const paragraphsConfig: UIRenderHtmlCardProps = {
  title: 'A paragraph',
  caption:
    'The first paragraph has a font size set in rem. The margins between first and second paragraphs are collapsed thanks to enableExperimentalMarginCollapsing prop.',
  props: {
    source: {
      html
    },
    enableExperimentalMarginCollapsing: true
  },
  preferHtmlSrc: true
};

export default paragraphsConfig;
