import * as React from 'react';

const LegacyContext = React.createContext(false);
export const useLegacyMode = () => React.useContext(LegacyContext);

export default LegacyContext;
