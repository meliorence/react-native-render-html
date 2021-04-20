import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo
} from 'react';

/**
 *
 */
export interface ColorPrimitive {
  /**
   * The color
   */
  color: string;
  /**
   * Color for content such as icons, text displayed above this color.
   */
  content: string;
}

/**
 *
 */
type ColorPrimitivesDefinitionValidator<Candidate> = Candidate extends Record<
  infer U,
  ColorPrimitive | string
>
  ? Candidate
  : never;

/**
 *
 */
type ColorRolesDefinitionValidator<Candidate> = Candidate extends Record<
  infer U,
  any
>
  ? Candidate
  : never;

/**
 *
 */
export default function createColorSystem<CPD>() {
  const colorPrimitivesContext = createContext<
    ColorPrimitivesDefinitionValidator<CPD>
  >({} as any);
  function useColorPrimitives() {
    return useContext(colorPrimitivesContext);
  }
  const ColorPrimitivesProvider = colorPrimitivesContext.Provider;
  //@ts-ignore
  ColorPrimitivesProvider.displayName = ColorPrimitivesProvider;
  function createColorRoles<CR>() {
    const colorRolesContext = createContext<ColorRolesDefinitionValidator<CR>>(
      {} as any
    );
    function useColorRoles() {
      return useContext(colorRolesContext);
    }
    function ColorRolesProvider({
      children,
      mapPrimitivesToColorRoles
    }: PropsWithChildren<{
      mapPrimitivesToColorRoles: (
        primitives: ColorPrimitivesDefinitionValidator<CPD>,
        parentColorRoles: ColorRolesDefinitionValidator<CR>
      ) => ColorRolesDefinitionValidator<CR>;
    }>) {
      const colorPrimitives = useContext(colorPrimitivesContext);
      const parentColorRoles = useColorRoles();
      const value = useMemo(
        () => mapPrimitivesToColorRoles(colorPrimitives, parentColorRoles),
        [colorPrimitives, mapPrimitivesToColorRoles, parentColorRoles]
      );
      return (
        <colorRolesContext.Provider value={value}>
          {children}
        </colorRolesContext.Provider>
      );
    }
    return {
      useColorRoles,
      ColorRolesProvider
    };
  }
  return {
    createColorRoles,
    useColorPrimitives,
    ColorPrimitivesProvider
  };
}
