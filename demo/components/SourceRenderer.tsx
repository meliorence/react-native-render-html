import { StackScreenProps } from '@react-navigation/stack';
import React, { PropsWithChildren } from 'react';
import { useColorScheme, View, ViewProps, ViewStyle } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import { solarizedlight, darcula } from 'react-syntax-highlighter/styles/prism';
import BidirectionalScrollView from './BidirectionalScrollView';

export interface SourceRenderer {
  htmlSource: string;
}

function Container({ children }: PropsWithChildren<ViewProps>) {
  return (
    <BidirectionalScrollView padding={10}>
      {children}
    </BidirectionalScrollView>
  );
}

export default function SourceRenderer({
  route,
  navigation
}: StackScreenProps<any>) {
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
