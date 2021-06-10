import { TBlock } from '@native-html/transient-render-engine';
import React from 'react';
import { render } from 'react-native-testing-library';
import { perf, wait } from 'react-performance-testing';
import buildTREFromConfig from '../../helpers/buildTREFromConfig';
import RenderHTMLConfigProvider from '../../RenderHTMLConfigProvider';
import { DefaultSupportedListStyleType } from '../../shared-types';
import { TDefaultBlockRenderer } from '../../TBlockRenderer';
import TRenderEngineProvider from '../../TRenderEngineProvider';
import defaultListStyleSpecs from '../defaultListStyleSpecs';
import ListElement, { ListElementProps } from '../ListElement';

function makeListElementProps<T extends 'ol' | 'ul'>(
  html: string,
  type: T,
  listStyleType: DefaultSupportedListStyleType,
  extraProps: Partial<ListElementProps<T>>
): ListElementProps<T> {
  const tre = buildTREFromConfig({});
  const tdocument = tre.buildTTree(html);
  const list = tdocument.children[0].children[0] as TBlock;
  expect(list.type).toBe('block');
  expect(list.tagName).toBe(type);
  return Object.freeze({
    TDefaultRenderer: TDefaultBlockRenderer,
    listType: type,
    propsFromParent: { collapsedMarginTop: 0 },
    sharedProps: {} as any,
    style: {},
    tnode: list,
    type: 'block',
    getFallbackListStyleTypeFromNestLevel() {
      return listStyleType;
    },
    textProps: {},
    viewProps: {},
    ...extraProps,
    listStyleSpecs: defaultListStyleSpecs
  });
}

describe('ListElement', () => {
  const listStyleTypes: Array<DefaultSupportedListStyleType> = [
    'circle',
    'decimal',
    'decimal-leading-zero',
    'disc',
    'disclosure-closed',
    'disclosure-open',
    'lower-alpha',
    'lower-greek',
    'lower-latin',
    'lower-roman',
    'none',
    'square',
    'upper-alpha',
    'upper-latin',
    'upper-roman'
  ];
  for (const listStyleType of listStyleTypes) {
    it(`should render and support listStyleType ${listStyleType}`, async () => {
      const { renderCount } = perf<{ ListElement: unknown }>(React);
      const props = makeListElementProps(
        '<ol><li>One</li></ol>',
        'ol',
        listStyleType,
        {}
      );
      render(
        <TRenderEngineProvider>
          <RenderHTMLConfigProvider>
            {React.createElement(ListElement, props)}
          </RenderHTMLConfigProvider>
        </TRenderEngineProvider>
      );
      await wait(() => {
        // Expect only one instance
        expect(typeof renderCount.current.ListElement.value).toBe('number');
        // Expect only one render
        expect(renderCount.current.ListElement.value).toBeLessThan(2);
      });
    });
  }
});
