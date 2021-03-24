import React from 'react';
import onLinkPressContext from '../state/onLinkPressContext';

export default function useOnLinkPress() {
  return React.useContext(onLinkPressContext);
}
