import React from 'react';
import { defaultHTMLElementModels } from '@native-html/transient-render-engine';
import { DefaultBlockRenderer } from '../render/render-types';
import { DefaultTagRendererProps } from '../shared-types';
import { TBlock } from '@native-html/transient-render-engine';
import ULElement, { ULElementProps } from '../elements/ULElement';
import { SupportedListStyleType } from '../elements/list-types';

function getListStyleTypeFromNestLevel(
  nestLevel: number
): SupportedListStyleType {
  switch (nestLevel % 3) {
    case 0:
      return 'disc';
    case 1:
      return 'circle';
    default:
      return 'square';
  }
}

function getStyleFromNestLevel(nestLevel: number) {
  return nestLevel > 0 ? { marginTop: 0, marginBottom: 0 } : null;
}

export function useULElementProps(
  props: DefaultTagRendererProps<TBlock>
): ULElementProps {
  return {
    ...props,
    getListStyleTypeFromNestLevel,
    getStyleFromNestLevel
  };
}

const ULRenderer: DefaultBlockRenderer = (props) => {
  return React.createElement(ULElement, useULElementProps(props));
};

ULRenderer.model = defaultHTMLElementModels.ul;

export default ULRenderer;
