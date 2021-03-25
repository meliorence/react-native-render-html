import { demoDescriptionContext } from './contexts';
import createPortal from './createPortal';

const SheetDescriptionPortal = createPortal(
  demoDescriptionContext,
  'SheetDescriptionPortal'
);

export default SheetDescriptionPortal;
