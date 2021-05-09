import React from 'react';
import { Dimensions } from 'react-native';

const contentWidthContext = React.createContext(Dimensions.get('window').width);

export default contentWidthContext;
