import { SvgAssetType } from './toolkit/toolkit-types';

const figuresIndex: Record<
  SvgAssetType,
  { description: string; title: string }
> = {
  'data-flow': {
    title: 'Data Flow Diagram',
    description:
      'Depiction of data transformations involved in the rendering of an HTML snippet.'
  }
};

export default figuresIndex;
