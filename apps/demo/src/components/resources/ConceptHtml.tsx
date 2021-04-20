import React from 'react';
import FeatureTemplate from '../templates/FeatureTemplate';
import { usePageUIToolkit } from '@doc/pages';

export default function ConceptHtml() {
  const { Header, Paragraph } = usePageUIToolkit();

  return (
    <FeatureTemplate
      imageSource={require('../../../assets/images/soragrit-wongsa-pictures.jpg')}>
      <Header>
        <Paragraph>
          This article is an introduction to HTML parsing in
          react-native-render-html.
        </Paragraph>
      </Header>
    </FeatureTemplate>
  );
}
