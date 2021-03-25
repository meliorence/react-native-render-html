import React from 'react';
import Constants from 'expo-constants';
import TextNucleon from '../components/nucleons/TextNucleon';
import HtmlElDisplayAtom from '../components/atoms/HtmlElDisplayAtom';
import PlaygroundTemplate, {
  PlaygroundControls,
  PlaygroundDescription,
  PlaygroundNavigator,
  PlaygroundScreen
} from '../components/templates/PlaygroundTemplate';
import TideListAtom from '../components/atoms/TideListAtom';
import SliderTideMolecule from '../components/molecules/SliderTideMolecule';
import SwitchTideMolecule from '../components/molecules/SwitchTideMolecule';
import NavTideMolecule from '../components/molecules/NavTideMolecule';
import RadioListControlMolecule from '../components/molecules/RadioListControlMolecule';
import {
  usePlaygroundSetter,
  usePlaygroundStateSlice
} from '../components/templates/PlaygroundTemplate/playgroundStore';



const sourceMap = {
  shortOl: {
    source: `<ol>
    <li>Sneaky</li>
    <li>Beaky</li>
    <li>Like</li>
  </ol>`,
    label: 'Short ol'
  },
  longOl: {
    source: `<ol class="gradient-list">
    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
    <li>Aenean tincidunt elit at ipsum cursus, vitae interdum nulla suscipit.</li>
    <li>Curabitur in orci vel risus facilisis accumsan.</li>
    <li>Morbi eleifend tortor lacinia sapien sagittis, quis pellentesque felis egestas.</li>
    <li>Aenean viverra dui quis leo lacinia fringilla.</li>
    <li>Sed varius lectus ac condimentum egestas.</li>
    <li>Maecenas faucibus lorem nec lorem posuere, a rhoncus velit porttitor.</li>
    <li>Proin porta arcu ac elit malesuada pulvinar.</li>
    <li>Phasellus vitae felis sit amet mi gravida volutpat.</li>
    <li>Curabitur vulputate urna non efficitur interdum.</li>
    <li>Curabitur dapibus enim in consectetur imperdiet.</li>
    <li>Suspendisse consectetur nibh non condimentum porta.</li>
    <li>Ut placerat diam in cursus aliquet.</li>
    <li>Praesent vitae quam id tortor malesuada viverra ut at elit.</li>
    <li>Vivamus feugiat justo id volutpat rutrum.</li>
    <li>Nulla volutpat erat non mauris condimentum, nec consequat elit posuere.</li>
    <li>Vestibulum eu risus efficitur, porta lacus a, mollis metus.</li>
    <li>Maecenas finibus arcu vel urna commodo, ac bibendum massa vestibulum.</li>
    <li>Praesent eleifend leo eget consectetur interdum.</li>
    <li>Suspendisse et lectus gravida, interdum mauris aliquet, mattis purus.</li>
    <li>In nec nisl feugiat, blandit odio non, vulputate neque.</li>
    <li>Sed id felis mollis, bibendum orci a, condimentum augue.</li>
    <li>Etiam eleifend ipsum nec nibh aliquam, non commodo risus eleifend.</li>
    <li>Curabitur in ipsum eget lacus blandit maximus in at sem.</li>
    <li>Curabitur sagittis ante nec libero maximus, ut imperdiet elit egestas.</li>
    <li>Proin congue felis sed ultrices elementum.</li>
    <li>Duis sit amet velit et lectus eleifend interdum non quis ex.</li>
    <li>Praesent congue lectus a felis pharetra malesuada.</li>
    <li>Sed vel mauris condimentum, egestas dolor eu, porttitor nisl.</li>
    <li>Donec sed elit tincidunt, accumsan magna sed, facilisis libero.</li>
    <li>Curabitur vel purus quis justo placerat euismod mollis ac arcu.</li>
    <li>Sed eget mi et justo luctus mollis ut non augue.</li>
    <li>Suspendisse sit amet lectus et magna euismod tempor.</li>
    <li>Vestibulum accumsan velit et ipsum pellentesque, vitae ultricies erat blandit.</li>
    <li>Pellentesque vel dolor ac risus efficitur convallis.</li>
    <li>Maecenas feugiat quam at facilisis dapibus.</li>
    <li>Cras commodo leo sit amet lacus lacinia, eget rutrum sem sodales.</li>
    <li>Ut sit amet risus finibus, iaculis lectus sit amet, varius lectus.</li>
    <li>Duis dignissim elit eget erat maximus luctus.</li>
  </ol>`,
    label: 'Long ol'
  },
  nestedUl: {
    label: 'Nested ul',
    source: `<ul>
    <li>
      Nest Level 1
      <ul>
        <li>
          Nest Level 2
          <ul>
            <li>Nest Level 3</li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>`
  },
  nestedOl: {
    label: 'Nested ol',
    source: `<ol>
    <li>
      Nest Level 1
      <ol>
        <li>
          Nest Level 2
          <ol>
            <li>Nest Level 3</li>
          </ol>
        </li>
      </ol>
    </li>
  </ol>`
  }
} as const;

function FontSizeTide() {
  const fontSize = usePlaygroundStateSlice('fontSize');
  const setFontSize = usePlaygroundSetter('fontSize');
  return (
    <SliderTideMolecule
      leftIconName="format-size"
      label="Font size"
      minimumValue={10}
      maximumValue={40}
      step={0.1}
      value={fontSize}
      onValueChange={setFontSize}
    />
  );
}

function LineHeightTide(props: any) {
  const lineHeight = usePlaygroundStateSlice('lineHeight');
  const setLineHeight = usePlaygroundSetter('lineHeight');
  return (
    <SliderTideMolecule
      leftIconName="format-line-spacing"
      label="Line height"
      minimumValue={1}
      maximumValue={4}
      step={0.1}
      value={lineHeight}
      onValueChange={setLineHeight}
      {...props}
    />
  );
}

function BoldTide(props: any) {
  const isBold = usePlaygroundStateSlice('isBold');
  const setIsBold = usePlaygroundSetter('isBold');
  return (
    <SwitchTideMolecule
      leftIconName="format-bold"
      label="Bold?"
      value={isBold}
      onValueChange={setIsBold}
      {...props}
    />
  );
}

function ItalicTide(props: any) {
  const isItalic = usePlaygroundStateSlice('isItalic');
  const setIsItalic = usePlaygroundSetter('isItalic');
  return (
    <SwitchTideMolecule
      leftIconName="format-italic"
      label="Italic?"
      value={isItalic}
      onValueChange={setIsItalic}
      {...props}
    />
  );
}

function FontFamilyTide(props: any) {
  return (
    <NavTideMolecule
      leftIconName="format-font"
      label="Font family"
      route="DemoFontFamily"
      {...props}
    />
  );
}

function OrderedListTypeTide(props: any) {
  return (
    <NavTideMolecule
      leftIconName="format-list-bulleted-type"
      label="ol List type"
      route="PlaygroundOlListType"
      {...props}
    />
  );
}

function UnorderedListTypeTide(props: any) {
  return (
    <NavTideMolecule
      leftIconName="format-list-bulleted-type"
      label="ul List type"
      route="PlaygroundUlListType"
      {...props}
    />
  );
}

export default function Lists() {
  return (
    <PlaygroundTemplate sourceMap={sourceMap} initialSource="shortOl">
      <PlaygroundControls>
        <TideListAtom>
          <FontSizeTide />
          <LineHeightTide />
          <BoldTide />
          <ItalicTide />
          <FontFamilyTide />
          <OrderedListTypeTide />
          <UnorderedListTypeTide />
        </TideListAtom>
      </PlaygroundControls>
      <PlaygroundDescription>
        <TextNucleon>
          Discover how <HtmlElDisplayAtom name="ul" /> and{' '}
          <HtmlElDisplayAtom name="ol" /> elements react to varying style
          constraints. The renderer for both is the same. The style of the
          prefix (or marker in CSS terminology) is determined by{' '}
          <TextNucleon mono>list-style-type</TextNucleon> CSS rule, camel-cased{' '}
          <TextNucleon mono>listStyleType</TextNucleon>.
        </TextNucleon>
        <TextNucleon>There are two types of ...</TextNucleon>
      </PlaygroundDescription>
    </PlaygroundTemplate>
  );
}
