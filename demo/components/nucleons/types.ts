export interface SelectorProps<V extends string | number> {
  items: Array<{ value: V; label?: string }> | Array<V>;
  selectedValue: V;
  onSelectedValueChange: (v: V) => void;
}
