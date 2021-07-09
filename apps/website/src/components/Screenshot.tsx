/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import IPhoneFrame from './IPhoneFrame';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function Screenshot({
  scale,
  url,
  webpUrl,
  alt,
  style,
  frameStyle,
  className
}: {
  scale?: number;
  style?: any;
  className?: any;
  frameStyle?: any;
  url: string;
  webpUrl?: string;
  alt?: string;
}) {
  return (
    <div className={className} style={style}>
      <IPhoneFrame style={frameStyle} scale={scale}>
        <picture>
          {webpUrl && <source type="image/webp" srcSet={useBaseUrl(webpUrl)} />}
          <img loading="lazy" alt={alt} src={useBaseUrl(url)} />
        </picture>
      </IPhoneFrame>
    </div>
  );
}
