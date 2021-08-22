import { Element } from 'domhandler';
import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import debugMessage from '../debugMessages';
import RenderHTMLConfigProvider from '../RenderHTMLConfigProvider';
import RenderHTMLSource from '../RenderHTMLSource';
import RenderTTree from '../RenderTTree';
import { RenderHTMLSourceProps } from '../shared-types';
import TRenderEngineProvider from '../TRenderEngineProvider';

beforeAll(function () {
  //@ts-expect-error __DEV__ defined by RN env
  global.__DEV__ = true;
});

function renderSource(props: RenderHTMLSourceProps) {
  return render(
    <TRenderEngineProvider>
      <RenderHTMLConfigProvider>
        <RenderHTMLSource {...props} />
      </RenderHTMLConfigProvider>
    </TRenderEngineProvider>
  );
}

describe('RenderHTMLSource', () => {
  it('should warn when source has not been provided', () => {
    console.warn = jest.fn();
    //@ts-expect-error missing source
    renderSource({ contentWidth: 10 });
    expect(console.warn).toHaveBeenNthCalledWith(1, debugMessage.noSource);
  });
  it('should warn when contentWidth has not been provided', () => {
    console.warn = jest.fn();
    renderSource({ source: { html: 'hello' } });
    expect(console.warn).toHaveBeenNthCalledWith(1, debugMessage.contentWidth);
  });
  it('should render html sources', () => {
    renderSource({ source: { html: 'hello' }, contentWidth: 0 });
  });
  it('should render dom sources', () => {
    renderSource({ source: { dom: new Element('div', {}) }, contentWidth: 0 });
  });
  describe('should render uri sources', () => {
    it('should render content when remote resource is available', async () => {
      global.fetch = jest.fn(() => {
        return Promise.resolve({
          ok: true,
          text() {
            return Promise.resolve('<div>Hello world!</div');
          }
        } as any);
      });
      const { UNSAFE_getByType } = renderSource({
        source: { uri: 'https://motherfuckingwebsite.com/' },
        contentWidth: 0
      });
      await waitFor(() => UNSAFE_getByType(RenderTTree));
    });
    it('should render the error view when remote resource is unavailable', async () => {
      global.fetch = jest.fn(() => {
        return Promise.resolve({
          ok: false
        } as any);
      });
      const { findByTestId } = renderSource({
        source: { uri: 'https://motherfuckingwebsite.com/' },
        contentWidth: 0
      });
      await findByTestId('loader-error');
    });
    it('should render the error view when the fetch call throws', async () => {
      global.fetch = jest.fn(() => {
        return Promise.reject('Ooops!');
      });
      const { findByTestId } = renderSource({
        source: { uri: 'https://motherfuckingwebsite.com/' },
        contentWidth: 0
      });
      await findByTestId('loader-error');
    });
  });
});
