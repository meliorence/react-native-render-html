import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';
import renderReflection from './renderReflection';
import Params from './Params';
import useReflectionIndex from './useReflectionIndex';
import Badges from './Badges';
import { SourceReference } from 'typedoc/dist/lib/serialization/schema';

const thirdPartiesMap: Record<string, string> = {
  '@native-html/transient-render-engine':
    'https://github.com/native-html/core/tree/master/packages/transient-render-engine',
  '@native-html/css-processor':
    'https://github.com/native-html/core/tree/master/packages/css-processor',
  domhandler: 'https://github.com/fb55/domhandler'
};

function extractLibName(fileName: string) {
  const fragments = fileName.split('/');
  try {
    // remove node_modules fragment
    fragments.splice(0, 1);
    if (fragments[0].startsWith('@')) {
      return fragments[0] + '/' + fragments[1];
    }
    return fragments[0];
  } catch (e) {
    console.error(e);
  }
  return '';
}

function ExternalSource({ source }: { source: SourceReference }) {
  const libraryName = extractLibName(source.fileName);
  if (!(libraryName in thirdPartiesMap)) {
    throw new Error(`${libraryName} is not registered as third party`);
  }
  return (
    <a className={styles.sourceBox} href={thirdPartiesMap[libraryName]}>
      <code>{libraryName}</code>
    </a>
  );
}

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
      <Badges
        definitions={[
          isExternal && {
            label: 'reexport',
            title: 'This definition is reexported from a third party library.'
          },
          !isExternal && {
            label: 'export',
            title: `This definition is an export from react-native-render-html v${version}.`
          }
        ]}>
        {!isExternal && source && (
          <a
            className={styles.sourceBox}
            href={`https://github.com/meliorence/react-native-render-html/tree/v${version}/${source.fileName}#L${source.line}`}>
            <code>{`react-native-render-html/…/${source.fileName
              .split('/')
              .pop()}#L${source.line}`}</code>
          </a>
        )}
        {isExternal && source && <ExternalSource source={source} />}
      </Badges>
      <div className={clsx(styles.container, 'margin-bottom--md')}>
        <div className={clsx('padding--sm', styles.typeContainer)}>
          {renderReflection(reflection, new Params((id) => index[id]))}
        </div>
      </div>
    </>
  );
}
