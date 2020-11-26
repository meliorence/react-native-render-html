import { TNode } from '@native-html/transient-render-engine';
import { ComponentType } from 'react';
import { RendererProps } from '..';
import lookupRecord from '../helpers/lookupRecord';
import LineBreakRenderer from '../renderers/LineBreakRenderer';
import WordBreakRenderer from '../renderers/WordBreakRenderer';
import defaultRenderers from './defaultRenderers';
import {
  InternalTextContentRenderer,
  LiteRendererDeclaration,
  RendererRecord
} from './render-types';

const internalTextRenderers: Record<string, InternalTextContentRenderer> = {
  br: LineBreakRenderer,
  wbr: WordBreakRenderer
};

export default class RenderRegistry {
  private readonly renderers: RendererRecord = defaultRenderers;

  constructor(customRenderers?: RendererRecord) {
    if (customRenderers) {
      this.renderers = { ...defaultRenderers, ...customRenderers };
    }
  }

  getInternalTextRenderer(tagName: string | null) {
    if (lookupRecord(internalTextRenderers, tagName)) {
      return internalTextRenderers[tagName];
    }
    return null;
  }

  getRendererForTNode<T extends TNode>(
    tnode: T
  ): ComponentType<RendererProps<T>> | LiteRendererDeclaration<any> | null {
    if (lookupRecord(this.renderers, tnode.tagName)) {
      const renderer = this.renderers[tnode.tagName];
      if (tnode.matchContentModel(renderer.model.contentModel)) {
        return renderer as any;
      } else {
        __DEV__ &&
          console.warn(
            `You are attempting to render "${tnode.tagName}" of type "${tnode.displayName}", but the registered renderer is of content model type ${renderer.model.contentModel} which is incompatible with "${tnode.displayName}". The custom renderer will be ignored.`
          );
      }
      return null;
    }
    return null;
  }
}
