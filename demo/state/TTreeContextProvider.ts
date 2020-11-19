import * as React from 'react';
import { TNode } from '@native-html/transient-render-tree';

const TTreeContext = React.createContext<{ ttree: TNode | null, setTTree: (ttree: TNode) => void; }>({ ttree: null, setTTree: () => null });
export const useTTree = () => React.useContext(TTreeContext);
const TTreeContextProvider = TTreeContext.Provider

export default TTreeContextProvider;
