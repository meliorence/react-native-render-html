import PlaygroundTemplate from './Playground';
import SheetControlsPortal from './SheetControlsPortal';
import SheetDescriptionPortal from './SheetDescriptionPortal';
import SheetNavigatorPortal from './SheetNavigatorPortal';
import SheetRouteContainer from './SheetRouteContainer';
import SheetStack from './SheetStack';

const PlaygroundScreen = SheetStack.Screen;

export {
  SheetControlsPortal as PlaygroundControls,
  SheetDescriptionPortal as PlaygroundDescription,
  SheetNavigatorPortal as PlaygroundNavigator,
  SheetRouteContainer as PlaygroundRouteContainer,
  PlaygroundScreen
};

export default PlaygroundTemplate;
