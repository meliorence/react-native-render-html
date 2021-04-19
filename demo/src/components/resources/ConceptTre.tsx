import React from 'react';
import { useNuclearContentWidth } from '../nucleons/useContentWidthContext';
import RenderHtmlCardOrganism from '../RenderHtmlCardOrganism';
import BodyParagraphAtom from '../BodyParagraphAtom';
import BodyTipBoxAtom from '../BodyTipBoxAtom';
import BodyChapterMolecule from '../BodyChapterMolecule';
import ArticleHeaderAtom from '../ArticleHeader';
import BodyRefHtmlAttrMolecule from '../BodyRefHtmlAttrMolecule';
import BodyRefHtmlElementMolecule from '../BodyRefHtmlElementMolecule';
import BodyRefJSSymbolMolecule from '../BodyRefJSSymbolMolecule';
import BodyRefReactNativeSymbolMolecule from '../BodyRefReactNativeSymbolMolecule';
import BodyRefRenderHtmlPropMolecule from '../BodyRefRenderHtmlPropMolecule';
import FeatureTemplate from '../templates/FeatureTemplate';

export default function ConceptTre() {
  const contentWidth = useNuclearContentWidth();
  return (
    <FeatureTemplate>
      <ArticleHeaderAtom
        imageSource={require('../../../assets/images/soragrit-wongsa-pictures.jpg')}>
        <BodyParagraphAtom>
          This article is an introduction to the react-native-render-html
          Transient Render Engine.
        </BodyParagraphAtom>
      </ArticleHeaderAtom>
    </FeatureTemplate>
  );
}
