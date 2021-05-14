import type { RenderHTMLProps } from 'react-native-render-html';

function serializeValue(
  key: keyof RenderHTMLProps,
  value: RenderHTMLProps[keyof RenderHTMLProps],
  fnSrcMap: Record<string, string>,
  exprSrcMap: Record<string, string>,
  indent: number = 1
) {
  let ret = '';
  const pad = '  '.repeat(indent);
  if (key in exprSrcMap) {
    return exprSrcMap[key];
  }
  switch (typeof value) {
    case 'number':
    case 'bigint':
    case 'boolean':
      ret = String(value);
      break;
    case 'function':
      if (value.name in fnSrcMap) {
        ret = value.name;
      } else {
        throw new Error(
          `Attempted to serialize a function "${value.name}" but no source mapping was found.`
        );
      }
      break;
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
          return `${pad}${key}: ${serializeValue(
            key as any,
            val,
            fnSrcMap,
            exprSrcMap,
            indent + 1
          )}`;
        })
        .join(',\n');
      ret = `{\n${output}\n${'  '.repeat(indent - 1)}}`;
  }
  return ret;
}

function declareProps(
  props: RenderHTMLProps,
  fnSrcMap: Record<string, string>,
  exprSrcMap: Record<string, string>
) {
  let output = '';
  for (const key in fnSrcMap) {
    output += `${fnSrcMap[key]}\n\n`;
  }
  for (const key in props) {
    //@ts-ignore
    output += `const ${key} = ${serializeValue(
      key as any,
      //@ts-ignore
      props[key],
      fnSrcMap,
      exprSrcMap
    )};\n\n`;
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

export default function makeSnippet(
  props: RenderHTMLProps,
  fnSrcMap: Record<string, string>,
  exprSrcMap: Record<string, string>
) {
  return `import React from 'react';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';

${declareProps(props, fnSrcMap, exprSrcMap)}\
export default function App() {
  const { width } = useWindowDimensions();
  return (
    <RenderHtml
      contentWidth={width}
${inlineProps(props, 6)}    />
  );
}`;
}
