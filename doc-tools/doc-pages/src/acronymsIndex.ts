import { Acronym, AcronymDefinition } from './pages-types';

const acronymsIndex: Record<Acronym, AcronymDefinition> = {
  TRE: {
    definition:
      'A module capable of transforming a DOM tree into a Transient Render Tree',
    fullName: 'Transient Render Engine',
    name: 'TRE'
  },
  TRT: {
    definition: 'Structured data matching closely the React tree to render.',
    fullName: 'Transient Render Tree',
    name: 'TRT'
  },
  TNode: {
    definition: 'A node of the Transient Render Tree.',
    fullName: 'Transient Node',
    name: 'TNode'
  }
};

export default acronymsIndex;
