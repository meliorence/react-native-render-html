import React from 'react';
import { IMGElementStateLoading } from './img-types';
import IMGElementContentAlt from './IMGElementContentAlt';

export default function IMGElementContentLoading(
  props: IMGElementStateLoading
) {
  return <IMGElementContentAlt {...props} testID="image-loading" />;
}
