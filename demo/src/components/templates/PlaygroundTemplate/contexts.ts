import { createContext, ReactNode } from 'react';
import { TNode } from 'react-native-render-html';

export const demoDescriptionContext = createContext<ReactNode>(null);
export const demoControlsContext = createContext<ReactNode>(null);
export const demoNavigatorContext = createContext<ReactNode>(null);
export const demoStateContext = createContext<{ html: string; ttree?: TNode }>({
  html: '',
  ttree: undefined
});
