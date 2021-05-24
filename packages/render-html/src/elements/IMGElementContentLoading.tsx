import React, { ReactElement } from 'react';
import { IMGElementStateLoading } from './img-types';
import IMGElementContentAlt from './IMGElementContentAlt';

/**
 * Default loading view for the {@link IMGElement} component.
 */
export default function IMGElementContentLoading(
  props: IMGElementStateLoading
): ReactElement {
  return <IMGElementContentAlt {...props} testID="image-loading" />;
}
