import type { ComponentType, PropsWithChildren } from 'react';
import type { RenderHTMLProps } from 'react-native-render-html';
import type * as RN from 'react-native';
import type {
  Acronym,
  AcronymDefinition,
  PageId,
  PageSpecs
} from '../pages-types';

type RefComponent<T extends string = string> = ComponentType<{ name: T }>;

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
export interface UIToolkitBase {
  Container?: ComponentType<PropsWithChildren<{}>>;
  Header: ComponentType<PropsWithChildren<{}>>;
  Chapter: ComponentType<{ title: string }>;
  Section: ComponentType<{ title: string }>;
  Paragraph: ComponentType<{}>;
  Bold: ComponentType<{}>;
  SourceDisplay: ComponentType<SourceDisplayProps>;
  Admonition: ComponentType<
    PropsWithChildren<{ type: AdmonitionType; title?: string }>
  >;
  List: ComponentType<
    PropsWithChildren<{ type?: 'upper-alpha' | 'decimal' | 'disc' }>
  >;
  ListItem: ComponentType<PropsWithChildren<{}>>;
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

export interface RendererCardConfig {
  fnSrcMap?: Record<string, string>;
  exprSrcMap?: Record<string, string>;
  importStatements?: string[];
}

export interface UIRenderHtmlCardProps {
  title: string;
  caption?: string;
  props: RenderHTMLProps;
  config?: RendererCardConfig;
}

export interface UIToolkit extends UIToolkitBase, UIToolkitRefs {
  RenderHtmlCard: ComponentType<UIRenderHtmlCardProps>;
  RefDoc: ComponentType<{ target: PageId }>;
  Acronym: ComponentType<{ name: Acronym }>;
  SvgFigure: ComponentType<{ asset: SvgAssetType }>;
  RefRenderHtmlProp: RefComponent<keyof RenderHTMLProps>;
}

export type UIToolkitConfig = {
  RefBuilder: ComponentType<{ name: string; url: string; type: RefType }>;
  RenderHtmlCard: ComponentType<{
    snippet: string;
    title: string;
    caption?: string;
    props: RenderHTMLProps;
  }>;
  RefDoc: ComponentType<{ target: PageSpecs }>;
  Acronym: ComponentType<AcronymDefinition>;
  SvgFigure: ComponentType<{ asset: SvgAssetType; description: string }>;
  RefRenderHtmlProp: ComponentType<{
    name: keyof RenderHTMLProps;
    pageAbsoluteUrl: string;
    docRelativePath: string;
    fragment: string;
  }>;
} & UIToolkitBase;
