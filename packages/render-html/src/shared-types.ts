import {
  Falsy,
  GestureResponderEvent,
  StyleProp,
  ViewStyle
} from 'react-native';
import type {
  MixedStyleRecord,
  DOMNode,
  DOMText,
  DOMElement,
  TNode,
  TBlock
} from '@native-html/transient-render-tree';
import { ReactNode } from 'react';
import {
  CSSPropertyNameList,
  MixedStyleDeclaration
} from '@native-html/css-processor';
import { TStyles } from '@native-html/transient-render-tree/lib/typescript/styles/TStyles';

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
   * A function which takes contentWidth as argument and returns a new width. Can return Infinity to denote unconstrained widths.
   */
  computeImagesMaxWidth?: (contentWidth: number) => number;
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
   * Decode HTML entities of your content.
   * Optional, defaults to true
   */
  decodeEntities?: boolean;
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
   * The default style for the document. Inheritable styles will be
   * transferred to children. That works even for Text styles.
   *
   * @remarks This style will not target the root. If you want margins in the
   * root, use `tagsStyles.body` instead.
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
  renderers?: RendererDictionary<P>;
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
  customWrapper?: (innerNodes: ReactNode) => ReactNode;
  /**
   * Replace the default loader while fetching a remote website's content.
   */
  remoteLoadingView?: (props: RenderHTMLProps<P>, state: any) => ReactNode;
  /**
   * Replace the default error if a remote website's content could not be fetched.
   */
  remoteErrorView?: (props: RenderHTMLProps<P>, state: any) => ReactNode;
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
   * A list of fonts available in the current platform. These fonts will used
   * to select the first match in CSS `fontFamily` property, which supports a
   * comma-separated list of fonts. By default, a handful of fonts are selected
   * per platform.
   *
   * **Suggestion**: Use Plaform.select({ ios: ..., android: ..., default: ...})
   */
  extraFonts?: string[];
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
  syntheticAnchorOnLinkPress?: (e: GestureResponderEvent) => void;
  collapsedMarginTop: number | null;
}

export interface RendererProps<T extends TNode>
  extends TNodeGenericRendererProps<T> {
  /**
   * An object filled with styles which are compatible with React Native
   * "style" prop.
   */
  nativeStyle: T extends TBlock
    ? TStyles['nativeBlockFlow'] & TStyles['nativeBlockRet']
    : TStyles['nativeBlockFlow'] &
        TStyles['nativeBlockRet'] &
        TStyles['nativeTextFlow'] &
        TStyles['nativeTextRet'];
  /**
   * An object filled with styles which are no compatible with React Native
   * "style" prop.
   */
  untranslatedStyle: TStyles['webTextFlow'];
  /**
   * When children is present, renderChildren will not be invoked.
   */
  children?: ReactNode;
  /**
   * Default renderer for this tnode.
   */
  TDefaultRenderer: TDefaultRenderer<T>;
}

export type TDefaultRenderer<T extends TNode> = React.ComponentType<
  Omit<RendererProps<T>, 'TDefaultRenderer'>
>;
