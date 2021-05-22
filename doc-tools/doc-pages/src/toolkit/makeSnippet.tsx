import type { RenderHTMLProps } from 'react-native-render-html';
import { RendererCardConfig, StatementDeclaration } from './toolkit-types';
import defaultImports from './defaultImports';

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
    if (!(key in fnSrcMap)) {
      //@ts-ignore
      output += `const ${key} = ${serializeValue(
        key as any,
        //@ts-ignore
        props[key],
        config
      )};\n\n`;
    }
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

function mergeStatements(
  statement1: StatementDeclaration,
  statement2: StatementDeclaration
): StatementDeclaration {
  return {
    package: statement1.package,
    default: statement1.default || statement2.default,
    named: [...(statement1.named || []), ...(statement2.named || [])]
  };
}

function serializeStatement({
  package: pkg,
  default: dft,
  named
}: StatementDeclaration): string {
  const hasNamedImports = !!named?.length;
  return `import ${dft || ''}${dft && hasNamedImports ? ', ' : ''}${
    hasNamedImports ? `{ ${named!.join(', ')} }` : ''
  } from '${pkg}';`;
}

function flattenStatements(importStmts: StatementDeclaration[]) {
  const mergeReg: Record<string, boolean> = {
    react: false,
    'react-native': false,
    'react-native-render-html': false
  };
  const merged = importStmts.map((stmt) => {
    if (stmt.package in defaultImports) {
      mergeReg[stmt.package] = true;
      return mergeStatements(defaultImports[stmt.package], stmt);
    }
    return stmt;
  });
  const unmergedBaseStmts = Object.entries(mergeReg)
    .map(([key, isMerged]) => {
      if (isMerged) {
        return null;
      }
      return defaultImports[key];
    })
    .filter((s) => s !== null);
  return [...unmergedBaseStmts, ...merged] as StatementDeclaration[];
}

export default function makeSnippet(
  props: RenderHTMLProps,
  config: Required<RendererCardConfig>,
  includeSafeAreaView: boolean
) {
  const importStmts = includeSafeAreaView
    ? [
        ...config.importStatements,
        {
          package: 'react-native-safe-area-context',
          named: ['SafeAreaView']
        }
      ]
    : config.importStatements;
  const returnStmt = includeSafeAreaView
    ? `
    <SafeAreaView>
      <RenderHtml
        contentWidth={width}
${inlineProps(props, 8)}      />
    </SafeAreaView>
`
    : `
    <RenderHtml
      contentWidth={width}
${inlineProps(props, 6)}    />
`;
  return `${flattenStatements(importStmts).map(serializeStatement).join('\n')}

${declareProps(props, config)}\
export default function App() {
  const { width } = useWindowDimensions();
  return (${returnStmt}  );
}`;
}
