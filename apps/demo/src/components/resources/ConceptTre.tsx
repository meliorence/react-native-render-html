import { usePageUIToolkit } from '@doc/pages';
import React from 'react';
import FeatureTemplate from '../templates/FeatureTemplate';

export default function ConceptTre() {
  const { Header, Paragraph } = usePageUIToolkit();
  return (
    <FeatureTemplate
      imageSource={require('../../../assets/images/soragrit-wongsa-pictures.jpg')}>
      <Header>
        <Paragraph>
          This article is an introduction to the react-native-render-html
          Transient Render Engine.
        </Paragraph>
      </Header>
    </FeatureTemplate>
  );
}
