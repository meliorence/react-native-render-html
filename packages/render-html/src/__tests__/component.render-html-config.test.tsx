import React from 'react';
import { render } from 'react-native-testing-library';
import debugMessage from '../debugMessages';
import RenderHTMLConfigProvider from '../RenderHTMLConfigProvider';
import { RenderHTMLConfig } from '../shared-types';
import TRenderEngineProvider from '../TRenderEngineProvider';

beforeAll(function () {
  //@ts-expect-error
  global.__DEV__ = true;
});

function renderConfig(props: RenderHTMLConfig) {
  return render(
    <TRenderEngineProvider>
      <RenderHTMLConfigProvider {...props} />
    </TRenderEngineProvider>
  );
}

describe('RenderHTMLSource', () => {
  it('should warn when contentWidth has not been provided', () => {
    console.warn = jest.fn();
    //@ts-ignore
    renderConfig({});
    expect(console.warn).toHaveBeenNthCalledWith(1, debugMessage.contentWidth);
  });
});
