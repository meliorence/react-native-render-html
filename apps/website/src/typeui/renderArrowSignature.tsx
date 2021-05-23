import React from 'react';
import type { JSONOutput } from 'typedoc';
import { TokenPunctuation, TokenPrimitive } from './tokens';
import Indent from './Indent';
import renderType from './renderType';
import renderSignatureParams from './renderSignatureParams';
import Params from './Params';
import renderTypeParameters from './renderTypeParameters';

export default function renderArrowSignature(
  signature: JSONOutput.SignatureReflection,
  params: Params
) {
  if (!signature.type) {
    console.warn('Did not render signature', signature);
  }
  const shouldBreak = signature.parameters?.length > 2;
  return (
    <>
      {signature.typeParameter &&
        renderTypeParameters(signature.typeParameter, params)}
      <TokenPunctuation>(</TokenPunctuation>
      {shouldBreak && <br />}
      {renderSignatureParams(signature, shouldBreak, params.withIndent())}
      {shouldBreak && <br />}
      {shouldBreak && <Indent indent={params.indent} />}
      <TokenPunctuation>)</TokenPunctuation>{' '}
      <TokenPunctuation>{'=>'}</TokenPunctuation>{' '}
      {signature.type ? (
        renderType(signature.type, params)
      ) : (
        <TokenPrimitive>void</TokenPrimitive>
      )}
    </>
  );
}
