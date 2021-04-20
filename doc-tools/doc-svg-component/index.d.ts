import React from 'react';
import { SvgProps } from 'react-native-svg';

export type SvgComponent = React.ComponentType<
  SvgProps & {
    content: string;
    secondaryContent: string;
    codeBlockBg: string;
  }
>;
