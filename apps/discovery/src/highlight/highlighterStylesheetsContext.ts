import { createContext } from 'react';
import { HighlighterStylesheets } from './createStylesheets';

const highlighterStylesheetsContext = createContext<HighlighterStylesheets>(
  {} as any
);

export default highlighterStylesheetsContext;
