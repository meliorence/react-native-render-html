import React from 'react';
import { ReflectionKind } from 'typedoc/dist/lib/models/reflections/abstract';
import type { JSONOutput } from 'typedoc';
import {
  TokenPunctuation,
  TokenAttrName,
  TokenKeyword,
  TokenPlain,
  TokenLiteral
} from './tokens';
import renderArrowSignature from './renderArrowSignature';
import renderFunctionSignature from './renderFunctionSignature';
import Indent from './Indent';
import renderType from './renderType';
import renderTypeParameters from './renderTypeParameters';
import reduceReflectionsWith from './reduceReflectionsWith';
import Params from './Params';

function renderArrowSignatures(
  signatures: JSONOutput.SignatureReflection[],
  params: Params
) {
  return <>{signatures.map((s) => renderArrowSignature(s, params))}</>;
}

function renderFunctionSignatures(
  signatures: JSONOutput.SignatureReflection[],
  params: Params
) {
  return <>{signatures.map((s) => renderFunctionSignature(s, params))}</>;
}

function renderConst(name: string) {
  return (
    <>
      <TokenKeyword>const</TokenKeyword>
      <code> </code>
      <TokenPlain>{name}</TokenPlain>
      <TokenPunctuation>:</TokenPunctuation>
      <code> </code>
    </>
  );
}

function renderAttribute(
  name: string,
  typeElm: any,
  flags: JSONOutput.ReflectionFlags,
  params: Params
) {
  const nameToken = <TokenAttrName>{name}</TokenAttrName>;
  return (
    <>
      <Indent indent={params.indent} />
      {flags.isStatic && <TokenKeyword>static </TokenKeyword>}
      {params.resolveMembersLinks ? (
        <a href={`#${name.toLowerCase()}`}>{nameToken}</a>
      ) : (
        nameToken
      )}
      {flags.isOptional && <TokenPunctuation>?</TokenPunctuation>}
      <TokenPunctuation>{': '}</TokenPunctuation>
      {typeElm}
      <TokenPunctuation>{';'}</TokenPunctuation>
      <br />
    </>
  );
}

function renderEnumMember(name: string, typeElm: any, params: Params) {
  const nameToken = <TokenAttrName>{name}</TokenAttrName>;
  return (
    <>
      <Indent indent={params.indent} />
      {params.resolveMembersLinks ? (
        <a href={`#${name.toLowerCase()}`}>{nameToken}</a>
      ) : (
        nameToken
      )}
      <TokenPunctuation>{' = '}</TokenPunctuation>
      {typeElm}
      <TokenPunctuation>{';'}</TokenPunctuation>
      <br />
    </>
  );
}

function renderPropsAndMethods(
  reflection: JSONOutput.DeclarationReflection,
  params: Params
) {
  const props = reflection.children?.filter(
    (c) => c.kind === ReflectionKind.Property
  );
  const methods = reflection.children?.filter(
    (c) => c.kind === ReflectionKind.Method
  );
  return (
    <>
      {props?.reduce(
        reduceReflectionsWith(null, params, renderReflection),
        null
      )}
      {methods?.reduce(
        reduceReflectionsWith(null, params, renderReflection),
        null
      )}
    </>
  );
}

function renderFunction(
  reflection: JSONOutput.DeclarationReflection,
  params: Params
) {
  return (
    <>
      <TokenKeyword>function</TokenKeyword>
      <code> </code>
      <TokenPlain>{reflection.name}</TokenPlain>
      {renderFunctionSignatures(reflection.signatures, params)}
    </>
  );
}

export default function renderReflection(
  reflection: JSONOutput.DeclarationReflection,
  params: Params
) {
  let nextParams: Params = params;
  switch (reflection.kind) {
    case ReflectionKind.Function:
      return renderFunction(
        reflection,
        params.withMemberLinks().withTypeParamsLinks()
      );
    case ReflectionKind.TypeAlias:
      return (
        <>
          <TokenKeyword>type</TokenKeyword>
          <code> </code>
          <TokenPlain>{reflection.name}</TokenPlain>
          {renderTypeParameters(
            reflection.typeParameter,
            params.withTypeParamsLinks()
          )}
          <TokenPunctuation>{' = '}</TokenPunctuation>
          {renderType(reflection.type, params)}
        </>
      );
    case ReflectionKind.Enum:
      return (
        <>
          <TokenKeyword>enum</TokenKeyword>
          <code> </code>
          <TokenPlain>{reflection.name}</TokenPlain>
          <code> </code>
          <TokenPunctuation>{'{'}</TokenPunctuation>
          <br />
          {reflection.children.reduce(
            reduceReflectionsWith(null, params.withIndent(), renderReflection),
            null
          )}
          <TokenPunctuation>{'}'}</TokenPunctuation>
        </>
      );
    case ReflectionKind.Class:
      return (
        <>
          <TokenKeyword>class</TokenKeyword>
          <code> </code>
          <TokenPlain>{reflection.name}</TokenPlain>
          {renderTypeParameters(
            reflection.typeParameter,
            params.withTypeParamsLinks()
          )}
          <code> </code>
          <TokenPunctuation>{'{'}</TokenPunctuation>
          <br />
          {renderPropsAndMethods(
            reflection,
            params.withMemberLinks().withIndent()
          )}
          <TokenPunctuation>{'}'}</TokenPunctuation>
        </>
      );
    case ReflectionKind.Interface:
      nextParams = params.withIndent().withMemberLinks();
      return (
        <>
          <TokenKeyword>interface</TokenKeyword>
          <code> </code>
          <TokenPlain>{reflection.name}</TokenPlain>
          {renderTypeParameters(
            reflection.typeParameter,
            params.withTypeParamsLinks()
          )}
          <code> </code>
          <TokenPunctuation>{'{'}</TokenPunctuation>
          <br />
          {reflection.signatures && (
            <>
              <Indent indent={nextParams.indent} />
              {renderFunctionSignatures(reflection.signatures, nextParams)}
              <TokenPunctuation>;</TokenPunctuation>
              <br />
            </>
          )}
          {renderPropsAndMethods(reflection, nextParams.withMemberLinks())}
          <TokenPunctuation>{'}'}</TokenPunctuation>
        </>
      );
    case ReflectionKind.Parameter:
      return renderAttribute(
        reflection.name,
        renderType(reflection.type, params),
        reflection.flags,
        params
      );
    case ReflectionKind.Property:
      nextParams = params.withoutMemberLinks();
      return renderAttribute(
        reflection.name,
        renderType(reflection.type, nextParams),
        reflection.flags,
        params
      );
    case ReflectionKind.TypeLiteral:
      if (reflection.signatures) {
        return renderArrowSignatures(reflection.signatures, params);
      }
      if (!reflection.groups) {
        console.warn('Unhandled Type Literal with no group', reflection);
        return <TokenKeyword>any</TokenKeyword>;
      }
      let ret: any = null;
      for (const group of reflection.groups!) {
        if (group.kind === ReflectionKind.Property) {
          const props = reflection.children.filter((c) =>
            group.children.includes(c.id)
          );
          ret = (
            <>
              <TokenPunctuation>{'{'}</TokenPunctuation>
              <br />
              {props.map((p) => renderReflection(p, params.withIndent()))}
              <Indent indent={params.indent} />
              <TokenPunctuation>{'}'}</TokenPunctuation>
            </>
          );
        } else {
          throw new Error(`Unhandled group of type ${group.title}`);
        }
      }
      return ret;
    case ReflectionKind.Method:
      return renderAttribute(
        reflection.name,
        renderArrowSignatures(
          reflection.signatures,
          params.withoutMemberLinks()
        ),
        reflection.flags,
        params
      );
    case ReflectionKind.Function:
      return renderArrowSignatures(
        (reflection as JSONOutput.DeclarationReflection).signatures,
        params
      );
    case ReflectionKind.CallSignature:
      return (
        <>
          {renderConst(reflection.name)}
          {renderArrowSignature(reflection, params)}
        </>
      );
    case ReflectionKind.Variable:
      if (reflection.signatures) {
        // For docs legibility, consider const with signature like functions
        return renderFunction(reflection, params.withMemberLinks());
      }
      return (
        <>
          {renderConst(reflection.name)}
          {renderType(reflection.type, params)}
        </>
      );
    case ReflectionKind.EnumMember:
      return renderEnumMember(
        reflection.name,
        <TokenLiteral>{reflection.defaultValue}</TokenLiteral>,
        params
      );
    default:
      console.warn(
        'Unhandled Declaration Reflection of kind',
        reflection.kindString,
        reflection
      );
      throw new Error(
        `Unhandled Declaration Reflection of kind ${reflection.kindString}`
      );
  }
}
