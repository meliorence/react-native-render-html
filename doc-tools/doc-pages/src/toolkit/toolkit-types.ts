import type { ComponentType, PropsWithChildren } from 'react';
import * as RNRH from 'react-native-render-html';
import type * as TRE from '@native-html/transient-render-engine';
import type * as CSS from '@native-html/css-processor';
import type * as DOM from 'domhandler';
import type * as RN from 'react-native';
import type {
  Acronym,
  AcronymDefinition,
  PageId,
  PageSpecs
} from '../pages-types';

type RefComponent<T extends string = string, P = {}> = ComponentType<
  { name: T } & P
>;

export type SvgAssetType = 'data-flow';

export type AdmonitionType =
  | 'note'
  | 'tip'
  | 'warning'
  | 'important'
  | 'caution';

export type RefType =
  | 'html-attr'
  | 'html-el'
  | 'es-symbol'
  | 'css-prop'
  | 'rn-symbol'
  | 'library'
  | 'doc';

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

export interface UIToolkitRefs {
  RefHtmlAttr: RefComponent;
  RefHtmlElement: RefComponent;
  RefESSymbol: RefComponent;
  RefCssProperty: RefComponent;
  RefRNSymbol: RefComponent<keyof typeof RN>;
  RefLibrary: ComponentType<{ name: string; url: string }>;
}

export interface ImportStmt {
  package: string;
  default?: string;
  named?: string[];
}
export interface RendererCardConfig {
  fnSrcMap?: Record<string, string>;
  exprSrcMap?: Record<string, string>;
  importStatements?: ImportStmt[];
  wrapperComponent?: string | null;
}

export interface UIRenderHtmlCardProps {
  title: string;
  caption?: string;
  props: RNRH.RenderHTMLProps;
  config?: RendererCardConfig;
  preferHtmlSrc?: boolean;
}

export interface RefOptionalProps {
  member?: string;
  plural?: boolean;
  full?: boolean;
}

export interface RefAPIProps {
  member?: string;
  full?: boolean;
  library: string;
  url: string;
  name: string;
  plural?: boolean;
}

export interface UIToolkit extends UIToolkitBase, UIToolkitRefs {
  RenderHtmlCard: ComponentType<UIRenderHtmlCardProps>;
  RefDoc: ComponentType<{ target: PageId; fragment?: string }>;
  Acronym: ComponentType<{ name: Acronym }>;
  SvgFigure: ComponentType<{ asset: SvgAssetType }>;
  RefRenderHtmlProp: RefComponent<keyof RNRH.RenderHTMLProps>;
  RefRenderHTMLExport: RefComponent<
    keyof typeof RNRH | string,
    RefOptionalProps
  >;
  RefTRE: RefComponent<keyof typeof TRE | string, RefOptionalProps>;
  RefCSSProcessor: RefComponent<keyof typeof CSS | string, RefOptionalProps>;
  RefDOM: RefComponent<keyof typeof DOM, RefOptionalProps>;
}

export type UIToolkitConfig = {
  RefBuilder: ComponentType<{ name: string; url: string; type: RefType }>;
  RenderHtmlCard: ComponentType<{
    snippet: string;
    expoSource: string;
    title: string;
    caption?: string;
    props: RNRH.RenderHTMLProps;
    preferHtmlSrc: boolean;
    extraneousDeps: string[];
  }>;
  RefDoc: ComponentType<{ target: PageSpecs; fragment?: string }>;
  Acronym: ComponentType<AcronymDefinition>;
  SvgFigure: ComponentType<{ asset: SvgAssetType; description: string }>;
  RefAPI: ComponentType<RefAPIProps>;
} & UIToolkitBase;
