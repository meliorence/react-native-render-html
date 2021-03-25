import { useMemo } from 'react';

export type SelectorItem<V extends string | number> = {
  value: V;
  label?: string;
};

export interface SelectorProps<V extends string | number> {
  items: ReadonlyArray<SelectorItem<V>> | ReadonlyArray<V>;
  selectedValue: V;
  onSelectedValueChange: (v: V) => void;
}

export default function useSelectorItemsNucleon<V extends string | number>(
  items: SelectorProps<V>['items']
) {
  return useMemo<Array<Required<SelectorItem<V>>>>(
    () =>
      (items || []).map((item: SelectorItem<V> | V) =>
        typeof item !== 'string' && typeof item !== 'number'
          ? //@ts-ignore
            { value: item.value, label: item.label || item.value }
          : { value: item as V, label: String(item) }
      ),
    [items]
  );
}
