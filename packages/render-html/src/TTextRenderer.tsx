import React from 'react';
import { Text } from 'react-native';
import { TText } from '@native-html/transient-render-engine';
import {
  CustomTagRenderer,
  CustomTagRendererProps,
  DefaultTagRenderer,
  TDefaultRenderer,
  TDefaultRendererProps,
  TNodeRendererProps
} from './shared-types';
import {
  useInternalTextRenderer,
  useRendererConfig
} from './context/RenderRegistryProvider';
import { useDefaultTextProps } from './context/SharedPropsContext';

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

function TStandardTextRenderer({
  tnode,
  key,
  hasAnchorAncestor
}: TNodeRendererProps<TText>) {
  const { Default, Custom } = useRendererConfig(tnode);
  const textProps = useDefaultTextProps();
  const style = {
    ...tnode.styles.nativeBlockFlow,
    ...tnode.styles.nativeBlockRet,
    ...tnode.styles.nativeTextFlow,
    ...tnode.styles.nativeTextRet
  };
  const commonProps: CustomTagRendererProps<TText> = {
    key: key,
    tnode: tnode,
    style,
    hasAnchorAncestor,
    textProps,
    viewProps: {},
    type: 'text',
    TDefaultRenderer: TDefaultTextRenderer,
    DefaultTagRenderer:
      Default || (TDefaultTextRenderer as DefaultTagRenderer<TText>)
  };
  const Root = (Custom ??
    Default ??
    TDefaultTextRenderer) as CustomTagRenderer<TText>;
  return React.createElement(Root, commonProps);
}

export default function TTextRenderer(props: TNodeRendererProps<TText>) {
  const InternalTextRenderer = useInternalTextRenderer(props.tnode);
  if (InternalTextRenderer) {
    return React.createElement(InternalTextRenderer, { key: props.key });
  }
  return React.createElement(TStandardTextRenderer, props);
}
