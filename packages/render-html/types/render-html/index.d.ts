import type { AccessibilityProps } from 'react-native';
import { AnchorTagName } from '@native-html/transient-render-engine';
import { AttribTagNames } from '@native-html/transient-render-engine';
import { ComponentType } from 'react';
import type { CounterStyleRenderer } from '@jsamr/counter-style';
import { CSSAbsoluteHardcodedFontSize } from '@native-html/transient-render-engine';
import { CSSAbsoluteLengthUnit } from '@native-html/transient-render-engine';
import { CSSAbsoluteLengthUnitsMultiplicators } from '@native-html/transient-render-engine';
import { CSSDisplayRegistry } from '@native-html/transient-render-engine';
import { CSSFlattenProcessedTypes } from '@native-html/transient-render-engine';
import { CSSFlowedPropKey } from '@native-html/transient-render-engine';
import { CSSHardcodedBorderWidth } from '@native-html/transient-render-engine';
import { CSSLengthUnit } from '@native-html/transient-render-engine';
import { CSSListStyleTypePropertyBase } from '@native-html/transient-render-engine';
import { CSSLongNativeBlockPropKey } from '@native-html/transient-render-engine';
import { CSSLongNativeTextPropKey } from '@native-html/transient-render-engine';
import { CSSLongNativeTranslatableBlockFlowedPropKey } from '@native-html/transient-render-engine';
import { CSSLongNativeTranslatableBlockPropKey } from '@native-html/transient-render-engine';
import { CSSLongNativeTranslatableBlockRetainedPropKey } from '@native-html/transient-render-engine';
import { CSSLongNativeTranslatableTextFlowedPropKey } from '@native-html/transient-render-engine';
import { CSSLongNativeTranslatableTextPropKey } from '@native-html/transient-render-engine';
import { CSSLongNativeTranslatableTextRetainedPropKey } from '@native-html/transient-render-engine';
import { CSSLongNativeUntranslatableBlockFlowedPropKey } from '@native-html/transient-render-engine';
import { CSSLongNativeUntranslatableBlockPropKey } from '@native-html/transient-render-engine';
import { CSSLongNativeUntranslatableBlockRetainedPropKey } from '@native-html/transient-render-engine';
import { CSSLongNativeUntranslatableTextFlowedPropKey } from '@native-html/transient-render-engine';
import { CSSLongNativeUntranslatableTextPropKey } from '@native-html/transient-render-engine';
import { CSSLongNativeUntranslatableTextRetainedPropKey } from '@native-html/transient-render-engine';
import { CSSLongWebTextFlowedPropKey } from '@native-html/transient-render-engine';
import { CSSLongWebTextRetainedPropKey } from '@native-html/transient-render-engine';
import { CSSNativePropKey } from '@native-html/transient-render-engine';
import { CSSProcessorConfig } from '@native-html/transient-render-engine';
import { CSSPropagationRegistry } from '@native-html/transient-render-engine';
import { CSSProperties } from '@native-html/transient-render-engine';
import { CSSPropertyCompatCategory } from '@native-html/transient-render-engine';
import { CSSPropertyDisplayCategory } from '@native-html/transient-render-engine';
import { CSSPropertyNameList } from '@native-html/transient-render-engine';
import { CSSPropertyPropagationCategory } from '@native-html/transient-render-engine';
import { CSSPropertySpecs } from '@native-html/transient-render-engine';
import { CSSRelativeHarcodedFontSize } from '@native-html/transient-render-engine';
import { CSSShortBlockPropKey } from '@native-html/transient-render-engine';
import { CSSShortNativeTranslatableBlockPropKey } from '@native-html/transient-render-engine';
import { CSSShortPropsKey } from '@native-html/transient-render-engine';
import { CSSShortTextPropKey } from '@native-html/transient-render-engine';
import { CustomElementModel } from '@native-html/transient-render-engine';
import { defaultHTMLElementModels } from '@native-html/transient-render-engine';
import { DefaultHTMLElementModelsStatic } from '@native-html/transient-render-engine';
import { Document as Document_2 } from '@native-html/transient-render-engine';
import { DocumentContext } from '@native-html/transient-render-engine';
import { DomVisitorCallbacks } from '@native-html/transient-render-engine';
import { EditsTagNames } from '@native-html/transient-render-engine';
import { Element as Element_2 } from '@native-html/transient-render-engine';
import { ElementCategory } from '@native-html/transient-render-engine';
import { ElementModelBase } from '@native-html/transient-render-engine';
import { EmbeddedTagNames } from '@native-html/transient-render-engine';
import { ExtendedNativeViewStyleKeys } from '@native-html/transient-render-engine';
import { ExtraNativeLongViewStyleKeys } from '@native-html/transient-render-engine';
import { ExtraNativeShortStyle } from '@native-html/transient-render-engine';
import { ExtraNativeShortViewStyleKeys } from '@native-html/transient-render-engine';
import { ExtraNativeTextStyle } from '@native-html/transient-render-engine';
import { ExtraNativeTextStyleKeys } from '@native-html/transient-render-engine';
import { ExtraNativeUntranslatedLongStyles } from '@native-html/transient-render-engine';
import { ExtraNativeViewStyle } from '@native-html/transient-render-engine';
import { FunctionComponent } from 'react';
import type { GestureResponderEvent } from 'react-native';
import { GroupingTagNames } from '@native-html/transient-render-engine';
import { HTMLContentModel } from '@native-html/transient-render-engine';
import { HTMLElementModel } from '@native-html/transient-render-engine';
import { HTMLElementModelShape } from '@native-html/transient-render-engine';
import { HTMLModelRecord } from '@native-html/transient-render-engine';
import { ImageStyle } from 'react-native';
import { ImageURISource } from 'react-native';
import { InteractiveTagNames } from '@native-html/transient-render-engine';
import { isDomElement } from '@native-html/transient-render-engine';
import { isDomText } from '@native-html/transient-render-engine';
import { Markers } from '@native-html/transient-render-engine';
import { MetadataTagNames } from '@native-html/transient-render-engine';
import { MixedSizeCSSPropertiesKeys } from '@native-html/transient-render-engine';
import { MixedStyleDeclaration } from '@native-html/transient-render-engine';
import { MixedStyleRecord } from '@native-html/transient-render-engine';
import { NativeBlockStyles } from '@native-html/transient-render-engine';
import { NativeDirectionalStyleKeys } from '@native-html/transient-render-engine';
import { NativeElementModel } from '@native-html/transient-render-engine';
import { NativeShortKeys } from '@native-html/transient-render-engine';
import { NativeTextStyleKey } from '@native-html/transient-render-engine';
import { NativeTextStyles } from '@native-html/transient-render-engine';
import { Node } from '@native-html/transient-render-engine';
import { NodeWithChildren } from '@native-html/transient-render-engine';
import type { ParserOptions } from 'htmlparser2';
import { PressableProps } from 'react-native';
import { PropsWithChildren } from 'react';
import { default as React_2 } from 'react';
import { ReactElement } from 'react';
import { ReactNativeProps } from '@native-html/transient-render-engine';
import { ReactNativePropsDefinitions } from '@native-html/transient-render-engine';
import { ReactNativePropsSwitch } from '@native-html/transient-render-engine';
import type { ReactNode } from 'react';
import { SectioningTagNames } from '@native-html/transient-render-engine';
import { SetMarkersForTNode } from '@native-html/transient-render-engine';
import { StyleProp } from 'react-native';
import { StylesConfig } from '@native-html/transient-render-engine';
import { StylessReactNativeProps } from '@native-html/transient-render-engine';
import { StylessReactNativeTextProps } from '@native-html/transient-render-engine';
import { StylessReactNativeViewProps } from '@native-html/transient-render-engine';
import { TabularTagNames } from '@native-html/transient-render-engine';
import { TagName } from '@native-html/transient-render-engine';
import { TBlock } from '@native-html/transient-render-engine';
import { TDocument } from '@native-html/transient-render-engine';
import { TEmpty } from '@native-html/transient-render-engine';
import { Text as Text_2 } from '@native-html/transient-render-engine';
import { TextLevelTagNames } from '@native-html/transient-render-engine';
import { TextProps } from 'react-native';
import type { TextStyle } from 'react-native';
import { TNode } from '@native-html/transient-render-engine';
import { TNodeDescriptor } from '@native-html/transient-render-engine';
import { TNodePrintOptions } from '@native-html/transient-render-engine';
import { TNodeShape } from '@native-html/transient-render-engine';
import { TNodeType } from '@native-html/transient-render-engine';
import type { TouchableHighlightProps } from 'react-native';
import { TPhrasing } from '@native-html/transient-render-engine';
import { TRenderEngine } from '@native-html/transient-render-engine';
import { TRenderEngineOptions } from '@native-html/transient-render-engine';
import { TStylesShape } from '@native-html/transient-render-engine';
import { TText } from '@native-html/transient-render-engine';
import { UnsupportedTagNames } from '@native-html/transient-render-engine';
import { UntranslatableTagNames } from '@native-html/transient-render-engine';
import { ViewProps } from 'react-native';
import { ViewStyle } from 'react-native';
import { WebBlockRetainProperties } from '@native-html/transient-render-engine';
import { WebBlockStyles } from '@native-html/transient-render-engine';
import { WebTextFlowProperties } from '@native-html/transient-render-engine';
import { WebTextStyles } from '@native-html/transient-render-engine';

export { AnchorTagName }

export { AttribTagNames }

/**
 * Build a {@link TRenderEngine} instance from a configuration object.
 *
 * @remarks This utility can be useful to test and debug the TRE layer of your
 * application.
 *
 * @param props - The configuration from which a TRE should be built.
 *
 * @public
 */
export declare function buildTREFromConfig(props: TRenderEngineConfig): TRenderEngine;

/**
 * Compute top collapsed margin for the nth {@link TNode}-child of a list of
 * TNodes.
 *
 * @param n - The index for which the top margin should be collapsed.
 * @param tchildren - The list of {@link TNode} children.
 * @returns `null` when no margin collapsing should apply, a number otherwise.
 * @public
 */
export declare function collapseTopMarginForChild(n: number, tchildren: readonly TNode[]): number | null;

export { CSSAbsoluteHardcodedFontSize }

export { CSSAbsoluteLengthUnit }

export { CSSAbsoluteLengthUnitsMultiplicators }

export { CSSDisplayRegistry }

export { CSSFlattenProcessedTypes }

export { CSSFlowedPropKey }

export { CSSHardcodedBorderWidth }

export { CSSLengthUnit }

export { CSSListStyleTypePropertyBase }

export { CSSLongNativeBlockPropKey }

export { CSSLongNativeTextPropKey }

export { CSSLongNativeTranslatableBlockFlowedPropKey }

export { CSSLongNativeTranslatableBlockPropKey }

export { CSSLongNativeTranslatableBlockRetainedPropKey }

export { CSSLongNativeTranslatableTextFlowedPropKey }

export { CSSLongNativeTranslatableTextPropKey }

export { CSSLongNativeTranslatableTextRetainedPropKey }

export { CSSLongNativeUntranslatableBlockFlowedPropKey }

export { CSSLongNativeUntranslatableBlockPropKey }

export { CSSLongNativeUntranslatableBlockRetainedPropKey }

export { CSSLongNativeUntranslatableTextFlowedPropKey }

export { CSSLongNativeUntranslatableTextPropKey }

export { CSSLongNativeUntranslatableTextRetainedPropKey }

export { CSSLongWebTextFlowedPropKey }

export { CSSLongWebTextRetainedPropKey }

export { CSSNativePropKey }

export { CSSProcessorConfig }

export { CSSPropagationRegistry }

export { CSSProperties }

export { CSSPropertyCompatCategory }

export { CSSPropertyDisplayCategory }

export { CSSPropertyNameList }

export { CSSPropertyPropagationCategory }

export { CSSPropertySpecs }

export { CSSRelativeHarcodedFontSize }

export { CSSShortBlockPropKey }

export { CSSShortNativeTranslatableBlockPropKey }

export { CSSShortPropsKey }

export { CSSShortTextPropKey }

/**
 * Block renderers can only render tnodes of type TBlock.
 *
 * @public
 */
export declare type CustomBlockRenderer = CustomRenderer<TBlock>;

export { CustomElementModel }

/**
 * Mixed renderers can can render tnodes of type TText, TPhrasing or TBlock.
 *
 * @public
 */
export declare type CustomMixedRenderer = CustomRenderer<TBlock | TPhrasing | TText>;

/**
 * A custom renderer, such as provided in the {@link RenderHTMLProps.renderers} prop.
 *
 * @typeParam T - The concrete type of {@link TNode}.
 *
 * @public
 */
export declare type CustomRenderer<T extends TNode> = ComponentType<CustomRendererProps<T>>;

/**
 * Props for custom renderers, such as provided in the `renderers` prop.
 *
 * @typeParam T - The concrete type of {@link TNode}.
 *
 * @public
 */
export declare interface CustomRendererProps<T extends TNode> extends InternalRendererProps<T> {
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
 * A record of custom renderers.
 *
 * @public
 */
export declare type CustomTagRendererRecord = Record<string, CustomBlockRenderer | CustomTextualRenderer | CustomMixedRenderer>;

/**
 * Textual renderers can render tnodes of type TText or TPhrasing.
 *
 * @public
 */
export declare type CustomTextualRenderer = CustomRenderer<TText | TPhrasing>;

/**
 * Default fallback font for special keys such as 'sans-serif', 'monospace',
 * 'serif', based on current platform.
 *
 * @public
 */
export declare const defaultFallbackFonts: {
    'sans-serif': string;
    monospace: string;
    serif: string;
};

export { defaultHTMLElementModels }

export { DefaultHTMLElementModelsStatic }

/**
 * Default list style specs supported by this library.
 *
 * @public
 */
export declare const defaultListStyleSpecs: Record<DefaultSupportedListStyleType, ListStyleSpec>;

/**
 * List style types supported internally.
 *
 * See {@link https://www.w3.org/TR/css-counter-styles-3 | CSS Counter Styles Level 3}.
 *
 * @public
 */
export declare type DefaultSupportedListStyleType = 'none' | 'disc' | 'circle' | 'square' | 'decimal' | 'decimal-leading-zero' | 'lower-roman' | 'upper-roman' | 'lower-greek' | 'lower-alpha' | 'lower-latin' | 'upper-alpha' | 'upper-latin' | 'disclosure-open' | 'disclosure-closed';

/**
 * Fonts provided by system based on current platform.
 *
 * @remarks If you are using Expo, use `Constants.systemFonts` instead.
 *
 * @public
 */
export declare const defaultSystemFonts: string[];

export { Document_2 as Document }

export { DocumentContext }

/**
 * An object containing meta-data extracted from resource URL and HTML
 * `<head>` element.
 *
 * @public
 */
export declare interface DocumentMetadata {
    /**
     * How anchors should be actioned on press?
     *
     * @remarks By default, `renderersProps.a.onPress` will always open the
     * system browser, equivalent to `_blank` target. However, you can customize
     * the behavior by providing your own implementation.
     */
    baseTarget: DocumentContext['baseTarget'];
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
    links: DocumentContext['links'];
    /**
     * A data array comprised of attributes from &lt;meta&gt; elements.
     */
    meta: DocumentContext['meta'];
    /**
     * The content of the &lt;title&gt; element.
     */
    title: string;
}

/**
 * @public
 */
export declare interface DomNodeToHtmlReporter {
    /**
     * @param node - The node being parsed.
     * @param depth - How many parents this node have.
     * @param html - The HTML representation of this node and its children.
     */
    (node: Node | null, depth: number, html: string): void;
}

/**
 * Convert a DOM node to its HTML representation.
 *
 * @param root - The root to stringify.
 * @param reporter - An optional function which will receive every
 * parsed node as 1st argument, the depth as 2d argument and the converted html
 * as 3d argument.
 *
 * @public
 */
export declare function domNodeToHTMLString(root: Node | null, reporter?: DomNodeToHtmlReporter, depth?: number): string;

export { DomVisitorCallbacks }

export { EditsTagNames }

export { Element_2 as Element }

export { ElementCategory }

export { ElementModelBase }

/**
 * A function to provide headers to a peculiar embedded element.
 *
 * @public
 */
export declare type EmbeddedHeadersProvider = <T extends EmbeddedWithHeadersTagName>(uri: string, tagName: T, params: EmbeddedWithHeadersParamsMap[T]) => Record<string, string> | null | void;

export { EmbeddedTagNames }

/**
 * A map which defines the type of parameters passed as third argument
 * of {@link EmbeddedHeadersProvider}.
 *
 * @public
 */
export declare interface EmbeddedWithHeadersParamsMap extends Record<EmbeddedWithHeadersTagName, Record<string, unknown>> {
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
 *
 * @public
 */
export declare type EmbeddedWithHeadersTagName = Exclude<EmbeddedTagNames, 'svg' | 'canvas' | 'math'>;

export { ExtendedNativeViewStyleKeys }

export { ExtraNativeLongViewStyleKeys }

export { ExtraNativeShortStyle }

export { ExtraNativeShortViewStyleKeys }

export { ExtraNativeTextStyle }

export { ExtraNativeTextStyleKeys }

export { ExtraNativeUntranslatedLongStyles }

export { ExtraNativeViewStyle }

/**
 * An object which keys are keyword font names, and values system fonts.
 *
 * @public
 */
export declare interface FallbackFontsDefinitions {
    monospace: string;
    'sans-serif': string;
    serif: string;
}

/**
 * Props for custom Pressable components.
 *
 * @public
 */
export declare interface GenericPressableProps extends AccessibilityProps {
    borderless?: boolean;
    onPress?: TouchableHighlightProps['onPress'];
    style?: StyleProp<ViewStyle>;
}

/**
 * Extract React Native props for a given {@link TNode}, such as those which
 * would be passed to `Text`, `View` or `GenericPressable` by `TDefaultRenderer`.
 *
 * This helper function is peculiarly useful when one wants a custom renderer
 * which uses a different native component, for example `Animated.Text` instead
 * of default `Text`.
 *
 * @public
 *
 * @example
 *
 * ```tsx
 * import React from 'react';
 * import { Animated } from 'react-native';
 * import { CustomTextualRenderer, getNativePropsForTNode } from 'react-native-render-html';
 *
 * const AnimatedSpanRenderer: CustomTextualRenderer = (props) => {
 *   const nativeProps = getNativePropsForTNode(props);
 *   // This is equivalent to a TDefaultRenderer which `Text` is replaced
 *   // with Animated.Text
 *   return <Animated.Text {...nativeProps} />;
 * }
 * ```
 */
export declare function getNativePropsForTNode<T extends TPhrasing | TText | TBlock>(props: TDefaultRendererProps<T>): T extends TBlock ? ViewProps & {
    onPress?: () => void;
} : TextProps;

export { GroupingTagNames }

export { HTMLContentModel }

export { HTMLElementModel }

/**
 * A record of HTMLElementModels.
 *
 * @public
 */
export declare type HTMLElementModelRecord = Record<string, HTMLElementModel<string, HTMLContentModel>>;

export { HTMLElementModelShape }

export { HTMLModelRecord }

/**
 * The source to render.
 *
 * @public
 */
export declare type HTMLSource = HTMLSourceInline | HTMLSourceDom | HTMLSourceUri;

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
export declare interface HTMLSourceDom {
    /**
     * The base URL to resolve relative URLs in the HTML code.
     * See {@link useNormalizedUrl}.
     */
    baseUrl?: string;
    /**
     * A DOM object. This object **must** have been created with
     * the transient render engine `parseDocument` method.
     */
    dom: Element_2 | Document_2;
}

/**
 * A source which content is provided in-place.
 *
 * @public
 */
export declare interface HTMLSourceInline {
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
 * A source represented by a URI.
 *
 * @public
 */
export declare interface HTMLSourceUri {
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
 * @public
 */
export declare interface ImageDimensions {
    height: number;
    width: number;
}

/**
 * A component to render images based on an internal loading state.
 *
 * @remarks This component will attempt to draw a box of paint dimensions
 * before retrieving the physical dimensions of the image to avoid layout
 * shifts. See also {@link useIMGElementState}, {@link IMGElementContainer},
 * {@link IMGElementContentSuccess}, {@link IMGElementContentLoading}
 * and {@link IMGElementContentError} for customization.
 *
 * @public
 */
export declare function IMGElement(props: IMGElementProps): ReactElement;

/**
 * Container for the {@link IMGElement} component.
 *
 * @public
 */
export declare function IMGElementContainer({ style, onPress, testID, children, ...otherProps }: PropsWithChildren<Pick<IMGElementProps, 'onPress' | 'testID'> & Omit<ViewProps, 'style'> & {
    style: ViewStyle;
}>): ReactElement;

/**
 * Alt view for the {@link IMGElement} component.
 *
 * @public
 */
export declare function IMGElementContentAlt({ dimensions, alt, altColor, testID, children }: PropsWithChildren<IMGElementStateBase & {
    testID?: string;
}>): ReactElement;

/**
 * Default error view for the {@link IMGElement} component.
 *
 * @public
 */
export declare function IMGElementContentError(props: IMGElementStateError): ReactElement;

/**
 * Default loading view for the {@link IMGElement} component.
 *
 * @public
 */
export declare function IMGElementContentLoading({ dimensions, children }: PropsWithChildren<IMGElementStateLoading>): ReactElement;

/**
 * Default success "image" view for the {@link IMGElement} component.
 *
 * @public
 */
export declare function IMGElementContentSuccess({ source, imageStyle, dimensions, onError }: IMGElementStateSuccess): ReactElement;

/**
 * Props for the {@link IMGElement} component.
 *
 * @public
 */
export declare interface IMGElementProps extends UseIMGElementStateProps {
    containerProps?: Omit<ViewProps, 'style'>;
    /**
     * A callback triggered on press.
     */
    onPress?: PressableProps['onPress'];
    testID?: string;
}

/**
 * The internal state used by {@link IMGElement}.
 *
 * @public
 */
export declare type IMGElementState = IMGElementStateError | IMGElementStateSuccess | IMGElementStateLoading;

/**
 * Base fields for all {@link IMGElementState}.
 *
 * @public
 */
export declare interface IMGElementStateBase {
    /**
     * Alt text extract from `alt` attribute.
     */
    alt?: string;
    /**
     * Alt color, defaults to `color` for this {@link TNode}.
     */
    altColor?: string;
    /**
     * Styles of the container.
     */
    containerStyle: ViewStyle;
    /**
     * Physical dimensions of the image
     */
    dimensions: ImageDimensions;
    /**
     * The source to paint.
     */
    source: ImageURISource;
}

/**
 * State when the image could not be loaded.
 *
 * @public
 */
export declare interface IMGElementStateError extends IMGElementStateBase {
    error: Error;
    type: 'error';
}

/**
 * State when the image is loading.
 *
 * @public
 */
export declare interface IMGElementStateLoading extends IMGElementStateBase {
    type: 'loading';
}

/**
 * State when the image has been successfully loaded.
 *
 * @public
 */
export declare interface IMGElementStateSuccess extends IMGElementStateBase {
    /**
     * Image-only style extracted from `IMGElement.style` prop.
     */
    imageStyle: ImageStyle;
    /**
     * This callback should be passed down to the underlying image component.
     *
     * @remarks Quite often, the image won't be pre-fetched
     * because its print dimensions can be determined immediately. For
     * example, when both width and height are provide as attributes. So the
     * first state s0 of this state machine can be "success", and the second
     * state s1 be "error".
     */
    onError: (error: Error) => void;
    type: 'success';
}

/**
 * Partial image dimensions.
 *
 * @public
 */
export declare interface IncompleteImageDimensions {
    height: number | null;
    width: number | null;
}

export { InteractiveTagNames }

/**
 * An "internal renderer" is an internal custom renderer, adding specific
 * features to the fallback `TDefaultRenderer`. For example, `<img/>` tags will
 * be rendered via an internal renderer, while `<div>` will fallback to a
 * {@link TDefaultRenderer}.
 *
 * @typeParam T - The concrete type of {@link TNode}.
 *
 * @public
 */
export declare type InternalRenderer<T extends TNode> = ComponentType<InternalRendererProps<T>>;

/**
 * @public
 */
export declare interface InternalRendererConfig<P> {
    Renderer: ComponentType<P>;
    rendererProps: P;
}

/**
 * Props for {@link InternalRenderer} components.
 *
 * @typeParam T - The concrete type of {@link TNode}.
 *
 * @public
 */
export declare interface InternalRendererProps<T extends TNode> extends RendererBaseProps<T> {
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
 * @public
 */
export declare type InternalRenderersConfigMap = typeof internalRenderersMap;

declare const internalRenderersMap: {
    img: {
        hook: typeof useIMGElementProps;
        Element: typeof IMGElement;
    };
    ol: {
        hook: typeof useOLElementProps;
        Element: typeof OLElement;
    };
    ul: {
        hook: typeof useULElementProps;
        Element: typeof ULElement;
    };
    a: {
        hook: typeof useAElementProps;
        Element: undefined;
    };
};

/**
 * The name of tags which are rendered by special renderers internally.
 *
 * @public
 */
export declare type InternalRendererTag = keyof InternalRenderersConfigMap;

export { isDomElement }

export { isDomText }

/**
 * Configuration for ol and ul.
 *
 * @public
 */
export declare interface ListElementConfig {
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
    getFallbackListStyleTypeFromNestLevel?: (nestLevel: number) => DefaultSupportedListStyleType;
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

declare interface ListElementProps<T extends 'ol' | 'ul'> extends InternalRendererProps<TBlock>, ListElementConfig {
    listType: T;
}

/**
 * An object to specify how to render list markers.
 *
 * @public
 */
export declare type ListStyleSpec = TextualListStyleSpec | UnitaryListStyleSpec;

export { Markers }

export { MetadataTagNames }

export { MixedSizeCSSPropertiesKeys }

export { MixedStyleDeclaration }

export { MixedStyleRecord }

export { NativeBlockStyles }

export { NativeDirectionalStyleKeys }

export { NativeElementModel }

export { NativeShortKeys }

export { NativeTextStyleKey }

export { NativeTextStyles }

export { Node }

export { NodeWithChildren }

declare function OLElement(props: OLElementProps): React_2.FunctionComponentElement<ListElementProps<"ol" | "ul">>;

declare type OLElementProps = Omit<ListElementProps<'ol'>, 'listType'>;

/**
 * Props passed from parents to children.
 *
 *
 * @remarks Anonymous nodes will pass those props from their parents to
 * children.
 *
 * @public
 */
export declare interface PropsFromParent extends Record<string, any> {
    collapsedMarginTop: number | null;
}

export { ReactNativeProps }

export { ReactNativePropsDefinitions }

export { ReactNativePropsSwitch }

/**
 * Abstract interface for renderers.
 *
 * @typeParam T - The concrete type of {@link TNode}.
 *
 * @public
 */
export declare interface RendererBaseProps<T extends TNode> extends TNodeRendererProps<T> {
    /**
     * Props passed to the underlying React Native element, either `Text` or
     * `View`. See also {@link RendererBaseProps.textProps} and
     * {@link RendererBaseProps.viewProps}.
     *
     * @remarks The `prop.style` property will have a greater specificity
     * than computed styles for this {@link TNode}. E.g.:
     * ```ts
     * style=[computedStyle, nativeProps.style, viewProps.style]
     * ```
     *
     */
    nativeProps?: StylessReactNativeProps & {
        style?: StyleProp<ViewStyle>;
    };
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
     * computed styles for this {@link TNode}. E.g.:
     * ```ts
     * style=[computedStyle, nativeProps.style, textProps.style]
     * ```
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
     * computed styles for this {@link TNode}. E.g.:
     * ```ts
     * style=[computedStyle, nativeProps.style, viewProps.style]
     * ```
     */
    viewProps: ViewProps;
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
 * ```
 *
 * @public
 */
export declare interface RenderersProps extends Record<string, any> {
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
        onPress?: (event: GestureResponderEvent, href: string, htmlAttribs: Record<string, string>, target: '_blank' | '_self' | '_parent' | '_top') => void;
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
 * Render HTML text in native views!
 *
 * @remarks If your application uses many instances of this component, you
 * should share the render engine across those instances via the
 * {@link TRenderEngineProvider} and {@link RenderHTMLConfigProvider}
 * components, and render the HTML with {@link RenderHTMLSource} instead. That
 * should significantly increase performance.
 *
 * @warning It should never be a child of a React Native `Text` element, as the
 * layout will break.
 *
 * @public
 */
declare function RenderHTML(props: RenderHTMLProps): ReactElement;
export { RenderHTML }
export default RenderHTML;

/**
 * Shared props available with {@link useSharedProps} hook or `sharedProp`
 * custom renderers prop.
 *
 * @public
 */
export declare type RenderHTMLAmbiantSharedProps = Required<Pick<RenderHTMLSharedProps, SharedPropsWithoutFallback>> & Omit<RenderHTMLSharedProps, SharedPropsWithoutFallback>;

/**
 *
 * Props for the {@link RenderHTMLConfigProvider} component.
 *
 * @public
 */
export declare interface RenderHTMLConfig extends RenderHTMLSharedProps, RenderHTMLPassedProps {
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
 * A component to provide configuration for {@link RenderHTMLSource}
 * descendants, to be used in conjunction with {@link TRenderEngineProvider}.
 *
 * @public
 */
export declare function RenderHTMLConfigProvider(props: PropsWithChildren<RenderHTMLConfig>): ReactElement;

/**
 * Props passed to internal and custom renderers.
 *
 * @public
 */
export declare interface RenderHTMLPassedProps {
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
 * Props for the {@link RenderHTML} component.
 *
 * @public
 */
export declare interface RenderHTMLProps extends RenderHTMLConfig, RenderHTMLSourceProps, TRenderEngineConfig {
}

/**
 * Props shared across renderers.
 *
 * @warning Shared props changes will cause all the React tree to invalidate. You should
 * always memoize these.
 *
 * @public
 */
export declare interface RenderHTMLSharedProps {
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

/**
 * A React component to render HTML snippets.
 *
 * @remarks This component is useful when you have to load dozens of HTML
 * snippets with the same config. Performance is expected to improve in such
 * scenarios.
 *
 * @warning This component requires to have {@link TRenderEngineProvider}
 * and {@link RenderHTMLConfigProvider} as parents.
 *
 * @public
 */
export declare const RenderHTMLSource: React_2.NamedExoticComponent<RenderHTMLSourceProps>;

/**
 * Props for the {@link RenderHTMLSource} component.
 *
 * @public
 */
export declare interface RenderHTMLSourceProps {
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

export { SectioningTagNames }

export { SetMarkersForTNode }

/**
 * @public
 */
export declare type SharedPropsWithoutFallback = Exclude<keyof RenderHTMLSharedProps, 'provideEmbeddedHeaders' | 'GenericPressable' | 'customListStyleSpecs'>;

/**
 * A utility to separate box model styles and other styles. Useful when one wants
 * to wrap a text element in a view to benefit from padding vertical,
 * borders... etc.
 *
 * @param styles - The native styles to split.
 *
 * @public
 */
export declare function splitBoxModelStyle(style: ReturnType<TNodeShape<TNodeType>['getNativeStyles']>): {
    boxModelStyle: Pick<NativeTextStyles | NativeBlockStyles, "alignContent" | "alignItems" | "alignSelf" | "aspectRatio" | "backfaceVisibility" | "backgroundColor" | "borderBottomColor" | "borderBottomLeftRadius" | "borderBottomRightRadius" | "borderBottomWidth" | "borderLeftColor" | "borderLeftWidth" | "borderRightColor" | "borderRightWidth" | "borderTopColor" | "borderTopLeftRadius" | "borderTopRightRadius" | "borderTopWidth" | "bottom" | "direction" | "display" | "flexBasis" | "flexDirection" | "flexGrow" | "flexShrink" | "flexWrap" | "height" | "justifyContent" | "left" | "marginBottom" | "marginLeft" | "marginRight" | "marginTop" | "maxHeight" | "maxWidth" | "minHeight" | "minWidth" | "opacity" | "paddingBottom" | "paddingLeft" | "paddingRight" | "paddingTop" | "right" | "top" | "transform" | "width" | "zIndex" | "borderStyle">;
    otherStyle: Omit<NativeTextStyles | NativeBlockStyles, string>;
};

export { StylesConfig }

export { StylessReactNativeProps }

export { StylessReactNativeTextProps }

export { StylessReactNativeViewProps }

export { TabularTagNames }

export { TagName }

export { TBlock }

/**
 * Props to render a child.
 *
 * @public
 */
export declare interface TChildProps {
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
export declare interface TChildrenBaseProps {
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
 * A component to render collections of tnodes.
 * Especially useful when used with {@link useTNodeChildrenProps}.
 *
 * @public
 */
export declare const TChildrenRenderer: FunctionComponent<TChildrenRendererProps>;

/**
 * Props for {@link TChildrenRenderer}.
 *
 * @public
 */
export declare interface TChildrenRendererProps extends TChildrenBaseProps {
    /**
     * An array of {@link TNode} to render.
     */
    tchildren: ReadonlyArray<TNode>;
}

/**
 * Default renderer for any {@link TNode}. The renderer behavior will only
 * change given the {@link TNodeType | type} of the {@link TNode}.
 *
 * @typeParam T - The concrete type of {@link TNode}.
 *
 * @public
 */
export declare type TDefaultRenderer<T extends TNode> = ComponentType<TDefaultRendererProps<T>>;

/**
 * Props for {@link TDefaultRenderer}.
 *
 * @typeParam T - The concrete type of {@link TNode}.
 *
 * @public
 */
export declare interface TDefaultRendererProps<T extends TNode> extends RendererBaseProps<T> {
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
    style: T extends TText | TPhrasing ? StyleProp<TextStyle> : StyleProp<ViewStyle>;
}

export { TDocument }

export { TEmpty }

export { Text_2 as Text }

export { TextLevelTagNames }

/**
 * Specs for a list item marker renderer backed by a `CounterStyleRenderer`
 * from `@jsamr/counter-style`.
 *
 * @public
 */
export declare interface TextualListStyleSpec {
    counterStyleRenderer: CounterStyleRenderer;
    type: 'textual';
}

export { TNode }

/**
 * A component to render all children of a {@link TNode}.
 *
 * @public
 */
export declare function TNodeChildrenRenderer(props: TNodeChildrenRendererProps): ReactElement;

/**
 * Props for {@link TNodeChildrenRenderer}.
 *
 * @public
 */
export declare interface TNodeChildrenRendererProps extends TChildrenBaseProps {
    /**
     * The {@link TNode} from which children will be rendered.
     */
    tnode: TNode;
}

export { TNodeDescriptor }

export { TNodePrintOptions }

/**
 * A component to render any {@link TNode}.
 *
 * @public
 */
export declare const TNodeRenderer: React_2.NamedExoticComponent<TNodeRendererProps<any>>;

/**
 * Props for {@link TNodeRenderer} component.
 *
 * @typeParam T - The concrete type of {@link TNode}.
 *
 * @public
 */
export declare interface TNodeRendererProps<T extends TNode> {
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

export { TNodeShape }

export { TNodeType }

export { TPhrasing }

export { TRenderEngine }

/**
 * Configuration for the {@link TRenderEngineProvider} component.
 *
 * @warning When one of these props changes, it will cause the
 * {@link TRenderEngine} to be rebuilt, and all transient trees to be
 * re-assembled. Beware!
 *
 * @public
 */
export declare interface TRenderEngineConfig {
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
    htmlParserOptions?: ParserOptions;
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
    ignoreDomNode?: (node: Node, parent: NodeWithChildren) => boolean | void | unknown;
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

export { TRenderEngineOptions }

/**
 * A react component to share a {@link TRenderEngine} instance across different
 * rendered contents via {@link RenderHTMLSource}. This can significantly enhance
 * performance in applications with potentially dozens or hundreds of distinct
 * rendered snippets such as chat apps.
 *
 * @param props - Pass engine config here.
 *
 * @public
 */
export declare function TRenderEngineProvider({ children, ...config }: PropsWithChildren<TRenderEngineConfig>): ReactElement;

export { TStylesShape }

export { TText }

declare function ULElement(props: ULElementProps): React_2.FunctionComponentElement<ListElementProps<"ol" | "ul">>;

declare type ULElementProps = Omit<ListElementProps<'ul'>, 'listType'>;

/**
 * Props for unitary counter renderers.
 *
 * @public
 */
export declare type UnitaryCounterRendererProps = {
    color: string;
    fontSize: number;
    index: number;
    lineHeight: number;
} & Pick<MixedStyleDeclaration, 'fontFamily' | 'fontStyle' | 'fontWeight' | 'fontVariant'>;

/**
 * Specs for a list item marker renderer with only one representation. The
 * "Component" should render this representation, minus prefix and suffix. The
 * rendered component should have a maximum width of `0.6 * fontSize`, and a height of
 * `lineHeight`.
 *
 * @public
 */
export declare interface UnitaryListStyleSpec {
    Component: ComponentType<UnitaryCounterRendererProps>;
    counterStyleRenderer: CounterStyleRenderer;
    type: 'unitary';
}

export { UnsupportedTagNames }

export { UntranslatableTagNames }

declare function useAElementProps<T extends TNode>(props: InternalRendererProps<T>): InternalRendererProps<T>;

/**
 * Use the ambient transient render engine.
 *
 * @returns The ambient transient render engine.
 *
 * @public
 */
export declare function useAmbientTRenderEngine(): TRenderEngine;

/**
 * Compute max width for a given tag. Uses
 * {@link RenderHTMLProps.computeEmbeddedMaxWidth}
 * and {@link RenderHTMLProps.contentWidth} under the hood.
 *
 * @param tagName - The tag to target.
 *
 * @public
 */
export declare function useComputeMaxWidthForTag(tagName: string): (cw: number) => number;

/**
 * A hook to get access to the ambient `contentWidth`.
 *
 * @returns The contentWidth available in context.
 *
 * @public
 */
export declare function useContentWidth(): number;

/**
 * Get access to the parsed HTML metadata anywhere in the render tree.
 *
 * @public
 */
export declare function useDocumentMetadata(): DocumentMetadata;

/**
 * A hook to produce props consumable by {@link IMGElement} component
 * from custom renderer props.
 *
 * @public
 */
export declare function useIMGElementProps(props: InternalRendererProps<TBlock>): IMGElementProps;

/**
 * This hook will compute concrete dimensions from image natural dimensions and
 * constraints. It will fetch the image and get its dimensions.
 *
 * @remarks If you know the dimensions beforehand, use
 * {@link useIMGElementStateWithCache} instead to save a network request and
 * prevent a layout shift.
 *
 * @public
 */
export declare function useIMGElementState(props: UseIMGElementStateProps): IMGElementState;

/**
 * Props for {@link useIMGElementState} hook.
 *
 * @public
 */
export declare interface UseIMGElementStateProps {
    /**
     * Alt text extract from `alt` attribute.
     */
    alt?: string;
    /**
     * Alt color, defaults to `color` for this {@link TNode}.
     */
    altColor?: string;
    /**
     * When the natural ("physical") dimensions for this image are accessible *a
     * priori*, these should be passed. It will save some API calls and filesytem
     * access via React Native Image.getSize.
     */
    cachedNaturalDimensions?: ImageDimensions;
    /**
     * When provided, the print image will have a max width depending on the
     * `contentWidth` prop.
     */
    computeMaxWidth?: (contentWidth: number) => number;
    /**
     * The `contentWidth` from the {@link RenderHTMLProps}.
     */
    contentWidth?: number;
    /**
     * Allow experimental percent width for the print dimensions computation.
     * The percent will be relative to `contentWidth`
     */
    enableExperimentalPercentWidth?: boolean;
    /**
     * The value of the `height` attribute.
     */
    height?: string | number;
    /**
     * Rendered dimensions prior to retrieving natural dimensions of the image.
     */
    initialDimensions?: ImageDimensions;
    /**
     * The value of the `object-fit` CSS property.
     */
    objectFit?: WebBlockStyles['objectFit'];
    /**
     * The source to paint.
     */
    source: ImageURISource;
    /**
     * The style for this image.
     */
    style?: StyleProp<ImageStyle>;
    /**
     * The value of the `width` attribute.
     */
    width?: string | number;
}

/**
 * This hook is useful when one has access to image natural dimensions prior to
 * loading. The `cachedNaturalDimensions` prop must be passed to immediately
 * compute concrete dimensions.
 *
 * @public
 */
export declare function useIMGElementStateWithCache(props: UseIMGElementStateWithCacheProps): IMGElementStateError | IMGElementStateSuccess;

/**
 * Props for {@link useIMGElementStateWithCache} hook.
 *
 * @public
 */
export declare type UseIMGElementStateWithCacheProps = UseIMGElementStateProps & Required<Pick<UseIMGElementStateProps, 'cachedNaturalDimensions'>>;

/**
 * Resuse internal renderers logic for infinite customization!
 *
 * @remarks `tagName` must be invariant, i.e. it cannot change. You would
 * otherwise break the rules of hooks.
 *
 * @param tagName - **Invariant** The tag name to extend.
 * @param props - The props passed to the custom renderer.
 * @typeParam T - The name of the tag to target.
 * @returns An object with two fields: `Renderer` (the internal react
 * component) and `rendererProps`, the internal component props.
 *
 * @public
 */
export declare function useInternalRenderer<T extends TagName>(tagName: T, props: InternalRendererProps<any>): T extends InternalRendererTag ? InternalRendererConfig<ReturnType<InternalRenderersConfigMap[T]['hook']>> : InternalRendererConfig<TDefaultRendererProps<any>>;

/**
 * This hook transforms relative and protocol-relative URLs to absolute URLs as
 * per {@link https://tools.ietf.org/html/rfc1808 | RFC1808}. The base URL is
 * determined by the `<base />` element, `source.uri` or `source.baseUrl`.
 *
 * @remarks
 * - If there is no `baseUrl` and the initial URL is relative, this hook will
 *   return the initial URL.
 * - If the initial URL is absolute, this hook will return this initial URL.
 *
 * @param initialUrl - The URL before normalization.
 *
 * @public
 */
export declare function useNormalizedUrl(initialUrl: string): string;

declare function useOLElementProps(props: InternalRendererProps<TBlock>): OLElementProps;

/**
 * Consume props from {@link RenderHTMLProps.renderersProps}.
 *
 * @param tagName - The name of the element.
 * @typeParam K - The type literal corresponding to the element name.
 * @returns props for this renderer.
 *
 * @public
 */
export declare function useRendererProps<RendererProps extends RenderersProps = RenderersProps, K extends keyof RendererProps = keyof RendererProps>(tagName: K): RendererProps[K];

/**
 * Use shared props. See {@link RenderHTMLSharedProps}.
 *
 * @public
 */
export declare function useSharedProps(): RenderHTMLAmbiantSharedProps;

/**
 * A hook especially useful when one need to tamper with children in a custom
 * renderer. Should be used with {@link TChildrenRenderer}.
 *
 * @example
 * For example, a custom renderer which inserts ads in an article:
 *
 * ```tsx
 * function ArticleRenderer(props) {
 *   const { tnode, TDefaultRenderer, ...defaultRendererProps } = props;
 *   const tchildrenProps = useTNodeChildrenProps(props);
 *   const firstChildrenChunk = tnode.children.slice(0, 2);
 *   const secondChildrenChunk = tnode.children.slice(2, 4);
 *   const thirdChildrenChunk = tnode.children.slice(4, 5);
 *   return (
 *     <TDefaultRenderer tnode={tnode} {...defaultRendererProps}>
 *       <TChildrenRenderer {...tchildrenProps} tchildren={firstChildrenChunk} />
 *       {firstChildrenChunk.length === 2 ? <AdComponent /> : null}
 *       <TChildrenRenderer {...tchildrenProps} tchildren={secondChildrenChunk} />
 *       {secondChildrenChunk.length === 2 ? <AdComponent /> : null}
 *       <TChildrenRenderer {...tchildrenProps} tchildren={thirdChildrenChunk} />
 *     </TDefaultRenderer>
 *   );
 * };
 * ```
 *
 * @public
 */
export declare function useTNodeChildrenProps({ tnode, propsForChildren, disableMarginCollapsing, renderChild }: TNodeChildrenRendererProps): TChildrenRendererProps;

declare function useULElementProps(props: InternalRendererProps<TBlock>): ULElementProps;

export { WebBlockRetainProperties }

export { WebBlockStyles }

export { WebTextFlowProperties }

export { WebTextStyles }

export { }
