import React from 'react';
import { TText } from '@native-html/transient-render-engine';
import {
  TDefaultRenderer,
  TDefaultRendererProps,
  TNodeSubRendererProps
} from './shared-types';
import { useInternalTextRenderer } from './context/RenderRegistryProvider';
import useAssembledCommonProps from './hooks/useAssembledCommonProps';
import TDefaultTextualRenderer from './TDefaultTextualRenderer';

export const TDefaultTextRenderer: TDefaultRenderer<TText> = ({
  children,
  ...props
}: TDefaultRendererProps<TText>) => {
  const { tnode } = props;
  return React.createElement(
    TDefaultTextualRenderer,
    props,
    children ?? tnode.data
  );
};

function TStandardTextRenderer(props: TNodeSubRendererProps<TText>) {
  const { assembledProps, Renderer } = useAssembledCommonProps(
    props,
    TDefaultTextRenderer
  );
  return React.createElement(Renderer, assembledProps);
}

export default function TTextRenderer(props: TNodeSubRendererProps<TText>) {
  const InternalTextRenderer = useInternalTextRenderer(props.tnode);
  if (InternalTextRenderer) {
    return React.createElement(InternalTextRenderer, { key: props.key });
  }
  return React.createElement(TStandardTextRenderer, props);
}
