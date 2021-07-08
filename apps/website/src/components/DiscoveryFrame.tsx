/* eslint-disable no-undef */
import React, { useRef, useCallback } from 'react';
//@ts-ignore
import discoveryVideoUrl from '@site/static/video/discovery.webm';
import classes from './DiscoveryFrame.module.scss';
import clsx from 'clsx';
import IPhoneFrame from './IPhoneFrame';

export default function DiscoveryFrame({ scale }: { scale?: number }) {
  const videoRef = useRef<HTMLVideoElement>();
  const playPause = useCallback(() => {
    if (videoRef.current?.paused) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, []);
  return (
    <div className={classes['container']}>
      <IPhoneFrame scale={scale}>
        <video
          ref={videoRef}
          controls={false}
          loop
          autoPlay
          muted
          preload="lazy"
          onClick={playPause}>
          <source src={discoveryVideoUrl} type="video/webm" />
        </video>
      </IPhoneFrame>
      <button
        aria-label="Play/pause"
        onClick={playPause}
        className={clsx('button', 'button--primary', classes.button)}>
        <svg width="32" height="32" viewBox="0 0 24 24">
          <path
            fill="var(--ifm-button-color)"
            d="M3,5V19L11,12M13,19H16V5H13M18,5V19H21V5"
          />
        </svg>
      </button>
    </div>
  );
}
