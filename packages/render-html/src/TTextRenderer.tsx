import React from 'react';
import { Text } from 'react-native';
import { TText } from '@native-html/transient-render-engine';
import {
  NativeTextStyles,
  TDefaultRenderer,
  TDefaultRendererProps,
  TNodeGenericRendererProps
} from './shared-types';
import {
  useInternalTextRenderer,
  useRegisteredRenderer
} from './context/RenderRegistryProvider';
import isLiteRendererDeclaration from './render/isLiteRendererDeclaration';

export const TDefaultTextRenderer: TDefaultRenderer<TText> = ({
  tnode,
  hasAnchorAncestor,
  ...props
}: TDefaultRendererProps<TText>) => <Text {...props}>{tnode.data}</Text>;

function TStandardTextRenderer({
  tnode,
  key,
  hasAnchorAncestor
}: TNodeGenericRendererProps<TText>) {
  const RegisteredRenderer = useRegisteredRenderer(tnode);
  const commonProps: TDefaultRendererProps<TText> = {
    key: key,
    tnode: tnode,
    hasAnchorAncestor: hasAnchorAncestor,
    style: [
      tnode.styles.nativeBlockFlow,
      tnode.styles.nativeBlockRet,
      tnode.styles.nativeTextFlow,
      tnode.styles.nativeTextRet
    ] as NativeTextStyles
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
