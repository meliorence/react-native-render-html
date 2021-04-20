import React from 'react';
import FeatureTemplate from '../templates/FeatureTemplate';
import { PageContentImages } from '@doc/pages';

// TODO document attributes
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

export default function ContentImages() {
  return (
    <FeatureTemplate
      imageSource={require('../../../assets/images/soragrit-wongsa-pictures.jpg')}>
      <PageContentImages />
    </FeatureTemplate>
  );
}
