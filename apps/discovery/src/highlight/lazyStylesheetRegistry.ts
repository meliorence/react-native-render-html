import createStylesheets, { HighlighterStylesheets } from './createStylesheets';
import * as styles from 'react-syntax-highlighter/dist/esm/styles/hljs';

export type HighlightJsStyles = keyof typeof styles;

const lazyStylesheetRegistry = new Proxy<
  Record<keyof typeof styles, HighlighterStylesheets | undefined>
>({} as any, {
  get(target, prop: HighlightJsStyles) {
    if (prop in target) {
      return target[prop];
    }
    const hlstylesheet = styles[prop];
    if (!hlstylesheet) {
      return;
    }
    target[prop] = createStylesheets(hlstylesheet);
    return target[prop];
  }
});

export default lazyStylesheetRegistry;
