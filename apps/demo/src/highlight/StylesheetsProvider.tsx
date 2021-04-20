import * as React from 'react';
import { PropsWithChildren } from 'react';
import highlighterStylesheetsContext from './highlighterStylesheetsContext';
import lazyStylesheetRegistry, {
  HighlightJsStyles
} from './lazyStylesheetRegistry';

export { HighlightJsStyles };

export default function StylesheetsProvider({
  children,
  style
}: PropsWithChildren<{
  style: HighlightJsStyles;
}>) {
  const value = lazyStylesheetRegistry[style];
  if (!value) {
    console.warn(
      `There is no corresponding highlight.js style with name "${style}".`
    );
    return null;
  }
  return (
    <highlighterStylesheetsContext.Provider value={value}>
      {children}
    </highlighterStylesheetsContext.Provider>
  );
}
