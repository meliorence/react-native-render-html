import type { ComponentType } from 'react';
import * as RNRH from 'react-native-render-html';
import type * as TRE from '@native-html/transient-render-engine';
import type * as CSS from '@native-html/css-processor';
import type * as DOM from 'domhandler';
import type * as RN from 'react-native';
import type { Acronym, PageId } from '../pages-types';
import type { UIToolkitBase, SvgAssetType, ImportStmt } from './exported-types';

type RefComponent<T extends string = string, P = {}> = ComponentType<
  { name: T } & P
>;

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
