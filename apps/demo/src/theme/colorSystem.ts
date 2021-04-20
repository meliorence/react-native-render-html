import createColorSystem, { ColorPrimitive } from '../substratum';
import type { AdmonitionType } from '@doc/pages';

export interface ColorPrimitivesDeclaration {
  primary: ColorPrimitive;
  primaryVariant: ColorPrimitive;
  accent: ColorPrimitive;
  accentVariant: ColorPrimitive;
  /**
   * The background (and foreground) for any content.
   */
  surface: ColorPrimitive;
  card: ColorPrimitive;
  placeholder: string;
  scrim: string;
}

export interface ColorRoles {
  /**
   * Used for debug.
   */
  name: string;
  /**
   * The color of the status bar.
   */
  statusBarBackground: string;
  /**
   * Semantic colors for admonitions.
   */
  admonition: Record<AdmonitionType, string>;
  /**
   * The underlying container styling for all other things.
   */
  surface: {
    background: string;
    content: string;
    secondaryContent: string;
    scrim: string;
  };
  hyperlinkColor: string;
  /**
   * Used for horizontal lines, list separators, dividers...
   */
  softDivider: string;
  /**
   * Icons with lesser contrast.
   */
  softIconColor: string;
  spinnerColor: string;
  sheetHandle: {
    background: string;
    slot: string;
  };
  /**
   * Used for interactive tides, list items, icon buttons...
   */
  pressable: {
    tint: string;
    background: string;
    ripple: string;
  };
  /**
   * Similar than pressable, but with a "selected" state
   */
  selectable: {
    activeTint: string;
    activeBackground: string;
    inactiveTint: string;
    inactiveBackground: string;
    ripple: string;
  };
  /**
   * For actionable things that can be handled, typically a switch round
   */
  switchColor: {
    on: string;
    off: string;
  };
  /**
   * Used for sliders, switches...etc.
   */
  trackColor: {
    on: string;
    off: string;
  };
}

const {
  ColorPrimitivesProvider,
  createColorRoles,
  useColorPrimitives
} = createColorSystem<ColorPrimitivesDeclaration>();

const { ColorRolesProvider, useColorRoles } = createColorRoles<ColorRoles>();

export {
  ColorPrimitivesProvider,
  ColorRolesProvider,
  useColorRoles,
  useColorPrimitives
};

const colorSystem = {
  ColorPrimitivesProvider,
  useColorRoles,
  ColorRolesProvider,
  useColorPrimitives
};

export default colorSystem;
