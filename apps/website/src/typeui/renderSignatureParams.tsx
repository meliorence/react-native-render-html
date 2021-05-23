import React from 'react';
import type { JSONOutput } from 'typedoc';
import { TokenPunctuation, TokenAttrName, TokenLiteral } from './tokens';
import Indent from './Indent';
import renderType from './renderType';
import Params from './Params';

export default function renderSignatureParams(
  signature: JSONOutput.SignatureReflection,
  shouldBreak: boolean,
  params: Params
) {
  return signature.parameters?.reduce((prev: any, curr) => {
    const paramName = curr.name === '__namedParameters' ? 'props' : curr.name;
    const namedToken = (
      <TokenAttrName>
        {curr.name === '__namedParameters' ? 'props' : curr.name}
      </TokenAttrName>
    );
    const isOptional = curr.flags.isOptional;
    return (
      <>
        {prev}
        {prev && <TokenPunctuation>,</TokenPunctuation>}
        {prev && shouldBreak ? <br /> : null}
        {shouldBreak && <Indent indent={params.indent} />}
        {prev && (shouldBreak ? null : <code> </code>)}
        {params.resolveMembersLinks ? (
          <a href={`#${paramName}`}>{namedToken}</a>
        ) : (
          namedToken
        )}
        {isOptional && <TokenPunctuation>?</TokenPunctuation>}
        <TokenPunctuation>: </TokenPunctuation>
        {renderType(curr.type, params)}
        {typeof curr.defaultValue === 'string' && (
          <>
            <TokenPunctuation> = </TokenPunctuation>
            <TokenLiteral>{curr.defaultValue}</TokenLiteral>
          </>
        )}
      </>
    );
  }, null);
}
