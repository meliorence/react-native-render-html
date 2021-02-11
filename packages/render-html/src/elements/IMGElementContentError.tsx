import React from 'react';
import { IMGElementStateError } from './img-types';
import IMGElementContentAlt from './IMGElementContentAlt';

export default function IMGElementContentError(props: IMGElementStateError) {
  return <IMGElementContentAlt {...props} testID="image-error" />;
}
