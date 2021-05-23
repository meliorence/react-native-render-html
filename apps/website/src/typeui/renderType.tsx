import React from 'react';
import { JSONOutput } from 'typedoc';
import {
  TokenPunctuation,
  TokenPrimitive,
  TokenKeyword,
  TokenPlain,
  TokenLiteral,
  TokenType,
  TokenAttrName
} from './tokens';
import renderReflection from './renderReflection';
import Params from './Params';
import Indent from './Indent';

type DeclarationType = JSONOutput.DeclarationReflection['type'];

function renderTypeArgument(
  typeArguments: JSONOutput.SomeType[],
  params: Params
) {
  if (!typeArguments) {
    return null;
  }
  return (
    <>
      <TokenPunctuation>&lt;</TokenPunctuation>
      {typeArguments.reduce(
        (prev, curr) => (
          <>
            {prev}
            {prev && <TokenPunctuation>, </TokenPunctuation>}
            {renderType(curr, params)}
          </>
        ),
        null
      )}
      <TokenPunctuation>&gt;</TokenPunctuation>
    </>
  );
}

export default function renderType(pt: DeclarationType, params: Params) {
  let shouldBreak = false;
  let nextParams: Params = params;
  switch (pt.type) {
    case 'reference':
      const ref = pt as JSONOutput.ReferenceType;
      let name = ref.name;
      // We must resolve reflections because of a bug in Typedoc with default exports
      const isLocalRef = 'id' in ref && !!params.resolveReflection(ref.id);
      if (isLocalRef) {
        name = params.resolveReflection(ref.id).name;
      }
      const nameToken = <TokenType>{name}</TokenType>;
      return (
        <>
          {isLocalRef ? (
            <a href={`./${ref.name.toLowerCase()}`}>{nameToken}</a>
          ) : (
            nameToken
          )}
          {renderTypeArgument(ref.typeArguments, params)}
        </>
      );
    case 'intrinsic':
      return (
        <TokenPrimitive>{(pt as JSONOutput.IntrinsicType).name}</TokenPrimitive>
      );
    case 'union':
      const union = pt as JSONOutput.UnionType;
      shouldBreak = union.types.length > 2;
      return union.types
        .map((u) => renderType(u, params))
        .reduce((prev, curr) => (
          <>
            {prev}
            {shouldBreak && <br />}
            {shouldBreak && <Indent indent={params.indent + 2} />}
            <TokenPunctuation title="or">
              {!shouldBreak && ' '}
              {'| '}
            </TokenPunctuation>
            {curr}
          </>
        ));
    case 'intersection':
      const intersection = pt as JSONOutput.IntersectionType;
      shouldBreak = intersection.types.length > 2;
      nextParams = shouldBreak ? params.withIndent() : params;
      return intersection.types
        .map((u) => renderType(u, nextParams))
        .reduce((prev, curr) => (
          <>
            {prev}
            {shouldBreak && (
              <>
                <br />
                <Indent indent={nextParams.indent} />
              </>
            )}
            <TokenPunctuation title="and">
              {!shouldBreak && ' '}
              {'& '}
            </TokenPunctuation>
            {curr}
          </>
        ));
    case 'conditional':
      // Simplify conditionals as unions. API readers might not be familiar with
      // typescript, and unions are easier to understand.
      const cond = pt as JSONOutput.ConditionalType;
      if (
        cond.falseType.type === 'intrinsic' &&
        (cond.falseType as JSONOutput.IntrinsicType).name === 'never'
      ) {
        return renderType(cond.trueType, params);
      }
      return (
        <>
          {renderType(cond.trueType, params)}
          <TokenPunctuation title="or">{' | '}</TokenPunctuation>
          {renderType(cond.falseType, params)}
        </>
      );
    case 'mapped':
      const mapped = (pt as unknown) as JSONOutput.MappedType;
      nextParams = params.withIndent();
      return (
        <>
          <TokenPunctuation>{'{'}</TokenPunctuation>
          <br />
          <Indent indent={nextParams.indent} />
          <TokenPunctuation>{'['}</TokenPunctuation>
          <TokenAttrName>{mapped.parameter}</TokenAttrName>
          <TokenPunctuation>{': '}</TokenPunctuation>
          {renderType(mapped.parameterType, nextParams)}
          <TokenPunctuation>{']'}</TokenPunctuation>
          <TokenPunctuation>{': '}</TokenPunctuation>
          {renderType(mapped.templateType, nextParams)}
          <Indent indent={params.indent} />
          <br />
          <Indent indent={params.indent} />
          <TokenPunctuation>{'}'}</TokenPunctuation>
        </>
      );
    case 'literal':
      const literal = pt as JSONOutput.LiteralType;
      switch (typeof literal.value) {
        case 'bigint':
        case 'boolean':
        case 'number':
          return <TokenLiteral>{String(literal.value)}</TokenLiteral>;
        case 'undefined':
          return <TokenKeyword>{String(literal.value)}</TokenKeyword>;
        case 'object':
          if (literal.value === null) {
            return <TokenKeyword>{String(literal.value)}</TokenKeyword>;
          }
          break;
        case 'string':
          return <TokenLiteral>{JSON.stringify(literal.value)}</TokenLiteral>;
      }
      console.warn('Unhandled literal type', literal);
      throw new Error(`Unhandled literal ${literal.value}`);
    case 'array':
      const array = pt as JSONOutput.ArrayType;
      return (
        <>
          <TokenPlain>Array</TokenPlain>
          <TokenPunctuation>&lt;</TokenPunctuation>
          {renderType(array.elementType, params)}
          <TokenPunctuation>&gt;</TokenPunctuation>
        </>
      );
    case 'reflection':
      const reflection = pt as JSONOutput.ReflectionType;
      return renderReflection(
        reflection.declaration,
        params.withoutMemberLinks()
      );
    case 'typeOperator':
      const to = pt as JSONOutput.TypeOperatorType;
      return (
        <>
          <TokenKeyword>{to.operator}</TokenKeyword>
          <code> </code>
          {renderType(to.target, params)}
        </>
      );
    case 'indexedAccess':
      const acc = (pt as unknown) as JSONOutput.IndexedAccessType;
      return (
        <>
          {renderType(acc.objectType, params)}
          <TokenPunctuation>[</TokenPunctuation>
          {renderType(acc.indexType, params)}
          <TokenPunctuation>]</TokenPunctuation>
        </>
      );
    case 'query':
      const query = pt as JSONOutput.QueryType;
      return (
        <>
          <TokenKeyword>typeof</TokenKeyword>
          <code> </code>
          {renderType(query.queryType, params)}
        </>
      );

    default:
      console.warn('Unhandled type', pt);
      throw new Error(`Unhandled type ${pt.type}`);
  }
}
