import React from 'react';
import type { JSONOutput } from 'typedoc';
import { TokenKeyword, TokenPunctuation, TokenType } from './tokens';
import renderType from './renderType';
import Indent from './Indent';
import Params from './Params';
import reduceReflectionsWith from './reduceReflectionsWith';

function renderTypeParam(
  typeParam: JSONOutput.TypeParameterReflection,
  params: Params
) {
  const nameToken = <TokenType>{typeParam.name}</TokenType>;
  return (
    <>
      <Indent indent={2} />
      {params.resolveTypeParamsLinks ? (
        <a href={`#${typeParam.name.toLowerCase()}`}>{nameToken}</a>
      ) : (
        nameToken
      )}
      {typeParam.type && (
        <>
          <code> </code>
          <TokenKeyword>extends</TokenKeyword>
          <code> </code>
          {renderType(typeParam.type, params)}
        </>
      )}
    </>
  );
}

export default function renderTypeParameters(
  typeParams: JSONOutput.TypeParameterReflection[],
  params: Params
) {
  if (!typeParams) {
    return null;
  }
  return (
    <>
      <TokenPunctuation>&lt;</TokenPunctuation>
      {typeParams.reduce(
        reduceReflectionsWith(',', params, renderTypeParam, true),
        null
      )}
      <br />
      <Indent indent={params.indent} />
      <TokenPunctuation>&gt;</TokenPunctuation>
    </>
  );
}
