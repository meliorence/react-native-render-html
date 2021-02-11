import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import useIMGElementState from './useIMGElementState';
import IMGElementContentSuccess from './IMGElementContentSuccess';
import IMGElementContainer from './IMGElementContainer';
import IMGElementContentLoading from './IMGElementContentLoading';
import IMGElementContentError from './IMGElementContentError';
import type { IMGElementProps } from './img-types';
import defaultImageInitialDimensions from './defaultInitialImageDimensions';

export type { IMGElementProps } from './img-types';

function identity(arg: any) {
  return arg;
}

const IMGElement = ({ onPress, testID, ...props }: IMGElementProps) => {
  const state = useIMGElementState(props);
  let content: ReactNode = false;
  if (state.type === 'success') {
    content = React.createElement(IMGElementContentSuccess, state);
  } else if (state.type === 'loading') {
    content = React.createElement(IMGElementContentLoading, state);
  } else {
    content = React.createElement(IMGElementContentError, state);
  }
  return (
    <IMGElementContainer
      testID={testID}
      onPress={onPress}
      style={state.containerStyle}>
      {content}
    </IMGElementContainer>
  );
};

const imgDimensionsType = PropTypes.shape({
  width: PropTypes.number,
  height: PropTypes.number
});

const propTypes: Record<keyof IMGElementProps, any> = {
  source: PropTypes.object.isRequired,
  alt: PropTypes.string,
  altColor: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  computeMaxWidth: PropTypes.func.isRequired,
  contentWidth: PropTypes.number,
  enableExperimentalPercentWidth: PropTypes.bool,
  initialDimensions: imgDimensionsType,
  onPress: PropTypes.func,
  testID: PropTypes.string,
  cachedNaturalDimensions: imgDimensionsType
};

IMGElement.propTypes = propTypes;

IMGElement.defaultProps = {
  enableExperimentalPercentWidth: false,
  computeMaxWidth: identity,
  imagesInitialDimensions: defaultImageInitialDimensions,
  style: {}
};

export default IMGElement;
