import type { RenderHTMLProps } from 'react-native-render-html';

function serializeValue(
  value: RenderHTMLProps[keyof RenderHTMLProps],
  indent: number = 1
) {
  let ret = '';
  const pad = '  '.repeat(indent);
  switch (typeof value) {
    case 'number':
    case 'bigint':
    case 'boolean':
      ret = String(value);
      break;
    case 'function':
      throw new Error('Cannot (yet) serialize a function');
    case 'string':
      if (value.match('\n')) {
        ret = `\`${value.replace('`', '\\`')}\``;
      } else {
        ret = value.match(/'/) ? `"${value}"` : `'${value}'`;
      }

      break;
    case 'object':
      let output = '';
      output = Object.entries(value)
        .map(([key, val]) => {
          return `${pad}${key}: ${serializeValue(val, indent + 1)}`;
        })
        .join(',\n');
      ret = `{\n${output}\n${'  '.repeat(indent - 1)}}`;
  }
  return ret;
}

function declareProps(props: RenderHTMLProps) {
  let output = '';
  for (const key in props) {
    //@ts-ignore
    output += `const ${key} = ${serializeValue(props[key])};\n\n`;
  }
  return output;
}

function inlineProps(props: RenderHTMLProps, padLeft: number) {
  let ret: string[] = [];
  for (const key in props) {
    ret.push(`${key}={${key}}`);
  }
  return ret.reduce((prev, curr) => {
    return prev + ' '.repeat(padLeft) + curr + '\n';
  }, '');
}

export default function makeSnippet(props: RenderHTMLProps) {
  return `import React from 'react';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';

${declareProps(props)}\
export default function App() {
  const { width } = useWindowDimensions();
  return (
    <RenderHtml
      contentWidth={width}
${inlineProps(props, 6)}    />
  );
}`;
}
