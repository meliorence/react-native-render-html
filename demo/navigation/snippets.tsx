import React from 'react';
import { View, Text } from 'react-native';
import { RenderHTMLProps } from 'react-native-render-html';
import { DOMElement } from '@native-html/transient-render-tree';

const test = `<a href="http://google.fr"><div
style="
  background-color: red;
  height: 20px;
  width: 40px;
"
>Click me!</div></a>`;

const paragraphs = `<p style="font-size: 1.3em">
This paragraph is styled a font size set in em !
</p>
<hr/>
<p style="padding: 10%; background-color: #f7a29c">
This one features a padding
<strong>in percentage !</strong>
</p>
<hr />
<i>Here, we have a style set on the "i" tag with the
"tagsStyles" prop.</i>
<hr />
<p>
And

<a href="http://google.fr" title="Google FR">This is a link !</a>
</p>
<a href="http://google.fr">
<div
  style="background-color: red; height: 20px; width: 40px"></div>
</a>
<hr />
<p class="last-paragraph">
Finally, this paragraph is styled through the
classesStyles prop
</p>`;

const lists = `<p>An <em>ul</em> tag, default styling</p>
<ul>
	<li>Easy</li>
	<li>Peasy</li>
	<li>
		<div style="background-color:red;width:50px;height:50px;"></div>
	</li>
	<li>Lemon</li>
	<li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </li>
</ul>
<hr />
<p>An 
	<em>ul</em> tag, with 
	<em>list-style-type: circle;</em>
</p>
<ul style="list-style-type: circle;">
	<li>Sneaky</li>
	<li>Beaky</li>
	<li>Like</li>
</ul>
<hr />
<p>An 
	<em>ol</em> tag, with 
	<em>color: blue;</em>
</p>
<ol style="color:blue;">
	<li>Sneaky</li>
	<li>Beaky</li>
	<li>Like</li>
</ol>
<hr />
<p>An 
	<em>ol</em> tag, with 
	<em>list-style-type: lower-alpha;</em>
</p>
<ol style="list-style-type: lower-alpha;">
	<li>Sneaky</li>
	<li>Beaky</li>
	<li>Like</li>
</ol>`;

const simpleLoremWithImages = `
<p>This first image's dimensions are set in its style attributes.</p>
<img
  style="width: 50%; height: 100px; align-self: center"
  src="https://i.imgur.com/gSmWCJF.jpg"
/>
<p>
  The next image will be sized automatically thanks to the <em>contentWidth</em> and
  <em>computeImageMaxWidth</em> props.
</p>
<img src="https://i.imgur.com/XP2BE7q.jpg" />
`;

const imagesWithinParagraphs = `<p>
	<img src="https://i.imgur.com/gSmWCJF.jpg" />
</p>
<p>
  Android used to have trouble rendering images inside paragraphs. This is why
  this plugin moves images and appends them right after their container.
</p>
<p>
	<img src="https://i.imgur.com/gSmWCJF.jpg" />
</p>
<p>
  Eo adducta re per Isauriam, rege Persarum bellis finitimis inligato
  repellenteque a conlimitiis suis ferocissimas gentes, quae mente quadam
  versabili hostiliter eum saepe incessunt et in nos arma moventem aliquotiens
  iuvant, Nohodares quidam nomine e numero optimatum, incursare Mesopotamiam
  quotiens copia dederit ordinatus, explorabat nostra sollicite, si repperisset
  usquam locum vi subita perrupturus.
</p>
<p>
	<img src="https://i.imgur.com/XP2BE7q.jpg" />
</p>
<p>
  Quod cum ita sit, paucae domus studiorum seriis cultibus antea celebratae nunc
  ludibriis ignaviae torpentis exundant, vocali sonu, perflabili tinnitu fidium
  resultantes. denique pro philosopho cantor et in locum oratoris doctor artium
  ludicrarum accitur et bybliothecis sepulcrorum ritu in perpetuum clausis
  organa fabricantur hydraulica, et lyrae ad speciem carpentorum ingentes
  tibiaeque et histrionici gestus instrumenta non levia.
</p>
<p>
	<img src="https://i.imgur.com/gSmWCJF.jpg" />
</p>`;

const images404 = `
<p>The following image has an unreachable <em>src</em>.</p>
<img src="http://example.tld/image.jpg" />
<p>Same, with <em>alt="The Void"</em>.</p>
<img alt="The Void" src="http://example.tld/image.jpg" />
<p>Same, with <em>width="300" height="200"</em>.</p>
<img width="300" height="200" alt="The Void" src="http://example.tld/image.jpg" />
`;

const trickyStuff = `
<p>This example showcases tricky stuff like empty paragraphs, nested tags...</p>
<p>Next paragraph is empty</p>
<p></p>
<p>Next paragraph has an image nested in 3 p tags</p>
<p>
    <p>
        <p><img src="https://i.imgur.com/gSmWCJF.jpgg" /></p>
    </p>
</p>
`;

const layoutStyles = `
<p>Nested rectangle with percentage dimensions and positionning</p>
<div style="background-color: red; height: 200px">
	<div
    style="background-color: blue; width: 80%; height: 80%; top: 10%; left: 10%"></div>
</div>
<div
  style="background-color: red; height: 200px; padding: 20%; margin-top: 30px">
	<p style="color: white">Text inside a rectangle with a 20% padding</p>
</div>
`;

const textsStylesBehaviour = `<p>Styling texts is a challenging part of converting HTML into react-native components.</p>
<p>The way react-native's <em>Text</em> components behaves is a lot different from our browsers' implementation.</p>
<p>Let's see how styles are applied to texts with this plugin.</p>
<hr/>
<div style="color:red;">This text is inside a div, without a text tag wrapping it. The <em>div</em> tag only has <em>color:red;</em> as style.</div>
<p>In the example above, you may find, if you inspect the rendered components, that it's the <em>Text</em> component inside that actually receives the color attribute.</p>
<p>This is because this library parses every text-only style of <em>View</em> wrappers and moves them to each <em>Text</em> child.</p>
<hr/>
<div style="color:red">
    <p>This first paragraph doesn't have a specific styling.</p>
    <p style="color:blue;">This one is blue.</p>
</div>
<p>Here, the <em>div</em> wrapper still has <em>color:red;</em> as style.</div>.</p>
<p>The first paragraph inside it doesn't have any style attribute, either from HTML or from the <em>tagsStyles</em> or <em>classesStyles</em> props.</p>
<p>The second one is set to be blue from its <em>style</em> attribute.</p>
<p>You can see the order of priorities that applies to styling. The less important are your <em>tagsStyles</em>, 
then your <em>classessStyles</em> and finally the styles parsed from your HTML content.</p>`;

const ignoringTagsAndStyles = `
<p>The following tag (h2) is ignored with the "ignoredTags" prop</p>
<h2>This shouldn't be rendered !</h2>
<p>^^^ no title there ? great.</p>
<p>
  The next div has a red background. It should be ignored with the
  "ignoredStyles" prop.
</p>
<div
  style="background-color: red; height: 200px; width: 200px; border-width: 1px"
></div>
<p>
  You can also use a function to ignore nodes if you need to be even more
  specific.
</p>
<p>Let's ignore "a" tags nested inside "divs"</p>
<p>
  <a href="http://google.com">This link</a> works since it's nested inside a
  paragraph.
</p>
<div style="padding: 10px; color: white; text-align: center; border-width: 1px">
  <a href="http://google.com">you're a noisy one, aren't you ?</a>Can you see
  link in this div ? It has been ignored !
</div>

`;

const customHTMLTags = `
<p>
  This example showcases how you can render custom HTML tags with this plugin.
</p>
<p>
  The following tag is named <em>bluecircle</em> and will render... a blue
  circle.
</p>
<bluecircle></bluecircle>
<p>Let's get crazy and add some styling to our custom tag.</p>
<bluecircle style="background-color: red"></bluecircle>
<p>Yes, that bluecircle tag is now red.</p>
<p>For our final trick, let's style this custom tag with a class.</p>
<bluecircle class="make-me-green"></bluecircle>
<p>
  That demonstrates how easily we can override styles. In ascending priority :
</p>
Style from the class with the <em>classesStyles</em> prop (green)
<ul>
  <li style="color: blue">Default style for the custom component (blue)</li>
  <li style="color: green">
    Style from the class with the <em>classesStyles</em> prop (green)
  </li>
  <li style="color: red">
    Converted CSS to RN style from the <em>style</em> attribute in HTML (red)
  </li>
</ul>
`;

const invalidHTML = `
<p>What if your HTML isn't strictly valid ? The parser powering this module (htmlparser2) is kind of forgiving, so your app shouldn't crash.</p>
<p>Let's add a WordPress shortcode and some unopened/unclosed tags to demonstrate this.</p>
[gallery ids="11,12,13"]
<p></em></img>
<p>See ? Easy stuff.</p>`;

const iframes = `
<p>Yes you read that right, those damn iframes can render with this plugin.</p>
<p>Check this out</p>
<iframe width="560" height="315" src="https://www.youtube.com/embed/ZZ5LpwO-An4" frameborder="0" allowfullscreen></iframe>
</iframe>
<p style="text-align:center;"><em>We've just rendered a meme</em></p>
`;

const alteration = `
<p>
  <em>alterData</em> and <em>alterChildren</em> props are very useful to make
  some modifications on the structure of your HTML before it's actually rendered
  into react components.
</p>
<h2>Using alterData</h2>
<p>
  For instance, you can alter the content of <em>h1, h2, h3...</em> titles to
  make them uppercase or remove the last child of a list.
</p>
<p>
  The next title is written in lowercase in the HTML snippet, but it will be
  displayed in uppercase.
</p>
<h1>title</h1>
<p>
  <em>alterData</em> is simple, you get the parsed <em>node</em> as the first
  parameter of your function, so you can make the data whatever you want and
  return it. Just bear in mind that if you don't want to change a node, you have
  to return a falsy value.
</p>
<h2>Using alterChildren</h2>
<p>Let's remove the first two elements of the next ordered list</p>
<ol>
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
  <li>Four</li>
</ol>
<h2>Using alterNode</h2>
<p>
  alterNode lets you change the values parsed from your HTML before it's
  rendered. It's extremely powerful as a last resort to add some very specific
  styling or circumvent rendering problems
</p>
<p>Let's make the color of links inside a <em>div</em> red !</p>
<p><a href="http://google.fr">This is a lame link inside a paragraph.</a></p>
<div><a href="http://google.fr">This is a very cool link inside a div</a></div>
`;

const anchors = `
<p>
  Anchors are tricky because they can encompass text and blocks, but
  we don't want to override event handlers defined by user renderers.
  So every renderer now receives a special optional prop, 
	<em>syntheticOnLinkPress</em>,
  that one can choose to handle, ignore, or pass to children.
</p>
<hr />
<p>
  In the below example, the anchor encompasses both raw text and an img tag.
  You can click the image and you'll be directed to a WebView.
</p>
<a href="https://developer.mozilla.org/">A link to MDN!</a>
<a href="https://developer.mozilla.org/">
	<img alt="And this image too!" src="https://i.imgur.com/gSmWCJF.jpg" />
</a>
<hr />
<p>
  In the below example, the anchor surrounds a div with fixed width and height,
  which has a text node as a child. The child should overflow below the red-painted div.
</p>
<a href="http://google.fr"><div
style="
  background-color: red;
  height: 20px;
  width: 40px;
"
>Click me!</div></a>
`;

const inlineCustomTags = `
    <p>Foo <MyTag></MyTag> Baz </p>
    <p>Foo <myothertag></myothertag> baz</p>
`;

const whitespace = `<p>In the below example, <em>white-space</em> is set to <em>normal</em> (the default)</p>
<div class="white-space-normal">
  <span>This is text!</span>

  This is <strong>bold</strong> <em>italics</em>.
</div>
<hr/>
<p>In this example, <em>white-space</em> is set to <em>pre</em> (the content is identical)</p>
<div class="white-space-pre">
  <span>This is text!</span>

  This is <strong>bold</strong> <em>italics</em>.
</div>
`;

function myTagRenderer() {
  return <Text>Bar</Text>;
}

function myOtherTagRenderer() {
  return <Text>this should break the line</Text>;
}

const snippetsMapConfig: Record<
  string,
  { name: string; html: string; props?: Partial<RenderHTMLProps> }
> = {
  test: {
    name: 'Test',
    html: test,
    props: {
      baseStyle: {
        whiteSpace: 'normal'
      }
    }
  },
  whitespace: {
    name: 'White Space Collapsing',
    html: whitespace,
    props: {
      tagsStyles: {
        div: {
          backgroundColor: 'yellow',
          color: 'black'
        }
      },
      classesStyles: {
        'white-space-pre': {
          whiteSpace: 'pre'
        },
        'white-space-normal': {
          whiteSpace: 'normal'
        }
      }
    }
  },
  pre: {
    name: 'Preformatted',
    html: `<pre>
  ___________________________
< I'm an expert in my field. >
  ---------------------------
    \\   ^__^ 
    \\  (oo)\\_______
       (__)\\       )\\/\\
           ||----w |
           ||     ||
</pre>
<figcaption>
  A cow saying, "I'm an expert in my field." The cow is illustrated using preformatted text characters. 
</figcaption>
    `,
    props: {}
  },
  anchors: {
    name: 'Anchors',
    html: anchors
  },
  paragraphs: {
    name: 'Paragraphs',
    html: paragraphs,
    props: {
      baseStyle: {},
      tagsStyles: {
        i: { textAlign: 'center', fontStyle: 'italic', color: 'grey' }
      },
      classesStyles: {
        'last-paragraph': {
          textAlign: 'right',
          color: 'teal',
          fontWeight: 'bold',
          backgroundColor: 'yellow'
        }
      }
    }
  },
  lists: {
    name: 'Lists',
    html: lists,
    props: {
      baseStyle: {}
    }
  },
  simpleLoremWithImages: {
    name: 'Simple lorem (images)',
    html: simpleLoremWithImages,
    props: {
      baseStyle: {}
    }
  },
  imagesWithinParagraphs: {
    name: 'Images within paragraphs',
    html: imagesWithinParagraphs
  },
  images404: {
    name: '404 images',
    html: images404,
    props: {
      baseStyle: {}
    }
  },
  trickyStuff: { name: 'Tricky stuff', html: trickyStuff },
  layoutStyles: { name: 'Layout styles', html: layoutStyles },
  textsStylesBehaviour: {
    name: 'Texts styles behaviour',
    html: textsStylesBehaviour,
    props: {
      tagsStyles: {
        div: { borderWidth: 1, padding: 10, marginTop: 10, borderColor: 'gray' }
      }
    }
  },
  ignoringTagsAndStyles: {
    name: 'Ignoring tags & styles',
    html: ignoringTagsAndStyles,
    props: {
      ignoredTags: ['h2'],
      ignoredStyles: ['backgroundColor'],
      ignoreNode: (node) => {
        return (
          !!node.parent &&
          (node.parent as DOMElement).name === 'a' &&
          !!node.parent.parent &&
          (node.parent.parent as DOMElement).name === 'div'
        );
      }
    }
  },
  customHTMLTags: {
    name: 'Custom HTML tags',
    html: customHTMLTags,
    props: {
      renderers: { bluecircle: blueCircleRenderer },
      classesStyles: { 'make-me-green': { backgroundColor: 'green' } }
    }
  },
  invalidHTML: { name: 'Invalid HTML', html: invalidHTML },
  parseRemoteHTML: {
    name: 'Remote HTML',
    html: '',
    props: {
      uri: 'http://motherfuckingwebsite.com',
      ignoredTags: ['script']
    }
  },
  iframes: { name: 'Iframes', html: iframes },
  alteration: {
    name: 'Altering data, chlidren & nodes',
    html: alteration,
    props: {
      alterData: (node) => {
        let { parent, data } = node;
        if (parent && (parent as DOMElement).name === 'h1') {
          return data.toUpperCase();
        } else {
          return false;
        }
      },
      alterChildren: (node) => {
        const { children, name } = node;
        if (name === 'ol' && children && children.length) {
          return children.splice(0, 2);
        } else {
          return false;
        }
      },
      alterNode: (node) => {
        const { name, parent } = node;
        if (name === 'a' && parent && (parent as DOMElement).name === 'div') {
          node.attribs = { ...(node.attribs || {}), style: 'color:red;' };
          return node;
        }
      }
    }
  },
  inlineCustomTags: {
    name: 'Inline custom tags',
    html: inlineCustomTags,
    props: {
      renderers: {
        mytag: { renderer: myTagRenderer, wrapper: 'Text' },
        myothertag: myOtherTagRenderer
      }
    }
  }
};

export default snippetsMapConfig;

function blueCircleRenderer({ passProps }: any) {
  return (
    <View
      key={passProps.key}
      style={[
        { width: 50, height: 50, borderRadius: 25, backgroundColor: 'blue' }
      ]}
    />
  );
}
