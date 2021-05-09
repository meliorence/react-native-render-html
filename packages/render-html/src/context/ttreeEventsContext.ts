import { createContext } from 'react';
import { TTreeEvents } from '../internal-types';

const ttreeEventsContext = createContext<TTreeEvents>({});

export default ttreeEventsContext;
