import React from 'react';
import { UIToolkit } from './toolkit-types';

const toolkitContext = React.createContext<UIToolkit>({} as any);

export default toolkitContext;
