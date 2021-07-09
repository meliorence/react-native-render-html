import clsx from 'clsx';
import React from 'react';
import classes from './IPhoneFrame.module.scss';

export default function IPhoneFrame({
  children,
  scale = 1,
  style,
  className
}: {
  children: any;
  style?: React.CSSProperties;
  scale?: number;
  className?: string;
}) {
  return (
    <div
      style={{ '--scale-factor': scale, ...style } as any}
      className={clsx(classes['device-iphone-x'], className)}>
      <div className={classes['device-frame']}>
        {React.cloneElement(children, {
          ...children.props,
          className: classes['device-content']
        })}
      </div>
      <div className={classes['device-header']} />
      <div className={classes['device-sensors']} />
      <div className={classes['device-btns']} />
      <div className={classes['device-power']} />
    </div>
  );
}
