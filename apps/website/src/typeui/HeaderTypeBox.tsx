import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';
import renderReflection from './renderReflection';
import Params from './Params';
import useReflectionIndex from './useReflectionIndex';
import Badges from './Badges';

export default function HeaderTypeBox({
  reflectionId,
  version
}: {
  reflectionId: number;
  version: string;
}) {
  const index = useReflectionIndex();
  const reflection = index[reflectionId];
  const isExternal = reflection.flags.isExternal;
  const source = reflection.sources?.[0];
  return (
    <>
      <Badges definitions={[]}>
        {!isExternal && source && (
          <a
            className={styles.sourceBox}
            href={`https://github.com/meliorence/react-native-render-html/tree/${version}/${source.fileName}#L${source.line}`}>
            <code>{source.fileName.split(/(\\|\/)/g).pop()}</code>
          </a>
        )}
      </Badges>
      <div className={clsx(styles.container, 'margin-bottom--md')}>
        <div className={clsx('padding--sm', styles.typeContainer)}>
          {renderReflection(reflection, new Params((id) => index[id]))}
        </div>
      </div>
    </>
  );
}
