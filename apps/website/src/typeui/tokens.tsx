import React, { PropsWithChildren } from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';

interface TokenProps {
  title?: string;
}

export function TokenPunctuation({
  children,
  title
}: PropsWithChildren<TokenProps>) {
  return (
    <code
      title={title}
      className={clsx(styles['token--punctuation'], styles.token)}>
      {children}
    </code>
  );
}

export function TokenPlain({ children }: PropsWithChildren<{}>) {
  return (
    <code className={clsx(styles['token--plain'], styles.token)}>
      {children}
    </code>
  );
}

// Used for non-primitive types
export function TokenType({ children }: PropsWithChildren<{}>) {
  return (
    <code className={clsx(styles['token--type'], styles.token)}>
      {children}
    </code>
  );
}

// Used for primitive types
export function TokenPrimitive({ children }: PropsWithChildren<{}>) {
  return (
    <code className={clsx(styles['token--primitive'], styles.token)}>
      {children}
    </code>
  );
}

// Used for non-string literal values such as true, 12...
export function TokenLiteral({ children }: PropsWithChildren<{}>) {
  return (
    <code className={clsx(styles['token--literal'], styles.token)}>
      {children}
    </code>
  );
}

export function TokenAttrName({ children }: PropsWithChildren<{}>) {
  return (
    <code className={clsx(styles['token--attr-name'], styles.token)}>
      {children}
    </code>
  );
}

export function TokenKeyword({ children }: PropsWithChildren<{}>) {
  return (
    <code className={clsx(styles['token--keyword'], styles.token)}>
      {children}
    </code>
  );
}
