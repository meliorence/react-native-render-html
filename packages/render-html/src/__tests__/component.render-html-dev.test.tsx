import React from 'react';
import { render } from 'react-native-testing-library';
import RenderHTMLDebug, { messages } from '../RenderHTMLDebug';

beforeAll(function () {
  //@ts-expect-error
  global.__DEV__ = true;
});

describe('RenderHTMLDebug', () => {
  it('should warn when contentWidth has not been provided', () => {
    console.warn = jest.fn();
    render(
      <RenderHTMLDebug source={{ html: '<p>Hello world</p>' }} debug={false} />
    );
    expect(console.warn).toHaveBeenNthCalledWith(1, messages.contentWidth);
  });
  it('should warn when source has not been provided', () => {
    console.warn = jest.fn();
    //@ts-expect-error
    render(<RenderHTMLDebug contentWidth={0} debug={false} />);
    expect(console.warn).toHaveBeenNthCalledWith(1, messages.noSource);
  });
  it('should warn when outdated html prop has been provided', () => {
    console.warn = jest.fn();
    render(
      React.createElement(RenderHTMLDebug, {
        contentWidth: 0,
        source: { html: 'hello world' },
        //@ts-expect-error
        html: 'hello world',
        debug: false
      })
    );
    expect(console.warn).toHaveBeenNthCalledWith(1, messages.outdatedHtmlProp);
  });
  it('should warn when outdated uri prop has been provided', () => {
    console.warn = jest.fn();
    render(
      React.createElement(RenderHTMLDebug, {
        contentWidth: 0,
        source: { html: 'hello world' },
        //@ts-expect-error
        uri: 'https://foo.bar/',
        debug: false
      })
    );
    expect(console.warn).toHaveBeenNthCalledWith(1, messages.outdatedUriProp);
  });
});
