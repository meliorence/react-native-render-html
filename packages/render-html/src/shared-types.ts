import type {
  AccessibilityProps,
  GestureResponderEvent,
  StyleProp,
  TextProps,
  TextStyle,
  TouchableHighlightProps,
  ViewProps,
  ViewStyle
} from 'react-native';
import type {
  MixedStyleRecord,
  Node,
  TNode,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  TNodeType,
  TText,
  TPhrasing,
  DocumentContext as TREDocumentContext,
  TDocument,
  DomVisitorCallbacks,
  SetMarkersForTNode,
  HTMLContentModel,
  CustomElementModel,
  HTMLElementModel,
  TRenderEngineOptions,
  NodeWithChildren,
  Element,
  Document,
  NativeTextStyles,
  NativeBlockStyles
} from '@native-html/transient-render-engine';
import type { CounterStyleRenderer } from '@jsamr/counter-style';
import type { ComponentType, ReactElement, ReactNode } from 'react';
import type {
  CSSPropertyNameList,
  MixedStyleDeclaration
} from '@native-html/css-processor';
import type { CustomTagRendererRecord } from './render/render-types';
import type { ParserOptions as HtmlParserOptions } from 'htmlparser2';

/**
 * A record of HTMLElementModels.
 *
 * @public
 */
export type HTMLElementModelRecord = Record<
  string,
  | CustomElementModel<string, HTMLContentModel>
  | HTMLElementModel<string, HTMLContentModel>
>;

/**
 * @public
 */
export interface ImageDimensions {
  width: number;
  height: number;
}

/**
 * Props for custom Pressable components.
 *
 * @public
 */
export interface GenericPressableProps extends AccessibilityProps {
  style?: StyleProp<ViewStyle>;
  borderless?: boolean;
  onPress?: TouchableHighlightProps['onPress'];
}

/**
 * Configuration for ol and ul.
 *
 * @public
 */
export interface ListElementConfig {
  /**
   * When `true`, the width of the marker box will be adapted depending on
   * `fontSize` and the highest number of characters in the printed range.
   *
   * If this length is superior than the left (or right in ltr mode) padding,
   * a supplemental space will be added before every list child.
   *
   * When `false`, the left (or right in ltr mode) padding will be invariable.
   *
   * @defaultValue false
   */
  enableDynamicMarkerBoxWidth?: boolean;
  /**
   * Remove top margin if this element parent is an `li` element and it
   * is its first child.
   *
   * @defaultValue true
   */
  enableRemoveTopMarginIfNested?: boolean;
  /**
   * Remove bottom margin if this element parent is an `li` element and it
   * is its last child.
   *
   * @defaultValue true
   */
  enableRemoveBottomMarginIfNested?: boolean;
  /**
   * If `true` and the direction is set to `'rtl'` (either via `dir` attribute
   * or `direction` CSS property):
   *
   * - lists markers will be flushed to the right when `I18nManager.isRtl` is `false`.
   * - list markers prefixes and suffixes print order will be reversed.
   *
   * @remarks Beware that left and right padding of li elements *will not*
   * be switched.
   *
   * @defaultValue false
   */
  enableExperimentalRtl?: boolean;
  /**
   * Get default list-style-type given the number of nest level for this list.
   *
   * @param nestLevel - The number of parents elements with the same tag name.
   */
  getFallbackListStyleTypeFromNestLevel?: (
    nestLevel: number
  ) => DefaultSupportedListStyleType;
}

/**
 * Props for custom renderers. The convention is to declare a field per renderer.
 * In doing so, you can benefit from `useRendererProps('tagname')` in custom renderers.
 *
 * @remarks **Typescript users**: If you need to add fields to the {@link RenderersProps} interface,
 * you should use {@link https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation | module augmentation}:
 *
 * ```ts
 * declare module 'react-native-render-html' {
 *   interface RenderersProps {
 *     div?: {
 *       customProp: boolean;
 *     };
 *   }
 * }
 * @public
 */
export interface RenderersProps extends Record<string, any> {
  a: {
    /**
     * A callback to handle anchors presses.
     *
     * @remarks
     * - Changes to this prop will cause a react tree update. Always memoize
     *   it.
     * - The `href` argument has been normalized, see {@link useNormalizedUrl}.
     *
     * @defaultValue A function using React Native `Linking.onpenUrl`.
     * @param event - The {@link GestureResponderEvent} event.
     * @param href - The normalized href, see {@link useNormalizedUrl}.
     * @param htmlAttribs - The attributes of the underlying {@link Element}.
     * @param target - The normalized `target` for this hyperlink.
     */
    onPress?: (
      event: GestureResponderEvent,
      href: string,
      htmlAttribs: Record<string, string>,
      target: '_blank' | '_self' | '_parent' | '_top'
    ) => void;
  };
  img: {
    /**
     * Default width and height to display while image's dimensions are being retrieved.
     *
     * @remarks Changes to this prop will cause a react tree update. Always
     * memoize it.
     */
    initialDimensions?: ImageDimensions;
    /**
     * Support for relative percent-widths.
     *
     * @defaultValue false
     */
    enableExperimentalPercentWidth?: boolean;
  };
  ul: ListElementConfig;
  ol: ListElementConfig;
}

/**
 * Props passed to internal and custom renderers.
 *
 * @public
 */
export interface RenderHTMLPassedProps {
  /**
   * Props to use in custom renderers with `useRendererProps`.
   *
   * @warning
   * Changes to this prop will cause a react tree update. Always memoize it.
   *
   * @remarks
   * - When you use the hook, you'll get this object deep-merged with default renderers props.
   * - **Typescript users**: If you need to add fields to the {@link RenderersProps} interface,
   *     you should use {@link https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation | module augmentation}:
   *
   * ```ts
   * declare module 'react-native-render-html' {
   *   interface RenderersProps {
   *     div?: {
   *       customProp: boolean;
   *     };
   *   }
   * }
   * ```
   */
  renderersProps?: Partial<RenderersProps>;
}

/**
 * Shared props changes will cause all the React tree to invalidate. You should
 * always memoize these.
 *
 * @public
 */
export interface RenderHTMLSharedProps {
  /**
   * A function which takes contentWidth and tagName as arguments and returns a
   * new width. Can return Infinity to denote unconstrained widths.
   *
   * @param contentWidth - The available width in this {@link RenderHTML} component.
   * @param tagName - The tagName of this element to render, e.g. "img".
   *
   * @remarks
   * - Take advantage of {@link useComputeMaxWidthForTag} hook inside custom
   *   renderers to get the maximum width for this tag.
   * - Changes to this prop will cause a react tree update. Always
   *   memoize it.
   *
   * @defaultValue `(c) => c`
   */
  computeEmbeddedMaxWidth?: (contentWidth: number, tagName: string) => number;
  /**
   * Enable or disable margin collapsing CSS behavior (experimental!).
   * See {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing | MDN docs}.
   *
   * @remarks Limitations:
   * - Only adjacent siblings collapsing is implemented.
   * - If one of the margins height is in percent, no collapsing will occur.
   * - Will apply indiscriminately to all `display` properties (including
   *   flex), which is not standard.
   *
   * @defaultValue false
   */
  enableExperimentalMarginCollapsing?: boolean;
  /**
   * Default props for Text elements in the render tree.
   *
   * @remarks
   * - "style" will be merged into the tnode own styles.
   * - Changes to this prop will cause a react tree update. Always memoize it.
   */
  defaultTextProps?: TextProps;
  /**
   * Default props for View elements in the render tree.
   *
   * @remarks
   * - "style" will be merged into the tnode own styles.
   * - Changes to this prop will cause a react tree update. Always memoize it.
   */
  defaultViewProps?: ViewProps;
  /**
   * Default props for WebView elements in the render tree used by plugins.
   *
   * @remarks
   * Changes to this prop will cause a react tree update. Always memoize it.
   */
  defaultWebViewProps?: any;
  /**
   * Log to the console meaningful information regarding dismissed CSS
   * properties, ignored tags... etc.
   *
   * @defaultValue `__DEV__`
   */
  debug?: boolean;
  /**
   * The WebView component used by plugins (iframe, table)...
   * See {@link https://github.com/native-html/plugins | @native-html/plugins}.
   *
   * @defaultValue `() => null`
   */
  WebView?: ComponentType<any>;
  /**
   * A component used to wrap pressable elements (e.g. when provided `onPress`).
   * Note that textual elements will not be wrapped; `TextProps.onPress` will
   * be used instead.
   *
   * @remarks
   * Changes to this prop will cause a react tree update. Always memoize it.
   *
   * @defaultValue A `TouchableNativeFeedback` based component on Android, `TouchableHighlight` based component on other platforms.
   */
  GenericPressable?: ComponentType<GenericPressableProps>;
  /**
   * Color used for pressable items, either for the ripple effect (Android), or
   * highlight (other platforms).
   *
   * @defaultValue rgba(38, 132, 240, 0.2)
   */
  pressableHightlightColor?: string;
  /**
   * Provide support for list style types which are not supported by this
   * library.
   *
   * @remarks Check the numerous presets provided by
   * {@link https://github.com/jsamr/react-native-li/tree/master/packages/counter-style#readme | @jsamr/counter-style}
   * as they require zero-effort!
   *
   * @example
   *
   * ```js
   * import hebrew from '@jsamr/counter-style/presets/hebrew';
   *
   * const customListStyleSpecs = {
   *   hebrew: {
   *     type: 'textual',
   *     counterStyleRenderer: hebrew
   *   }
   * };
   * ```
   */
  customListStyleSpecs?: Record<string, ListStyleSpec>;
}

/**
 * Configuration for the {@link TRenderEngineProvider} component.
 *
 * @public
 */
export interface TRenderEngineConfig {
  /**
   * ParserOptions for {@link https://github.com/fb55/htmlparser2/wiki/Parser-options | htmlparser2}.
   *
   * @defaultValue  `{ decodeEntities: true }`
   */
  htmlParserOptions?: HtmlParserOptions;
  /**
   * Enable or disable fallback styles for each tag. For example, `pre` tags
   * will have `whiteSpace` set to 'pre' by default.
   *
   * @defaultValue true
   */
  enableUserAgentStyles?: boolean;
  /**
   * Enable or disable inline CSS processing of inline styles.
   *
   * @remarks If you want to allow or disallow specific properties, use
   * `allowedStyles` or `ignoredStyles` props.
   *
   * @defaultValue true
   */
  enableCSSInlineProcessing?: boolean;
  /**
   * Provide mixed styles to target HTML tag names.
   *
   * @warning **Do NOT** use the `StyleSheet` API to create those styles.
   * @remarks Any `fontFamily` used in those styles must be registered with
   * {@link TRenderEngineConfig.systemFonts} prop.
   */
  tagsStyles?: MixedStyleRecord;
  /**
   * Provide mixed styles to target elements selected by CSS classes.
   *
   * @warning **Do NOT** use the `StyleSheet` API to create those styles.
   * @remarks Any `fontFamily` used in those styles must be registered with
   * {@link TRenderEngineConfig.systemFonts} prop.
   */
  classesStyles?: MixedStyleRecord;
  /**
   * Provide mixed styles to target elements identified by the `id` attribute.
   *
   * @warning **Do NOT** use the `StyleSheet` API to create those styles.
   * @remarks Any `fontFamily` used in those styles must be registered with
   * {@link TRenderEngineConfig.systemFonts} prop.
   */
  idsStyles?: MixedStyleRecord;
  /**
   * The default style for the document (root). Inheritable styles will be
   * transferred to children. That works also for textual styles.
   *
   * @warning **Do NOT** use the `StyleSheet` API to create those styles.
   * @remarks Any `fontFamily` used in those styles must be registered with
   * {@link TRenderEngineConfig.systemFonts} prop.
   */
  baseStyle?: MixedStyleDeclaration;
  /**
   * Ignore specific DOM nodes.
   *
   * @warning When this function is invoked, the node has not yet been
   * attached to its parent or siblings. Use the second argument (`parent`)
   * if you need to perform logic based on parent.
   *
   * @remarks
   * - Use `ignoredDomTags` if you just need to target specific tag names.
   * - The function is applied during DOM parsing, thus with very little
   *   overhead. However, it means that one node next siblings won't be
   *   available since it has not yet been parsed.
   *
   * @returns `true` if this node should not be included in the DOM, anything
   * else otherwise.
   *
   * @param node - The node to check. Beware the parent node is not accessible. Use the second argument.
   * @param parent - The parent node.
   */
  ignoreDomNode?: (
    node: Node,
    parent: NodeWithChildren
  ) => boolean | void | unknown;
  /**
   * An object which callbacks will be invoked when a DOM element or text node
   * has been parsed and its children attached. This is great to tamper the dom,
   * remove children, insert nodes, change text nodes data... etc.
   *
   * @remark Each callback is applied during DOM parsing, thus with very little
   * overhead. However, it means that one node next siblings won't be available
   * since it has not yet been parsed. If you need some siblings logic, apply
   * this logic to the children of this node.
   */
  domVisitors?: DomVisitorCallbacks;
  /**
   * A list of **lowercase tags** which should not be included in the DOM.
   *
   * @remark The filtering is happening during parsing, thus with very little
   * overhead.
   */
  ignoredDomTags?: string[];
  /**
   * Select the DOM root before TTree generation. For example, you could
   * iterate over children until you reach an article element and return this
   * element.
   *
   * @remarks Applied after DOM parsing, before normalization and TTree
   * construction. Before normalization implies that a body will be added in
   * the tree **after** selecting root.
   */
  selectDomRoot?: TRenderEngineOptions['selectDomRoot'];
  /**
   * Whitelist specific inline CSS style properties and ignore the others.
   *
   * @warning Property names must be camelCased: for example,
   * `background-color` should be written `backgroundColor`.
   */
  allowedStyles?: CSSPropertyNameList;
  /**
   * Blacklist specific inline CSS style properties and allow the others.
   *
   * @warning Property names must be camelCased: for example,
   * `background-color` should be written `backgroundColor`.
   *
   * @remarks Note that if you don't want inline style processing at all, you
   * should set `enableCSSInlineProcessing` prop to `false`.
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
   * @remarks Use `Plaform.select({ ios: ..., android: ..., default: ...})`.
   */
  fallbackFonts?: FallbackFontsDefinitions;
  /**
   * Customize element models for target tags.
   */
  customHTMLElementModels?: HTMLElementModelRecord;
  /**
   * The default value in pixels for 1em.
   */
  emSize?: number;
  /**
   * Set custom markers from a {@link TNode} and all its descendants. {@link Markers} will be
   * accessible in custom renderers via `tnode.markers` prop.
   *
   * @param targetMarkers - The markers to modify.
   * @param parentMarkers - {@link Markers} from the parent {@link TNode}.
   * @param tnode - The {@link TNode} to inspect.
   *
   * @remarks
   * Changes to this prop will cause a react tree update. Always memoize it.
   *
   * @defaultValue `() => null`
   */
  setMarkersForTNode?: SetMarkersForTNode;
  /**
   * **Experimental**
   *
   * Disable hoisting. Especially useful for rendering with react-native-web.
   * Note that your layout might break in native!
   *
   * @defaultValue false
   */
  dangerouslyDisableHoisting?: boolean;
  /**
   * **Experimental**
   *
   * Disable whitespace collapsing. Especially useful if your html is
   * being pre-processed server-side with a minifier.
   *
   * @defaultValue false
   */
  dangerouslyDisableWhitespaceCollapsing?: boolean;
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
   * const triggerTREInvalidationPropNames = ['tagsStyles', 'allowedStyles']
   * ```
   */
  triggerTREInvalidationPropNames?: Array<
    Exclude<keyof TRenderEngineConfig, 'triggerTREInvalidationPropNames'>
  >;
}

/**
 * A source represented by a URI.
 *
 * @public
 */
export interface HTMLSourceUri {
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

/**
 * A source which content is provided in-place.
 *
 * @public
 */
export interface HTMLSourceInline {
  /**
   * A static HTML page to display in the HTML component.
   */
  html: string;
  /**
   * The base URL to resolve relative URLs in the HTML code.
   * See {@link useNormalizedUrl}.
   */
  baseUrl?: string;
}

/**
 * A source which content is a DOM tree created by the transient render
 * engine `parseDocument` method.
 *
 * See {@link useAmbientTRenderEngine}.
 *
 * @remarks When you use a DOM source, the `onHTMLLoaded` callback will never
 * be invoked for this source, since the source loader hasn't access to the
 * HTML source of the DOM.
 *
 * @public
 */
export interface HTMLSourceDom {
  /**
   * A DOM object. This object **must** have been created with
   * the transient render engine `parseDocument` method.
   */
  dom: Element | Document;
  /**
   * The base URL to resolve relative URLs in the HTML code.
   * See {@link useNormalizedUrl}.
   */
  baseUrl?: string;
}

/**
 * The source to render.
 *
 * @public
 */
export type HTMLSource = HTMLSourceInline | HTMLSourceDom | HTMLSourceUri;

/**
 *
 *
 * @public
 */
export interface RenderHTMLConfig
  extends RenderHTMLSharedProps,
    RenderHTMLPassedProps {
  /**
   * Your custom renderers.
   *
   * @remarks
   *
   * **TypeScript users**: To have intellisense for custom renderers, explicitly
   * set your custom renderer type to one of {@link CustomBlockRenderer},
   * {@link CustomTextualRenderer} or {@link CustomMixedRenderer} depending
   * on the {@link HTMLContentModel} defined for this tag (see example below).
   *
   * @example
   *
   * A custom renderer for `<div>` tags which trigger an alert on press.
   *
   * ```tsx
   * import React from 'react';
   * import RenderHTML, { CustomBlockRenderer } from 'react-native-render-html';
   * import { Alert } from 'react-native';
   *
   * const onPress = () => Alert.alert("I pressed a div!");
   *
   * // (TypeScript) Notice the type for intellisense
   * const DivRenderer: CustomBlockRenderer = function DivRenderer({ TDefaultRenderer, ...props }) {
   *  return <TDefaultRenderer {...props} onPress={onPress} />;
   * }
   *
   * const renderers = { div: DivRenderer }
   *
   * //
   *
   * return <RenderHTML renderers={renderers} />
   * ```
   */
  renderers?: CustomTagRendererRecord;
  /**
   * Replace the default loader while fetching a remote website's content.
   */
  remoteLoadingView?: (source: HTMLSourceUri) => ReactElement;
  /**
   * Replace the default error if a remote website's content could not be fetched.
   */
  remoteErrorView?: (source: HTMLSourceUri) => ReactElement;
}

/**
 * Props for the {@link RenderHTMLSource} component.
 *
 * @public
 */
export interface RenderHTMLSourceProps {
  /**
   * The object source to render (either `{ uri }`, `{ html }` or `{ dom }`).
   */
  source: HTMLSource;
  /**
   * The width of the HTML content to display. The recommended practice is to pass
   * `useWindowDimensions().width` minus any padding or margins.
   *
   * @defaultValue `Dimensions.get('window').width`
   */
  contentWidth?: number;
  /**
   * Triggered when the transient render tree changes. Useful for debugging.
   */
  onTTreeChange?: (ttree: TDocument) => void;
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

/**
 * Props for the `RenderHTML` component.
 *
 * @public
 */
export interface RenderHTMLProps
  extends RenderHTMLConfig,
    RenderHTMLSourceProps,
    TRenderEngineConfig {}

/**
 * An object which keys are keyword font names, and values system fonts.
 *
 * @public
 */
export interface FallbackFontsDefinitions {
  serif: string;
  'sans-serif': string;
  monospace: string;
}

/**
 * Props passed from parents to children.
 *
 *
 * @remarks
 * - Anonymous nodes will pass those props from their parents to
 *   children.
 * - **Typescript users**: If you need to customize this type, you should use
 *   {@link https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation | module augmentation}:
 *
 * ```ts
 * declare module 'react-native-render-html' {
 *   interface PropsFromParent {
 *     customProp?: boolean;
 *   }
 * }
 * ```
 *
 */
export interface PropsFromParent {
  collapsedMarginTop: number | null;
}

/**
 * Props to render a child.
 *
 * @public
 */
export interface TChildProps {
  /**
   * The React `key`.
   */
  key: string | number;
  /**
   * The child element.
   */
  childElement: ReactElement;
  /**
   * The position relative to parent.
   */
  index: number;
  /**
   * The child associated {@link TNode}.
   */
  childTnode: TNode;
  /**
   * Props that have been set via
   * {@link TChildrenRendererProps.propsForChildren}.
   */
  propsFromParent: PropsFromParent;
}

/**
 * Common props for TChildren rendering logic.
 *
 * @public
 */
export interface TChildrenBaseProps {
  /**
   * When {@link RenderHTMLProps.enableExperimentalMarginCollapsing} is
   * enabled, this prop will be true by default. But you can opt-out when
   * rendering children.
   */
  disableMarginCollapsing?: boolean;
  /**
   * A React render function to render and wrap individual children.
   */
  renderChild?: (props: TChildProps) => ReactNode;
  /**
   * Props that will be passed to children renderers via
   * {@link CustomRendererProps.propsFromParent}.
   */
  propsForChildren?: Partial<PropsFromParent>;
}

/**
 * Props for {@link TChildrenRenderer}.
 *
 * @public
 */
export interface TChildrenRendererProps extends TChildrenBaseProps {
  /**
   * An array of {@link TNode} to render.
   */
  tchildren: ReadonlyArray<TNode>;
}

/**
 * Props for {@link TNodeChildrenRenderer}.
 *
 * @public
 */
export interface TNodeChildrenRendererProps extends TChildrenBaseProps {
  /**
   * The {@link TNode} from which children will be rendered.
   */
  tnode: TNode;
}

/**
 * Props for {@link TNodeRenderer} component.
 *
 * @typeParam T - The concrete type of {@link TNode}.
 */
export interface TNodeRendererProps<T extends TNode> {
  /**
   * The {@link TNode} to render.
   */
  tnode: T;
  /**
   * The key that must be passed to the root of the returned element.
   */
  key?: string | number;
  /**
   * Props passed by direct parents.
   */
  propsFromParent: PropsFromParent;
}

/**
 * Abstract interface for renderers.
 *
 * @typeParam T - The concrete type of {@link TNode}.
 */
export interface RendererBaseProps<T extends TNode>
  extends TNodeRendererProps<T> {
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

/**
 * Props for {@link TDefaultRenderer}.
 *
 * @typeParam T - The concrete type of {@link TNode}.
 * @public
 */
export interface TDefaultRendererProps<T extends TNode>
  extends RendererBaseProps<T> {
  /**
   * When children is present, renderChildren will not be invoked.
   */
  children?: ReactNode;
  /**
   * The style for this renderer will depend on the type of {@link TNode}.
   * You can check if a node is textual with `props.type === 'text'`.
   */
  style: T extends TText | TPhrasing
    ? StyleProp<TextStyle>
    : StyleProp<ViewStyle>;
  /**
   * Props passed to children nodes. Those props are accessible from children
   * renderers as `propsFromParent`
   */
  propsForChildren?: Partial<PropsFromParent>;
}

/**
 * Props for {@link InternalRenderer} components.
 *
 * @typeParam T - The concrete type of {@link TNode}.
 * @public
 */
export interface InternalRendererProps<T extends TNode>
  extends RendererBaseProps<T> {
  /**
   * Styles extracted with {@link TNode.getNativeStyles}.
   */
  style: T extends TText | TPhrasing ? NativeTextStyles : NativeBlockStyles;
  /**
   * Props shared across the whole render tree.
   */
  sharedProps: Required<RenderHTMLSharedProps>;
  /**
   * Default renderer for this {@link TNode}.
   */
  TDefaultRenderer: TDefaultRenderer<T>;
}

/**
 * Props for custom renderers, such as provided in the `renderers` prop.
 *
 * @typeParam T - The concrete type of {@link TNode}.
 * @public
 */
export interface CustomRendererProps<T extends TNode>
  extends InternalRendererProps<T> {
  /**
   * Internal renderer for this _tagName_, not to be confused with
   * {@link TDefaultRenderer}, which is the fallback renderer for any {@link TNode}.
   *
   * @remarks For example, when rendering `img` tags, `TDefaultRenderer` and
   * `InternalRenderer` won't be equal.
   *
   * When there is no internal renderer for this tag, this prop will fallback
   * to `TDefaultRenderer`.
   */
  InternalRenderer: InternalRenderer<T>;
}

/**
 * Default renderer for any {@link TNode}. The renderer behavior will only
 * change given the {@link TNodeType | type} of the {@link TNode}.
 *
 * @typeParam T - The concrete type of {@link TNode}.
 * @public
 */
export type TDefaultRenderer<T extends TNode> = React.ComponentType<
  TDefaultRendererProps<T>
>;

/**
 * An "internal renderer" is an internal custom renderer, adding specific
 * features to the fallback `TDefaultRenderer`. For example, `<img/>` tags will
 * be rendered via an internal renderer, while `<div>` will fallback to a
 * {@link TDefaultRenderer}.
 *
 * @public
 *
 * @typeParam T - The concrete type of {@link TNode}.
 */
export type InternalRenderer<T extends TNode> = React.ComponentType<
  InternalRendererProps<T>
>;

/**
 * A custom renderer, such as provided in the {@link RenderHTMLProps.renderers} prop.
 *
 * @typeParam T - The concrete type of {@link TNode}.
 * @public
 */
export type CustomRenderer<T extends TNode> = React.ComponentType<
  CustomRendererProps<T>
>;

/**
 * An object containing meta-data extracted from resource URL and HTML
 * `<head>` element.
 *
 * @public
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
   * @remarks By default, `renderersProps.a.onPress` will always open the
   * system browser, equivalent to `_blank` target. However, you can customize
   * the behavior by providing your own implementation.
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

/**
 * Props for unitary counter renderers.
 *
 * @public
 */
export type UnitaryCounterRendererProps = {
  color: string;
  fontSize: number;
  lineHeight: number;
  index: number;
} & Pick<
  MixedStyleDeclaration,
  'fontFamily' | 'fontStyle' | 'fontWeight' | 'fontVariant'
>;

/**
 * List style types supported internally.
 *
 * See {@link https://www.w3.org/TR/css-counter-styles-3 | CSS Counter Styles Level 3}.
 *
 * @public
 */
export type DefaultSupportedListStyleType =
  | 'none'
  | 'disc'
  | 'circle'
  | 'square'
  | 'decimal'
  | 'decimal-leading-zero'
  | 'lower-roman'
  | 'upper-roman'
  | 'lower-greek'
  | 'lower-alpha'
  | 'lower-latin'
  | 'upper-alpha'
  | 'upper-latin'
  | 'disclosure-open'
  | 'disclosure-closed';

/**
 * Specs for a list item marker renderer backed by a `CounterStyleRenderer`
 * from `@jsamr/counter-style`.
 *
 * @public
 */
export interface TextualListStyleSpec {
  type: 'textual';
  counterStyleRenderer: CounterStyleRenderer;
}

/**
 * Specs for a list item marker renderer with only one representation. The
 * "Component" should render this representation, minus prefix and suffix. The
 * rendered component should have a maximum width of `0.6 * fontSize`, and a height of
 * `lineHeight`.
 *
 * @public
 */
export interface UnitaryListStyleSpec {
  counterStyleRenderer: CounterStyleRenderer;
  type: 'unitary';
  Component: ComponentType<UnitaryCounterRendererProps>;
}

/**
 * An object to specify how to render list markers.
 *
 * @public
 */
export type ListStyleSpec = TextualListStyleSpec | UnitaryListStyleSpec;
