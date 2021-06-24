import React from 'react';
import { TText } from '@native-html/transient-render-engine';
import { TDefaultRenderer, TDefaultRendererProps } from './shared-types';
import { TNodeSubRendererProps } from './internal-types';
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
    return React.createElement(InternalTextRenderer);
  }
  return React.createElement(TStandardTextRenderer, props);
}
