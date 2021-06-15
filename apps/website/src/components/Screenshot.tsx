import React from 'react';
import IPhoneFrame from './IPhoneFrame';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function Screenshot({
  scale,
  url,
  style
}: {
  scale?: number;
  style?: any;
  url: string;
}) {
  return (
    <div style={style}>
      <IPhoneFrame scale={scale}>
        <img src={useBaseUrl(url)} />
      </IPhoneFrame>
    </div>
  );
}
