import React, { memo, ReactElement } from 'react';
import TBlockRenderer from './TBlockRenderer';
import TPhrasingRenderer from './TPhrasingRenderer';
import TTextRenderer from './TTextRenderer';
import { TNodeRendererProps } from './shared-types';
import { useSharedProps } from './context/SharedPropsProvider';

export type { TNodeRendererProps } from './shared-types';

/**
 * A component to render any {@link TNode}.
 */
const TNodeRenderer = memo(function MemoizedTNodeRenderer(
  props: TNodeRendererProps<any>
): ReactElement | null {
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
  if (typeof __DEV__ === 'boolean' && __DEV__ && tnode.type === 'empty') {
    if (tnode.isUnregistered) {
      console.warn(
        `There is no custom renderer registered for tag "${tnode.tagName}" which is not part of the HTML5 standard. The tag will not be rendered.` +
          ' If you don\'t want this tag to be rendered, add it to "ignoredTags" prop array. If you do, register an HTMLElementModel for this tag with "customHTMLElementModels" prop.'
      );
    } else if (tnode.tagName !== 'head') {
      console.warn(
        `The "${tnode.tagName}" tag is a valid HTML element but is not handled by this library. You must extend the default HTMLElementModel for this tag with "customHTMLElementModels" prop and make sure its content model is not set to "none".` +
          ' If you don\'t want this tag to be rendered, add it to "ignoredTags" prop array.'
      );
    }
  }
  return null;
});

const defaultProps: Required<Pick<TNodeRendererProps<any>, 'propsFromParent'>> =
  {
    propsFromParent: {
      collapsedMarginTop: null
    }
  };

// @ts-expect-error default props must be defined
TNodeRenderer.defaultProps = defaultProps;

export default TNodeRenderer;
