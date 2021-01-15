import React from 'react';
import { TBlock, TPhrasing, TText } from '@native-html/transient-render-engine';
import { DefaultTagRendererProps } from '../shared-types';

export default function AElement({
  TDefaultRenderer,
  ...props
}: DefaultTagRendererProps<TBlock | TPhrasing | TText>) {
  return React.createElement(TDefaultRenderer, props);
}
