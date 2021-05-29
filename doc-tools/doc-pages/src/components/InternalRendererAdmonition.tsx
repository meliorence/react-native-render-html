/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PropsWithChildren } from 'react';
import useToolkit from '../toolkit/useToolkit';

export default function InternalRendererAdmonition({
  name,
  contentModel,
  children
}: PropsWithChildren<{
  name: string;
  contentModel: 'block' | 'mixed';
}>) {
  const { Admonition, RefDoc, RefTRE, Bold } = useToolkit();
  return (
    <Admonition type="note">
      {name} are rendered with an <Bold>internal renderer</Bold>. See{' '}
      <RefDoc target="rendering" /> page. The <Bold>content model</Bold> of
      {name.toLowerCase()} is{' '}
      <RefTRE name="HTMLContentModel" member={contentModel} />, see{' '}
      <RefDoc target="transient-render-engine" fragment="element-models">
        Element Models
      </RefDoc>
      .{children}
    </Admonition>
  );
}
