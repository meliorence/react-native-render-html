/* eslint-disable @typescript-eslint/no-unused-vars */
import { AdmonitionProps } from './components/AdmonitionElement';
import { CodeBlockElementProps } from './components/CodeBlockElement';
import { ReferenceElementProps } from './components/ReferenceElement';
import { RenderHTMLCardElementProps } from './components/RenderHTMLCardElement';
import { SvgFigureElementProps } from './components/SvgFigureElement';
import { TNodeTransformDisplayElementProps } from './components/TNodeTransformDisplayElement';
export { default as renderMdx } from './renderMdx';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      admonition: AdmonitionProps;
      codeblockds: CodeBlockElementProps;
      renderhtmlcard: RenderHTMLCardElementProps;
      svgfigure: SvgFigureElementProps;
      tnodetransformdisplay: TNodeTransformDisplayElementProps;
      reference: ReferenceElementProps;
    }
  }
}
