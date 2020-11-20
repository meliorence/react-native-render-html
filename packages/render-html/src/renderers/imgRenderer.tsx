import React from 'react';
import ImgTag from '../tags/ImgTag';
import { DefaultRenderers } from '../defaultRenderers';
import { useSharedProps } from '../context/SharedPropsContext';

function normalizeUri(uri: string) {
  return uri.startsWith('//') ? `https:${uri}` : uri;
}

const imgRenderer: DefaultRenderers['block'][string] = (props) => {
  const {
    nativeStyle,
    tnode,
    Default,
    syntheticAnchorOnLinkPress
  } = props;
  const {
    contentWidth,
    computeImagesMaxWidth,
    enableExperimentalPercentWidth,
    imagesInitialDimensions
  } = useSharedProps();
  const src = tnode.attributes.src;
  if (!src) {
    return React.createElement(Default, props);
  }
  return (
    <ImgTag
      alt={tnode.attributes.alt}
      testID="img"
      altColor={tnode.styles.nativeTextFlow.color as string}
      contentWidth={contentWidth as number}
      computeImagesMaxWidth={computeImagesMaxWidth}
      enableExperimentalPercentWidth={enableExperimentalPercentWidth}
      imagesInitialDimensions={imagesInitialDimensions}
      onPress={syntheticAnchorOnLinkPress}
      source={{ uri: normalizeUri(src) }}
      style={nativeStyle}
      width={tnode.attributes.width}
      height={tnode.attributes.height}
    />
  );
};

export default imgRenderer;
