import React from 'react';
import { View } from 'react-native';
import { _constructStyles } from 'react-native-render-html/HTMLStyles';

export const paragraphs = `
    <p style="font-size:1.3rem;">This paragraph is styled a font size set in em !</p>
    <em>This one showcases the default renderer for the "em" HTML tag.</em>
    <p style="padding:10%;">This one features a padding <strong>in percentage !</strong></p>
    <hr />
    <i>Here, we have a style set on the "i" tag with the "tagsStyles" prop.</i>
    <p>And <a href="http://google.fr">This is a link !</a></p>
    <a href="http://google.fr"><div style="background-color: red; height: 20px; width:40px;"></div></a>
    <p class="last-paragraph">Finally, this paragraph is styled through the classesStyles prop</p>
`;

export const lists = `
    <p>Here is an <em>ul</em> tag</p>
    <ul>
        <li>Easy</li>
        <li>Peasy</li>
        <li><div style="background-color:red;width:50px;height:50px;"></div></li>
        <li>Lemon</li>
        <li>Squeezy</li>
    </ul>

    <br />
    <p>Here is an <em>ol</em> tag</p>    
    <ol>
        <li>Sneaky</li>
        <li>Beaky</li>
        <li>Like</li>
    </ol>
`;

export const simpleLoremWithImages = `
    <p>This first image's dimensions are set in its style attributes.</p>
    <img style="width: 50%; height: 100px; align-self: center;" src="https://i.imgur.com/gSmWCJF.jpg" />
    <p>The next image will be sized automatically thanks to the "imagesMaxWidth" prop.</p>
    <img src="https://i.imgur.com/XP2BE7q.jpg" />
`;

export const imagesWithinParagraphs = `
    <p><img src="https://i.imgur.com/gSmWCJF.jpg" /></p>
    <p>Android used to have trouble rendering images inside paragraphs. This is why this plugin moves images and appends them right after their container.</p>
    <p><img src="https://i.imgur.com/gSmWCJF.jpg" /></p>
    <p>Eo adducta re per Isauriam, rege Persarum bellis finitimis inligato repellenteque a conlimitiis suis ferocissimas gentes, quae mente quadam versabili hostiliter eum saepe incessunt et in nos arma moventem aliquotiens iuvant, Nohodares quidam nomine e numero optimatum, incursare Mesopotamiam quotiens copia dederit ordinatus, explorabat nostra sollicite, si repperisset usquam locum vi subita perrupturus.</p>
    <p><img src="https://i.imgur.com/XP2BE7q.jpg" /></p>
    <p>Quod cum ita sit, paucae domus studiorum seriis cultibus antea celebratae nunc ludibriis ignaviae torpentis exundant, vocali sonu, perflabili tinnitu fidium resultantes. denique pro philosopho cantor et in locum oratoris doctor artium ludicrarum accitur et bybliothecis sepulcrorum ritu in perpetuum clausis organa fabricantur hydraulica, et lyrae ad speciem carpentorum ingentes tibiaeque et histrionici gestus instrumenta non levia.</p>
    <p><img src="https://i.imgur.com/gSmWCJF.jpg" /></p>    
`;

export const images404 = `
    <img src="http://example.tld/image.jpg" />
    <p>The following images are not valid.</p>
    <img src="http://example.tld/image.jpg" />
    <p>The following images are not valid.</p>    
    <img src="http://example.tld/image.jpg" />
    <p>The following images are not valid.</p>    
    <img src="http://example.tld/image.jpg" />
`;

export const trickyStuff = `
    <p>This example showcases tricky stuff like empty paragraphs, nested tags...</p>
    <p>Next paragraph is empty</p>
    <p></p>
    <p>Next paragraph has an image nested in 3 p tags</p>
    <p><p><p><img src="https://i.imgur.com/gSmWCJF.jpgg" /></p></p></p>
`;

export const layoutStyles = `
    <p>Nested rectangle with percentage dimensions and positionning</p>
    <div style="background-color:red;height:200px;">
        <div style="background-color:blue; width:80%; height:80%; top:10%; left:10%"></div>
    </div>
    <div style="background-color:red; height:200px; padding:20%; margin-top:30px;">
        <p style="color:white">Text inside a rectangle with a 20% padding</p>
    </div>
`;

export const ignoringTagsAndStyles = `
    <p>The following tag (h2) is ignored with the "ignoredTags" prop</p>
    <h2>This shouldn't be rendered !</h2>
    <p>^^^ no title there ? great.</p>
    <p>The next div has a red background. It should be ignored with the "ignoredStyles" prop.</p>
    <div style="background-color:red;height:200px;width:200px;border-width:1px;"></div>
    <p>You can also use a function to ignore nodes if you need to be even more specific.</p>
    <p>Let's ignore "a" tags nested inside "divs"</p>
    <p><a href="http://google.com">This link</a> works since it's nested inside a paragraph.</p>
    <div style="padding: 10px; color: white; text-align: center; border-width: 1px;">
        <a href="http://google.com">you're a noisy one, aren't you ?</a>Can you see link in this div ? It has been ignored !
    </div>
`;

export const customHTMLTags = `
    <p>This example showcases how you can render custom HTML tags with this plugin.</p>
    <p>The following tag is named <em>bluecircle</em> and will render... a blue circle.</p>
    <bluecircle></bluecircle>
    <p>Let's get crazy and add some styling to our custom tag.</p>
    <bluecircle style="background-color:red;"></bluecircle>
    <p>Yes, that bluecircle tag is now red.</p>
    <p>For our final trick, let's style this custom tag with a class.</p>
    <bluecircle class="make-me-green"></bluecircle>
    <p>That demonstrates how easily we can override styles. In ascending priority :</p>
    Style from the class with the <em>classesStyles</em> prop (green)
    <ul>
        <li>Default style for the custom component (blue)</li>
        <li>Style from the class with the <em>classesStyles</em> prop (green)</li>
        <li>Converted CSS to RN style from the <em>style</em> attribute in HTML (red)</li>
    </ul>
`;

export const invalidHTML = `
    <p>What if your HTML isn't strictly valid ? The parser powering this module (htmlparser2) is kind of forgiving, so your app shouldn't crash.</p>
    <p>Let's add a WordPress shortcode and some unopened/unclosed tags to demonstrate this.</p>
    [gallery ids="11,12,13"]
    <p></em></img>
    <p>See ? Easy stuff.</p>
    <p>You'll obviously find out that some specific cases actually crash the app by rendering some native component in a way that react native hates. If so, please open an issue or open a PR with a reproduction like this one so we can work towards making this plugin 100% crash safe.</p>
`;

export const iframes = `
    <p>Yes you read that right, those damn iframes can render with this plugin.</p>
    <p>Check this out</p>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/ZZ5LpwO-An4" frameborder="0" allowfullscreen></iframe>
    </iframe>
    <p style="text-align:center;"><em>We've just rendered a meme</em></p>
`;

export default {
    paragraphs: {
        name: 'Paragraphs',
        props: {
            tagsStyles: { i: { textAlign: 'center', fontStyle: 'italic', color: 'grey' } },
            classesStyles: { 'last-paragraph': { textAlign: 'right', color: 'teal', fontWeight: '800' } }
        }
    },
    lists: { name: 'Lists' },
    simpleLoremWithImages: { name: 'Simple lorem (images)' },
    imagesWithinParagraphs: { name: 'Images within paragraphs' },
    images404: { name: '404 images' },
    trickyStuff: { name: 'Tricky stuff' },
    layoutStyles: { name: 'Layout styles' },
    ignoringTagsAndStyles: {
        name: 'Ignoring tags & styles',
        props: {
            ignoredTags: ['h2'],
            ignoredStyles: ['background-color'],
            ignoreNodesFunction: (node, parentTagName) => {
                return node.parent && node.parent.name === 'a' && node.parent.parent && node.parent.parent.name === 'div';
            }
        }
    },
    customHTMLTags: {
        name: 'Custom HTML tags',
        props: {
            renderers: { bluecircle: blueCircleRenderer },
            classesStyles: { 'make-me-green': { backgroundColor: 'green' } }
        }
    },
    invalidHTML: { name: 'Invalid HTML' },
    parseRemoteHTML: { name: 'Remote HTML', props: { html: undefined, uri: 'http://motherfuckingwebsite.com', ignoredTags: ['script'] } },
    iframes: { name: 'Iframes' }
};

function blueCircleRenderer (htmlAttribs, children, convertedCSSStyles, passProps) {
    // This helper allows you to compose the final style of your renderers easily.
    // It will return a style object based on :
    // - the default styles for this HTML tag (if any)
    // - your "htmlStyles" prop for this tag
    // - the conversion of the "style" attribute from CSS to RN
    // - your "classesStyles" prop for the classes of the rendered component
    // - any "additionalyStyles" you provide in the options object
    const style = _constructStyles({
        tagName: 'bluecircle',
        htmlAttribs,
        passProps,
        styleSet: 'VIEW'
    });
    return (
        <View style={[
            { width: 50, height: 50, borderRadius: 25, backgroundColor: 'blue' },
            style
        ]} />
    );
}
