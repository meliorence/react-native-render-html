import React from 'react';
import { TBlock, TPhrasing, TText } from '@native-html/transient-render-engine';
import { InternalRendererProps } from '../shared-types';

export default function AElement({
  TDefaultRenderer,
  ...props
}: InternalRendererProps<TBlock | TPhrasing | TText>) {
  return React.createElement(TDefaultRenderer, props);
}
