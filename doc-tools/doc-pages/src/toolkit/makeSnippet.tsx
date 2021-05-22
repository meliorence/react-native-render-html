import type { RenderHTMLProps } from 'react-native-render-html';
import { RendererCardConfig, ImportStmt } from './toolkit-types';
import defaultImports from './defaultImports';

function normalizeKey(key: string) {
  return key.match(/-/) ? `'${key}'` : key;
}

function serializePrimitive(value: boolean | bigint | number | string) {
  let ret = '';
  switch (typeof value) {
    case 'number':
    case 'bigint':
    case 'boolean':
      ret = String(value);
      break;
    case 'string':
      if (value.match('\n')) {
        ret = `\`${value.replace('`', '\\`')}\``;
      } else {
        ret = value.match(/'/) ? `"${value}"` : `'${value}'`;
      }
      break;
  }
  return ret;
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
    case 'function':
      if (value.name in fnSrcMap) {
        ret = value.name;
      } else {
        throw new Error(
          `Attempted to serialize a function "${value.name}" but no source mapping was found.`
        );
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
      break;
    default:
      ret = serializePrimitive(value);
  }
  return ret;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function isPrimitiveProp([_key, value]: [key: string, value: any]) {
  return (
    typeof value === 'boolean' ||
    (typeof value === 'string' && !value.match('\n')) ||
    typeof value === 'bigint' ||
    typeof value === 'number'
  );
}

function declareProps(
  props: [key: string, value: any][],
  config: Required<RendererCardConfig>
) {
  const { fnSrcMap } = config;
  let output = '';
  for (const key in fnSrcMap) {
    output += `${fnSrcMap[key]}\n\n`;
  }
  for (const [key, value] of props) {
    if (!(key in fnSrcMap)) {
      //@ts-ignore
      output += `const ${key} = ${serializeValue(key, value, config)};\n\n`;
    }
  }
  return output;
}

function inlineProps(
  declaredProps: [key: string, value: any][],
  primitiveProps: [key: string, value: boolean | number | bigint | string][]
) {
  let ret: string[] = [];
  for (const entry of declaredProps) {
    ret.push(`${entry[0]}={${entry[0]}}`);
  }
  for (const entry of primitiveProps) {
    const isString = typeof entry[1] === 'string';
    const rightHand = isString
      ? serializePrimitive(entry[1])
      : `{${serializePrimitive(entry[1])}}`;
    ret.push(`${entry[0]}=${rightHand}`);
  }
  return ret;
}

function mergeStatements(
  statement1: ImportStmt,
  statement2: ImportStmt
): ImportStmt {
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
}: ImportStmt): string {
  const hasNamedImports = !!named?.length;
  return `import ${dft || ''}${dft && hasNamedImports ? ', ' : ''}${
    hasNamedImports ? `{ ${named!.join(', ')} }` : ''
  } from '${pkg}';`;
}

function flattenStatements(importStmts: ImportStmt[]) {
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
  return [...unmergedBaseStmts, ...merged] as ImportStmt[];
}

interface JSXElementExp {
  name: string;
  inlineProps?: string[];
  children: JSXElementExp[];
}

function createJSXStmt(expr: JSXElementExp, indent = 4): string {
  const padd = ' '.repeat(indent);
  const inlinePropsExpr = expr.inlineProps?.length
    ? expr.inlineProps.map((p) => `\n${' '.repeat(indent + 2)}${p}`).join('')
    : '';
  if (expr.children.length) {
    return `${padd}<${expr.name}${inlinePropsExpr}>\n${
      expr.children.length
        ? expr.children.map((e) => createJSXStmt(e, indent + 2))
        : ''
    }\n${padd}</${expr.name}>`;
  }
  return `${padd}<${expr.name}${inlinePropsExpr}\n${padd}/>`;
}

export default function makeSnippet(
  props: RenderHTMLProps,
  config: Required<RendererCardConfig>,
  includeSafeAreaView: boolean
) {
  const propsEntries = Object.entries(props);
  const primitiveProps = propsEntries.filter(isPrimitiveProp);
  const declaredProps = propsEntries.filter((en) => !isPrimitiveProp(en));
  const importStmts = includeSafeAreaView
    ? [
        ...config.importStatements,
        {
          package: 'react-native-safe-area-context',
          named: ['SafeAreaView']
        }
      ]
    : config.importStatements;
  const innerExpr: JSXElementExp = {
    name: 'RenderHtml',
    children: [],
    inlineProps: inlineProps(declaredProps, primitiveProps)
  };
  const wrapperExpr: JSXElementExp = config.wrapperComponent
    ? {
        name: config.wrapperComponent,
        children: [innerExpr]
      }
    : innerExpr;
  const safeExpr: JSXElementExp = includeSafeAreaView
    ? {
        name: 'SafeAreaView',
        children: [wrapperExpr]
      }
    : wrapperExpr;
  const returnStmt = createJSXStmt(safeExpr);
  return `${flattenStatements(importStmts).map(serializeStatement).join('\n')}

${declareProps(declaredProps, config)}\
export default function App() {
  const { width } = useWindowDimensions();
  return (\n${returnStmt}\n  );
}`;
}
