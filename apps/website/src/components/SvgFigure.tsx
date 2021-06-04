/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { SvgAssetType } from '@doc/pages';
import DataFlowSvg from '../svg/data-flow.svg';
import styles from './SvgFigure.module.scss';

const svgAssetsIndex: Record<SvgAssetType, typeof DataFlowSvg> = {
  'data-flow': DataFlowSvg
};

export default function SvgFigure({
  asset,
  description,
  title
}: {
  asset: SvgAssetType;
  description: string;
  title: string;
}) {
  const SvgComponent = svgAssetsIndex[asset];
  return (
    <>
      {title && <div className={styles.figure__title}>{title}</div>}
      <figure className={styles.figure}>
        <div className={styles.svgContainer}>
          <SvgComponent
            content="var(--ifm-font-color-base)"
            secondaryContent="var(--ifm-font-color-secondary)"
            codeBlockBg="rgba(125,125,125,0.2)"
            width="100%"
          />
        </div>
        <figcaption className={styles.figure__caption}>
          {description}
        </figcaption>
      </figure>
    </>
  );
}
