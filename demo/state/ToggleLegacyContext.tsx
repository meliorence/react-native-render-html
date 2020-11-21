import * as React from 'react';

const ToggleLegacyContext = React.createContext(() => {});
export const useToggleLegacyMode = () => React.useContext(ToggleLegacyContext);
export default ToggleLegacyContext;
