// Type definitions for react-native-render-html 4.2
// Project: https://github.com/meliorence/react-native-render-html
// Definitions by: Jules Randolph <https://github.com/jsamr>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 3.5
import { ReactNode, Component, ComponentType } from "react";
import {
  StyleProp,
  GestureResponderEvent,
  RecursiveArray,
  Falsy,
  TextStyle,
  ViewStyle,
  TextProps,
} from "react-native";

export interface BaseNode {
  type: "text" | "tag";
  next: HTMLNode | null;
  prev: HTMLNode | null;
  parent: HTMLNode | null;
  attribs: HtmlAttributesDictionary;
}
export interface HTMLTextNode extends BaseNode {
  type: "text";
  data: string;
}
export interface HTMLTagNode extends BaseNode {
  type: "tag";
  name: string;
  children: HTMLNode[];
}
export type HTMLNode = HTMLTagNode | HTMLTextNode;
export type NonRegisteredStylesProp<T> = T | Falsy | RecursiveArray<T | Falsy>;
export interface HtmlAttributesDictionary {
  [attribute: string]: string | number;
}

export interface TransientNode {
  wrapper: "Text" | "View";
  children: TransientNode[];
  attribs: HtmlAttributesDictionary;
  parent?: TransientNode;
  tagName?: string;
  data?: string;
  parentTag?: string;
  domNode: HTMLNode;
  nodeIndex: number;
}

export type PassProps<P> = Pick<
  ContainerProps,
  | "WebView"
  | "onLinkPress"
  | "tagsStyles"
  | "ignoredTags"
  | "ignoredStyles"
  | "renderers"
  | "baseFontStyle"
  | "imagesInitialDimensions"
  | "html"
  | "uri"
  | "source"
  | "listsPrefixesRenderers"
  | "allowFontScaling"
  | "defaultTextProps"
  | "defaultWebViewProps"
  | "textSelectable"
  | "allowedStyles"
  | "classesStyles"
  | "computeEmbeddedMaxWidth"
  | "contentWidth"
  | "debug"
  | "emSize"
  | "ptSize"
  | "enableExperimentalPercentWidth"
  | "allowWhitespaceNodes"
> & {
  nodeIndex: number;
  transientChildren: TransientNode[];
  domNode: HTMLNode;
  parentWrapper: "Text" | "View";
  parentTag?: string;
  data?: string;
  key: string;
  renderersProps: P;
};

export type RendererFunction<P = {}> = (
  htmlAttribs: HtmlAttributesDictionary,
  children: ReactNode,
  convertedCSSStyles: NonRegisteredStylesProp<any>,
  passProps: PassProps<P>
) => ReactNode;
export type RendererDeclaration<P = {}> =
  | RendererFunction<P>
  | { renderer: RendererFunction<P>; wrapper: "Text" | "View" };
export interface RendererDictionary<P = {}> {
  [tag: string]: RendererDeclaration<P>;
}
export interface StylesDictionary {
  [tag: string]: NonRegisteredStylesProp<any>;
}
export interface ImageDimensions {
  width: number;
  height: number;
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
  headers?: object;
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
   * The base URL to be used for any relative links in the HTML code.
   */
  baseUrl?: string;
}

export type RenderHTMLSource = RenderHTMLSourceInline | RenderHTMLSourceUri;

export interface ContainerProps<P = {}> {
  /**
   * HTML string to parse and render.
   *
   * @deprecated Use `source` instead.
   */
  html?: string;
  /**
   * Remote HTML resource to parse and render.
   *
   * @deprecated Use `source` instead.
   */
  uri?: string;
  /**
   * The object source to render (either `{ uri }` or `{ html }`).
   */
  source?: RenderHTMLSource;
  /**
   * Specifies whether fonts should scale to respect Text Size accessibility settings
   *
   * @deprecated Use `defaultTextProps.allowFontScaling` instead.
   */
  allowFontScaling?: boolean;
  /**
   * Your custom renderers.
   */
  renderers?: RendererDictionary<P>;
  /**
   * Set of props accessible into your custom renderers in `passProps` (4th argument)
   */
  renderersProps?: P;
  /**
   * Your custom renderers from ul and ol bullets, see [lists prefixes](https://github.com/meliorence/react-native-render-html#lists-prefixes)
   */
  listsPrefixesRenderers?: RendererDictionary<P>;
  /**
   * ParserOptions for [htmlparser2](https://github.com/fb55/htmlparser2/wiki/Parser-options)
   * Optional, defaults `decodeEntities` to `true`
   */
  htmlParserOptions?: Record<string, any>;
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
  computeEmbeddedMaxWidth?: (contentWidth: number, tagName: string) => number;
  /**
   * Support for relative percent-widths. Currently, it only works for images.
   */
  enableExperimentalPercentWidth?: number;
  /**
   * Fired with the event, the href and an object with all attributes of the tag as its arguments when tapping a link
   */
  onLinkPress?: (
    event: GestureResponderEvent,
    href: string,
    htmlAttribs: HtmlAttributesDictionary
  ) => void;

  /**
   * Fired when your HTML content has been parsed. Also useful to tweak your rendering.
   *
   * @param root - The root transient node.
   * @returns The modified root.
   */
  onParsed?: (dom: HTMLNode[], root: TransientNode[]) => TransientNode[];
  /**
   * Provide your styles for specific HTML tags.
   *
   * **Important note** Do NOT use the StyleSheet API to create the styles you're going to feed to tagsStyle and classesStyles.
   * Although it might look like it's working at first, the caching logic of react-native makes it impossible for this module
   * to deep check each of your style to properly apply the precedence and priorities of your nested tags' styles.
   */
  tagsStyles?: StylesDictionary;
  /**
   * Provide your styles for specific HTML classes.
   *
   * **Important note** Do NOT use the StyleSheet API to create the styles you're going to feed to tagsStyle and classesStyles.
   * Although it might look like it's working at first, the caching logic of react-native makes it impossible for this module
   * to deep check each of your style to properly apply the precedence and priorities of your nested tags' styles.
   */
  classesStyles?: StylesDictionary;
  /**
   * Custom style for the default container of the renderered HTML.
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Replace the default wrapper with a function that takes your content as the first parameter.
   */
  customWrapper?: (innerNodes: ReactNode) => ReactNode;
  /**
   * Replace the default loader while fetching a remote website's content.
   */
  remoteLoadingView?: (props: ContainerProps<P>, state: any) => ReactNode;
  /**
   * Replace the default error if a remote website's content could not be fetched.
   */
  remoteErrorView?: (props: ContainerProps<P>, state: any) => ReactNode;
  /**
   * The default value in pixels for 1em
   */
  emSize?: number;
  /**
   * The default value in pixels for 1pt
   */
  ptSize?: number;
  /**
   * The default style applied to `<Text>` components
   */
  baseFontStyle?: NonRegisteredStylesProp<TextStyle>;
  /**
   * Allow all texts to be selected. Default to `false`.
   *
   * @deprecated Use `defaultTextProps.selectable` instead.
   */
  textSelectable?: boolean;
  /**
   * Target some specific texts and change their content, see [altering content](https://github.com/meliorence/react-native-render-html#alterdata)
   */
  alterData?: (node: HTMLNode) => string | Falsy;
  /**
   * Target some specific nested children and change them, see [altering content](https://github.com/meliorence/react-native-render-html#alterchildren)
   */
  alterChildren?: (node: HTMLNode) => HTMLNode | Falsy;
  /**
   * Target a specific node and change it, see [altering content](https://github.com/meliorence/react-native-render-html#alternode)
   */
  alterNode?: (node: HTMLNode) => HTMLNode | Falsy;
  /**
   * HTML tags you don't want rendered, see [ignoring HTML content](https://github.com/meliorence/react-native-render-html#ignoring-html-content)
   */
  ignoredTags?: string[];
  /**
   * Allow render only certain CSS style properties and ignore every other. If you have some property both in `allowedStyles` and `ignoredStyles`, it will be ignored anyway.
   */
  allowedStyles?: string[];
  /**
   * CSS styles from the style attribute you don't want rendered, see [ignoring HTML content](https://github.com/meliorence/react-native-render-html#ignoring-html-content)
   */
  ignoredStyles?: string[];
  /**
   * Return true in this custom function to ignore nodes very precisely, see [ignoring HTML content](https://github.com/meliorence/react-native-render-html#ignoring-html-content)
   */
  ignoreNodesFunction?: (node: HTMLNode) => boolean;
  /**
   * Prints the parsing result from htmlparser2 and render-html after the initial render
   */
  debug?: boolean;
  /**
   * The WebView component used by plugins (iframe, table)...
   * See [@native-html/plugins](https://github.com/native-html/plugins).
   */
  WebView?: ComponentType<any>;
  /**
   * Default props for Text elements in the render tree.
   *
   * @remarks "style" will be ignored. Use `baseFontStyle` instead.
   */
  defaultTextProps?: Omit<TextProps, "style">;
  /**
   * Default props for WebView elements in the render tree used by plugins.
   */
  defaultWebViewProps?: any;
  /**
   * Allows the rendering of nodes that consist of only whitespace characters
   */
  allowWhitespaceNodes?: boolean;
}

/**
 * Returns an array with the tagname of every parent of a node or an empty array if nothing is found.
 * @param node A parsed HTML node from alterChildren for example
 */
export function getParentsTagsRecursively(node: HTMLNode): string[];

/**
 * Returns the closest parent of a node with a specific tag.
 * @param node A parsed HTML node from alterChildren for example
 * @param tag The tag to match
 */
export function getClosestNodeParentByTag(
  node: HTMLNode,
  tag: string
): HTMLNode | null;

/**
 * Helper that composes styles with the default style for a tag, the "style" attribute and
 * any given additional style. Checks everything against the style sets of views, images,
 * or texts with prop-types.
 *
 * @param params - Configuration to construct styles.
 */
export function constructStyles(params: {
  tagName: string;
  htmlAttribs: HtmlAttributesDictionary;
  passProps: PassProps<any>;
  styleSet: "VIEW" | "TEXT";
  additionalStyles?: StyleProp<any>;
  baseFontStyle?: NonRegisteredStylesProp<TextStyle>;
}): StyleProp<any>;

/**
 *
 * Convert a DOM node to its HTML representation.
 *
 * @param root - The node to stringify.
 * @param reporter? - An optional function which will receive every
 * parsed node as 1st argument, the depth as 2d argument and the converted html
 * as 3d argument.
 */
export function domNodeToHTMLString(
  root: HTMLNode,
  reporter?: (node: HTMLNode, depth: number, html: string) => void
): string;

/**
 * The set of default ignored tags
 */
export const IGNORED_TAGS: string[];

declare class HTML<P> extends Component<ContainerProps<P>> {}

export default HTML;
