import { SvgAssetType } from '@doc/pages';
import DataFlow from '../assets/svg/data-flow.svg';
import Logo from '../assets/svg/logo.svg';

const svgAssetsIndex: Record<SvgAssetType | 'logo', typeof DataFlow> = {
  'data-flow': DataFlow,
  logo: Logo
};

export default svgAssetsIndex;
