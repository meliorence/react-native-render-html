import React from 'react';
import { DefaultBlockRenderer } from '../render/render-types';
import {
  DefaultTagRendererProps,
  DefaultSupportedListStyleType
} from '../shared-types';
import { TBlock } from '@native-html/transient-render-engine';
import ULElement, { ULElementProps } from '../elements/ULElement';
import { useRendererProps } from '../context/RenderersPropsProvider';

function getFallbackListStyleTypeFromNestLevel(
  nestLevel: number
): DefaultSupportedListStyleType {
  switch (nestLevel % 3) {
    case 0:
      return 'disc';
    case 1:
      return 'circle';
    default:
      return 'square';
  }
}

export function useULElementProps(
  props: DefaultTagRendererProps<TBlock>
): ULElementProps {
  const listStyleSpecs = props.sharedProps.customListStyleSpecs;
  const config = useRendererProps('ul');
  return {
    ...props,
    listStyleSpecs,
    getFallbackListStyleTypeFromNestLevel,
    ...config
  };
}

const ULRenderer: DefaultBlockRenderer = (props) => {
  return React.createElement(ULElement, useULElementProps(props));
};

export default ULRenderer;
