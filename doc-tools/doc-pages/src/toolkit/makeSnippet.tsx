import type { RenderHTMLProps } from 'react-native-render-html';
import { RendererCardConfig } from './toolkit-types';

function normalizeKey(key: string) {
  return key.match(/-/) ? `'${key}'` : key;
}

function serializeValue(
  key: keyof RenderHTMLProps,
  value: RenderHTMLProps[keyof RenderHTMLProps],
  config: Required<RendererCardConfig>,
  indent: number = 1
) {
  const { exprSrcMap, fnSrcMap } = config;
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
          return `${pad}${normalizeKey(key)}: ${serializeValue(
            key as any,
            val,
            config,
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
  config: Required<RendererCardConfig>
) {
  const { fnSrcMap } = config;
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
      config
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
  config: Required<RendererCardConfig>
) {
  return `import React from 'react';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
${config.importStatements.join('\n')}

${declareProps(props, config)}\
export default function App() {
  const { width } = useWindowDimensions();
  return (
    <RenderHtml
      contentWidth={width}
${inlineProps(props, 6)}    />
  );
}`;
}
