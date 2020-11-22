import React, { PropsWithChildren } from 'react';
import { useColorScheme, ViewProps } from 'react-native';
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import { solarizedlight, darcula } from 'react-syntax-highlighter/styles/prism';
import BidirectionalScrollView from '../components/BidirectionalScrollView';
import DisplayLoading from '../components/DisplayLoading';
import { useSelectedHTML } from '../state/store';

export interface SourceRenderer {
  htmlSource: string;
}

function Container({ children }: PropsWithChildren<ViewProps>) {
  return (
    <BidirectionalScrollView padding={10}>{children}</BidirectionalScrollView>
  );
}

export default function SourceScreen() {
  const html = useSelectedHTML();
  const colorMode = useColorScheme();
  return html ? (
    <SyntaxHighlighter
      language="html"
      fontSize={12}
      highlighter="prism"
      PreTag={Container}
      style={colorMode === 'dark' ? darcula : solarizedlight}>
      {html}
    </SyntaxHighlighter>
  ) : (
    <DisplayLoading />
  );
}
