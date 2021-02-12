import pickBy from 'ramda/src/pickBy';
import pick from 'ramda/src/pick';
import pipe from 'ramda/src/pipe';
import mergeRight from 'ramda/src/mergeRight';
import { RenderHTMLSharedProps, RenderHTMLProps } from '../shared-types';
import { defaultSharedPropsContext } from '../context/SharedPropsContext';

const selectSharedProps: (
  props: Partial<RenderHTMLProps>
) => Required<RenderHTMLSharedProps> = pipe(
  pick(Object.keys(defaultSharedPropsContext)),
  pickBy((val) => val != null),
  mergeRight(defaultSharedPropsContext) as any
);

export default selectSharedProps;
