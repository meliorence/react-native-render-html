import { createContext } from 'react';

const onLinkPressContext = createContext<(uri: string) => void>(
  () => undefined as void
);

export default onLinkPressContext;
