import ProfileSimple from './profiles/ProfileSimple';
import ProfileV5 from './profiles/ProfileV5';
import ProfileV6Source from './profiles/ProfileV6Source';

const profiles = [
  {
    name: 'Simple implementation',
    component: ProfileSimple
  },
  {
    name: 'V5',
    component: ProfileV5
  },
  {
    name: 'V6',
    component: ProfileV6Source
  }
];

export default profiles;
