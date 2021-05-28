import React from 'react';
import type { RefType } from '@doc/pages';
import clsx from 'clsx';
import styles from './Reference.module.scss';
import Link from '@docusaurus/Link';

export default function Reference({
  url,
  type,
  member,
  name,
  full,
  plural
}: {
  name: string;
  member?: string;
  url: string;
  full: boolean;
  type: RefType | 'rnrh-prop' | 'api-def';
  plural?: boolean;
}) {
  const shouldWrapCode = type !== 'doc';
  const pluralMark = plural ? 's' : '';
  const fullName =
    (member && full ? `${name}.${member}` : member ? member : name) +
    pluralMark;
  return (
    <>
      <Link className={clsx(styles.ref, styles[`ref--${type}`])} to={url}>
        {shouldWrapCode ? <code>{fullName}</code> : fullName}
      </Link>{' '}
    </>
  );
}
