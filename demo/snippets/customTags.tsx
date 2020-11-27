import React from 'react';
import { CustomLiteRenderer, HTMLContentModel } from 'react-native-render-html';
import { Text } from 'react-native';
import { CustomTextualRenderer } from 'react-native-render-html';
import { SnippetDeclaration } from '../types';
import { RED, GREEN, BLUE } from './styles';

const html = `
<h2>Block custom tags</h2>
<p>
  This example showcases how you can render custom HTML tags with this plugin.
</p>
<p>
  The following tag is named <code>bluecircle</code> and will render... a blue
  circle.
</p>
<bluecircle></bluecircle>
<hr />
<p>Let's get crazy and add some styling to our custom tag.</p>
<bluecircle style="background-color: ${RED}"></bluecircle>
<p>Yes, that <code>bluecircle</code> tag is now red.</p>
<hr />
<p>For our final trick, let's style this custom tag with a class (green).</p>
<bluecircle class="make-me-green"></bluecircle>
<hr />
<p>
  That demonstrates how easily we can override styles. In ascending priority :
</p>
Style from the class with the <em>classesStyles</em> prop (${GREEN})
<ul>
  <li style="color: ${BLUE}">Default style for the custom component (blue)</li>
  <li style="color: ${GREEN}">
    Style from the class with the <em>classesStyles</em> prop (green)
  </li>
  <li style="color: ${RED}">
    Converted CSS to RN style from the <em>style</em> attribute in HTML (red)
  </li>
</ul>
<h2>Inline custom tags</h2>
<p>The inline element should display "Inline!" in serif and color green.</p>
<p class="centered">before <mytag></mytag> after</p>
<hr/>
<p>The inline element should display "Mixed!" in serif and color blue.</p>
<p class="centered">before <myothertag></myothertag> after</p>
`;

const InlineBar: CustomTextualRenderer = function InlineBar({ key, style }) {
  return (
    <Text style={style} key={key}>
      Inline!
    </Text>
  );
};

InlineBar.model = {
  mixedUAStyles: {
    fontFamily: 'serif',
    fontStyle: 'italic',
    color: GREEN
  },
  contentModel: HTMLContentModel.textual
};

const MixedOtherTag: CustomTextualRenderer = function InlineOtherTag({
  TDefaultRenderer,
  ...props
}) {
  return <TDefaultRenderer {...props}>Mixed!</TDefaultRenderer>;
};

MixedOtherTag.model = {
  mixedUAStyles: {
    fontFamily: 'serif',
    fontStyle: 'italic',
    color: BLUE
  },
  contentModel: HTMLContentModel.textual
};

const BlueCirclerRenderer: CustomLiteRenderer<HTMLContentModel.block> = {
  model: {
    mixedUAStyles: {
      width: 50,
      height: 50,
      borderRadius: 25,
      alignSelf: 'center',
      backgroundColor: BLUE
    },
    contentModel: HTMLContentModel.block
  }
};

const customTags: SnippetDeclaration = {
  name: 'Custom Tags',
  html,
  source: '/demo/snippets/customTags.tsx',
  props: {
    renderers: {
      bluecircle: BlueCirclerRenderer,
      mytag: InlineBar,
      myothertag: MixedOtherTag
    },
    classesStyles: {
      'make-me-green': { backgroundColor: GREEN },
      centered: {
        alignItems: 'center'
      }
    }
  }
};

export default customTags;
