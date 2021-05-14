import { ComponentType } from 'react';

export type PageGroup = 'root' | 'concept' | 'content' | 'guides';

export type PageId =
  | 'intro'
  | 'reinvent-the-wheel'
  | 'architecture'
  // concepts
  | 'html-processing'
  | 'css-processing'
  | 'transient-render-engine'
  | 'rendering'
  // guides
  | 'styling-components'
  | 'dom-tampering'
  | 'custom-renderers'
  // content
  | 'images'
  | 'anchors'
  | 'textual'
  | 'lists';

export interface PageSpecs {
  title: string;
  /**
   * (Web) Used for search engines
   */
  description: string;
  /**
   * The position of this resource in the group.
   */
  position: number;
  group: PageGroup;
  /**
   * A unique identifier. Must be unique within group.
   */
  id: PageId;
  /**
   * (Native) The icon associated with this resource.
   */
  iconName: string;
  component: ComponentType<{}>;
}

export type Acronym = 'TRE' | 'TRT' | 'TNode';

export interface AcronymDefinition {
  name: Acronym;
  fullName: string;
  definition: string;
}
