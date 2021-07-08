import React from 'react';
import IPhoneFrame from './IPhoneFrame';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function Screenshot({
  scale,
  url,
  style,
  frameStyle,
  className
}: {
  scale?: number;
  style?: any;
  className?: any;
  frameStyle?: any;
  url: string;
}) {
  return (
    <div className={className} style={style}>
      <IPhoneFrame style={frameStyle} scale={scale}>
        <img src={useBaseUrl(url)} />
      </IPhoneFrame>
    </div>
  );
}
