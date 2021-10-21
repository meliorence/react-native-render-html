import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo
} from 'react';
import { highlight } from 'lowlight';
import {
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewProps,
  StyleSheet
} from 'react-native';
import StylesheetsProvider, { HighlightJsStyles } from './StylesheetsProvider';
import highlighterStylesheetsContext from './highlighterStylesheetsContext';
import generateLines, { SimpleNode } from './generateLines';
// import * as html from 'highlight.js/lib/languages/html';
// registerLanguage('html', html);

export interface HighlighterProps extends ViewProps {
  content: string;
  language: 'html' | 'js' | 'jsx' | 'xml';
  highlightJsStyle: HighlightJsStyles;
  fontSize?: number;
  fontFamily?: string;
  lineNumberFontSize?: number;
  lineNumberFontFamily?: string;
  lineNumberStyle?: StyleProp<TextStyle>;
  lineStyle?: StyleProp<TextStyle>;
  /**
   * When `true`, end overflowing lines with ellipsis.
   */
  clipLines?: boolean;
  paddingTop?: number;
  paddingBottom?: number;
  showLineNumbers?: boolean;
  /**
   * A function which returns a string representation of the line number.
   *
   * @example
   * ```js
   * function lineNumberFormatter(lineNumber) {
   *   return Number(lineNumber).toFixed(0).padStart(2, '0');
   * }
   * ```
   */
  lineNumberFormatter?: (lineNumber: number) => string;
  /**
   * A function to compute the desired width of the line number display.
   */
  lineNumberDisplayWidthComputer?: (
    fontSize: number,
    maxLineNumberCharLength: number
  ) => number;
}

const styles = StyleSheet.create({
  line: { flexDirection: 'row' },
  container: { flexGrow: 1, flexDirection: 'column', overflow: 'hidden' }
});

function RenderLine({
  line,
  index
}: PropsWithChildren<{ line: SimpleNode[]; index: number }>) {
  const {
    clipLines,
    lineStyle,
    lineNumberStyle,
    lineNumberFormatter,
    showLineNumbers
  } = useContext(formattingSpecContext);
  const content = (
    <Text
      numberOfLines={clipLines ? 1 : undefined}
      lineBreakMode="tail"
      textBreakStrategy="simple"
      style={lineStyle}>
      {line.map((n, i) =>
        React.createElement(RenderSimpleNode, { node: n, key: i })
      )}
    </Text>
  );
  if (!showLineNumbers) {
    return content;
  }
  return (
    <View style={styles.line}>
      <Text style={lineNumberStyle}>{lineNumberFormatter(index + 1)}</Text>
      {content}
    </View>
  );
}

function RenderSimpleNode({ node }: { node: SimpleNode }) {
  const { contentStylesheet } = useContext(highlighterStylesheetsContext);
  const className = node.className;
  return (
    <Text style={className?.map((n) => contentStylesheet[n])}>{node.text}</Text>
  );
}

function RenderDocument({ lines }: { lines: SimpleNode[][] }) {
  return (
    <>
      {lines.map((l, i) =>
        React.createElement(RenderLine, { line: l, key: i, index: i })
      )}
    </>
  );
}
type FormattingSpecs = Pick<
  Required<HighlighterProps>,
  | 'lineNumberStyle'
  | 'lineStyle'
  | 'lineNumberFormatter'
  | 'clipLines'
  | 'showLineNumbers'
>;

const formattingSpecContext = createContext<FormattingSpecs>({} as any);

function Padding({
  lineNumberStyle,
  value
}: {
  lineNumberStyle: TextStyle;
  value?: number;
}) {
  const { showLineNumbers } = useContext(formattingSpecContext);
  if (!value) {
    return null;
  }
  const { backgroundColor, width } = lineNumberStyle;
  return (
    <Text
      style={[showLineNumbers && { backgroundColor }, { height: value, width }]}
    />
  );
}

const defaultLineNumberFormatter = (number: number) =>
  Number(number).toFixed(0);

const defaultLineNumberDisplayWidthComputer = (
  fontSize: number,
  lenght: number
) => {
  return fontSize * lenght;
};

function HighlighterContent({
  content,
  language,
  clipLines = false,
  fontSize = 14,
  fontFamily,
  lineNumberFontFamily,
  lineNumberFontSize,
  lineNumberStyle: userLineNumberStyle,
  lineStyle: userLineStyle,
  style,
  paddingTop,
  paddingBottom,
  showLineNumbers = false,
  lineNumberFormatter = defaultLineNumberFormatter,
  lineNumberDisplayWidthComputer = defaultLineNumberDisplayWidthComputer,
  ...viewProps
}: Omit<HighlighterProps, 'highlightJsStyle'>) {
  const lines = useMemo(
    () => generateLines(highlight(language, content).value),
    [content, language]
  );
  const { containerStylesheet } = useContext(highlighterStylesheetsContext);
  const syntheticLineNumberFontSize = lineNumberFontSize ?? fontSize;
  const syntheticLineNumberFontFamily = lineNumberFontFamily ?? fontFamily;
  const lineStyle = useMemo(
    () => [
      containerStylesheet.text,
      {
        flexGrow: 1,
        flexShrink: 1,
        fontFamily,
        fontSize,
        lineHeight: fontSize * 1.4
      },
      userLineStyle
    ],
    [containerStylesheet.text, fontFamily, fontSize, userLineStyle]
  );
  const lineNumberWidth = useMemo(() => {
    const numberDisplayLength = lineNumberFormatter(lines.length + 1).length;
    return lineNumberDisplayWidthComputer(fontSize, numberDisplayLength);
  }, [
    fontSize,
    lineNumberDisplayWidthComputer,
    lineNumberFormatter,
    lines.length
  ]);
  const lineNumberStyle: TextStyle = useMemo(() => {
    return StyleSheet.flatten([
      containerStylesheet.text,
      {
        width: lineNumberWidth,
        textAlign: 'center',
        overflow: 'visible',
        fontSize: syntheticLineNumberFontSize,
        fontFamily: syntheticLineNumberFontFamily,
        flexShrink: 0
      },
      userLineNumberStyle
    ]);
  }, [
    containerStylesheet.text,
    lineNumberWidth,
    syntheticLineNumberFontFamily,
    syntheticLineNumberFontSize,
    userLineNumberStyle
  ]);
  return (
    <formattingSpecContext.Provider
      key={content}
      value={{
        clipLines,
        lineNumberFormatter,
        lineNumberStyle,
        lineStyle,
        showLineNumbers
      }}>
      <View
        style={[containerStylesheet.container, styles.container, style]}
        {...viewProps}>
        <Padding lineNumberStyle={lineNumberStyle} value={paddingTop} />
        <RenderDocument lines={lines} />
        <Padding lineNumberStyle={lineNumberStyle} value={paddingBottom} />
      </View>
    </formattingSpecContext.Provider>
  );
}

export default function Highlighter({
  highlightJsStyle = 'darcula',
  ...props
}: HighlighterProps) {
  return (
    <StylesheetsProvider style={highlightJsStyle}>
      <HighlighterContent {...props} />
    </StylesheetsProvider>
  );
}
