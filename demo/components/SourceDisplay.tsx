import React, { PropsWithChildren } from 'react';
import {
  StyleProp,
  useColorScheme,
  View,
  ViewProps,
  ViewStyle
} from 'react-native';
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

export default function SourceDisplay({
  html,
  style
}: {
  html: string;
  style?: StyleProp<ViewStyle>;
}) {
  const colorMode = useColorScheme();
  return (
    <View style={style}>
      <View style={{ marginTop: -10, marginBottom: -10 }}>
        <SyntaxHighlighter
          language="html"
          fontSize={12}
          highlighter="prism"
          PreTag={Container}
          style={colorMode === 'dark' ? darcula : solarizedlight}>
          {html}
        </SyntaxHighlighter>
      </View>
    </View>
  );
}
