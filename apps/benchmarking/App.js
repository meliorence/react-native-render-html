import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useKeepAwake } from 'expo-keep-awake';
import {
  TRenderEngineProvider,
  RenderHTMLConfigProvider
} from 'react-native-render-html';

import Benchmark from './Benchmark';

const uri = 'https://reactnative.dev/docs/next/image';

const config = {
  samples: 5,
  ignoredTags: ['svg', 'button', 'input', 'form', 'img', 'ol', 'ul', 'table']
};

export default function App() {
  const [html, setHtml] = useState(null);
  useKeepAwake();
  useEffect(() => {
    (async function () {
      const resp = await fetch(uri);
      const res = await resp.text();
      setHtml(res);
    })().catch((e) => console.error(e));
  }, []);
  return (
    <SafeAreaView style={{ flexGrow: 1 }}>
      <TRenderEngineProvider ignoredDomTags={config.ignoredTags}>
        <RenderHTMLConfigProvider>
          {(html && <Benchmark html={html} {...config} />) || (
            <ActivityIndicator color="black" />
          )}
        </RenderHTMLConfigProvider>
      </TRenderEngineProvider>
    </SafeAreaView>
  );
}
