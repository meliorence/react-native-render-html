import React from 'react';
import { render } from 'react-native-testing-library';
import RenderHTML from '../RenderHTML';
import ImgTag from '../elements/IMGElement';
import TTextRenderer from '../TTextRenderer';
import { CustomTextualRenderer } from '../render/render-types';
import {
  defaultHTMLElementModels,
  HTMLContentModel
} from '@native-html/transient-render-engine';
import { StyleSheet } from 'react-native';

describe('RenderHTML', () => {
  it('should render without error when providing a source', () => {
    expect(() =>
      render(
        <RenderHTML source={{ html: '<p>Hello world</p>' }} debug={false} />
      )
    ).not.toThrow();
  });
  it('should render without error when missing a source', () => {
    //@ts-expect-error
    expect(() => render(<RenderHTML debug={false} />)).not.toThrow();
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
    expect(UNSAFE_getByType(ImgTag).props.contentWidth).toBe(nextContentWidth);
  });
  describe('regarding customHTMLElementsModels prop', () => {
    it('should support changing block content model to mixed', () => {
      const contentWidth = 300;
      const onTTreeChange = jest.fn((ttree) =>
        expect(ttree.snapshot()).toMatchSnapshot()
      );
      render(
        <RenderHTML
          source={{ html: '<span><img src="https://img.com/1" /> Text</span>' }}
          debug={false}
          customHTMLElementModels={{
            img: defaultHTMLElementModels.img.extend({
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
              //@ts-expect-error
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
      }) => <TDefaultRenderer {...props} propsForChildren={{ test: 1 }} />;
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
      }) => <TDefaultRenderer {...props} propsForChildren={{ test: 1 }} />;
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
  describe('regarding enableExperimentalMarginCollapsing prop', () => {
    it('should collapse margins of sibling children when enabled', () => {
      const { getByTestId } = render(
        <RenderHTML
          source={{
            html:
              '<div style="margin-bottom: 10px;"></div><p style="margin-top: 10px;"></p>'
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

    it('should not collapse margins of sibling children when disabled', () => {
      const { getByTestId } = render(
        <RenderHTML
          source={{
            html:
              '<div style="margin-bottom: 10px;"></div><p style="margin-top: 10px;"></p>'
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
});
