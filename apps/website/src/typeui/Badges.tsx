import React, { PropsWithChildren } from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';

export default function Badges({
  definitions,
  children
}: PropsWithChildren<{
  definitions: Array<{ label: string; title?: string } | null | false>;
}>) {
  return (
    <div className={styles.badges}>
      {children}
      <div style={{ flex: 1 }} />
      {definitions
        .filter((d) => !!d)
        .map(({ label, title }: { label: string; title?: string }) => (
          <div
            key={label}
            title={title || label}
            className={clsx(styles.flagBox, styles['flagBox--' + label])}>
            {label}
          </div>
        ))}
    </div>
  );
}
