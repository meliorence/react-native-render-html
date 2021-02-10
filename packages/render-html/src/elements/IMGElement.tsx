import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import useIMGElementLoader from './useIMGElementLoader';
import IMGElementContentSuccess from './IMGElementContentSuccess';
import IMGElementContainer from './IMGElementContainer';
import IMGElementContentLoading from './IMGElementContentLoading';
import IMGElementContentError from './IMGElementContentError';
import { IMGElementProps } from './img-types';

export type { IMGElementProps } from './img-types';

function identity(arg: any) {
  return arg;
}

const IMGElement = ({ onPress, testID, ...props }: IMGElementProps) => {
  const state = useIMGElementLoader(props);
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

IMGElement.propTypes = {
  source: PropTypes.object.isRequired,
  alt: PropTypes.string,
  altColor: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  computeImagesMaxWidth: PropTypes.func.isRequired,
  contentWidth: PropTypes.number,
  enableExperimentalPercentWidth: PropTypes.bool,
  imagesInitialDimensions: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number
  }) as any,
  onPress: PropTypes.func,
  testID: PropTypes.string
};

IMGElement.defaultProps = {
  enableExperimentalPercentWidth: false,
  computeImagesMaxWidth: identity,
  imagesInitialDimensions: {
    width: 100,
    height: 100
  },
  style: {}
};

export default IMGElement;
