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
  CSSPropertyNameList,
  Document,
  DocumentContext as TREDocumentContext,
  DomVisitorCallbacks,
  Element,
  EmbeddedTagNames,
  HTMLContentModel,
  HTMLElementModel,
  MixedStyleDeclaration,
  MixedStyleRecord,
  NativeBlockStyles,
  NativeTextStyles,
  Node,
  NodeWithChildren,
  SetMarkersForTNode,
  StylessReactNativeProps,
  TDocument,
  TNode,
  TPhrasing,
  TRenderEngineOptions,
  TText
} from '@native-html/transient-render-engine';
import type { CounterStyleRenderer } from '@jsamr/counter-style';
import type { ComponentType, ReactElement, ReactNode } from 'react';
import type { CustomTagRendererRecord } from './render/render-types';
import type { ParserOptions as HtmlParserOptions } from 'htmlparser2';

/**
 * A record of HTMLElementModels.
 *
 * @public
 */
export type HTMLElementModelRecord = Record<
  string,
  HTMLElementModel<string, HTMLContentModel>
>;

/**
 * @public
 */
export interface ImageDimensions {
  height: number;
  width: number;
}

/**
 * Props for custom Pressable components.
 *
 * @public
 */
export interface GenericPressableProps extends AccessibilityProps {
  borderless?: boolean;
  onPress?: TouchableHighlightProps['onPress'];
  style?: StyleProp<ViewStyle>;
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
   * Remove bottom margin if this element parent is an `li` element and it
   * is its last child.
   *
   * @defaultValue true
   */
  enableRemoveBottomMarginIfNested?: boolean;
  /**
   * Remove top margin if this element parent is an `li` element and it
   * is its first child.
   *
   * @defaultValue true
   */
  enableRemoveTopMarginIfNested?: boolean;
  /**
   * Get default list-style-type given the number of nest level for this list.
   *
   * @remarks This function will not be used when a list element has its own
   * `list-style-type` CSS property, or has inherited this property from
   * parents.
   *
   * @param nestLevel - The number of parents elements with the same tag name.
   */
  getFallbackListStyleTypeFromNestLevel?: (
    nestLevel: number
  ) => DefaultSupportedListStyleType;
  /**
   * Customize the marker box appearance (the `View` containing the marker,
   * e.g. the symbol prefixing list elements).
   *
   * @remarks This is useful to set some right padding or a different background for example.
   *
   * @warning **Do not**:
   * - Use margin (since the width will match the `<ol>` / `<ul>` padding left)
   * - Set width constraints (since the width will match the `<ol>` / `<ul>` padding left)
   */
  markerBoxStyle?: StyleProp<ViewStyle>;
  /**
   * Customize the marker text appearance (the `Text` component in which the marker,
   * e.g. the symbol prefixing list elements).
   *
   * @remarks Useful to set the color, fontFamily, fontSize of the marker.
   * Avoid using padding here, take advantage of `markerBoxStyle` instead.
   *
   * @warning This style must be a style object! Arrays, and `Stylesheet` styles will not work.
   */
  markerTextStyle?: TextStyle;
}

/**
 * Props for custom renderers. The convention is to declare a field per tag name.
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
     * @remarks The `href` argument has been normalized, see {@link useNormalizedUrl}.
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
     * Support for relative percent-widths.
     *
     * @defaultValue false
     */
    enableExperimentalPercentWidth?: boolean;
    /**
     * Default width and height to display while image's dimensions are being retrieved.
     *
     * @remarks Changes to this prop will cause a react tree update. Always
     * memoize it.
     */
    initialDimensions?: ImageDimensions;
  };
  ol: ListElementConfig;
  ul: ListElementConfig;
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
 * A map which defines the type of parameters passed as third argument
 * of {@link EmbeddedHeadersProvider}.
 */
export interface EmbeddedWithHeadersParamsMap
  extends Record<EmbeddedWithHeadersTagName, Record<string, unknown>> {
  img: {
    /**
     * The print height of the image in DPI, if it can be determined beforehand
     * (for example, with a _height_ attribute set or an inline style).
     */
    printHeight?: number;
    /**
     * The print width of the image in DPI, if it can be determined beforehand
     * (for example, with a _width_ attribute set or an inline style).
     */
    printWidth?: number;
  };
}

/**
 * Tag names eligible for headers provision.
 */
export type EmbeddedWithHeadersTagName = Exclude<
  EmbeddedTagNames,
  'svg' | 'canvas' | 'math'
>;

/**
 * A function to provide headers to a peculiar embedded element.
 */
export type EmbeddedHeadersProvider = <T extends EmbeddedWithHeadersTagName>(
  uri: string,
  tagName: T,
  params: EmbeddedWithHeadersParamsMap[T]
) => Record<string, string> | null | void;

/**
 * Props shared across renderers.
 *
 * @warning Shared props changes will cause all the React tree to invalidate. You should
 * always memoize these.
 *
 * @public
 */
export interface RenderHTMLSharedProps {
  /**
   * A component used to wrap pressable elements (e.g. when provided `onPress`).
   * Note that textual elements will not be wrapped; `TextProps.onPress` will
   * be used instead.
   *
   * @defaultValue A `TouchableNativeFeedback` based component on Android, `TouchableHighlight` based component on other platforms.
   */
  GenericPressable?: ComponentType<GenericPressableProps>;

  /**
   * The WebView component used by plugins (iframe, table)...
   * See {@link https://github.com/native-html/plugins | @native-html/plugins}.
   *
   * @defaultValue `() => null`
   */
  WebView?: ComponentType<any>;

  /**
   * When `true` (default), anonymous {@link TPhrasing} nodes parents of a
   * lonely {@link TText} node are not translated as React Native `Text`
   * elements. Instead, their child is directly rendered, e.g. with no `Text`
   * wrapper.
   *
   * @example **With `true`:**
   *
   * ```xml
   * <TPhrasing>
   *   <TText>Hello</TText>
   * </TPhrasing>
   * ```
   *
   * is translated to
   *
   * ```xml
   * <Text>Hello</Text>
   * ```
   *
   * **With `false`:**
   *
   * ```xml
   * <TPhrasing>
   *   <TText>Hello</TText>
   * </TPhrasing>
   * ```
   *
   * is translated to
   *
   * ```xml
   * <Text><Text>Hello</Text></Text>
   * ```
   *
   * @warning Unless strictly necessary, this should be left to `true` because
   * some styles don't apply to nested React Native `Text` elements
   * (`borderRadius`, `padding`...).
   *
   * @defaultValue true
   */
  bypassAnonymousTPhrasingNodes?: boolean;

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

  /**
   * Log to the console a snapshot of the rendered {@link TDocument} after each
   * transient render tree invalidation.
   *
   * @defaultValue `false`
   */
  debug?: boolean;

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
   * Follow closely the HTML standard and ignore `<br>` tags closing an
   * inline formatting context.
   *
   * @example
   *
   * ```html
   * <p>
   *  Hello<br />
   * </p>
   * ```
   *
   * When this flag is set to `true`, one line is printed instead of two on
   * native platforms, which is the HTML-compliant behavior.
   *
   * @defaultValue false
   *
   * @remarks Recommended value is `true` on non-web platforms. Also note that
   * this is an experimental feature, thus subject to behavioral instability.
   */
  enableExperimentalBRCollapsing?: boolean;

  /**
   * React Native doesn't handle lines like we would expect on a web browser.
   * For example:
   * ```jsx
   * <View>
   *  <Text></Text>
   * </View>
   * ```
   * will span 20 dpi in height. Setting this prop to `true` will make
   * the renderer take those React Native oddities into account.
   * See also this ticket: https://git.io/JErwX
   *
   * @remarks This is an experimental feature, thus subject to behavioral
   * instability.
   *
   * @defaultValue false
   */
  enableExperimentalGhostLinesPrevention?: boolean;

  /**
   * Enable or disable margin collapsing CSS behavior (experimental!).
   * See {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing | MDN docs}.
   *
   * @remarks Limitations:
   * - Only adjacent siblings collapsing is implemented.
   * - If one of the margins height is in percent, no collapsing will occur.
   * - Will apply indiscriminately to all `display` properties (including
   *   flex), which is not standard.
   * - Might not work well with {@link TPhrasing} nodes having only one child.
   *
   * This is an experimental feature, thus subject to behavioral instability.
   *
   * @defaultValue false
   */
  enableExperimentalMarginCollapsing?: boolean;

  /**
   * Color used for pressable items, either for the ripple effect (Android), or
   * highlight (other platforms).
   *
   * @defaultValue rgba(38, 132, 240, 0.2)
   */
  pressableHightlightColor?: string;

  /**
   * Provide headers for specific embedded elements, such as images, iframes...
   *
   * @example
   *
   * ```js
   * function provideEmbeddedHeaders(uri, tagName, params) {
   *    if (tagName === "img" &&
   *        uri.startsWith("https://example.com")) {
   *     return {
   *      Authorization: "Bearer daem6QuaeloopheiD7Oh"
   *    }
   * }
   *
   * // ...
   *
   * <RenderHTML provideEmbeddedHeaders={provideEmbeddedHeaders} />
   * ```
   */
  provideEmbeddedHeaders?: EmbeddedHeadersProvider;
}

type SharedPropsWithoutFallback = Exclude<
  keyof RenderHTMLSharedProps,
  'provideEmbeddedHeaders' | 'GenericPressable' | 'customListStyleSpecs'
>;

/**
 * Shared props available with {@link useSharedProps} hook or `sharedProp`
 * custom renderers prop.
 */
export type RenderHTMLAmbiantSharedProps = Required<
  Pick<RenderHTMLSharedProps, SharedPropsWithoutFallback>
> &
  Omit<RenderHTMLSharedProps, SharedPropsWithoutFallback>;

/**
 * Configuration for the {@link TRenderEngineProvider} component.
 *
 * @warning When one of these props changes, it will cause the
 * {@link TRenderEngine} to be rebuilt, and all transient trees to be
 * re-assembled. Beware!
 *
 * @public
 */
export interface TRenderEngineConfig {
  /**
   * Whitelist specific inline CSS style properties and ignore the others.
   *
   * @warning Property names must be camelCased: for example, `background-color`
   * should be written `backgroundColor`.
   */
  allowedStyles?: CSSPropertyNameList;

  /**
   * The default style for the document (root). Inheritable styles will be
   * transferred to children. That works also for textual styles.
   *
   * @warning **Do NOT** use the `StyleSheet` API to create those styles.
   *
   * @remarks Any `fontFamily` used in those styles must be registered with
   * {@link TRenderEngineConfig.systemFonts} prop.
   */
  baseStyle?: MixedStyleDeclaration;

  /**
   * Provide mixed styles to target elements selected by CSS classes.
   *
   * @warning **Do NOT** use the `StyleSheet` API to create those styles.
   *
   * @remarks Any `fontFamily` used in those styles must be registered with
   * {@link TRenderEngineConfig.systemFonts} prop.
   */
  classesStyles?: MixedStyleRecord;

  /**
   * Customize element models for target tags.
   */
  customHTMLElementModels?: HTMLElementModelRecord;

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
   * The default value in pixels for 1em.
   */
  emSize?: number;

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
   * Enable or disable fallback styles for each tag. For example, `pre` tags
   * will have `whiteSpace` set to 'pre' by default.
   *
   * @defaultValue true
   */
  enableUserAgentStyles?: boolean;

  /**
   * A record for specific CSS fonts.
   *
   * @remarks Use `Plaform.select({ ios: ..., android: ..., default: ...})`.
   */
  fallbackFonts?: FallbackFontsDefinitions;

  /**
   * ParserOptions for {@link https://github.com/fb55/htmlparser2/wiki/Parser-options | htmlparser2}.
   *
   * @defaultValue  `{ decodeEntities: true }`
   */
  htmlParserOptions?: HtmlParserOptions;
  /**
   * Provide mixed styles to target elements identified by the `id` attribute.
   *
   * @warning **Do NOT** use the `StyleSheet` API to create those styles.
   *
   * @remarks Any `fontFamily` used in those styles must be registered with
   * {@link TRenderEngineConfig.systemFonts} prop.
   */
  idsStyles?: MixedStyleRecord;

  /**
   * Ignore specific DOM nodes.
   *
   * @warning When this function is invoked, the node has not yet been attached
   * to its parent or siblings. Use the second argument (`parent`) if you
   * need to perform logic based on parent.
   *
   * @remarks
   * - The function is applied during DOM parsing, thus with very little
   *   overhead. However, it means that one node next siblings won't be
   *   available since it has not yet been parsed.
   * - Use `ignoredDomTags` if you just need to target specific tag names.
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
   * A list of **lowercase tags** which should not be included in the DOM.
   *
   * @remark The filtering is happening during parsing, thus with very little
   * overhead.
   */
  ignoredDomTags?: string[];

  /**
   * Blacklist specific inline CSS style properties and allow the others.
   *
   * @warning Property names must be camelCased: for example, `background-color`
   * should be written `backgroundColor`.
   *
   * @remarks Note that if you don't want inline style processing at all, you
   * should set `enableCSSInlineProcessing` prop to `false`.
   */
  ignoredStyles?: CSSPropertyNameList;

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
   * Set custom markers from a {@link TNode} and all its descendants. {@link Markers} will be
   * accessible in custom renderers via `tnode.markers` prop.
   *
   * @param targetMarkers - The markers to modify.
   * @param parentMarkers - {@link Markers} from the parent {@link TNode}.
   * @param tnode - The {@link TNode} to inspect.
   *
   * @defaultValue `() => null`
   */
  setMarkersForTNode?: SetMarkersForTNode;

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
   * Provide mixed styles to target HTML tag names.
   *
   * @warning **Do NOT** use the `StyleSheet` API to create those styles.
   *
   * @remarks Any `fontFamily` used in those styles must be registered with
   * {@link TRenderEngineConfig.systemFonts} prop.
   */
  tagsStyles?: MixedStyleRecord;
}

/**
 * A source represented by a URI.
 *
 * @public
 */
export interface HTMLSourceUri {
  /**
   * The HTTP body to send with the request. This must be a valid
   * UTF-8 string, and will be sent exactly as specified, with no
   * additional encoding (e.g. URL-escaping or base64) applied.
   */
  body?: string;

  /**
   * Additional HTTP headers to send with the request.
   */
  headers?: Record<string, string>;

  /**
   * The HTTP Method to use. Defaults to GET if not specified.
   */
  method?: string;

  /**
   * The URI to load in the `HTML` component. Can be a local or remote file.
   */
  uri: string;
}

/**
 * A source which content is provided in-place.
 *
 * @public
 */
export interface HTMLSourceInline {
  /**
   * The base URL to resolve relative URLs in the HTML code.
   * See {@link useNormalizedUrl}.
   */
  baseUrl?: string;

  /**
   * A static HTML page to display in the HTML component.
   */
  html: string;
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
   * The base URL to resolve relative URLs in the HTML code.
   * See {@link useNormalizedUrl}.
   */
  baseUrl?: string;

  /**
   * A DOM object. This object **must** have been created with
   * the transient render engine `parseDocument` method.
   */
  dom: Element | Document;
}

/**
 * The source to render.
 *
 * @public
 */
export type HTMLSource = HTMLSourceInline | HTMLSourceDom | HTMLSourceUri;

/**
 *
 * Props for the {@link RenderHTMLConfigProvider} component.
 *
 * @public
 */
export interface RenderHTMLConfig
  extends RenderHTMLSharedProps,
    RenderHTMLPassedProps {
  /**
   * Replace the default error if a remote website's content could not be fetched.
   */
  remoteErrorView?: (source: HTMLSourceUri) => ReactElement;

  /**
   * Replace the default loader while fetching a remote website's content.
   */
  remoteLoadingView?: (source: HTMLSourceUri) => ReactElement;

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
}

/**
 * Props for the {@link RenderHTMLSource} component.
 *
 * @public
 */
export interface RenderHTMLSourceProps {
  /**
   * The width of the HTML content to display. The recommended practice is to pass
   * `useWindowDimensions().width` minus any padding or margins.
   *
   * @defaultValue `Dimensions.get('window').width`
   */
  contentWidth?: number;

  /**
   * Handler invoked when the document metadata is available. It will
   * re-trigger on HTML content changes.
   */
  onDocumentMetadataLoaded?: (documentMetadata: DocumentMetadata) => void;

  /**
   * Triggered when HTML is available to the RenderHTML component.
   */
  onHTMLLoaded?: (html: string) => void;

  /**
   * Triggered when the transient render tree changes. Useful for debugging.
   */
  onTTreeChange?: (ttree: TDocument) => void;

  /**
   * The object source to render (either `{ uri }`, `{ html }` or `{ dom }`).
   */
  source: HTMLSource;
}

/**
 * Props for the {@link RenderHTML} component.
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
  monospace: string;
  'sans-serif': string;
  serif: string;
}

/**
 * Props passed from parents to children.
 *
 *
 * @remarks Anonymous nodes will pass those props from their parents to
 * children.
 *
 */
export interface PropsFromParent extends Record<string, any> {
  collapsedMarginTop: number | null;
}

/**
 * Props to render a child.
 *
 * @public
 */
export interface TChildProps {
  /**
   * The child element.
   */
  childElement: ReactElement;

  /**
   * The child associated {@link TNode}.
   */
  childTnode: TNode;

  /**
   * The position relative to parent.
   */
  index: number;

  /**
   * The React `key`.
   */
  key: string | number;

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
   * Props that will be passed to children renderers via
   * {@link CustomRendererProps.propsFromParent}.
   */
  propsForChildren?: Partial<PropsFromParent>;

  /**
   * A React render function to render and wrap individual children.
   */
  renderChild?: (props: TChildProps) => ReactNode;
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
   * Props passed by direct parents.
   */
  propsFromParent?: PropsFromParent;

  /**
   * The position of this React element relative to the parent React element,
   * starting at 0.
   *
   * @remarks Not to be confused with {@link TNodeShape.index}, which is
   * the position of the *TNode* before hoisting. The latter is much closer
   * to an intuitive understanding of the position of a DOM node in the DOM
   * tree.
   */
  renderIndex: number;

  /**
   * The total number of elements children of this React element parent.
   */
  renderLength: number;

  /**
   * The {@link TNode} to render.
   */
  tnode: T;
}

/**
 * Abstract interface for renderers.
 *
 * @typeParam T - The concrete type of {@link TNode}.
 */
export interface RendererBaseProps<T extends TNode>
  extends TNodeRendererProps<T> {
  /**
   * Props passed to the underlying React Native element, either `Text` or
   * `View`. See also {@link RendererBaseProps.textProps} and
   * {@link RendererBaseProps.viewProps}.
   *
   * @remarks The `prop.style` property will have a greater specificity
   * than computed styles for this {@link TNode}. E.g. `style={[computedStyle,
   * nativeProps.style, viewProps.style]}`.
   *
   */
  nativeProps?: StylessReactNativeProps & { style?: StyleProp<ViewStyle> };

  /**
   * Any default renderer should be able to handle press.
   */
  onPress?: (e: GestureResponderEvent) => void;

  /**
   * Props passed to the underlying `Text` element (`type` must be 'text'). See
   * also {@link RendererBaseProps.nativeProps} and
   * {@link RendererBaseProps.viewProps}.
   *
   * @remarks The `textProps.style` property will have a greater specificity than
   * computed styles for this {@link TNode}. E.g. `style={[computedStyle,
   * nativeProps.style, textProps.style]}`.
   */
  textProps: TextProps;

  /**
   * Is the underlying component `Text` or `View`?
   */
  type: 'text' | 'block';

  /**
   * Props passed to the underlying `View` element (`type` must be 'view'). See
   * also {@link RendererBaseProps.nativeProps} and
   * {@link RendererBaseProps.textProps}.
   *
   * @remarks The `viewProps.style` property will have a greater specificity than
   * computed styles for this {@link TNode}. E.g. `style={[computedStyle,
   * nativeProps.style, viewProps.style]}`.
   */
  viewProps: ViewProps;
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
   * A component to render children of a `tnode`.
   */
  TNodeChildrenRenderer: ComponentType<TNodeChildrenRendererProps>;

  /**
   * When children is present, renderChildren will not be invoked.
   */
  children?: ReactNode;

  /**
   * Props passed to children nodes. Those props are accessible from children
   * renderers as `propsFromParent`
   */
  propsForChildren?: Partial<PropsFromParent>;

  /**
   * The style for this renderer will depend on the type of {@link TNode}.
   * You can check if a node is textual with `props.type === 'text'`.
   */
  style: T extends TText | TPhrasing
    ? StyleProp<TextStyle>
    : StyleProp<ViewStyle>;
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
   * Default renderer for this {@link TNode}.
   */
  TDefaultRenderer: TDefaultRenderer<T>;

  /**
   * A component to render children of a `tnode`.
   */
  TNodeChildrenRenderer: ComponentType<TNodeChildrenRendererProps>;

  /**
   * Props shared across the whole render tree.
   */
  sharedProps: RenderHTMLAmbiantSharedProps;

  /**
   * Styles extracted with {@link TNode.getNativeStyles}.
   */
  style: T extends TText | TPhrasing ? NativeTextStyles : NativeBlockStyles;
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
export type TDefaultRenderer<T extends TNode> = ComponentType<
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
export type InternalRenderer<T extends TNode> = ComponentType<
  InternalRendererProps<T>
>;

/**
 * A custom renderer, such as provided in the {@link RenderHTMLProps.renderers} prop.
 *
 * @typeParam T - The concrete type of {@link TNode}.
 * @public
 */
export type CustomRenderer<T extends TNode> = ComponentType<
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
   * How anchors should be actioned on press?
   *
   * @remarks By default, `renderersProps.a.onPress` will always open the
   * system browser, equivalent to `_blank` target. However, you can customize
   * the behavior by providing your own implementation.
   */
  baseTarget: TREDocumentContext['baseTarget'];

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
   * The writing direction of this document, extracted from the `dir` attribute
   * of `<html/>` element.
   */
  dir: 'ltr' | 'rtl';

  /**
   * The language of this document, extracted from the `lang` attribute of the
   * `<html/>` element;
   */
  lang: string;

  /**
   * A data array comprised of attributes from &lt;link&gt; elements.
   */
  links: TREDocumentContext['links'];

  /**
   * A data array comprised of attributes from &lt;meta&gt; elements.
   */
  meta: TREDocumentContext['meta'];

  /**
   * The content of the &lt;title&gt; element.
   */
  title: string;
}

/**
 * Props for unitary counter renderers.
 *
 * @public
 */
export type UnitaryCounterRendererProps = {
  color: string;
  fontSize: number;
  index: number;
  lineHeight: number;
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
  counterStyleRenderer: CounterStyleRenderer;
  type: 'textual';
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
  Component: ComponentType<UnitaryCounterRendererProps>;
  counterStyleRenderer: CounterStyleRenderer;
  type: 'unitary';
}

/**
 * An object to specify how to render list markers.
 *
 * @public
 */
export type ListStyleSpec = TextualListStyleSpec | UnitaryListStyleSpec;
