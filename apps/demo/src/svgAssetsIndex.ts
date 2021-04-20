import { SvgAssetType } from '@doc/pages';
import DataFlow from '../assets/svg/data-flow.svg';

const svgAssetsIndex: Record<SvgAssetType, typeof DataFlow> = {
  'data-flow': DataFlow
};

export default svgAssetsIndex;
