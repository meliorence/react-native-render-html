import React, { Context, PropsWithChildren, ReactNode } from 'react';

type PortalProps = PropsWithChildren<{ _tpChildren?: ReactNode }>;

export default function createPortal(
  context: Context<ReactNode>,
  name: string
) {
  const Portal = function ({ children, _tpChildren }: PortalProps) {
    return React.createElement(
      context.Provider,
      {
        value: children
      },
      _tpChildren
    );
  };
  Portal.displayName = name;
  Portal.portalId = Symbol(name);
  return Portal;
}
