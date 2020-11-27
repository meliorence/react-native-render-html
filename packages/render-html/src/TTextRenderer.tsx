import React from 'react';
import { Text } from 'react-native';
import { TText } from '@native-html/transient-render-engine';
import {
  TDefaultRenderer,
  TDefaultRendererProps,
  TNodeGenericRendererProps,
  TRendererBaseProps
} from './shared-types';
import {
  useInternalTextRenderer,
  useRegisteredRenderer
} from './context/RenderRegistryProvider';
import isLiteRendererDeclaration from './render/isLiteRendererDeclaration';

export const TDefaultTextRenderer: TDefaultRenderer<TText> = ({
  tnode,
  textProps,
  onPress,
  children,
  style
}: TDefaultRendererProps<TText>) => {
  const resolvedStyles = textProps?.style ? [style, textProps.style] : style;
  return (
    <Text onPress={onPress} {...textProps} style={resolvedStyles}>
      {children ?? tnode.data}
    </Text>
  );
};

function TStandardTextRenderer({
  tnode,
  key,
  hasAnchorAncestor
}: TNodeGenericRendererProps<TText>) {
  const RegisteredRenderer = useRegisteredRenderer(tnode);
  const commonProps: TRendererBaseProps<TText> = {
    key: key,
    tnode: tnode,
    hasAnchorAncestor: hasAnchorAncestor,
    style: {
      ...tnode.styles.nativeBlockFlow,
      ...tnode.styles.nativeBlockRet,
      ...tnode.styles.nativeTextFlow,
      ...tnode.styles.nativeTextRet
    },
    textProps: {},
    viewProps: {},
    type: 'text'
  };
  if (isLiteRendererDeclaration(RegisteredRenderer)) {
    return React.createElement(
      TDefaultTextRenderer,
      RegisteredRenderer.deriveTDefaultPropsForTNode(commonProps)
    );
  }
  if (typeof RegisteredRenderer === 'function') {
    return React.createElement(RegisteredRenderer, {
      ...commonProps,
      TDefaultRenderer: TDefaultTextRenderer
    });
  }
  return React.createElement(TDefaultTextRenderer, commonProps);
}

export default function TTextRenderer(props: TNodeGenericRendererProps<TText>) {
  const InternalTextRenderer = useInternalTextRenderer(props.tnode);
  if (InternalTextRenderer) {
    return React.createElement(InternalTextRenderer, { key: props.key });
  }
  return React.createElement(TStandardTextRenderer, props);
}
