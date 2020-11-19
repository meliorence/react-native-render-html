import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import { RenderHTMLProps } from './types';
import TNodeRenderer from './TNodeRenderer';
import defaultRenderers from './defaultRenderers';
import useTTree from './useTTree';

type RenderHTMLPropTypes = Record<keyof RenderHTMLProps, any>;

const propTypes: RenderHTMLPropTypes = {
  renderers: PropTypes.object.isRequired,
  enableCSSInlineProcessing: PropTypes.bool,
  enableUserAgentStyles: PropTypes.bool,
  enableExperimentalMarginCollapsing: PropTypes.bool,
  idsStyles: PropTypes.object,
  remoteErrorView: PropTypes.func,
  remoteLoadingView: PropTypes.func,
  ignoredTags: PropTypes.array.isRequired,
  ignoredStyles: PropTypes.array.isRequired,
  allowedStyles: PropTypes.array,
  decodeEntities: PropTypes.bool.isRequired,
  debug: PropTypes.bool.isRequired,
  listsPrefixesRenderers: PropTypes.object,
  ignoreNodesFunction: PropTypes.func,
  alterData: PropTypes.func,
  alterChildren: PropTypes.func,
  alterNode: PropTypes.func,
  ignoreNode: PropTypes.func,
  html: PropTypes.string,
  uri: PropTypes.string,
  tagsStyles: PropTypes.object,
  classesStyles: PropTypes.object,
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  customWrapper: PropTypes.func,
  onLinkPress: PropTypes.func,
  computeImagesMaxWidth: PropTypes.func,
  staticContentMaxWidth: PropTypes.number,
  contentWidth: PropTypes.number,
  enableExperimentalPercentWidth: PropTypes.bool,
  imagesInitialDimensions: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number
  }),
  emSize: PropTypes.number.isRequired,
  ptSize: PropTypes.number.isRequired,
  baseStyle: PropTypes.object,
  textSelectable: PropTypes.bool,
  renderersProps: PropTypes.object,
  allowFontScaling: PropTypes.bool,
  onTTreeChange: PropTypes.func
};

const defaultProps: Partial<Record<keyof RenderHTMLProps, any>> = {
  debug: false,
  decodeEntities: true,
  emSize: 14,
  ptSize: 1.3,
  contentWidth: Dimensions.get('window').width,
  staticContentMaxWidth: Dimensions.get('window').width,
  enableExperimentalPercentWidth: false,
  ignoredTags: [],
  ignoredStyles: [],
  baseStyle: { fontSize: 14 },
  tagsStyles: {},
  classesStyles: {},
  textSelectable: false,
  allowFontScaling: true,
  enableUserAgentStyles: true,
  enableCSSInlineProcessing: true,
  enableExperimentalMarginCollapsing: false,
  renderers: {}
};

export default function RenderHTML(props: RenderHTMLProps) {
  const ttree = useTTree(props);
  return (
    <TNodeRenderer
      defaultRenderers={defaultRenderers}
      passedProps={props}
      tnode={ttree}
      marginCollapsingEnabled={props.enableExperimentalMarginCollapsing!}
      collapsedMarginTop={null}
    />
  );
}

RenderHTML.defaultProps = defaultProps;
RenderHTML.propTypes = propTypes;
