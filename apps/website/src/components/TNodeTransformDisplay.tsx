import React from 'react';
import CodeBlock from '@theme/CodeBlock';
import styles from './TNodeTransformDisplay.module.scss';

export default function TNodeTransformDisplay({
  html,
  snapshot,
  caption,
  title
}: {
  title?: string;
  caption?: string;
  html: string;
  snapshot: string;
}) {
  const normalHtml = decodeURIComponent(html);
  const normalSnapshot = decodeURIComponent(snapshot);
  return (
    <>
      {title && <div className={styles.figure__title}>{title}</div>}
      <figure className={styles.figure}>
        <CodeBlock className={'html'}>{normalHtml}</CodeBlock>
        <div className={styles.arrow}>↓</div>
        <CodeBlock className={'xml'}>{normalSnapshot}</CodeBlock>
        {caption && (
          <figcaption className={styles.figure__caption}>{caption}</figcaption>
        )}
      </figure>
    </>
  );
}
