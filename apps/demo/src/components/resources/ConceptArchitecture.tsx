import React from 'react';
import FeatureTemplate from '../templates/FeatureTemplate';
import TextRoleNucleon from '../nucleons/TextRoleNucleon';
import BoxNucleon from '../nucleons/BoxNucleon';
import UINavResourceTideMolecule from '../UINavResourceTide';
import { View } from 'react-native';
import { PageConceptArchitecture } from '@doc/pages';

export default function ConceptArchitecture() {
  return (
    <FeatureTemplate
      imageSource={require('../../../assets/images/anders-jilden-architecture.jpg')}>
      <PageConceptArchitecture />
      <View>
        <BoxNucleon paddingX={2}>
          <TextRoleNucleon role="caption">See also</TextRoleNucleon>
        </BoxNucleon>
        <UINavResourceTideMolecule route="ConceptTRE" />
        <UINavResourceTideMolecule route="ConceptCSSProcessing" />
      </View>
    </FeatureTemplate>
  );
}
