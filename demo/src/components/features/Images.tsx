import { Stack } from '@mobily/stacks';
import React from 'react';
import BoxNucleon from '../nucleons/BoxNucleon';
import { useNuclearContentWidth } from '../nucleons/useContentWidthContext';
import RenderHtmlCardOrganism from '../RenderHtmlCardOrganism';
import { ScrollView } from 'react-native-gesture-handler';
import useSurfaceBackgroundStyleNucleon from '../nucleons/useSurfaceBackgroundStyleNucleon';
import BodyParagraphAtom from '../BodyParagraphAtom';
import BodyTipBoxAtom from '../BodyTipBoxAtom';
import BodyChapterMolecule from '../BodyChapterMolecule';
import ArticleHeaderAtom from '../ArticleHeader';
import BodyRefHtmlAttrMolecule from '../BodyRefHtmlAttrMolecule';
import BodyRefHtmlElementMolecule from '../BodyRefHtmlElementMolecule';
import BodyRefJSSymbolMolecule from '../BodyRefJSSymbolMolecule';
import BodyRefReactNativeSymbolMolecule from '../BodyRefReactNativeSymbolMolecule';
import BodyRefRenderHtmlPropMolecule from '../BodyRefRenderHtmlPropMolecule';
import AttributesSupportTableOrganism from '../AttributesSupportTableOrganism';

const inlineExample = `<img
  width="1200" height="800"
  style="width: 50%; height: 100px; align-self: center"
  src="https://i.imgur.com/gSmWCJF.jpg"
/>`;

const autoSizeExample = `<img
  width="1200" height="800"
  src="https://i.imgur.com/XP2BE7q.jpg"
/>`;

const unreachableExample = `<img
  width="200" height="100"
  alt="The Void"
  src="http://example.tld/image.jpg"
/>`;

const imgAttributes = {
  alt: true,
  src: true,
  width: true,
  height: true,
  crossorigin: false,
  anonymous: false,
  'use-credentials': false,
  decoding: false,
  ismap: false,
  loading: false,
  referrerpolicy: false,
  sizes: false,
  srcset: false,
  usemap: false
};

export default function Images() {
  const contentWidth = useNuclearContentWidth();
  return (
    <ScrollView
      style={{ flexGrow: 1 }}
      contentContainerStyle={useSurfaceBackgroundStyleNucleon()}>
      <BoxNucleon paddingBottom={2}>
        <Stack space={10}>
          <ArticleHeaderAtom
            imageSource={require('../../../assets/images/soragrit-wongsa-pictures.jpg')}>
            <BodyParagraphAtom>
              This article covers the <BodyRefHtmlElementMolecule name="img" />{' '}
              element renderer. <BodyRefHtmlElementMolecule name="picture" /> is
              not yet supported.
            </BodyParagraphAtom>
            <AttributesSupportTableOrganism attributes={imgAttributes} />
          </ArticleHeaderAtom>
          <BodyChapterMolecule title={'Sizing'}>
            <BodyParagraphAtom>
              To determine the display size of an image, the renderer will go
              through the following steps:{'\n'}
              1. 2. 3.
            </BodyParagraphAtom>
          </BodyChapterMolecule>
          <BodyChapterMolecule title={'Scaling'}>
            <BodyParagraphAtom>
              The renderer will automatically scale images down to the available
              width, even when the provided inline style width is greater than
              the container width.
            </BodyParagraphAtom>
            <BodyTipBoxAtom>
              You are strongly advised to provide a{' '}
              <BodyRefRenderHtmlPropMolecule name="contentWidth" /> property
              from{' '}
              <BodyRefReactNativeSymbolMolecule name="useWindowDimensions" />{' '}
              official hook to help this component handle the scaling.
            </BodyTipBoxAtom>
            <RenderHtmlCardOrganism
              caption={
                'This image dimensions are set with inline styles. Note that both the width/height couple and the style attributes are evaluated, but the style attribute takes precedence. The relative width (50%) is computed against contentWidth.'
              }
              html={inlineExample}
              contentWidth={contentWidth}
            />
            <BodyParagraphAtom>
              The next image will be sized automatically thanks to the{' '}
              <BodyRefRenderHtmlPropMolecule name="contentWidth" /> and{' '}
              <BodyRefRenderHtmlPropMolecule name="computeEmbeddedMaxWidth" />{' '}
              props. The latter allows you to set the maximum width from{' '}
              <BodyRefRenderHtmlPropMolecule name="contentWidth" />, or
              disabling scaling by returning{' '}
              <BodyRefJSSymbolMolecule name="Infinity" />.
            </BodyParagraphAtom>
            <RenderHtmlCardOrganism
              caption={
                "This image has no inline style. Its width and height are determined by the width and height attributes, scaled down to fit the result of computeEmbeddedMaxWidth('img')."
              }
              html={autoSizeExample}
              contentWidth={contentWidth}
            />
          </BodyChapterMolecule>
          <BodyChapterMolecule title="Preloading">
            <BodyParagraphAtom>
              Similarly to browsers, this library will place a print box before
              fetching image dimensions when both{' '}
              <BodyRefHtmlAttrMolecule name="width" /> and{' '}
              <BodyRefHtmlAttrMolecule name="height" /> attributes are provided,
              or the two dimensions are set in the{' '}
              <BodyRefHtmlAttrMolecule name="style" /> attribute. This is great
              to avoid images "jumping" from zero height to their computed
              height, and is a hint to good web design.
            </BodyParagraphAtom>
          </BodyChapterMolecule>
          <BodyChapterMolecule title="Error Handling">
            <RenderHtmlCardOrganism
              caption={
                'When an image is unreachable, the image renderer will print a box while preserving its requested dimensions. It will also display at the center of the box the content of alt attribute.'
              }
              html={unreachableExample}
              contentWidth={contentWidth}
            />
          </BodyChapterMolecule>
        </Stack>
      </BoxNucleon>
    </ScrollView>
  );
}
