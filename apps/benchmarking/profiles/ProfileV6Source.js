import React from 'react';
import {useWindowDimensions} from 'react-native';
import {RenderHTMLSource} from 'react-native-render-html';

export default function ProfileV6Source({running, html, ignoredTags}) {
  const {width} = useWindowDimensions();
  return (
    html &&
    running && (
      <RenderHTMLSource
        contentWidth={width}
        ignoredTags={ignoredTags}
        source={{html}}
      />
    )
  );
}
