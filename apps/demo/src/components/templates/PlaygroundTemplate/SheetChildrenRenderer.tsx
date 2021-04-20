import React, { PropsWithChildren, ReactElement, ReactNode } from 'react';

function isReactElement(candidate: unknown): candidate is ReactElement {
  return (
    React.isValidElement(candidate as any) && typeof candidate !== 'string'
  );
}

export default function SheetChildrenRenderer({
  tpChildren,
  children
}: PropsWithChildren<{
  tpChildren: ReactNode;
}>) {
  let description: ReactElement | undefined,
    controls: ReactElement | undefined,
    navigator: ReactElement | undefined;
  React.Children.forEach(tpChildren, (child) => {
    if (isReactElement(child)) {
      const childName = (child.type as any).displayName as string;
      if (childName?.match('SheetControlsPortal')) {
        controls = child;
      } else if (childName?.match('SheetDescriptionPortal')) {
        description = child;
      } else if (childName?.match('SheetNavigatorPortal')) {
        navigator = child;
      } else {
        console.warn(
          `DemoOrganism only accepts DemoOrganism.Controls and DemoOrganism.Description child elements. Instead received: ${childName}`
        );
      }
    }
  });
  if (!controls) {
    console.warn('DemoOrganism is missing a DemoOrganism.Controls child');
  }
  if (!description) {
    console.warn('DemoOrganism is missing a DemoOrganism.Description child');
  }
  const wrapper = navigator
    ? React.cloneElement(navigator, {
        ...navigator.props,
        _tpChildren: children
      })
    : children;
  if (controls && description) {
    return React.cloneElement(controls, {
      ...controls.props,
      _tpChildren: React.cloneElement(description, {
        ...description.props,
        _tpChildren: wrapper
      })
    });
  }
  return null;
}
