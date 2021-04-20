import React, {
  memo,
  PropsWithChildren,
  useEffect,
  useMemo,
  useRef
} from 'react';
import useThemeContext from '@theme/hooks/useThemeContext';
import styles from './ExpoSnippet.module.css';

function makeIframeSrcParamsQuery({
  name,
  description,
  theme,
  iframeId
}: {
  name: string;
  description?: string;
  theme: 'light' | 'dark';
  iframeId: string;
}) {
  return [
    ['iframeId', iframeId],
    ['preview', 'true'],
    ['platform', 'web'],
    name ? ['name', encodeURIComponent(name)] : null,
    description ? ['description', encodeURIComponent(description)] : null,
    ['theme', theme],
    ['verbose', 'false'],
    ['waitForData', 'true']
  ]
    .filter((v) => !!v)
    .map(([k, v]) => `${k}=${v}`)
    .join('&');
}

function installIframeListener({
  iframe,
  iframeId,
  code
}: {
  iframe: HTMLIFrameElement;
  iframeId: string;
  code: string;
}) {
  const listener = function (event: MessageEvent) {
    var eventName = event.data[0];
    var data = event.data[1];
    if (eventName === 'expoFrameLoaded' && data.iframeId === iframeId) {
      iframe.contentWindow.postMessage(
        [
          'expoDataEvent',
          {
            iframeId: iframeId,
            dependencies: 'react-native-render-html@6.0.0-alpha.22',
            code: code,
            files: ''
          }
        ],
        '*'
      );
    }
  };
  window.addEventListener('message', listener);
  // cleanup
  return () => window.removeEventListener('message', listener);
}

const ExpoIframe = memo(function ExpoIframe({
  name,
  description,
  theme,
  code
}: {
  name?: string;
  description?: string;
  theme: 'light' | 'dark';
  code: string;
}) {
  // see https://git.io/JOX5X
  const iframeId = useRef(Math.random().toString(36).substr(2, 10));
  const ref = useRef<HTMLIFrameElement>(null);
  const params = useMemo(
    () =>
      makeIframeSrcParamsQuery({
        iframeId: iframeId.current,
        name,
        theme,
        description
      }),
    [description, name, theme]
  );
  const src = `https://snack.expo.io/embedded?${params}`;
  useEffect(
    function postIframeMessage() {
      const cleanup = installIframeListener({
        iframe: ref.current,
        iframeId: iframeId.current,
        code
      });
      return cleanup;
    },
    [code]
  );
  return (
    <iframe
      className={styles.expoIframe}
      ref={ref}
      src={src}
      width="100%"
      height="100%"
      frameBorder="0"
      loading="lazy"
      data-snack-iframe={true}
    />
  );
});

export default function ExpoSnippet({
  snippet,
  title,
  caption
}: PropsWithChildren<{
  title: string;
  snippet: string;
  caption?: string;
}>) {
  const { isDarkTheme } = useThemeContext();
  const normalSnippet = decodeURIComponent(snippet);
  const style: React.CSSProperties = {
    height: Math.max(normalSnippet.split('\n').length * 20 + 48 + 36),
    backgroundColor: isDarkTheme ? '#212121' : '#f9f9f9',
    borderColor: isDarkTheme ? 'transparent' : 'lightgray'
  };
  return (
    <div className={styles.expoContainer} style={style}>
      <ExpoIframe
        code={normalSnippet}
        theme={isDarkTheme ? 'dark' : 'light'}
        name={title}
        description={caption}
      />
    </div>
  );
}
