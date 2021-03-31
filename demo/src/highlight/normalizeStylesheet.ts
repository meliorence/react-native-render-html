import { CSSProperties } from 'react';

type HljsStylsheet = Record<string, CSSProperties>;

export default function normalizeStylesheet(hljsStylesheet: HljsStylsheet) {
  return Object.fromEntries(
    Object.entries(hljsStylesheet).map(
      ([
        className,
        { color, background, backgroundColor, fontWeight, fontStyle }
      ]) => [
        className,
        {
          color,
          backgroundColor: background ?? backgroundColor,
          fontWeight,
          fontStyle
        }
      ]
    )
  );
}
