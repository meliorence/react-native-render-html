import React, { useContext } from 'react';
import { demoControlsContext } from './contexts';
import SheetRouteContainer from './SheetRouteContainer';

export default function SheetRouteControls() {
  const controls = useContext(demoControlsContext);
  return <SheetRouteContainer>{controls}</SheetRouteContainer>;
}
