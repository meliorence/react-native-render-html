import React, { useCallback } from 'react';
import onLinkPressContext from '../state/onLinkPressContext';

function useOnLinkPress(uri: string): () => void;
function useOnLinkPress(): (uri: string) => void;
function useOnLinkPress(uri?: string) {
  const onLinkPress = React.useContext(onLinkPressContext);
  if (uri) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useCallback(() => onLinkPress(uri), [onLinkPress, uri]);
  }
  return onLinkPress;
}

export default useOnLinkPress;
