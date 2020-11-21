import React from 'react';
import { useEffect } from 'react';
import RenderHTML from './RenderHTML';
import { RenderHTMLProps } from './shared-types';

export default function RenderHTMLDebug(props: RenderHTMLProps) {
  useEffect(() => {
    if (typeof props.contentWidth !== 'number') {
      console.warn(
        'You should always pass contentWidth prop to properly handle screen rotations ' +
          'and have a seemless support for images scaling. ' +
          'In the meantime, HTML will fallback to Dimensions.window().width, but its ' +
          'layout will become inconsistent after screen rotations. ' +
          'You are encouraged to use useWindowDimensions hook, see: ' +
          'https://reactnative.dev/docs/usewindowdimensions'
      );
    }
  }, [props.contentWidth]);
  return React.createElement(RenderHTML, props);
}
