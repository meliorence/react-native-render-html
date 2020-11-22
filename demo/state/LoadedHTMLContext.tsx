import * as React from 'react';

const LoadedHTMLContext = React.createContext<{
  html: string | null;
  setHTML: (html: string) => void;
}>({
  html: null,
  setHTML: () => void 0
});

export const useLoadedHTML = () => React.useContext(LoadedHTMLContext);

export default LoadedHTMLContext;
