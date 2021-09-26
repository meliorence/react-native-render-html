import { TNode } from '@native-html/transient-render-engine';
import { ComponentType } from 'react';
import { CustomRendererProps } from '..';
import lookupRecord from '../helpers/lookupRecord';
import BRRenderer from '../renderers/BRRenderer';
import WBRRenderer from '../renderers/WBRRenderer';
import {
  CustomRenderer,
  HTMLElementModelRecord,
  InternalRenderer
} from '../shared-types';
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
  Custom: CustomRenderer<T> | null;
  Default: InternalRenderer<T> | null;
}

export default class RenderRegistry {
  constructor(
    customRenderers: CustomTagRendererRecord = {},
    elementModels: HTMLElementModelRecord
  ) {
    this.customRenderers = customRenderers;
    this.elementModels = elementModels;
  }

  private readonly customRenderers: CustomTagRendererRecord = {};
  private readonly elementModels: HTMLElementModelRecord;

  private getCustomRendererForTNode<T extends TNode>(
    tnode: T
  ): ComponentType<CustomRendererProps<T>> | null {
    if (tnode.tagName! in this.customRenderers) {
      const renderer = this.customRenderers[tnode.tagName!];
      /* istanbul ignore next */
      if (typeof __DEV__ === 'boolean' && __DEV__) {
        // In DEV, check for discrepancies.
        const elementModel = this.elementModels[tnode.tagName!];
        if (!elementModel) {
          console.warn(
            `You are attempting to render a ${tnode.tagName!} tag but you didn't provide an HTMLElementModel. Make sure you register a model for this tag in "customHTMLElementModels" prop. `
          );
        } else if (!tnode.matchContentModel(elementModel.contentModel)) {
          console.warn(
            `You are attempting to render "${tnode.tagName}" of type "${tnode.displayName}", but the registered renderer is of content model type ${elementModel?.contentModel} which is incompatible with "${tnode.displayName}".`
          );
        }
      }
      return renderer as any;
    }
    return null;
  }

  private getDefaultRendererForTNode<T extends TNode>(
    tnode: T
  ): InternalRenderer<T> | null {
    if (tnode.tagName! in internalRenderers) {
      //@ts-expect-error we know that the tagName is in the map
      return internalRenderers[tnode.tagName!];
    }
    return null;
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
}
