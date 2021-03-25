import { demoControlsContext } from './contexts';
import createPortal from './createPortal';

const SheetControlsPortal = createPortal(
  demoControlsContext,
  'SheetControlsPortal'
);

export default SheetControlsPortal;
