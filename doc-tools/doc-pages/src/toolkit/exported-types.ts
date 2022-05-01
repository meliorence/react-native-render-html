import type { ComponentType, PropsWithChildren } from 'react';
import type { AcronymDefinition, PageSpecs } from '../pages-types';

export type SvgAssetType = 'data-flow';

export type RefType =
  | 'html-attr'
  | 'html-el'
  | 'es-symbol'
  | 'css-prop'
  | 'rn-symbol'
  | 'library'
  | 'doc';

export type AdmonitionType =
  | 'note'
  | 'tip'
  | 'warning'
  | 'important'
  | 'caution';

export interface RefAPIProps {
  member?: string;
  full?: boolean;
  library: string;
  url: string;
  name: string;
  plural?: boolean;
}

export type SourceDisplayProps = {
  lang: string;
  content: string;
  title?: string;
  showLineNumbers: boolean;
};

export type TNodeTransformDisplayProps = {
  title?: string;
  caption?: string;
  html: string;
  snaphost: string;
};

export interface ImportStmt {
  package: string;
  default?: string;
  named?: string[];
}

export interface UIToolkitBase {
  Container?: ComponentType<PropsWithChildren<{}>>;
  Header: ComponentType<PropsWithChildren<{}>>;
  Chapter: ComponentType<{ title: string }>;
  Section: ComponentType<{ title: string }>;
  Paragraph: ComponentType<{}>;
  Bold: ComponentType<{}>;
  SourceDisplay: ComponentType<SourceDisplayProps>;
  TNodeTransformDisplay: ComponentType<TNodeTransformDisplayProps>;
  Admonition: ComponentType<
    PropsWithChildren<{ type: AdmonitionType; title?: string }>
  >;
  List: ComponentType<
    PropsWithChildren<{ type?: 'upper-alpha' | 'decimal' | 'disc' }>
  >;
  ListItem: ComponentType<PropsWithChildren<{}>>;
  DList: ComponentType<PropsWithChildren<{}>>;
  DListTitle: ComponentType<PropsWithChildren<{}>>;
  DListItem: ComponentType<PropsWithChildren<{}>>;
  InlineCode: ComponentType<PropsWithChildren<{}>>;
  Hyperlink: ComponentType<PropsWithChildren<{ url: string }>>;
  Conditional: ComponentType<{ platform: 'web' | 'mobile' }>;
}

export type UIToolkitConfig = {
  RefBuilder: ComponentType<{ name: string; url: string; type: RefType }>;
  RenderHtmlCard: ComponentType<{
    snippet: string;
    expoSource: string;
    title: string;
    caption?: string;
    props: any;
    preferHtmlSrc: boolean;
    extraneousDeps: string[];
    snapshot: string;
  }>;
  RefDoc: ComponentType<{ target: PageSpecs; fragment?: string }>;
  Acronym: ComponentType<AcronymDefinition>;
  SvgFigure: ComponentType<{
    asset: SvgAssetType;
    description: string;
    title: string;
  }>;
  RefAPI: ComponentType<RefAPIProps>;
} & UIToolkitBase;
