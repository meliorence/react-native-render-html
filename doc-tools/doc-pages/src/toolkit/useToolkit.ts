import React from 'react';
import { UIToolkit } from './toolkit-types';
import toolkitContext from './toolkitContext';

export default function useToolkit() {
  return React.useContext(toolkitContext) as UIToolkit;
}
