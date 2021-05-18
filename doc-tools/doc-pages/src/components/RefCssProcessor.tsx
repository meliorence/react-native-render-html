import React from 'react';
import useToolkit from '../toolkit/useToolkit';

const RefCssProcessor = ({}) => {
  const { RefLibrary } = useToolkit();
  return (
    <RefLibrary
      name="@native-html/css-processor"
      url="https://github.com/native-html/core/tree/master/packages/css-processor#readme"
    />
  );
};

export default RefCssProcessor;
