import React from 'react';
import { TBlock } from '@native-html/transient-render-engine';
import { DefaultBlockRenderer } from '../render/render-types';
import {
  DefaultTagRendererProps,
  DefaultSupportedListStyleType
} from '../shared-types';
import OLElement, { OLElementProps } from '../elements/OLElement';
import { useRendererProps } from '../context/RenderersPropsProvider';

function getFallbackListStyleTypeFromNestLevel(
  nestLevel: number
): DefaultSupportedListStyleType {
  switch (nestLevel % 3) {
    case 0:
      return 'decimal';
    case 1:
      return 'upper-alpha';
    default:
      return 'lower-alpha';
  }
}

export function useOLElementProps(
  props: DefaultTagRendererProps<TBlock>
): OLElementProps {
  const listStyleSpecs = props.sharedProps.customListStyleSpecs;
  const config = useRendererProps('ol');
  return {
    ...props,
    listStyleSpecs,
    getFallbackListStyleTypeFromNestLevel,
    ...config
  };
}

const OLRenderer: DefaultBlockRenderer = (props) => {
  return React.createElement(OLElement, useOLElementProps(props));
};

export default OLRenderer;
