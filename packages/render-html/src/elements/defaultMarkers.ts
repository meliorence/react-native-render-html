import CounterStyle, { CounterStyleRenderer } from '@jsamr/counter-style';
import { ComponentType } from 'react';
import decimal from '@jsamr/counter-style/presets/decimal';
import decimalLeadingZero from '@jsamr/counter-style/presets/decimalLeadingZero';
import lowerAlpha from '@jsamr/counter-style/presets/lowerAlpha';
import lowerGreek from '@jsamr/counter-style/presets/lowerGreek';
import upperAlpha from '@jsamr/counter-style/presets/upperAlpha';
import DisclosureClosedSymbolRenderer from './symbolic/DisclosureClosedSymbolRenderer';
import DisclosureOpenSymbolRenderer from './symbolic/DisclosureOpenSymbolRenderer';
import CircleSymbolRenderer from './symbolic/CircleSymbolRenderer';
import DiscSymbolRenderer from './symbolic/DiscSymbolRenderer';
import SquareSymbolRenderer from './symbolic/SquareSymbolRenderer';
import { ListPrefixRendererProps, SupportedListStyleType } from './list-types';

const symbolicRenderer = CounterStyle.cyclic('*').withSuffix('  ');

/**
 * Specs for a list item marker renderer backed by a `CounterStyleRenderer`
 * from `@jsamr/counter-style`.
 */
export interface TextualListStyleSpec {
  type: 'textual';
  counterStyleRenderer: CounterStyleRenderer;
}

/**
 * Specs for a list item marker renderer with only one representation. The
 * "Component" should render this representation, minus prefix and suffix. The
 * rendered component should have a maximum width of `0.6 * fontSize`, and a height of
 * `lineHeight`.
 */
export interface UnitaryListStyleSpec {
  counterStyleRenderer: CounterStyleRenderer;
  type: 'cyclic';
  Component: ComponentType<ListPrefixRendererProps>;
}

export type ListStyleSpec = TextualListStyleSpec | UnitaryListStyleSpec;

const lowerAlphaSpec = {
  type: 'textual',
  counterStyleRenderer: lowerAlpha
} as const;

const upperAlphaSpec = {
  type: 'textual',
  counterStyleRenderer: upperAlpha
} as const;

const defaultMarkers: Record<SupportedListStyleType, ListStyleSpec> = {
  'decimal-leading-zero': {
    type: 'textual',
    counterStyleRenderer: decimalLeadingZero
  },
  'disclosure-closed': {
    counterStyleRenderer: symbolicRenderer,
    type: 'cyclic',
    Component: DisclosureClosedSymbolRenderer
  },
  'disclosure-open': {
    counterStyleRenderer: symbolicRenderer,
    type: 'cyclic',
    Component: DisclosureOpenSymbolRenderer
  },
  'lower-alpha': lowerAlphaSpec,
  'lower-greek': {
    type: 'textual',
    counterStyleRenderer: lowerGreek
  },
  'lower-latin': lowerAlphaSpec,
  'upper-alpha': upperAlphaSpec,
  'upper-latin': upperAlphaSpec,
  circle: {
    counterStyleRenderer: symbolicRenderer,
    type: 'cyclic',
    Component: CircleSymbolRenderer
  },
  decimal: {
    type: 'textual',
    counterStyleRenderer: decimal
  },
  disc: {
    counterStyleRenderer: symbolicRenderer,
    type: 'cyclic',
    Component: DiscSymbolRenderer
  },
  none: {
    counterStyleRenderer: CounterStyle.symbolic('').withSuffix(null),
    type: 'cyclic',
    Component: () => null
  },
  square: {
    counterStyleRenderer: symbolicRenderer,
    type: 'cyclic',
    Component: SquareSymbolRenderer
  }
};

export default defaultMarkers;
