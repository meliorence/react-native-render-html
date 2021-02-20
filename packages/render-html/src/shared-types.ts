import {
  GestureResponderEvent,
  StyleProp,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle
} from 'react-native';
import type {
  MixedStyleRecord,
  DOMNode,
  DOMText,
  DOMElement,
  TNode,
  TBlock,
  TText,
  TPhrasing,
  DocumentContext as TREDocumentContext
} from '@native-html/transient-render-engine';

import { ComponentType, ReactElement, ReactNode } from 'react';
import {
  CSSPropertyNameList,
  MixedStyleDeclaration
} from '@native-html/css-processor';
import type { TStyles } from '@native-html/transient-render-engine';
import { CustomTagRendererRecord } from './render/render-types';
import { ParserOptions as HtmlParserOptions } from 'htmlparser2';

export interface ImageDimensions {
  width: number;
  height: number;
}

export interface HtmlAttributesDictionary {
  [attribute: string]: string;
}

/**
 * Props for custom renderers. The convention is to declare a field per renderer.
 * In doing so, you can benefit from `useRendererProps('tagname')` in custom renderers.
 *
 * @public
 * @remarks Plugins offering options should augment this declaration.
 * See https://www.typescriptlang.org/docs/handbook/declaration-merging.html
 */
export interface RenderersPropsBase extends Record<string, any> {}

export interface RenderHTMLSharedProps<
  RendererProps extends RenderersPropsBase = RenderersPropsBase
> {
  /**
   * Default width and height to display while image's dimensions are being retrieved.
   */
  imagesInitialDimensions?: ImageDimensions;
  /**
   * The width of the HTML content to display. If you don't pass this prop,
   * images might overflow horizontally and take up to all their physical
   * width. The recommended practice is to pass
   * `useWindowDimensions().width` minus any padding or margins.
   */
  contentWidth?: number;
  /**
   * A function which takes contentWidth and tagName as arguments and returns a
   * new width. Can return Infinity to denote unconstrained widths.
   *
   * @param contentWidth - The available width in this {@link RenderHTML} component.
   * @param tagName - The tagName of this element to render, e.g. "img".
   *
   * @remarks Take advantage of `useComputeMaxWidthForTag` hook inside custom
   * renderers to get the maximum width for this tag.
   */
  computeEmbeddedMaxWidth?: (contentWidth: number, tagName: string) => number;
  /**
   * Support for relative percent-widths. Currently, it only works for images.
   */
  enableExperimentalPercentWidth?: boolean;
  /**
   * Enable or disable margin collapsing CSS behavior (experimental!).
   * See {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing | MDN docs}.
   *
   * @remarks Limitations:
   * - Only adjacent siblings collapsing is implemented.
   * - If one of the margins height is in percent, no collapsing will occur.
   *
   * @default false
   */
  enableExperimentalMarginCollapsing?: boolean;
  /**
   * Fired with the event, the href and an object with all attributes of the
   * tag as its arguments when tapping a link
   */
  onLinkPress?: (
    event: GestureResponderEvent,
    href: string,
    htmlAttribs: HtmlAttributesDictionary,
    target: TREDocumentContext['baseTarget']
  ) => void;
  /**
   * Props to use in custom renderers with `useRendererProps` or
   * `useSharedProps`.
   */
  renderersProps?: RendererProps;
  /**
   * Default props for Text elements in the render tree.
   *
   * @remarks "style" will be merged into the tnode own styles.
   */
  defaultTextProps?: TextProps;
  /**
   * Default props for View elements in the render tree.
   *
   * @remarks "style" will be merged into the tnode own styles.
   */
  defaultViewProps?: ViewProps;
  /**
   * Default props for WebView elements in the render tree used by plugins.
   */
  defaultWebViewProps?: any;
  /**
   * Log to the console meaningful information regarding dismissed CSS
   * properties, ignored tags... etc.
   */
  debug?: boolean;
  /**
   * The WebView component used by plugins (iframe, table)...
   * See [@native-html/plugins](https://github.com/native-html/plugins).
   */
  WebView?: ComponentType<any>;
  /**
   * Set custom markers from a TNode and all its descendants. Markers will be
   * accessible in custom renderers via `markers` prop.
   *
   * @param tnode - The TNode to inspect
   * @param parentMarkers - Markers from the parent TNode.
   *
   * @returns a record of markers if one or many markers should be added,
   * `null` otherwise.
   */
  setMarkersForTNode?: (
    tnode: TNode,
    parentMarkers: Markers
  ) => Partial<Markers> | null;
}

export interface TransientRenderEngineConfig {
  /**
   * ParserOptions for [htmlparser2](https://github.com/fb55/htmlparser2/wiki/Parser-options)
   *
   * @defaultvalue  `{ decodeEntities: true }`
   */
  htmlParserOptions?: HtmlParserOptions;
  /**
   * Enable or disable fallback styles for each tag. For example, `pre` tags
   * will have `whiteSpace` set to 'pre' by default.
   *
   * @default true
   */
  enableUserAgentStyles?: boolean;
  /**
   * Enable or disable inline CSS processing of inline styles.
   *
   * @remarks If you want to allow or disallow specific properties, use
   * `allowedStyles` or `ignoredStyles` props.
   *
   * @default true
   */
  enableCSSInlineProcessing?: boolean;
  /**
   * Provide your styles for specific HTML tags.
   *
   * @remarks Do NOT use the StyleSheet API to create the styles
   * you're going to feed to `tagsStyle and classesStyles`.
   */
  tagsStyles?: MixedStyleRecord;
  /**
   * Provide your styles for specific HTML classes.
   *
   * @remarks Do NOT use the StyleSheet API to create the styles
   * you're going to feed to `tagsStyle and classesStyles`.
   */
  classesStyles?: MixedStyleRecord;
  /**
   * Provide your styles for specific element identifiers (id attribute).
   */
  idsStyles?: MixedStyleRecord;
  /**
   * The default style for the document (root). Inheritable styles will be
   * transferred to children. That works also for Text styles.
   */
  baseStyle?: MixedStyleDeclaration;
  /**
   * Ignore specific DOM nodes.
   *
   * @remarks Use `ignoredTags` if you simply need to discard specific tags.
   *
   * @param node - The DOM node to check.
   * @returns `true` if the node should be dropped, `false` otherwise.
   */
  ignoreDOMNode?: (node: DOMNode) => boolean;
  /**
   * Change the data of specific DOM text nodes.
   *
   * @param textNode - The DOM text node to check.
   * @returns A string if the node data should be altered, `false` or `void`
   * otherwise.
   */
  alterDOMData?: (textNode: DOMText) => string | false | void;
  /**
   * Change specific DOM nodes children.
   *
   * @param elementNode - The DOM element to check.
   * @returns An array of DOM nodes if the children should be altered, `false`
   * or `void` otherwise.
   */
  alterDOMChildren?: (elementNode: DOMElement) => DOMNode[] | false | void;
  /**
   * Change specific DOM elements.
   *
   * @param elementNode - The DOM element to check.
   * @returns The new or altered DOM element if you intended to change it,
   * `false` or `void` otherwise.
   */
  alterDOMElement?: (elementNode: DOMElement) => DOMElement | false | void;
  /**
   * HTML tags that should be dropped.
   */
  ignoredTags?: string[];
  /**
   * Whitelist specific inline CSS style properties and ignore the others.
   *
   * @remarks Property names must be camelCased: for example,
   * 'background-color' should be written 'backgroundColor'.
   */
  allowedStyles?: CSSPropertyNameList;
  /**
   * Blacklist specific inline CSS style properties and allow the others.
   *
   * @remarks Property names must be camelCased: for example,
   * 'background-color' should be written 'backgroundColor'. Also note that if
   * you don't want inline style processing at all, you should set
   * `enableCSSInlineProcessing` prop to `false`.
   */
  ignoredStyles?: CSSPropertyNameList;
  /**
   * A list of fonts available in the current platform. These fonts will be used
   * to select the first match in CSS `fontFamily` property, which supports a
   * comma-separated list of fonts. By default, a handful of fonts are selected
   * per platform.
   *
   * @remarks
   * - You need to specify any font family you wish to use via `*styles` props
   *   here, otherwise those styles will be ignored.
   * - If you are using expo, you should use or extend `Constants.systemFonts`.
   *
   * @example
   * ```tsx
   * import RenderHTML, {defaultSystemFonts} from 'react-native-render-html'
   * // Replace defaultSystemFonts with Constants.systemFonts if you're using expo
   * const systemFonts = [...defaultSystemFonts, 'Mysuperfont']
   * // ...
   * <RenderHTML systemFonts={systemFonts} ... />
   * ```
   */
  systemFonts?: string[];
  /**
   * A record for specific CSS fonts.
   *
   * **Suggestion**: Use Plaform.select({ ios: ..., android: ..., default: ...})
   */
  fallbackFonts?: FallbackFontsDefinitions;
  /**
   * Your custom renderers.
   */
  renderers?: CustomTagRendererRecord;
  /**
   * The default value in pixels for 1em
   */
  emSize?: number;
  /**
   * Name of props which should trigger a rebuild of the Transient Render
   * Engine (TRE).
   *
   * @remarks For performance sake, this component will not recreate an
   * instance of the engine on each prop change. If you need some props to
   * trigger a new instantiation, such as `tagsStyles`, pass a list of their
   * names in this array.
   *
   * Please note that only props involved in the building of the transient render
   * tree are concerned by this mechanism.
   *
   * @example
   * ```ts
   * triggerTREInvalidationPropNames = ['tagsStyles', 'allowedStyles']
   * ```
   */
  triggerTREInvalidationPropNames?: Array<
    Exclude<
      keyof TransientRenderEngineConfig,
      'triggerTREInvalidationPropNames'
    >
  >;
}

export interface RenderHTMLSourceUri {
  /**
   * The URI to load in the `HTML` component. Can be a local or remote file.
   */
  uri: string;
  /**
   * The HTTP Method to use. Defaults to GET if not specified.
   */
  method?: string;
  /**
   * Additional HTTP headers to send with the request.
   */
  headers?: Record<string, string>;
  /**
   * The HTTP body to send with the request. This must be a valid
   * UTF-8 string, and will be sent exactly as specified, with no
   * additional encoding (e.g. URL-escaping or base64) applied.
   */
  body?: string;
}

export interface RenderHTMLSourceInline {
  /**
   * A static HTML page to display in the HTML component.
   */
  html: string;
  /**
   * The base URL to resolve relative URLs in the HTML code.
   */
  baseUrl?: string;
}

export type RenderHTMLSource = RenderHTMLSourceInline | RenderHTMLSourceUri;

export interface RenderHTMLFragmentProps<
  P extends RenderersPropsBase = RenderersPropsBase
> extends RenderHTMLSharedProps<P> {
  /**
   * The object source to render (either `{ uri }` or `{ html }`).
   */
  source: RenderHTMLSource;
  /**
   * Replace the default loader while fetching a remote website's content.
   */
  remoteLoadingView?: (props: RenderHTMLProps<P>) => ReactElement;
  /**
   * Replace the default error if a remote website's content could not be fetched.
   */
  remoteErrorView?: (props: RenderHTMLProps<P>) => ReactElement;
  /**
   * Triggered when the transient render tree changes. Useful for debugging.
   */
  onTTreeChange?: (ttree: TNode) => void;
  /**
   * Triggered when HTML is available to the RenderHTML component.
   */
  onHTMLLoaded?: (html: string) => void;
  /**
   * Handler invoked when the document metadata is available. It will
   * re-trigger on HTML content changes.
   */
  onDocumentMetadataLoaded?: (documentMetadata: DocumentMetadata) => void;
}

export interface RenderHTMLProps<
  P extends RenderersPropsBase = RenderersPropsBase
> extends RenderHTMLFragmentProps<P>,
    TransientRenderEngineConfig {}

export type RenderResolvedHTMLProps = Pick<
  RenderHTMLProps,
  'onTTreeChange' | 'onDocumentMetadataLoaded' | 'debug'
> & {
  html: string;
  baseUrl?: string;
};

export interface ResolvedResourceProps {
  html: string;
  baseUrl?: string;
}

export interface SourceLoaderProps
  extends Pick<
    RenderHTMLProps,
    'source' | 'remoteLoadingView' | 'remoteErrorView' | 'onHTMLLoaded'
  > {
  children: (resource: ResolvedResourceProps) => any;
}

export interface FallbackFontsDefinitions {
  serif: string;
  'sans-serif': string;
  monospace: string;
}

/**
 * Markers form an abstraction in which one node provides semantic information
 * to itself and all its descendants. For example, `ins` elements, which stand
 * for "insertion" of content in the context of an edit will provide the {
 * edits: 'ins' } marker to all its descendants.
 *
 * Custom renderers can use markers to change their layout and convey their
 * semantic meaning. Markers can be derived from attributes, such as `lang` and
 * `dir` attributes, or tag names, such as `a`, `ins`, `del`...
 */
export interface Markers extends Record<string, any> {
  /**
   * If this node is an `a` or has one as ancestor, this field will be set to
   * `true`.
   *
   * @defaultvalue false
   */
  anchor: boolean;
  /**
   * If this node is a `del` or `ins` or has either as ancestor, this field
   * will be set accordingly. Otherwise, it will be set to 'none'.
   *
   * https://html.spec.whatwg.org/#edits
   *
   * @defaultvalue 'none'
   */
  edits: 'ins' | 'del' | 'none';
  /**
   * The direction for this content. Follows `dir` attribute.
   *
   * https://html.spec.whatwg.org/#the-dir-attribute
   *
   * @defaultvalue 'ltr'
   */
  direction: 'ltr' | 'rtl';
  /**
   * The language for this content. Follows `lang` attribute.
   *
   * https://html.spec.whatwg.org/#the-lang-and-xml:lang-attributes
   */
  lang: string;
  /**
   * * -1: this node is not an `ol` and has no `ol` parents
   * * 0: this node is an `ol` or has one `ol` parent
   * * 1: ...
   */
  olNestLevel: number;
  /**
   * * -1: this node is not an `ul` and has no `ul` parents
   * * 0: this node is an `ul` or has one `ul` parent
   * * 1: ...
   */
  ulNestLevel: number;
}

/**
 * Props passed from parents to children.
 *
 * @remarks Anonymous nodes will pass those props from their parents to
 * children.
 */
export interface PropsFromParent extends Record<string, any> {
  collapsedMarginTop: number | null;
}

export type NativeBlockStyles = TStyles['nativeBlockFlow'] &
  TStyles['nativeBlockRet'];

export type NativeTextStyles = TStyles['nativeBlockFlow'] &
  TStyles['nativeBlockRet'] &
  TStyles['nativeTextFlow'] &
  TStyles['nativeTextRet'];

export type NativeStyleProp<T extends TNode> = T extends TBlock
  ? NativeBlockStyles
  : NativeTextStyles;

export interface TChildProps {
  key: string | number;
  childElement: ReactElement;
  index: number;
  childTnode: TNode;
  propsFromParent: PropsFromParent;
}

export interface TChildrenBaseProps {
  disableMarginCollapsing?: boolean;
  renderChild?: (props: TChildProps) => ReactNode;
  propsForChildren?: Partial<PropsFromParent>;
  parentMarkers: Markers;
}

export interface TChildrenRendererProps extends TChildrenBaseProps {
  tchildren: TNode[];
}

export interface TNodeChildrenRendererProps extends TChildrenBaseProps {
  tnode: TNode;
}

export interface TNodeRendererProps<
  T extends TNode,
  P extends PropsFromParent = PropsFromParent
> {
  tnode: T;
  key?: string | number;
  markers: Markers;
  propsFromParent: P;
}

export interface TNodeSubRendererProps<
  T extends TNode,
  P extends PropsFromParent = PropsFromParent
> extends TNodeRendererProps<T, P> {
  /**
   * Props shared across the whole render tree.
   */
  sharedProps: Required<RenderHTMLSharedProps<any>>;
}

export interface TRendererBaseProps<
  T extends TNode,
  P extends PropsFromParent = PropsFromParent
> extends TNodeRendererProps<T, P> {
  /**
   * Any default renderer should be able to handle press.
   */
  onPress?: (e: GestureResponderEvent) => void;
  /**
   * Props for Text-based renderers.
   */
  textProps: TextProps;
  /**
   * Props for View-based renderers.
   */
  viewProps: ViewProps;
  /**
   * Is is a text-based or view-based renderer?
   */
  type: 'text' | 'block';
}

export interface TDefaultRendererProps<
  T extends TNode,
  P extends PropsFromParent = PropsFromParent
> extends TRendererBaseProps<T, P> {
  /**
   * When children is present, renderChildren will not be invoked.
   */
  children?: ReactNode;
  /**
   * The style for this renderer will depend on the type of tnode.
   * You can check if a node is textual with `props.type === 'text'`.
   */
  style: T extends TText
    ? StyleProp<TextStyle>
    : T extends TPhrasing
    ? StyleProp<TextStyle>
    : StyleProp<ViewStyle>;
  /**
   * Props passed to children nodes. Those props are accessible from children
   * renderers as `propsFromParent`
   */
  propsForChildren?: Partial<PropsFromParent>;
}

export interface DefaultTagRendererProps<
  T extends TNode,
  P extends PropsFromParent = PropsFromParent
> extends TRendererBaseProps<T, P> {
  /**
   * Styles extracted from tnode.style
   */
  style: NativeStyleProp<T>;
  /**
   * Props shared across the whole render tree.
   */
  sharedProps: Required<RenderHTMLSharedProps<RenderersPropsBase>>;
  /**
   * Default renderer for this tnode.
   */
  TDefaultRenderer: TDefaultRenderer<T>;
}

export interface CustomTagRendererProps<
  T extends TNode,
  P extends PropsFromParent = PropsFromParent
> extends DefaultTagRendererProps<T, P> {
  /**
   * Internal renderer for this _tagName_, not to be confused with
   * {@link TDefaultRenderer}, which is the default renderer for the _tnode_.
   *
   * @remarks For example, when rendering `img` tags, `TDefaultRenderer` and
   * `DefaultTagRenderer` won't be equal.
   *
   * When there is no default tag renderer for this tag, this prop will fallback
   * to the `TDefaultRenderer`.
   */
  DefaultTagRenderer: DefaultTagRenderer<T>;
}

export type TDefaultRenderer<
  T extends TNode,
  P extends PropsFromParent = PropsFromParent
> = React.ComponentType<TDefaultRendererProps<T, P>>;

export type DefaultTagRenderer<
  T extends TNode,
  P extends PropsFromParent = PropsFromParent
> = React.ComponentType<DefaultTagRendererProps<T, P>>;

export type CustomTagRenderer<
  T extends TNode,
  P extends PropsFromParent = PropsFromParent
> = React.ComponentType<CustomTagRendererProps<T, P>>;

/**
 * An object containing meta-data extracted from resource URL and HTML
 * &lt;head&gt; element.
 */
export interface DocumentMetadata {
  /**
   * The base URL of this resource. It will influence how relative URLs are
   * resolved such as `href` and `src` element properties. By order of
   * precedence:
   *
   * 1. `baseUrl` from `<base/>` html element;
   * 2. `baseUrl` from `source.baseUrl` prop;
   * 3. `baseUrl` as origin of `source.uri` prop.
   */
  baseUrl: string;
  /**
   * The language of this document, extracted from the `lang` attribute of the
   * `<html/>` element;
   */
  lang: string;
  /**
   * The writing direction of this document, extracted from the `dir` attribute
   * of `<html/>` element.
   */
  dir: 'ltr' | 'rtl';
  /**
   * The content of the &lt;title&gt; element.
   */
  title: string;
  /**
   * How anchors should be actioned on press?
   *
   * @remarks By default, `onLinkPress` will always open the system browser,
   * equivalent to `_blank` target. However, you can customize the behavior by
   * providing your own `onLinkPress` implementation.
   */
  baseTarget: TREDocumentContext['baseTarget'];
  /**
   * A data array comprised of attributes from &lt;link&gt; elements.
   */
  links: TREDocumentContext['links'];
  /**
   * A data array comprised of attributes from &lt;meta&gt; elements.
   */
  meta: TREDocumentContext['meta'];
}
