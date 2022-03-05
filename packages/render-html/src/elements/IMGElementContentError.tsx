import React, { ReactElement } from 'react';
import { IMGElementStateError } from './img-types';
import IMGElementContentAlt from './IMGElementContentAlt';

/**
 * Default error view for the {@link IMGElement} component.
 *
 * @public
 */
export default function IMGElementContentError(
  props: IMGElementStateError
): ReactElement {
  return <IMGElementContentAlt {...props} testID="image-error" />;
}
