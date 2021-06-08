import React from 'react';
import clsx from 'clsx';
import classes from './styles.module.scss';
import renderReflection from './renderReflection';
import Params from './Params';
import useReflectionIndex from './useReflectionIndex';
import Badges from './Badges';

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

function ExternalSource({ libraryName }: { libraryName: string }) {
  if (!(libraryName in thirdPartiesMap)) {
    throw new Error(`${libraryName} is not registered as third party`);
  }
  return (
    <a
      target="_blank"
      className={classes.sourceBox}
      href={thirdPartiesMap[libraryName]}>
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
  const libraryName = extractLibName(source.fileName);
  return (
    <>
      <Badges
        definitions={[
          isExternal && {
            label: 'reexport',
            title: `This definition is reexported from ${libraryName} library.`
          },
          !isExternal && {
            label: 'export',
            title: `This definition is an export from react-native-render-html v${version}.`
          }
        ]}
      />
      <div className={clsx(classes.container)}>
        <div className={clsx('padding--sm', classes.typeContainer)}>
          {renderReflection(reflection, new Params((id) => index[id]))}
        </div>
      </div>
      <div className={clsx(classes.sourceBoxContainer, 'margin-bottom--md')}>
        Defined in{' '}
        {!isExternal && source && (
          <a
            target="_blank"
            className={classes.sourceBox}
            href={`https://github.com/meliorence/react-native-render-html/tree/v${version}/${source.fileName}#L${source.line}`}>
            {source.fileName}
            {/* <code>{`react-native-render-html/…/${source.fileName
              .split('/')
              .pop()}#L${source.line}`}</code> */}
          </a>
        )}
        {isExternal && source && <ExternalSource libraryName={libraryName} />}
      </div>
    </>
  );
}
