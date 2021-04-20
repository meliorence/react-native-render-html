import React from 'react';
import FeatureTemplate from '../templates/FeatureTemplate';
import { usePageUIToolkit } from '@doc/pages';

export default function ConceptCss() {
  const { Header, Paragraph } = usePageUIToolkit();
  return (
    <FeatureTemplate
      imageSource={require('../../../assets/images/soragrit-wongsa-pictures.jpg')}>
      <Header>
        <Paragraph>
          This article is an introduction to CSS parsing in
          react-native-render-html.
        </Paragraph>
      </Header>
    </FeatureTemplate>
  );
}
