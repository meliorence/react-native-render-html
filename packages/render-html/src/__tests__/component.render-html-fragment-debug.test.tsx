import React from 'react';
import { render } from 'react-native-testing-library';
import debugMessage from '../debugMessages';
import RenderHTMLFragmentDebug from '../RenderHTMLFragmentDebug';

beforeAll(function () {
  //@ts-expect-error
  global.__DEV__ = true;
});

describe('RenderHTMLFragmentDebug', () => {
  it('should warn when contentWidth has not been provided', () => {
    console.warn = jest.fn();
    render(
      <RenderHTMLFragmentDebug
        source={{ html: '<p>Hello world</p>' }}
        debug={false}
      />
    );
    expect(console.warn).toHaveBeenNthCalledWith(1, debugMessage.contentWidth);
  });
  it('should warn when source has not been provided', () => {
    console.warn = jest.fn();
    //@ts-expect-error
    render(<RenderHTMLFragmentDebug contentWidth={0} debug={false} />);
    expect(console.warn).toHaveBeenNthCalledWith(1, debugMessage.noSource);
  });
  it('should warn when outdated html prop has been provided', () => {
    console.warn = jest.fn();
    render(
      React.createElement(RenderHTMLFragmentDebug, {
        contentWidth: 0,
        source: { html: 'hello world' },
        //@ts-expect-error
        html: 'hello world',
        debug: false
      })
    );
    expect(console.warn).toHaveBeenNthCalledWith(
      1,
      debugMessage.outdatedHtmlProp
    );
  });
  it('should warn when outdated uri prop has been provided', () => {
    console.warn = jest.fn();
    render(
      React.createElement(RenderHTMLFragmentDebug, {
        contentWidth: 0,
        source: { html: 'hello world' },
        //@ts-expect-error
        uri: 'https://foo.bar/',
        debug: false
      })
    );
    expect(console.warn).toHaveBeenNthCalledWith(
      1,
      debugMessage.outdatedUriProp
    );
  });
});
