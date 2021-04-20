import { demoNavigatorContext } from './contexts';
import createPortal from './createPortal';

const SheetNavigatorPortal = createPortal(
  demoNavigatorContext,
  'SheetNavigatorPortal'
);

export default SheetNavigatorPortal;
