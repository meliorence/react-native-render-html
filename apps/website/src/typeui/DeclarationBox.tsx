import React from 'react';
import type { JSONOutput } from 'typedoc';
import { ReflectionKind } from 'typedoc/dist/lib/models/reflections/abstract';
import clsx from 'clsx';
import styles from './styles.module.scss';
import renderReflection from './renderReflection';
import Params from './Params';
import Badges from './Badges';
import useReflectionIndex from './useReflectionIndex';

export default function DeclarationBox({
  reflection: rawReflection
}: {
  reflection: string;
}) {
  const index = useReflectionIndex();
  const reflection = JSON.parse(
    decodeURIComponent(rawReflection)
  ) as JSONOutput.DeclarationReflection;
  const isPropertyLike =
    reflection.kind === ReflectionKind.Property ||
    reflection.kind === ReflectionKind.Method ||
    reflection.kind === ReflectionKind.Parameter;
  const isOptional =
    reflection.flags.isOptional ||
    typeof reflection.defaultValue !== 'undefined';
  return (
    <>
      <Badges
        definitions={[
          reflection.flags.isStatic && { label: 'static' },
          isPropertyLike && isOptional && { label: 'optional' },
          isPropertyLike && !isOptional && { label: 'required' }
        ]}
      />
      <div className={clsx(styles.container, 'margin-bottom--md')}>
        <div className={clsx('padding--sm', styles.typeContainer)}>
          {renderReflection(reflection, new Params((id) => index[id]))}
        </div>
      </div>
    </>
  );
}
