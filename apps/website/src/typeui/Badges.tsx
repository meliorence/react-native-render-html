import React, { PropsWithChildren } from 'react';
import TypescriptLogo from './TypescriptLogo';
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
      {children}
      <div style={{ flex: 1 }} />
      <TypescriptLogo />
    </div>
  );
}
