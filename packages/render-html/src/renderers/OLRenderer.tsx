import React from 'react';
import {
  defaultHTMLElementModels,
  TBlock
} from '@native-html/transient-render-engine';
import { DefaultBlockRenderer } from '../render/render-types';
import { DefaultTagRendererProps } from '../shared-types';
import OLElement, { OLElementProps } from '../elements/OLElement';
import { DefaultSupportedListStyleType } from '../elements/list-types';

function getListStyleTypeFromNestLevel(
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

function getStyleFromNestLevel(nestLevel: number) {
  return nestLevel > 0 ? { marginTop: 0, marginBottom: 0 } : null;
}

export function useOLElementProps(
  props: DefaultTagRendererProps<TBlock>
): OLElementProps {
  return {
    ...props,
    getListStyleTypeFromNestLevel,
    getStyleFromNestLevel
  };
}

const OLRenderer: DefaultBlockRenderer = (props) => {
  return React.createElement(OLElement, useOLElementProps(props));
};

OLRenderer.model = defaultHTMLElementModels.ol;

export default OLRenderer;
