import CounterStyle, { CounterStyleRenderer } from '@jsamr/counter-style';
import { ComponentType } from 'react';
import decimal from '@jsamr/counter-style/presets/decimal';
import decimalLeadingZero from '@jsamr/counter-style/presets/decimalLeadingZero';
import lowerRoman from '@jsamr/counter-style/presets/lowerRoman';
import lowerAlpha from '@jsamr/counter-style/presets/lowerAlpha';
import lowerGreek from '@jsamr/counter-style/presets/lowerGreek';
import upperAlpha from '@jsamr/counter-style/presets/upperAlpha';
import upperRoman from '@jsamr/counter-style/presets/upperRoman';
import DisclosureClosedSymbolRenderer from './symbolic/DisclosureClosedSymbolRenderer';
import DisclosureOpenSymbolRenderer from './symbolic/DisclosureOpenSymbolRenderer';
import CircleSymbolRenderer from './symbolic/CircleSymbolRenderer';
import DiscSymbolRenderer from './symbolic/DiscSymbolRenderer';
import SquareSymbolRenderer from './symbolic/SquareSymbolRenderer';
import {
  ListCounterRendererProps,
  DefaultSupportedListStyleType
} from './list-types';

const unitaryRenderer = CounterStyle.cyclic('*').withSuffix(' ');

/**
 * Specs for a list item marker renderer backed by a `CounterStyleRenderer`
 * from `@jsamr/counter-style`.
 *
 * @public
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
 *
 * @public
 */
export interface UnitaryListStyleSpec {
  counterStyleRenderer: CounterStyleRenderer;
  type: 'unitary';
  Component: ComponentType<ListCounterRendererProps>;
}

/**
 * An object to specify how to render list markers.
 *
 * @public
 */
export type ListStyleSpec = TextualListStyleSpec | UnitaryListStyleSpec;

const lowerAlphaSpec = {
  type: 'textual',
  counterStyleRenderer: lowerAlpha
} as const;

const upperAlphaSpec = {
  type: 'textual',
  counterStyleRenderer: upperAlpha
} as const;

const defaultListStyleSpecs: Record<
  DefaultSupportedListStyleType,
  ListStyleSpec
> = {
  'decimal-leading-zero': {
    type: 'textual',
    counterStyleRenderer: decimalLeadingZero
  },
  'disclosure-closed': {
    counterStyleRenderer: unitaryRenderer,
    type: 'unitary',
    Component: DisclosureClosedSymbolRenderer
  },
  'disclosure-open': {
    counterStyleRenderer: unitaryRenderer,
    type: 'unitary',
    Component: DisclosureOpenSymbolRenderer
  },
  'lower-alpha': lowerAlphaSpec,
  'lower-greek': {
    type: 'textual',
    counterStyleRenderer: lowerGreek
  },
  'lower-latin': lowerAlphaSpec,
  'lower-roman': {
    type: 'textual',
    counterStyleRenderer: lowerRoman
  },
  'upper-alpha': upperAlphaSpec,
  'upper-latin': upperAlphaSpec,
  'upper-roman': {
    type: 'textual',
    counterStyleRenderer: upperRoman
  },
  circle: {
    counterStyleRenderer: unitaryRenderer,
    type: 'unitary',
    Component: CircleSymbolRenderer
  },
  decimal: {
    type: 'textual',
    counterStyleRenderer: decimal
  },
  disc: {
    counterStyleRenderer: unitaryRenderer,
    type: 'unitary',
    Component: DiscSymbolRenderer
  },
  none: {
    counterStyleRenderer: CounterStyle.symbolic('').withSuffix(null),
    type: 'unitary',
    Component: () => null
  },
  square: {
    counterStyleRenderer: unitaryRenderer,
    type: 'unitary',
    Component: SquareSymbolRenderer
  }
};

export default defaultListStyleSpecs;
