import {
  defaultHTMLElementModels,
  TNode
} from '@native-html/transient-render-engine';
import { ComponentType } from 'react';
import { CustomTagRendererProps } from '..';
import lookupRecord from '../helpers/lookupRecord';
import BRRenderer from '../renderers/BRRenderer';
import WBRRenderer from '../renderers/WBRRenderer';
import { CustomTagRenderer, DefaultTagRenderer } from '../shared-types';
import internalRenderers from './internalRenderers';
import {
  CustomTagRendererRecord,
  InternalTextContentRenderer
} from './render-types';

const internalTextRenderers: Record<string, InternalTextContentRenderer> = {
  br: BRRenderer,
  wbr: WBRRenderer
};

export interface RendererConfig<T extends TNode> {
  Default: DefaultTagRenderer<T> | null;
  Custom: CustomTagRenderer<T> | null;
}

export default class RenderRegistry {
  private readonly customRenderers: CustomTagRendererRecord = {};

  constructor(customRenderers: CustomTagRendererRecord = {}) {
    // Filter model-only components
    Object.keys(customRenderers || {}).forEach((key) => {
      if (typeof customRenderers[key] === 'function') {
        this.customRenderers[key] = customRenderers[key];
      }
    });
  }

  getInternalTextRenderer(tagName: string | null) {
    if (lookupRecord(internalTextRenderers, tagName)) {
      return internalTextRenderers[tagName];
    }
    return null;
  }

  getRendererConfigForTNode<T extends TNode>(tnode: T): RendererConfig<T> {
    return {
      Custom: this.getCustomRendererForTNode(tnode),
      Default: this.getDefaultRendererForTNode(tnode)
    };
  }

  private getDefaultRendererForTNode<T extends TNode>(
    tnode: T
  ): DefaultTagRenderer<T> | null {
    if (lookupRecord(internalRenderers, tnode.tagName)) {
      return internalRenderers[tnode.tagName] as any;
    }
    return null;
  }

  private getCustomRendererForTNode<T extends TNode>(
    tnode: T
  ): ComponentType<CustomTagRendererProps<T>> | null {
    if (lookupRecord(this.customRenderers, tnode.tagName)) {
      const renderer = this.customRenderers[tnode.tagName];
      const tagName = tnode.tagName;
      const rendererModel =
        renderer.model ??
        (lookupRecord(defaultHTMLElementModels, tagName)
          ? defaultHTMLElementModels[tagName]
          : null);
      if (
        rendererModel &&
        tnode.matchContentModel(rendererModel.contentModel)
      ) {
        return renderer as any;
      } else {
        __DEV__ &&
          console.warn(
            `You are attempting to render "${tnode.tagName}" of type "${tnode.displayName}", but the registered renderer is of content model type ${rendererModel?.contentModel} which is incompatible with "${tnode.displayName}". The custom renderer will be ignored.`
          );
      }
      return null;
    }
    return null;
  }
}
