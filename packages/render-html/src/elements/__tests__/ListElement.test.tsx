import { MarkedListItem } from '@jsamr/react-native-li';
import { TBlock } from '@native-html/transient-render-engine';
import React from 'react';
import { StyleSheet } from 'react-native';
import { render, waitFor } from '@testing-library/react-native';
import { perf, wait } from 'react-performance-testing';
import buildTREFromConfig from '../../helpers/buildTREFromConfig';
import RenderHTMLConfigProvider from '../../RenderHTMLConfigProvider';
import { DefaultSupportedListStyleType } from '../../shared-types';
import TRenderEngineProvider from '../../TRenderEngineProvider';
import ListElement, {
  getMarkerBoxStyle,
  ListElementProps
} from '../ListElement';
import { TDefaultBlockRenderer } from '../../TNodeRenderer';
import TNodeChildrenRenderer from '../../TNodeChildrenRenderer';

function makeListElementProps<T extends 'ol' | 'ul'>(
  html: string,
  type: T,
  listStyleType: DefaultSupportedListStyleType,
  extraProps: Partial<ListElementProps<T>>
): ListElementProps<T> {
  const tre = buildTREFromConfig({ enableCSSInlineProcessing: true });
  const tdocument = tre.buildTTree(html);
  const list = tdocument.children[0].children[0] as TBlock;
  expect(list.type).toBe('block');
  expect(list.tagName).toBe(type);
  return {
    TDefaultRenderer: TDefaultBlockRenderer,
    TNodeChildrenRenderer: TNodeChildrenRenderer,
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
    renderIndex: 0,
    renderLength: 1
  };
}

describe('getMarkerBoxStyle', () => {
  it('should return a width property with the max of paddingValue and markerWidth', () => {
    expect(getMarkerBoxStyle(10, 12).width).toBe(12);
  });
  it('should fallback the width property to markerWidth when paddingValue is not a number', () => {
    expect(getMarkerBoxStyle(10, '10%').width).toBe(10);
  });
  it('should fallback to paddingValue when markerWidth is not a number', () => {
    expect(getMarkerBoxStyle(false, 10).width).toBe(10);
  });
});

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
    for (const dir of ['ltr', 'rtl']) {
      it(`should render and support listStyleType ${listStyleType} in ${dir}`, async () => {
        const { renderCount } = perf<{ ListElement: unknown }>(React);
        const props = makeListElementProps(
          `<ol dir="${dir}"><li>One</li></ol>`,
          'ol',
          listStyleType,
          {
            enableExperimentalRtl: true
          }
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
  }
  it('should warn user when list-style-type is a quoted string', () => {
    console.warn = jest.fn();
    const props = makeListElementProps(
      '<ol style="list-style-type: \'/\';"><li>One</li></ol>',
      'ol',
      'disc',
      {}
    );
    render(
      <TRenderEngineProvider>
        <RenderHTMLConfigProvider>
          {React.createElement(ListElement, props)}
        </RenderHTMLConfigProvider>
      </TRenderEngineProvider>
    );
    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining("This library doesn't support strings")
    );
  });
  it('should warn user when list-style-type is an unregistered type', () => {
    console.warn = jest.fn();
    const props = makeListElementProps(
      '<ol style="list-style-type: foo;"><li>One</li></ol>',
      'ol',
      'disc',
      {}
    );
    render(
      <TRenderEngineProvider>
        <RenderHTMLConfigProvider>
          {React.createElement(ListElement, props)}
        </RenderHTMLConfigProvider>
      </TRenderEngineProvider>
    );
    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining('is not handled by react-native-render-html.')
    );
  });
  it('should handle getFallbackListStyleTypeFromNestLevel returning undefined', () => {
    const props = makeListElementProps(
      '<ol><li>One</li></ol>',
      'ol',
      undefined as any,
      {}
    );
    render(
      <TRenderEngineProvider>
        <RenderHTMLConfigProvider>
          {React.createElement(ListElement, props)}
        </RenderHTMLConfigProvider>
      </TRenderEngineProvider>
    );
  });
  it('should support start index', async () => {
    const props = makeListElementProps(
      '<ol start="10" ><li>One</li></ol>',
      'ol',
      'decimal',
      {}
    );
    const { UNSAFE_getByType } = render(
      <TRenderEngineProvider>
        <RenderHTMLConfigProvider>
          {React.createElement(ListElement, props)}
        </RenderHTMLConfigProvider>
      </TRenderEngineProvider>
    );
    const markedList = await waitFor(() => UNSAFE_getByType(MarkedListItem));
    expect(markedList.props.startIndex).toBe(10);
  });
  it('should support experimental RTL mode', async () => {
    const props = makeListElementProps(
      '<ol dir="rtl" ><li>One</li></ol>',
      'ol',
      'decimal',
      {
        enableExperimentalRtl: true
      }
    );
    const { UNSAFE_getByType } = render(
      <TRenderEngineProvider>
        <RenderHTMLConfigProvider>
          {React.createElement(ListElement, props)}
        </RenderHTMLConfigProvider>
      </TRenderEngineProvider>
    );
    const markedList = await waitFor(() => UNSAFE_getByType(MarkedListItem));
    expect(markedList.props.rtlLineReversed).toBe(true);
    expect(markedList.props.rtlMarkerReversed).toBe(true);
  });
  it('should support enableRemove*MarginIfNested props', async () => {
    const props = makeListElementProps(
      '<ol><li><ul></ul></li></ol>',
      'ol',
      'decimal',
      {
        enableRemoveTopMarginIfNested: true,
        enableRemoveBottomMarginIfNested: true
      }
    );
    const { findByTestId } = render(
      <TRenderEngineProvider>
        <RenderHTMLConfigProvider>
          {React.createElement(ListElement, props)}
        </RenderHTMLConfigProvider>
      </TRenderEngineProvider>
    );
    const ul = await findByTestId('ul');
    expect(StyleSheet.flatten(ul.props.style)).toMatchObject({
      marginTop: 0,
      marginBottom: 0
    });
  });
});
