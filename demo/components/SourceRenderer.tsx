import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import SyntaxHighlighter from 'react-native-syntax-highlighter';

export interface SourceRenderer {
  htmlSource: string;
}

export default function SourceRenderer({
  route,
  navigation
}: StackScreenProps<any>) {
  const html = route.params;
  return (
    <SyntaxHighlighter
      language="html"
      fontSize={10}
      highlighter={'prism'}>
      {html}
    </SyntaxHighlighter>
  );
}
