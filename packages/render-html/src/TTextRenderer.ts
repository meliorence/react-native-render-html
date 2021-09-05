import React from 'react';
import { TText } from '@native-html/transient-render-engine';
import { TDefaultRenderer, TDefaultRendererProps } from './shared-types';
import { TNodeSubRendererProps } from './internal-types';
import { useInternalTextRenderer } from './context/RenderRegistryProvider';
import useAssembledCommonProps from './hooks/useAssembledCommonProps';
import renderTextualContent from './renderTextualContent';

export const TDefaultTextRenderer: TDefaultRenderer<TText> = ({
  children,
  ...props
}: TDefaultRendererProps<TText>) => {
  const { tnode } = props;
  return renderTextualContent(props, children ?? tnode.data);
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
    return React.createElement(InternalTextRenderer, props);
  }
  // If ghost line prevention is enabled and the text data is empty, render
  // nothing to avoid React Native painting a 20px height line.
  // See also https://git.io/JErwX
  if (
    props.tnode.data === '' &&
    props.sharedProps.enableExperimentalGhostLinesPrevention
  ) {
    return null;
  }
  return React.createElement(TStandardTextRenderer, props);
}
