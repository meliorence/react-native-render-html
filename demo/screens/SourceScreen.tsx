import React from 'react';
import DisplayLoading from '../components/DisplayLoading';
import SourceDisplay from '../components/SourceDisplay';
import { useSelectedHTML } from '../state/store';

export default function SourceScreen() {
  const html = useSelectedHTML();
  return html ? <SourceDisplay html={html} /> : <DisplayLoading />;
}
