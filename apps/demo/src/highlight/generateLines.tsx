/**
 * Transform this complex tree into a flatten tree with simple nodes
 *
 * @param nodes
 */
function flattenNodes(node: lowlight.HastNode): SimpleNode[] {
  if (node.type === 'element') {
    return node.children.flatMap((_child) => {
      const child = _child as lowlight.HastNode;
      if (child.type === 'element') {
        return flattenNodes(child as any);
      }
      if (child.type === 'text') {
        return {
          type: 'simple',
          text: child.value,
          className: node.properties.className
        };
      }
      throw new Error('Unexpected state!');
    });
  }
  if (node.type === 'text') {
    return [
      {
        type: 'simple',
        text: node.value
      }
    ];
  }
  throw new Error('Unhandled state!');
}

const linebreak = Symbol('linebreak');

type LineBreak = typeof linebreak;

function insertLines(
  flattenNodes: SimpleNode[]
): Array<SimpleNode | LineBreak> {
  return flattenNodes
    .map((node) => {
      const lines = node.text.split('\n');
      if (lines.length > 1) {
        return lines.reduce<Array<SimpleNode | LineBreak>>((previous, text) => {
          const current = {
            type: 'simple',
            text,
            className: node.className
          } as const;
          if (previous.length) {
            return [...previous, linebreak, current];
          }
          return [current];
        }, [] as Array<SimpleNode | LineBreak>);
      }
      return node;
    })
    .flat();
}

function makeLines(nodes: Array<SimpleNode | LineBreak>): SimpleNode[][] {
  let breakIndex: number;
  const lines: SimpleNode[][] = [];
  while ((breakIndex = nodes.indexOf(linebreak)) !== -1) {
    const line = nodes.splice(0, breakIndex);
    nodes.shift();
    lines.push(line as SimpleNode[]);
  }
  lines.push(nodes as SimpleNode[]);
  return lines;
}

export type SimpleNode = {
  type: 'simple';
  text: string;
  className?: string[];
};

export default function generateLines(
  tree: lowlight.HastNode[]
): SimpleNode[][] {
  const flattenTree = tree.flatMap(flattenNodes);
  return makeLines(insertLines(flattenTree));
}
