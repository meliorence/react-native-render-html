import React, { useRef, useCallback } from 'react';
//@ts-ignore
import discoveryVideoUrl from '@site/static/video/discovery.webm';
import styles from './DiscoveryFrame.module.scss';
import clsx from 'clsx';

function DeviceContainer({ children, scale = 1 }) {
  return (
    <div
      style={{ '--scale-factor': scale } as any}
      className={styles['device-iphone-x']}>
      <div className={styles['device-frame']}>{children}</div>
      <div className={styles['device-header']} />
      <div className={styles['device-sensors']} />
      <div className={styles['device-btns']} />
      <div className={styles['device-power']} />
    </div>
  );
}

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
    <div className={styles['container']}>
      <DeviceContainer scale={scale}>
        <video
          ref={videoRef}
          controls={false}
          loop
          autoPlay
          muted
          preload="lazy"
          onClick={playPause}
          className={styles['device-content']}>
          <source src={discoveryVideoUrl} type="video/webm" />
        </video>
      </DeviceContainer>
      <button
        onClick={playPause}
        className={clsx('button', 'button--primary', styles.button)}>
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
