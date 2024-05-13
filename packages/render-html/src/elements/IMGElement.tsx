import React, { ReactElement, ReactNode } from 'react';
import useIMGElementState from './useIMGElementState';
import IMGElementContentSuccess from './IMGElementContentSuccess';
import IMGElementContainer from './IMGElementContainer';
import IMGElementContentLoading from './IMGElementContentLoading';
import IMGElementContentError from './IMGElementContentError';
import type { IMGElementProps } from './img-types';

export type { IMGElementProps } from './img-types';

/**
 * A component to render images based on an internal loading state.
 *
 * @remarks This component will attempt to draw a box of paint dimensions
 * before retrieving the physical dimensions of the image to avoid layout
 * shifts. See also {@link useIMGElementState}, {@link IMGElementContainer},
 * {@link IMGElementContentSuccess}, {@link IMGElementContentLoading}
 * and {@link IMGElementContentError} for customization.
 */
function IMGElement(props: IMGElementProps): ReactElement {
  const state = useIMGElementState(props);
  let content: ReactNode;
  if (state.type === 'success') {
    content = React.createElement(IMGElementContentSuccess, state);
  } else if (state.type === 'loading') {
    content = React.createElement(IMGElementContentLoading, state);
  } else {
    content = React.createElement(IMGElementContentError, state);
  }
  return (
    <IMGElementContainer
      testID={props.testID}
      {...props.containerProps}
      onPress={props.onPress}
      style={state.containerStyle}>
      {content}
    </IMGElementContainer>
  );
}

export default IMGElement;
