import * as React from 'react';
import snippets from '../snippets';

export const defaultSelectedSnippet: keyof typeof snippets = 'whitespace';

const SelectedSnippetContext = React.createContext(defaultSelectedSnippet);

export const useSelectedSnippet = () =>
  React.useContext(SelectedSnippetContext);

export default SelectedSnippetContext;
