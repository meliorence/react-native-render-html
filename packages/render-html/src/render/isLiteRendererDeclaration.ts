import { LiteRendererDeclaration } from './render-types';

export default function isLiteRendererDeclaration(
  candidate: any
): candidate is Required<LiteRendererDeclaration<any>> {
  return (
    typeof candidate === 'object' &&
    candidate?.model &&
    typeof candidate?.deriveTDefaultPropsFromTNode === 'function'
  );
}
