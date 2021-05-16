import { UIRenderHtmlCardProps } from '../../toolkit/toolkit-types';

const html = `<p style="font-family: 'Arial', sans-serif; padding: 10px;">
  Lorem ipsum dolor sit amet, consectetur adipiscing
  elit, sed do eiusmod tempor incididunt ut labore et
  dolore magna aliqua. Ut enim ad minim veniam, quis
  nostrud exercitation ullamco laboris nisi ut aliquip
  ex ea commodo consequat. 
</p>`;

const fontSelectionArial: UIRenderHtmlCardProps = {
  title: 'Arial Font Selection',
  caption:
    'This paragraph font family is set to "Arial" (will match on iOS, MacOS and Windows) and should fallback to sans-serif otherwise.',
  props: {
    source: {
      html
    },
    enableExperimentalMarginCollapsing: true
  },
  preferHtmlSrc: true
};

export default fontSelectionArial;
