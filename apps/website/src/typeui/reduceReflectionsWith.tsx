import React from 'react';
import type { JSONOutput } from 'typedoc';
import Params from './Params';
import { TokenPunctuation } from './tokens';
import Indent from './Indent';

export default function reduceReflectionsWith(
  punct: string | null,
  params: Params,
  renderCurrent: (curr: JSONOutput.DeclarationReflection, p: Params) => any,
  shouldBreak?: boolean
) {
  return (prev: any, curr: JSONOutput.DeclarationReflection) => (
    <>
      {prev}
      {prev && punct && <TokenPunctuation>{punct}</TokenPunctuation>}
      {shouldBreak && (
        <>
          <br />
          <Indent indent={params.indent} />
        </>
      )}
      {renderCurrent(curr, params)}
    </>
  );
}
