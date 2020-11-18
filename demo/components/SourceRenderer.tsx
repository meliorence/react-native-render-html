import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { useColorScheme } from 'react-native';
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import { solarizedlight, darcula } from 'react-syntax-highlighter/styles/prism';

export interface SourceRenderer {
  htmlSource: string;
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
      style={colorMode === 'dark' ? darcula : solarizedlight}>
      {html}
    </SyntaxHighlighter>
  );
}
