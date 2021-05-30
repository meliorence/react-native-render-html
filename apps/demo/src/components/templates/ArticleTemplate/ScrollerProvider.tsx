import React, {
  PropsWithChildren,
  RefObject,
  useContext,
  useMemo
} from 'react';
import Animated from 'react-native-reanimated';
import Scroller from './Scroller';

const scrollerContext = React.createContext<Scroller>(null as any);

export function useScroller() {
  return useContext(scrollerContext);
}

export default function ScrollerProvider({
  children,
  scrollRef
}: PropsWithChildren<{
  scrollRef: RefObject<Animated.ScrollView>;
}>) {
  const index = useMemo(() => new Scroller(scrollRef), [scrollRef]);
  return (
    <scrollerContext.Provider value={index}>
      {children}
    </scrollerContext.Provider>
  );
}
