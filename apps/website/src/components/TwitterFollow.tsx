import React from 'react';
import classes from './TwitterFollow.module.scss';
import clsx from 'clsx';

export default function TwitterFollow({ className }: { className?: string }) {
  return (
    <a
      href="https://twitter.com/jsamrn?ref_src=twsrc%5Etfw"
      className={clsx(classes.button, className)}
      data-show-count="false">
      <i className={classes.i} />
      Follow @jsamrn
    </a>
  );
}
