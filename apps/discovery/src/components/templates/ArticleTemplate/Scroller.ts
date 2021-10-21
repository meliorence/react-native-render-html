import { LayoutChangeEvent, ScrollView } from 'react-native';
import { paramCase } from 'param-case';
import { RefObject } from 'react';
import Animated from 'react-native-reanimated';
import { HEADER_COLL_HEIGHT } from '../../../constants';

export default class Scroller {
  private layoutRegistry: Record<string, number> = {};
  public isLoaded = false;
  private scrollRef: RefObject<ScrollView>;
  private offset: number;

  constructor(scrollRef: RefObject<Animated.ScrollView>) {
    this.scrollRef = scrollRef as any;
    this.offset = 0;
  }

  setIsLoaded() {
    this.isLoaded = true;
  }

  registerLayout(e: LayoutChangeEvent, title: string) {
    const offsetY = e.nativeEvent.layout.y - HEADER_COLL_HEIGHT;
    this.layoutRegistry[paramCase(title)] = offsetY;
  }

  setOffset(offset: number) {
    this.offset = offset;
  }

  scrollTo(fragment: string) {
    const offsetY = this.layoutRegistry[fragment];
    if (typeof offsetY === 'number') {
      this.scrollRef.current?.scrollTo({
        y: offsetY + this.offset,
        animated: true
      });
    } else {
      console.warn(
        `There is no reference registered for fragment "${fragment}" to scroll to.`
      );
    }
  }

  scrollToTop() {
    this.scrollRef.current?.scrollTo({ y: 0, animated: true });
  }
}
