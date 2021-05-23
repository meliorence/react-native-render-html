import React, { PropsWithChildren } from 'react';
import TypescriptLogo from './TypescriptLogo';
import styles from './styles.module.scss';
import clsx from 'clsx';

export default function Badges({
  definitions,
  children
}: PropsWithChildren<{
  definitions: Array<{ label: string } | null | false>;
}>) {
  return (
    <div className={styles.badges}>
      {children}
      {definitions
        .filter((d) => !!d)
        .map(({ label }: { label: string }) => (
          <div
            key={label}
            title={label}
            className={clsx(styles.flagBox, styles['flagBox--' + label])}>
            {label}
          </div>
        ))}
      <div style={{ flex: 1 }} />
      <TypescriptLogo />
    </div>
  );
}
