import React from 'react';
import { render } from 'react-native-testing-library';
import debugMessage, { DebugType } from '../debugMessages';
import RenderHTMLDebug from '../RenderHTMLDebug';

beforeAll(function () {
  //@ts-expect-error
  global.__DEV__ = true;
});

function createOutdatedPropTest(
  propName: string,
  propValue: any,
  debugName: DebugType
) {
  it(`should warn when outdated ${propName} prop has been provided`, () => {
    console.warn = jest.fn();
    render(
      //@ts-ignore
      React.createElement(RenderHTMLDebug, {
        [propName]: propValue,
        debug: false
      })
    );
    expect(console.warn).toHaveBeenNthCalledWith(1, debugMessage[debugName]);
  });
}

describe('RenderHTMLDebug', () => {
  createOutdatedPropTest('html', 'hello world', 'outdatedHtmlProp');
  createOutdatedPropTest('uri', 'https://domain.com', 'outdatedUriProp');
  createOutdatedPropTest(
    'listsPrefixesRenderers',
    {},
    'outdatedListPrefixRenderersProps'
  );
  createOutdatedPropTest(
    'imagesInitialDimensions',
    {},
    'outdatedImagesDimensions'
  );
  createOutdatedPropTest('onLinkPress', [], 'outdatedOnLinkPressProp');
  createOutdatedPropTest(
    'enableExperimentalPercentWidth',
    false,
    'outdatedEnableExperimentalPercentWidth'
  );
});
