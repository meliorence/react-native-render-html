import React from 'react';
import { render } from 'react-native-testing-library';
import debugMessage from '../debugMessages';
import RenderHTMLSource from '../RenderHTMLSource';
import { RenderHTMLSourceProps } from '../shared-types';
import TRenderEngineProvider from '../TRenderEngineProvider';

beforeAll(function () {
  //@ts-expect-error
  global.__DEV__ = true;
});

function renderSource(props: RenderHTMLSourceProps) {
  return render(
    <TRenderEngineProvider>
      <RenderHTMLSource {...props} />
    </TRenderEngineProvider>
  );
}

describe('RenderHTMLSource', () => {
  it('should warn when source has not been provided', () => {
    console.warn = jest.fn();
    //@ts-expect-error
    renderSource({});
    expect(console.warn).toHaveBeenNthCalledWith(1, debugMessage.noSource);
  });
});
