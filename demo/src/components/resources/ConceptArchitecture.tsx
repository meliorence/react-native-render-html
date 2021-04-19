import React, { PropsWithChildren } from 'react';
import { useNuclearContentWidth } from '../nucleons/useContentWidthContext';
import RenderHtmlCardOrganism from '../RenderHtmlCardOrganism';
import BodyParagraphAtom from '../BodyParagraphAtom';
import BodyChapterMolecule from '../BodyChapterMolecule';
import ArticleHeaderAtom from '../ArticleHeader';
import FeatureTemplate from '../templates/FeatureTemplate';
import UISourceDisplayMolecule from '../UISourceDisplayMolecule';
import { ScrollView } from 'react-native-gesture-handler';
import BodyRefLibraryMolecule from '../BodyRefLibaryMolecule';
import TextRoleNucleon from '../nucleons/TextRoleNucleon';
import BodyListAtom from '../BodyListAtom';
import BoxNucleon from '../nucleons/BoxNucleon';
import UINavResourceTideMolecule from '../UINavResourceTide';
import { View } from 'react-native';

const codeSnippet = `import RenderHtml from 'react-native-render-html';

export default function App() {
  return <RenderHtml source={{ html: "..." }} />
}`;

function BodyListItemAtom({ children }: PropsWithChildren<{}>) {
  return (
    <TextRoleNucleon role="body" style={{ flexShrink: 1 }}>
      {children}
    </TextRoleNucleon>
  );
}

export default function ConceptArchitecture() {
  const contentWidth = useNuclearContentWidth();
  return (
    <FeatureTemplate>
      <ArticleHeaderAtom
        imageSource={require('../../../assets/images/anders-jilden-architecture.jpg')}>
        <BodyParagraphAtom>
          This article is an introduction to the{' '}
          <BodyRefLibraryMolecule
            name="react-native-render-html"
            url="https://github.com/meliorence/react-native-render-html#readme"
          />{' '}
          architecture.
        </BodyParagraphAtom>
      </ArticleHeaderAtom>
      <BodyChapterMolecule title="Synopsis">
        <BodyParagraphAtom>
          Consumers of this library need to understand the basic data flow model
          of this library to leverage its capabilities. Features such as props
          will touch on different areas of the data flow. Let's start with a
          simple example:
        </BodyParagraphAtom>
        <RenderHtmlCardOrganism
          caption="This card shows the result of rendering a simple HTML code snippet."
          contentWidth={contentWidth}
          html="<p style='text-align:center;'>Hello World!</p>"
        />
        <BodyParagraphAtom>
          The minimal code to produce such output would look like this:
        </BodyParagraphAtom>
        <ScrollView horizontal>
          <UISourceDisplayMolecule language="jsx" content={codeSnippet} />
        </ScrollView>
        <BodyParagraphAtom>
          This looks pretty simple. But what exactly is happening under the
          hood?
        </BodyParagraphAtom>
      </BodyChapterMolecule>
      <BodyChapterMolecule title="Data Flow">
        <BodyParagraphAtom>
          We can roughly split the transformations from an HTML string to a
          React tree in 3 steps:
        </BodyParagraphAtom>
        <BodyListAtom type="upper-alpha">
          <BodyListItemAtom>
            HTML parsing. In this step, the HTML code is parsed to form a DOM
            tree. This step is performed by the{' '}
            <BodyRefLibraryMolecule
              name="htmlparser2"
              url="https://github.com/fb55/htmlparser2#readme"
            />{' '}
            library.
          </BodyListItemAtom>
          {/* <BodyListItemAtom>
            Inline CSS Parsing. This step is performed by{' '}
            <BodyRefLibraryMolecule
              name="@native-html/css-parser"
              url="https://github.com/native-html/core/tree/master/packages/css-processor#readme"
            />{' '}
            module.
          </BodyListItemAtom> */}
          <BodyListItemAtom>
            Transient Render Tree (TRT) Construction. In this step, the DOM tree
            is transformed in a TRT. Each node of this tree is referred to as a
            Transient Node (TNode) which has React-Native compatible styles.
            This step is performed by{' '}
            <BodyRefLibraryMolecule
              name="@native-html/transient-render-engine"
              url="https://github.com/native-html/core/tree/master/packages/transient-render-engine#readme"
            />{' '}
            module.
          </BodyListItemAtom>
          <BodyListItemAtom>
            Transient Render Tree Rendering. In this step, the TRT is
            transformed in a React render tree (VDOM). TNodes are passed to
            internal and custom renderers.
          </BodyListItemAtom>
        </BodyListAtom>
        <BodyParagraphAtom>
          One might wonder why the need for a step B: why not just render a DOM
          tree? There are a few answers:
        </BodyParagraphAtom>
        <BodyListAtom>
          <BodyListItemAtom>
            To mitigate the discrepancies between Web standards and React Native
            layout engine. The DOM and Transient Render trees will not have the
            exact same structure to account for React Native limitations.
          </BodyListItemAtom>
          <BodyListItemAtom>
            For the sake of separation of concerns. By decoupling the rendering
            and parsing logics, we end up with a more robust product where areas
            of the code with distinct reponsibilities can be tested in
            isolation.
          </BodyListItemAtom>
        </BodyListAtom>
      </BodyChapterMolecule>
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
