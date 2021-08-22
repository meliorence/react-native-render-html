import React from 'react';
import { act, render, waitFor } from '@testing-library/react-native';
import RenderHTML from '../RenderHTML';
import ImgTag from '../elements/IMGElement';
import TTextRenderer from '../TTextRenderer';
import {
  CustomBlockRenderer,
  CustomTextualRenderer
} from '../render/render-types';
import {
  defaultHTMLElementModels,
  HTMLContentModel
} from '@native-html/transient-render-engine';
import { StyleSheet, Text } from 'react-native';
import { useRendererProps } from '../context/RenderersPropsProvider';
import TNodeChildrenRenderer from '../TNodeChildrenRenderer';
import OLElement from '../elements/OLElement';
import ULElement from '../elements/ULElement';

describe('RenderHTML', () => {
  it('should render without error when providing a source', () => {
    expect(() =>
      render(
        <RenderHTML source={{ html: '<p>Hello world</p>' }} debug={false} />
      )
    ).not.toThrow();
  });
  it('should render without error when missing a source', () => {
    //@ts-expect-error missing source
    expect(() => render(<RenderHTML debug={false} />)).not.toThrow();
  });
  it('should print a snapshot in debug mode when __DEV__ is true', () => {
    console.info = jest.fn();
    render(<RenderHTML source={{ html: '<p>Hello world</p>' }} debug={true} />);
    expect(console.info).toHaveBeenNthCalledWith(
      1,
      expect.stringContaining('Transient Render Tree update')
    );
  });
  describe('regarding internal renderers', () => {
    it('should use internal renderer for <ol> elements', async () => {
      const { UNSAFE_getByType } = render(
        <RenderHTML
          source={{
            html: '<ol><li>One</li><li>Two</li><li>Three</li></ol>'
          }}
          debug={false}
          contentWidth={0}
        />
      );
      await waitFor(() => UNSAFE_getByType(OLElement));
    });
    it('should use internal renderer for <ul> elements', async () => {
      const { UNSAFE_getByType } = render(
        <RenderHTML
          source={{
            html: '<ul><li>One</li><li>Two</li><li>Three</li></ul>'
          }}
          debug={false}
          contentWidth={0}
        />
      );
      await waitFor(() => UNSAFE_getByType(ULElement));
    });
    it('should update ImgTag contentWidth when contentWidth prop changes', () => {
      const contentWidth = 300;
      const nextContentWidth = 200;
      const { UNSAFE_getByType, update } = render(
        <RenderHTML
          source={{ html: '<img src="https://img.com/1" />' }}
          debug={false}
          contentWidth={contentWidth}
        />
      );
      expect(UNSAFE_getByType(ImgTag).props.contentWidth).toBe(contentWidth);
      update(
        <RenderHTML
          source={{ html: '<img src="https://img.com/1" />' }}
          debug={false}
          contentWidth={nextContentWidth}
        />
      );
      expect(UNSAFE_getByType(ImgTag).props.contentWidth).toBe(
        nextContentWidth
      );
    });
    it('should use internal text renderer for <wbr> tags', async () => {
      const { findByText } = render(
        <RenderHTML
          source={{
            html: '<wbr>'
          }}
          debug={false}
          contentWidth={0}
        />
      );
      await findByText('\u200B');
    });
    it('should use internal text renderer for <br> tags', async () => {
      const { findByText } = render(
        <RenderHTML
          source={{
            html: '<br>'
          }}
          debug={false}
          contentWidth={0}
        />
      );
      await findByText('\n');
    });
    it('should invoke renderersProps.a.onPress on <a> press', async () => {
      const onPress = jest.fn();
      const { findByTestId } = render(
        <RenderHTML
          source={{
            html: '<a href="https://domain.com">Hello world!</a>'
          }}
          renderersProps={{
            a: {
              onPress
            }
          }}
          debug={false}
          contentWidth={0}
        />
      );
      const anchor = await findByTestId('a');
      act(() => anchor.props.onPress?.({}));
      expect(onPress).toHaveBeenCalled();
    });
  });
  describe('regarding customHTMLElementsModels prop', () => {
    it('should support changing block content model to mixed', () => {
      const contentWidth = 300;
      const onTTreeChange = jest.fn((ttree) =>
        expect(ttree.snapshot()).toMatchSnapshot()
      );
      render(
        <RenderHTML
          source={{ html: '<span><article></article>Text</span>' }}
          debug={false}
          customHTMLElementModels={{
            article: defaultHTMLElementModels.article.extend({
              contentModel: HTMLContentModel.mixed
            })
          }}
          contentWidth={contentWidth}
          onTTreeChange={onTTreeChange}
        />
      );
      expect(onTTreeChange).toHaveBeenCalledTimes(1);
    });
  });
  it('should support fonts from tagsStyles specified in systemFonts', () => {
    const tagsStyles = {
      span: {
        fontFamily: 'Superfont'
      }
    };
    const { getByTestId } = render(
      <RenderHTML
        source={{ html: '<span>hi</span>' }}
        debug={false}
        tagsStyles={tagsStyles}
        systemFonts={['Superfont']}
        contentWidth={100}
      />
    );
    const span = getByTestId('span');
    expect(span.props.style).toMatchObject(tagsStyles.span);
  });
  describe('regarding onTTreeChange prop', () => {
    const onTTreeChange = jest.fn();
    render(
      <RenderHTML
        source={{ html: '<a href="test">Yuhuuu</a>' }}
        debug={false}
        onTTreeChange={onTTreeChange}
        contentWidth={100}
      />
    );
    expect(onTTreeChange).toHaveBeenCalled();
  });
  describe('regarding onHTMLLoaded prop', () => {
    const onHTMLLoaded = jest.fn();
    render(
      <RenderHTML
        source={{ html: '<a href="test">Yuhuuu</a>' }}
        debug={false}
        onHTMLLoaded={onHTMLLoaded}
        contentWidth={100}
      />
    );
    expect(onHTMLLoaded).toHaveBeenCalled();
  });
  describe('regarding onDocumentMetadataLoaded prop', () => {
    const onDocumentMetadataLoaded = jest.fn();
    render(
      <RenderHTML
        source={{ html: '<a href="test">Yuhuuu</a>' }}
        debug={false}
        onDocumentMetadataLoaded={onDocumentMetadataLoaded}
        contentWidth={100}
      />
    );
    expect(onDocumentMetadataLoaded).toHaveBeenCalled();
  });
  describe('regarding markers', () => {
    it('should set `anchor` marker for `a` tags', () => {
      const { UNSAFE_getByType } = render(
        <RenderHTML
          source={{ html: '<a href="test">Yuhuuu</a>' }}
          debug={false}
          contentWidth={100}
        />
      );
      const ttext = UNSAFE_getByType(TTextRenderer);
      expect(ttext.props.tnode.markers.anchor).toBe(true);
    });
    it('should set `edits` marker to "ins" for `ins` tags', () => {
      const { UNSAFE_getByType } = render(
        <RenderHTML
          source={{ html: '<ins>Yuhuuu</ins>' }}
          debug={false}
          contentWidth={100}
        />
      );
      const ttext = UNSAFE_getByType(TTextRenderer);
      expect(ttext.props.tnode.markers.edits).toBe('ins');
    });
    it('should set `edits` marker to "del" for `del` tags', () => {
      const { UNSAFE_getByType } = render(
        <RenderHTML
          source={{ html: '<del>Yuhuuu</del>' }}
          debug={false}
          contentWidth={100}
        />
      );
      const ttext = UNSAFE_getByType(TTextRenderer);
      expect(ttext.props.tnode.markers.edits).toBe('del');
    });
    it('should set `lang` marker for `lang` attributes', () => {
      const { UNSAFE_getByType } = render(
        <RenderHTML
          source={{ html: '<p lang="fr">Voila !</p>' }}
          debug={false}
          contentWidth={100}
        />
      );
      const ttext = UNSAFE_getByType(TTextRenderer);
      expect(ttext.props.tnode.markers.lang).toBe('fr');
    });
    it('should set `dir` marker for `dir` attributes', () => {
      const { UNSAFE_getByType } = render(
        <RenderHTML
          source={{ html: '<p dir="rtl">ٱلسَّلَامُ عَلَيْكُمْ‎</p>' }}
          debug={false}
          contentWidth={100}
        />
      );
      const ttext = UNSAFE_getByType(TTextRenderer);
      expect(ttext.props.tnode.markers.direction).toBe('rtl');
    });
    it('should pass markers deep down in the tree', () => {
      const EmRenderer: CustomTextualRenderer = ({
        TDefaultRenderer,
        ...props
      }) => <TDefaultRenderer {...props} />;
      const { UNSAFE_getByType } = render(
        <RenderHTML
          source={{
            html: '<div lang="test"><span>One<em>Two</em></span></div>'
          }}
          renderers={{ em: EmRenderer }}
          debug={false}
          contentWidth={100}
        />
      );
      const em = UNSAFE_getByType(EmRenderer);
      expect(em.props.tnode.markers.lang).toBe('test');
    });
    it('should handle setMarkersForTNode prop', () => {
      const { UNSAFE_getByType } = render(
        <RenderHTML
          source={{
            html: '<em>Two</em>'
          }}
          debug={false}
          setMarkersForTNode={(targetMarkers, __parent, tnode) => {
            if (tnode.tagName === 'em') {
              //@ts-expect-error undefined marker
              targetMarkers.em = true;
            }
          }}
          contentWidth={100}
        />
      );
      const em = UNSAFE_getByType(TTextRenderer);
      expect(em.props.tnode.markers.em).toBe(true);
    });
  });
  describe('regarding propsFromParent prop in custom renderers', () => {
    it('should pass propsForChildren to children', () => {
      const SpanRenderer: CustomTextualRenderer = ({
        TDefaultRenderer,
        ...props
      }) => (
        <TDefaultRenderer {...props} propsForChildren={{ test: 1 } as any} />
      );
      const EmRenderer: CustomTextualRenderer = ({
        TDefaultRenderer,
        ...props
      }) => <TDefaultRenderer {...props} />;
      const { UNSAFE_getByType } = render(
        <RenderHTML
          source={{
            html: '<span>One<em>Two</em></span>'
          }}
          renderers={{ span: SpanRenderer, em: EmRenderer }}
          debug={false}
          contentWidth={100}
        />
      );
      const em = UNSAFE_getByType(EmRenderer);
      expect(em.props.propsFromParent.test).toBe(1);
    });
    it('should not pass propsForChildren to sub-children', () => {
      const SpanRenderer: CustomTextualRenderer = ({
        TDefaultRenderer,
        ...props
      }) => (
        <TDefaultRenderer {...props} propsForChildren={{ test: 1 } as any} />
      );
      const EmRenderer: CustomTextualRenderer = ({
        TDefaultRenderer,
        ...props
      }) => <TDefaultRenderer {...props} />;
      const { UNSAFE_getByType } = render(
        <RenderHTML
          source={{
            html: '<span>One<b><em>Two</em></b></span>'
          }}
          renderers={{ span: SpanRenderer, em: EmRenderer }}
          debug={false}
          contentWidth={100}
        />
      );
      const em = UNSAFE_getByType(EmRenderer);
      expect(em.props.propsFromParent.test).toBeUndefined();
    });
  });
  describe('regarding TNodeRenderer', () => {
    describe('TBlockRenderer', () => {
      it('should render a GenericPressable when provided onPress', async () => {
        const onPress = jest.fn();
        const DivRenderer: CustomTextualRenderer = ({
          TDefaultRenderer,
          ...props
        }) => <TDefaultRenderer {...props} onPress={onPress} />;
        const { findByTestId } = render(
          <RenderHTML
            source={{
              html: '<div></div>'
            }}
            debug={false}
            contentWidth={0}
            renderers={{ div: DivRenderer }}
          />
        );
        await findByTestId('generic-pressable');
      });
      it('should use viewProps.style', async () => {
        const DivRenderer: CustomTextualRenderer = ({
          TDefaultRenderer,
          ...props
        }) => (
          <TDefaultRenderer
            {...props}
            viewProps={{ style: { marginBottom: 10 } }}
          />
        );
        const { findByTestId } = render(
          <RenderHTML
            source={{
              html: '<div style="paddingBottom: 10px;"></div>'
            }}
            debug={false}
            contentWidth={0}
            renderers={{ div: DivRenderer }}
          />
        );
        const div = await findByTestId('div');
        expect(StyleSheet.flatten(div.props.style)).toEqual({
          marginBottom: 10,
          paddingBottom: 10
        });
      });
      it('should merge viewProps.style with greater specificity than given styles', async () => {
        const DivRenderer: CustomTextualRenderer = ({
          TDefaultRenderer,
          ...props
        }) => (
          <TDefaultRenderer
            {...props}
            viewProps={{ style: { marginBottom: 10 } }}
          />
        );
        const { findByTestId } = render(
          <RenderHTML
            source={{
              html: '<div style="margin-bottom: 5px;"></div>'
            }}
            debug={false}
            contentWidth={0}
            renderers={{ div: DivRenderer }}
          />
        );
        const div = await findByTestId('div');
        expect(StyleSheet.flatten(div.props.style)).toEqual({
          marginBottom: 10
        });
      });
      describe('TDefaultTextualRenderer', () => {
        it('should merge textProps.style with greater specificity than given styles', async () => {
          const SpanRenderer: CustomTextualRenderer = ({
            TDefaultRenderer,
            ...props
          }) => (
            <TDefaultRenderer
              {...props}
              textProps={{ style: { marginBottom: 10 } }}
            />
          );
          const { findByTestId } = render(
            <RenderHTML
              source={{
                html: '<span style="margin-bottom: 5px;"></span>'
              }}
              debug={false}
              contentWidth={0}
              renderers={{ span: SpanRenderer }}
            />
          );
          const div = await findByTestId('span');
          expect(StyleSheet.flatten(div.props.style)).toMatchObject({
            marginBottom: 10
          });
        });
      });
    });
  });
  describe('regarding enableExperimentalMarginCollapsing prop', () => {
    it('should collapse margins of sibling block children when enabled', () => {
      const { getByTestId } = render(
        <RenderHTML
          source={{
            html: '<div style="margin-bottom: 10px;"></div><p style="margin-top: 10px;">text</p>'
          }}
          debug={false}
          contentWidth={100}
          enableExperimentalMarginCollapsing
        />
      );
      const div = getByTestId('div');
      const p = getByTestId('p');
      expect(StyleSheet.flatten(div.props.style).marginBottom).toBe(10);
      expect(StyleSheet.flatten(p.props.style).marginTop).toBe(0);
    });
    it('should not collapse margins of sibling phrasing children when enabled', () => {
      const { getByTestId } = render(
        <RenderHTML
          source={{
            html: '<div style="margin-bottom: 10px;"></div><span style="margin-top: 10px;">text</span>'
          }}
          debug={false}
          contentWidth={100}
          enableExperimentalMarginCollapsing
        />
      );
      const div = getByTestId('div');
      const span = getByTestId('span');
      expect(StyleSheet.flatten(div.props.style).marginBottom).toBe(10);
      expect(StyleSheet.flatten(span.props.style).marginTop).toBe(10);
    });

    it('should not collapse margins of sibling children when disabled', () => {
      const { getByTestId } = render(
        <RenderHTML
          source={{
            html: '<div style="margin-bottom: 10px;"></div><p style="margin-top: 10px;"></p>'
          }}
          debug={false}
          contentWidth={100}
          enableExperimentalMarginCollapsing={false}
        />
      );
      const div = getByTestId('div');
      const p = getByTestId('p');
      expect(StyleSheet.flatten(div.props.style).marginBottom).toBe(10);
      expect(StyleSheet.flatten(p.props.style).marginTop).toBe(10);
    });
  });
  describe('regarding renderersProps prop', () => {
    it('should pass renderersProps to useRendererProps', () => {
      const DivRenderer = jest.fn(function DivRenderer() {
        expect(useRendererProps('div')).toBeDefined();
        return null;
      });
      render(
        <RenderHTML
          source={{
            html: '<div></div>'
          }}
          debug={false}
          renderers={{
            div: DivRenderer
          }}
          renderersProps={{
            div: {}
          }}
          contentWidth={100}
          enableExperimentalMarginCollapsing={false}
        />
      );
      expect(DivRenderer).toHaveBeenCalledTimes(1);
    });
  });
  describe('regarding renderers prop', () => {
    it('should support TNodeChildrenRenderer', () => {
      const renderChild = jest.fn(() => null);
      const DivRenderer: CustomTextualRenderer = jest.fn(function DivRenderer({
        TDefaultRenderer,
        ...props
      }) {
        return (
          <TDefaultRenderer {...props}>
            <TNodeChildrenRenderer
              renderChild={renderChild}
              tnode={props.tnode}
            />
          </TDefaultRenderer>
        );
      });
      render(
        <RenderHTML
          source={{
            html: '<div><span>child</span></div>'
          }}
          debug={false}
          renderers={{
            div: DivRenderer
          }}
          contentWidth={100}
          enableExperimentalMarginCollapsing={false}
        />
      );
      expect(renderChild).toHaveBeenCalled();
    });
    it('should have TNodeChildrenRender support a text child', async () => {
      const SpanRenderer: CustomTextualRenderer = jest.fn(
        function SpanRenderer({ TDefaultRenderer, ...props }) {
          return (
            <TDefaultRenderer {...props}>
              <TNodeChildrenRenderer tnode={props.tnode} />
            </TDefaultRenderer>
          );
        }
      );
      const { UNSAFE_getByType } = render(
        <RenderHTML
          source={{
            html: '<span>hello!</span>'
          }}
          debug={false}
          renderers={{
            span: SpanRenderer
          }}
          contentWidth={100}
          enableExperimentalMarginCollapsing={false}
        />
      );
      await waitFor(() => UNSAFE_getByType(Text));
    });
    it('should warn when using the default WebView component', () => {
      const ImageRenderer: CustomBlockRenderer = jest.fn(function SpanRenderer({
        sharedProps: { WebView }
      }) {
        return <WebView />;
      });
      console.warn = jest.fn();
      render(
        <RenderHTML
          source={{
            html: '<img />'
          }}
          debug={false}
          renderers={{
            img: ImageRenderer
          }}
          contentWidth={100}
          enableExperimentalMarginCollapsing={false}
        />
      );
      expect(console.warn).toHaveBeenCalled();
    });
  });
  describe('regarding TRenderEngineConfig props', () => {
    it('should update props when they change', async () => {
      const initialTagsStyles = {
        img: {
          borderBottomWidth: 2
        }
      };
      const nextTagsStyles = {
        img: {
          borderBottomWidth: 4
        }
      };
      const { update, findByTestId } = render(
        <RenderHTML
          key={0}
          source={{
            html: '<img />'
          }}
          tagsStyles={initialTagsStyles}
          debug={false}
          contentWidth={100}
          enableExperimentalMarginCollapsing={false}
        />
      );
      update(
        <RenderHTML
          key={0}
          source={{
            html: '<img />'
          }}
          tagsStyles={nextTagsStyles}
          debug={false}
          contentWidth={100}
          enableExperimentalMarginCollapsing={false}
        />
      );
      const img = await findByTestId('img');
      expect(StyleSheet.flatten(img.props.style)).toMatchObject({
        borderBottomWidth: 4
      });
    });
  });
});
