import React from 'react';
import { TBlock } from '@native-html/transient-render-engine';
import { InternalBlockRenderer } from '../render/render-types';
import {
  InternalRendererProps,
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

    /* istanbul ignore next */
    case 1:
      return 'upper-alpha';

    /* istanbul ignore next */
    default:
      return 'lower-alpha';
  }
}

export function useOLElementProps(
  props: InternalRendererProps<TBlock>
): OLElementProps {
  const config = useRendererProps('ol');
  return {
    ...props,
    getFallbackListStyleTypeFromNestLevel,
    ...config
  };
}

const OLRenderer: InternalBlockRenderer = (props) => {
  return React.createElement(OLElement, useOLElementProps(props));
};

export default OLRenderer;
