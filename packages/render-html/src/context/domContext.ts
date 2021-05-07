import { createContext } from 'react';
import { DOMProps } from '../internal-types';

const domContext = createContext<DOMProps>({} as any);

export default domContext;
