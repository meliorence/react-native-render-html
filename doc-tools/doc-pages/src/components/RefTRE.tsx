import React from 'react';
import useToolkit from '../toolkit/useToolkit';

const RefTRE = ({}) => {
  const { RefLibrary } = useToolkit();
  return (
    <RefLibrary
      name="@native-html/transient-render-engine"
      url="https://github.com/native-html/core/tree/master/packages/transient-render-engine#readme"
    />
  );
};

export default RefTRE;
