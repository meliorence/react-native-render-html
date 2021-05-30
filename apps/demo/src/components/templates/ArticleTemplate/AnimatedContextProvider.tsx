import React, { PropsWithChildren, useContext } from 'react';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue
} from 'react-native-reanimated';

const animatedContext = React.createContext<{
  scrollAnim: Animated.SharedValue<number>;
  onScroll: (...args: any[]) => void;
}>(null as any);

export function useAnimatedContext() {
  return useContext(animatedContext);
}

export default function AnimatedContextProvider({
  children
}: PropsWithChildren<{}>) {
  const scrollAnim = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler((event) => {
    scrollAnim.value = event.contentOffset.y;
  });
  return (
    <animatedContext.Provider value={{ scrollAnim, onScroll }}>
      {children}
    </animatedContext.Provider>
  );
}
