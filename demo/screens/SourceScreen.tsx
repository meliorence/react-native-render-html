import { StackScreenProps } from '@react-navigation/stack';
import React, { PropsWithChildren } from 'react';
import { useColorScheme, ViewProps } from 'react-native';
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import { solarizedlight, darcula } from 'react-syntax-highlighter/styles/prism';
import BidirectionalScrollView from '../components/BidirectionalScrollView';

export interface SourceRenderer {
  htmlSource: string;
}

function Container({ children }: PropsWithChildren<ViewProps>) {
  return (
    <BidirectionalScrollView padding={10}>{children}</BidirectionalScrollView>
  );
}

export default function SourceScreen({ route }: StackScreenProps<any>) {
  const html = route.params;
  const colorMode = useColorScheme();
  return (
    <SyntaxHighlighter
      language="html"
      fontSize={12}
      highlighter="prism"
      PreTag={Container}
      style={colorMode === 'dark' ? darcula : solarizedlight}>
      {html}
    </SyntaxHighlighter>
  );
}
