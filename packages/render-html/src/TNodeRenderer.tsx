import React, { ReactElement } from 'react';
import TBlockRenderer from './TBlockRenderer';
import TPhrasingRenderer from './TPhrasingRenderer';
import TTextRenderer from './TTextRenderer';
import { TNodeRendererProps } from './shared-types';
import { useSharedProps } from './context/SharedPropsProvider';

export type { TNodeRendererProps } from './shared-types';

function TNodeRenderer(props: TNodeRendererProps<any>): ReactElement | null {
  const { tnode } = props;
  const sharedProps = useSharedProps();
  const tnodeProps = {
    ...props,
    sharedProps
  };
  if (tnode.type === 'block' || tnode.type === 'document') {
    return React.createElement(TBlockRenderer, tnodeProps);
  }
  if (tnode.type === 'phrasing') {
    return React.createElement(TPhrasingRenderer, tnodeProps);
  }
  if (tnode.type === 'text') {
    return React.createElement(TTextRenderer, tnodeProps);
  }
  if (tnode.type === 'empty' && __DEV__) {
    if (tnode.isUnregistered) {
      console.warn(
        `There is no custom renderer registered for tag "${tnode.tagName}" which is not part of the HTML5 standard. The tag will not be rendered.` +
          ' If you don\'t want this tag to be rendered, add it to "ignoredTags" prop array. If you do, register a custom renderer for this tag.'
      );
    } else if (tnode.tagName !== 'head') {
      console.warn(
        `The "${tnode.tagName}" tag is a valid HTML element but is not handled by this library. You must register a custom renderer or plugin and make sure its content model is not set to "none".` +
          ' If you don\'t want this tag to be rendered, add it to "ignoredTags" prop array.'
      );
    }
  }
  return null;
}

const defaultProps: Required<
  Pick<TNodeRendererProps<any>, 'propsFromParent'>
> = {
  propsFromParent: {
    collapsedMarginTop: null
  }
};

TNodeRenderer.defaultProps = defaultProps;

export default TNodeRenderer;
