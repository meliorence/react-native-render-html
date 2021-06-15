import React from 'react';
import Reference from './Reference';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function APIReference({
  name,
  member,
  full = false
}: {
  name: string;
  member?: string;
  full?: boolean;
}) {
  const memberSuffix = member ? `#${member.toLowerCase()}` : '';
  return (
    <Reference
      url={useBaseUrl(`/api/${name.toLowerCase()}${memberSuffix}`)}
      name={
        member && name && full ? `${name}.${member}` : member ? member : name
      }
      full={full}
      type="api-def"
    />
  );
}
