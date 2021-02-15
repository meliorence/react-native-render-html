import React from 'react';
import { Text } from 'react-native';
import { TText } from '@native-html/transient-render-engine';
import {
  TDefaultRenderer,
  TDefaultRendererProps,
  TNodeSubRendererProps
} from './shared-types';
import { useInternalTextRenderer } from './context/RenderRegistryProvider';
import useAssembledCommonProps from './hooks/useAssembledCommonProps';

export const TDefaultTextRenderer: TDefaultRenderer<TText> = ({
  tnode,
  textProps,
  onPress,
  children,
  style
}: TDefaultRendererProps<TText>) => {
  const resolvedStyles = textProps?.style ? [style, textProps.style] : style;
  return (
    <Text
      onPress={onPress}
      {...textProps}
      style={resolvedStyles}
      testID={tnode.tagName || undefined}>
      {children ?? tnode.data}
    </Text>
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
