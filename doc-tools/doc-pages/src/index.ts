export * from './pages-types';
export { default as ToolkitProvider } from './toolkit/ToolkitProvider';
export * from './toolkit/toolkit-types';
export { default as useToolkit } from './toolkit/useToolkit';
export { default as pagesSpecs } from './pagesSpecs';

import React from 'react';
import { SvgProps } from 'react-native-svg';

export type SvgComponent = React.ComponentType<
  SvgProps & {
    content: string;
    secondaryContent: string;
    codeBlockBg: string;
  }
>;
