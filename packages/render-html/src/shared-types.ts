import {
  Falsy,
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
  TPhrasing
} from '@native-html/transient-render-engine';
import { ReactElement, ReactNode } from 'react';
import {
  CSSPropertyNameList,
  MixedStyleDeclaration
} from '@native-html/css-processor';
import type { TStyles } from '@native-html/transient-render-engine';
import { CustomTagRendererRecord } from './render/render-types';
import { ParserOptions as HtmlParserOptions } from 'htmlparser2';

export interface RendererDictionary<P> {}

export interface ImageDimensions {
  width: number;
  height: number;
}

export interface HtmlAttributesDictionary {
  [attribute: string]: string | number;
}

export interface RenderHTMLPassedProps<P = any> {
  /**
   * Specifies whether fonts should scale to respect Text Size accessibility settings
   */
  allowFontScaling?: boolean;
  /**
   * Your custom renderers from ul and ol bullets, see [lists prefixes](https://github.com/archriss/react-native-render-html#lists-prefixes)
   */
  listsPrefixesRenderers?: RendererDictionary<P>;
  /**
   * Set a maximum width to non-responsive content (<iframe> for instance)
   */
  staticContentMaxWidth?: number;
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
   * Fired with the event, the href and an object with all attributes of the tag as its arguments when tapping a link
   */
  onLinkPress?: (
    event: GestureResponderEvent,
    href: string,
    htmlAttribs: HtmlAttributesDictionary
  ) => void;
  /**
   * Allow all texts to be selected. Default to `false`.
   */
  textSelectable?: boolean;
  /**
   * Log to the console meaningful information regarding dismissed CSS
   * properties, ignored tags... etc.
   */
  debug?: boolean;
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
   * Enable or disable inline CSS processing (style attribute).
   *
   * @default true
   */
  enableCSSInlineProcessing?: boolean;
  /**
   * Provide your styles for specific HTML tags.
   *
   * **Important note** Do NOT use the StyleSheet API to create the styles you're going to feed to tagsStyle and classesStyles.
   * Although it might look like it's working at first, the caching logic of react-native makes it impossible for this module
   * to deep check each of your style to properly apply the precedence and priorities of your nested tags' styles.
   */
  tagsStyles?: MixedStyleRecord;
  /**
   * Provide your styles for specific HTML classes.
   *
   * **Important note** Do NOT use the StyleSheet API to create the styles you're going to feed to tagsStyle and classesStyles.
   * Although it might look like it's working at first, the caching logic of react-native makes it impossible for this module
   * to deep check each of your style to properly apply the precedence and priorities of your nested tags' styles.
   */
  classesStyles?: MixedStyleRecord;
  /**
   * Provide your styles for specific element identifiers (id attribute).
   */
  idsStyles?: MixedStyleRecord;
  /**
   * The default style for the document (root). Inheritable styles will be
   * transferred to children. That works even for Text styles.
   */
  baseStyle?: MixedStyleDeclaration;
  /**
   * Target some specific texts and change their content, see [altering content](https://github.com/archriss/react-native-render-html#altering-content)
   */
  alterData?: (node: DOMText) => string | Falsy | void;
  /**
   * Target some specific nested children and change them, see [altering content](https://github.com/archriss/react-native-render-html#altering-content)
   */
  alterChildren?: (node: DOMElement) => DOMNode[] | Falsy | void;
  /**
   * Target a specific node and change it, see [altering content](https://github.com/archriss/react-native-render-html#altering-content)
   */
  alterNode?: (node: DOMElement) => DOMNode | Falsy | void;
  /**
   * Ignore specific DOM nodes.
   */
  ignoreNode?: (node: DOMNode, parentTagName: string) => boolean | Falsy;
  /**
   * HTML tags you don't want rendered, see [ignoring HTML
   * content](https://github.com/archriss/react-native-render-html#ignoring-html-content)
   */
  ignoredTags?: string[];
  /**
   * Allow render only certain CSS style properties and ignore every other. If
   * you have some property both in `allowedStyles` and `ignoredStyles`, it
   * will be ignored anyway.
   *
   * @remarks Property names must be camelCased.
   */
  allowedStyles?: CSSPropertyNameList;
  /**
   * CSS styles from the style attribute you don't want rendered, see [ignoring
   * HTML
   * content](https://github.com/archriss/react-native-render-html#ignoring-html-content)
   *
   * @remarks Property names must be camelCased.
   */
  ignoredStyles?: CSSPropertyNameList;
}

export interface RenderHTMLProps<P = any>
  extends RenderHTMLPassedProps<P>,
    TransientRenderEngineConfig {
  /**
   * HTML string to parse and render
   */
  html: string;
  /**
   * Your custom renderers.
   */
  renderers?: CustomTagRendererRecord;
  /**
   * Set of props accessible into your custom renderers in `passProps` (4th argument)
   */
  renderersProps?: any;
  /**
   * Remote website to parse and render
   */
  uri?: string;
  /**
   * Custom style for the default container of the rendered HTML.
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Replace the default wrapper with a function that takes your content as the first parameter.
   */
  customWrapper?: (innerNodes: ReactNode) => ReactElement;
  /**
   * Replace the default loader while fetching a remote website's content.
   */
  remoteLoadingView?: (props: RenderHTMLProps<P>) => ReactElement;
  /**
   * Replace the default error if a remote website's content could not be fetched.
   */
  remoteErrorView?: (props: RenderHTMLProps<P>) => ReactElement;
  /**
   * The default value in pixels for 1em
   */
  emSize?: number;
  /**
   * The default value in pixels for 1pt
   */
  ptSize?: number;
  /**
   * Triggered when the transient render tree changes. Useful for debugging.
   */
  onTTreeChange?: (ttree: TNode) => void;
  /**
   * Triggered when HTML is available to the RenderHTML component.
   */
  onHTMLLoaded?: (html: string) => void;
  /**
   * A list of fonts available in the current platform. These fonts will used
   * to select the first match in CSS `fontFamily` property, which supports a
   * comma-separated list of fonts. By default, a handful of fonts are selected
   * per platform.
   *
   * @remarks If you are using expo, use `Constants.systemFonts`.
   */
  systemFonts?: string[];
  /**
   * A record for specific CSS fonts.
   *
   * **Suggestion**: Use Plaform.select({ ios: ..., android: ..., default: ...})
   */
  fallbackFonts?: FallbackFontsDefinitions;
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
  triggerTREInvalidationPropNames?: Array<keyof TransientRenderEngineConfig>;
}

export interface FallbackFontsDefinitions {
  serif: string;
  'sans-serif': string;
  monospace: string;
}

export interface TNodeGenericRendererProps<T extends TNode> {
  tnode: T;
  key?: string | number;
  hasAnchorAncestor: boolean;
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

export type TRendererBaseProps<T extends TNode> = Pick<
  TNodeGenericRendererProps<T>,
  'tnode' | 'key' | 'hasAnchorAncestor'
> & {
  /**
   * Style extracted from TNode.style
   */
  style: NativeStyleProp<T>;
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
};

export type TDefaultRendererProps<T extends TNode> = TRendererBaseProps<T> & {
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
};

export type DefaultTagRendererProps<T extends TNode> = TRendererBaseProps<T> & {
  /**
   * Default renderer for this tnode.
   */
  TDefaultRenderer: TDefaultRenderer<T>;
};

export type CustomTagRendererProps<T extends TNode> = DefaultTagRendererProps<
  T
> & {
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
};

export type TDefaultRenderer<T extends TNode> = React.ComponentType<
  TDefaultRendererProps<T>
>;

export type DefaultTagRenderer<T extends TNode> = React.ComponentType<
  DefaultTagRendererProps<T>
>;

export type CustomTagRenderer<T extends TNode> = React.ComponentType<
  CustomTagRendererProps<T>
>;
