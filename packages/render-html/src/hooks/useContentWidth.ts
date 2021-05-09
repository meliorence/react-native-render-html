import { useContext } from 'react';
import contentWidthContext from '../context/contentWidthContext';

/**
 * A hook to get access to the ambient `contentWidth`.
 *
 * @returns The contentWidth available in context.
 *
 * @public
 */
export default function useContentWidth() {
  return useContext(contentWidthContext);
}
