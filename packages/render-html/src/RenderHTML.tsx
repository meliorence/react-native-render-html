import React, { ReactElement, ReactNode, useState } from 'react';
import {
  Dimensions,
  LayoutChangeEvent,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import {render} from 'posthtml-render';
import {Node} from 'posthtml-parser';
import WebView from 'react-native-webview';
import { RenderHTMLProps } from './shared-types';
import RenderHTMLDebug from './RenderHTMLDebug';
import TRenderEngineProvider from './TRenderEngineProvider';
import RenderHTMLConfigProvider from './RenderHTMLConfigProvider';
import RenderHTMLSource from './RenderHTMLSource';
import {RenderHtmlViewModel} from "./viewmodels/RenderHtmlViewModel";

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

interface RenderHtmlContentComponentProps extends RenderHTMLProps{
  content: string
}
interface RenderHtmlElementProps {
  element: Node | any
  contentWidth?: number
}

const {width} = Dimensions.get('window')
const vw = width / 100

const styles = StyleSheet.create({
  blockQuoteContainer: {
    paddingBottom: 0,
    paddingRight: 10,
    flexDirection: 'row',
    marginTop: 15,
    flex: 1,
  },
  blockQuoteContent: {
    flex: 1,
    width: vw * 80,
  },
})

const RenderHtml: React.FC<RenderHTMLProps> = (props) => {
  const {
    source,
    onHTMLLoaded,
    onTTreeChange,
    onDocumentMetadataLoaded,
    contentWidth,
    ...otherProps
  } = props;
  return (
      <RenderHTMLDebug {...props}>
        <TRenderEngineProvider {...otherProps}>
          <RenderHTMLConfigProvider {...otherProps}>
            {React.createElement(RenderHTMLSource, {
              source,
              onHTMLLoaded,
              onTTreeChange,
              onDocumentMetadataLoaded,
              contentWidth
            })}
          </RenderHTMLConfigProvider>
        </TRenderEngineProvider>
      </RenderHTMLDebug>
  )
}

const RenderHtmlElement: React.FC<RenderHtmlElementProps> = ({
                                                               contentWidth,
                                                               element,
                                                               ...rest
                                                             }) => {

  /**
   * METHODS
   */
  const onLayout = (event: LayoutChangeEvent) => {
    return event.nativeEvent.layout.height
  }

  const renderBlockquote = () => (
      <View style={[styles.blockQuoteContainer]}>
        <View style={styles.blockQuoteContent} onLayout={onLayout}>
          <RenderHtml
              {...rest}
              enableCSSInlineProcessing
              contentWidth={width}
              source={{
                html: `<div style="
                            font-size: 14;
                            font-style: italic;
                            line-height: 20;">
                            ${render(element.node)}
                        </div>`,
              }}
          />
        </View>
      </View>
  )

  return (
      <React.Fragment>
        {element.node.tag === 'blockquote' ? (
            renderBlockquote()
        ) : (
            <RenderHtml
                {...rest}
                contentWidth={width}
                source={{
                  html: `${render(element.node)}`,
                }}
            />
        )}
      </React.Fragment>
  )
}

const RenderHtmlContent: React.FC<RenderHtmlContentComponentProps> = ({
                                                                        content,
                                                                        ...props,
                                                                      }) => {
  /**
   * INITIALIZATION
   */
  const [postVM] = useState(new RenderHtmlViewModel())
  const [contentToNodeElement] = useState(
      postVM.convertContentToNodeOrEmbed(content),
  )

  return (
      <View style={{marginTop: postVM.hasSpecialTagToEmbed(content) ? 20 : 0}}>
        {contentToNodeElement.map((element, index) => (
            <React.Fragment key={index}>
              {element.isEmbed ? (
                  <WebView
                      source={{
                        html: `<script type="text/javascript" src="https://platform.twitter.com/widgets.js"></script>
                                       <body style="display: flex; align-content: center; align-content: center;">${render(
                            element.node,
                        )}</body>`,
                      }}
                      style={{
                        width,
                        minHeight: postVM.isTwitterTag(element.node)
                            ? 300
                            : +element.node[0].attrs?.height / 1.8,
                        resizeMode: 'cover',
                        flex: 1,
                        opacity: 0.99,
                      }}
                      userAgent={
                        'Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/ 604.1.21 (KHTML, like Gecko) Version/ 12.0 Mobile/17A6278a Safari/602.1.26'
                      }
                      mediaPlaybackRequiresUserAction={false}
                      renderToHardwareTextureAndroid={true}
                      scrollEnabled={false}
                      automaticallyAdjustContentInsets={false}
                      androidLayerType={
                        Platform.OS === 'android' &&
                        Platform.Version <= 22
                            ? 'hardware'
                            : 'none'
                      }
                      injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=0.5, maximum-scale=0.5, user-scalable=2.0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
                      bounces={false}
                      javaScriptEnabled
                      scalesPageToFit
                      domStorageEnabled
                      startInLoadingState
                  />
              ) : (
                  <React.Fragment>
                        <RenderHtmlElement
                            contentWidth={width}
                            element={element}
                            {...props}
                        />
                  </React.Fragment>
              )}
            </React.Fragment>
        ))}
      </View>
  )
}


export default function RenderHTML(props: RenderHtmlContentComponentProps): ReactElement {
  const {
    content,
    ...otherProps
  } = props;
  return (
      <RenderHtmlContent {...otherProps} content={content} />
  );
}
