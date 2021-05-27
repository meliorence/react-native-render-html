import React from 'react';
import type { RefType } from '@doc/pages';
import clsx from 'clsx';
import styles from './Reference.module.scss';

export default function Reference({
  url,
  type,
  name
}: {
  name: string;
  url: string;
  type: RefType | 'rnrh-prop';
}) {
  const shouldWrapCode = type !== 'doc';
  return (
    <>
      <a className={clsx(styles.ref, styles[`ref--${type}`])} href={url}>
        {shouldWrapCode ? <code>{name}</code> : name}
      </a>{' '}
    </>
  );
}
