/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { SvgAssetType } from '@doc/pages';
import useThemeContext from '@theme/hooks/useThemeContext';
import DataFlowSvg from '../svg/data-flow.svg';

const svgAssetsIndex: Record<SvgAssetType, typeof DataFlowSvg> = {
  'data-flow': DataFlowSvg
};

export default function SvgFigure({
  asset,
  description
}: {
  asset: SvgAssetType;
  description: string;
}) {
  const SvgComponent = svgAssetsIndex[asset];
  const { isDarkTheme } = useThemeContext();
  const content = isDarkTheme ? 'white' : 'black';
  const secondaryContent = isDarkTheme ? 'gray' : 'gray';
  const codeBlockBg = 'rgba(125,125,125,0.2)';
  return (
    <figure
      style={{
        borderColor: content,
        borderWidth: 1,
        borderStyle: 'solid',
        padding: 30,
        margin: 0
      }}>
      <SvgComponent
        content={content}
        secondaryContent={secondaryContent}
        codeBlockBg={codeBlockBg}
        width="100%"
      />
      <figcaption
        style={{ fontStyle: 'italic', textAlign: 'center', paddingTop: 30 }}>
        {description}
      </figcaption>
    </figure>
  );
}
