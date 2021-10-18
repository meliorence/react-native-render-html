import React, { memo, ReactElement } from 'react';
import { TDefaultRenderer, TNodeRendererProps } from './shared-types';
import { useSharedProps } from './context/SharedPropsProvider';
import {
  TText,
  TBlock,
  TNode,
  TPhrasing
} from '@native-html/transient-render-engine';
import useAssembledCommonProps from './hooks/useAssembledCommonProps';
import { useTNodeChildrenRenderer } from './context/TChildrenRendererContext';
import renderTextualContent from './renderTextualContent';
import { useRendererRegistry } from './context/RenderRegistryProvider';
import renderBlockContent from './renderBlockContent';
import renderEmptyContent from './renderEmptyContent';

export type { TNodeRendererProps } from './shared-types';

const TDefaultBlockRenderer: TDefaultRenderer<TBlock> =
  renderBlockContent.bind(null);

TDefaultBlockRenderer.displayName = 'TDefaultBlockRenderer';

const TDefaultPhrasingRenderer: TDefaultRenderer<TPhrasing> =
  renderTextualContent.bind(null);

TDefaultPhrasingRenderer.displayName = 'TDefaultPhrasingRenderer';

const TDefaultTextRenderer: TDefaultRenderer<TText> =
  renderTextualContent.bind(null);

TDefaultTextRenderer.displayName = 'TDefaultTextRenderer';

function isGhostTNode(tnode: TNode) {
  return (
    (tnode.type === 'text' && (tnode.data === '' || tnode.data === ' ')) ||
    tnode.type === 'empty'
  );
}

/**
 * A component to render any {@link TNode}.
 */
const TNodeRenderer = memo(function MemoizedTNodeRenderer(
  props: TNodeRendererProps<any>
): ReactElement | null {
  const { tnode } = props;
  const sharedProps = useSharedProps();
  const renderRegistry = useRendererRegistry();
  const TNodeChildrenRenderer = useTNodeChildrenRenderer();
  const tnodeProps = {
    ...props,
    TNodeChildrenRenderer,
    sharedProps
  };
  const renderer =
    tnode.type === 'block' || tnode.type === 'document'
      ? TDefaultBlockRenderer
      : tnode.type === 'text'
      ? TDefaultTextRenderer
      : tnode.type === 'phrasing'
      ? TDefaultPhrasingRenderer
      : renderEmptyContent;

  const { assembledProps, Renderer } = useAssembledCommonProps(
    tnodeProps,
    renderer as any
  );
  switch (tnode.type) {
    case 'empty':
      return renderEmptyContent(assembledProps);
    case 'text':
      const InternalTextRenderer = renderRegistry.getInternalTextRenderer(
        props.tnode.tagName
      );

      if (InternalTextRenderer) {
        return React.createElement(InternalTextRenderer, tnodeProps);
      }
      // If ghost line prevention is enabled and the text data is empty, render
      // nothing to avoid React Native painting a 20px height line.
      // See also https://git.io/JErwX
      if (
        tnodeProps.tnode.data === '' &&
        tnodeProps.sharedProps.enableExperimentalGhostLinesPrevention
      ) {
        return null;
      }
      break;
    case 'phrasing':
      // When a TPhrasing node is anonymous and has only one child, its
      // rendering amounts to rendering its only child.
      if (
        tnodeProps.sharedProps.bypassAnonymousTPhrasingNodes &&
        tnodeProps.tnode.tagName == null &&
        tnodeProps.tnode.children.length <= 1
      ) {
        return React.createElement(TNodeChildrenRenderer, {
          tnode: props.tnode
        });
      }
      // If ghost line prevention is enabled and the tnode is an anonymous empty
      // phrasing node, render nothing to avoid React Native painting a 20px
      // height line. See also https://git.io/JErwX
      if (
        tnodeProps.sharedProps.enableExperimentalGhostLinesPrevention &&
        tnodeProps.tnode.tagName == null &&
        tnodeProps.tnode.children.every(isGhostTNode)
      ) {
        return null;
      }
      break;
  }
  const renderFn =
    tnode.type === 'block' || tnode.type === 'document'
      ? renderBlockContent
      : renderTextualContent;
  return Renderer === null
    ? renderFn(assembledProps)
    : React.createElement(Renderer as any, assembledProps);
});

const defaultProps: Required<Pick<TNodeRendererProps<any>, 'propsFromParent'>> =
  {
    propsFromParent: {
      collapsedMarginTop: null
    }
  };

// @ts-expect-error default props must be defined
TNodeRenderer.defaultProps = defaultProps;

export {
  TDefaultBlockRenderer,
  TDefaultPhrasingRenderer,
  TDefaultTextRenderer
};

export default TNodeRenderer;
