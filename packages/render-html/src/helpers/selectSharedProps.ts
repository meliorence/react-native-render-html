import pickBy from 'ramda/src/pickBy';
import pick from 'ramda/src/pick';
import pipe from 'ramda/src/pipe';
import mergeRight from 'ramda/src/mergeRight';
import { RenderHTMLProps, RenderHTMLAmbiantSharedProps } from '../shared-types';
import defaultSharedProps from '../context/defaultSharedProps';

const selectSharedProps: (
  props: Partial<RenderHTMLProps>
) => RenderHTMLAmbiantSharedProps = pipe(
  pick(Object.keys(defaultSharedProps)),
  pickBy((val) => val != null),
  mergeRight(defaultSharedProps) as any
);

export default selectSharedProps;
