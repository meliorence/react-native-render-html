const simpleLorem = `
    <p>Nunc vero inanes flatus quorundam vile esse quicquid extra urbis pomerium nascitur aestimant praeter orbos et caelibes, nec credi potest qua obsequiorum diversitate coluntur homines sine liberis Romae.</p>
    <p>Eo adducta re per Isauriam, rege Persarum bellis finitimis inligato repellenteque a conlimitiis suis ferocissimas gentes, quae mente quadam versabili hostiliter eum saepe incessunt et in nos arma moventem aliquotiens iuvant, Nohodares quidam nomine e numero optimatum, incursare Mesopotamiam quotiens copia dederit ordinatus, explorabat nostra sollicite, si repperisset usquam locum vi subita perrupturus.</p>
    <p>Quod cum ita sit, paucae domus studiorum seriis cultibus antea celebratae nunc ludibriis ignaviae torpentis exundant, vocali sonu, perflabili tinnitu fidium resultantes. denique pro philosopho cantor et in locum oratoris doctor artium ludicrarum accitur et bybliothecis sepulcrorum ritu in perpetuum clausis organa fabricantur hydraulica, et lyrae ad speciem carpentorum ingentes tibiaeque et histrionici gestus instrumenta non levia.</p>
`;

const simpleLoremWithImages = `
    <p>This first image's dimensions are set in its style attributes.</p>
    <img style="width:50%;height:100px;" src="https://i.imgur.com/gSmWCJF.jpg" />
    <p>The next image will be sized automatically thanks to the "imagesMaxWidth" prop.</p>
    <img src="https://i.imgur.com/XP2BE7q.jpg" />    
    <p>Quod cum ita sit, paucae domus studiorum seriis cultibus antea celebratae nunc ludibriis ignaviae torpentis exundant, vocali sonu, perflabili tinnitu fidium resultantes. denique pro philosopho cantor et in locum oratoris doctor artium ludicrarum accitur et bybliothecis sepulcrorum ritu in perpetuum clausis organa fabricantur hydraulica, et lyrae ad speciem carpentorum ingentes tibiaeque et histrionici gestus instrumenta non levia.</p>
`;

const imagesWithinParagraphs = `
    <p><img src="https://i.imgur.com/gSmWCJF.jpg" /></p>
    <p>Android used to have trouble rendering images inside paragraphs. This is why this plugin moves images and appends them right after their container.</p>
    <p><img src="https://i.imgur.com/gSmWCJF.jpg" /></p>
    <p>Eo adducta re per Isauriam, rege Persarum bellis finitimis inligato repellenteque a conlimitiis suis ferocissimas gentes, quae mente quadam versabili hostiliter eum saepe incessunt et in nos arma moventem aliquotiens iuvant, Nohodares quidam nomine e numero optimatum, incursare Mesopotamiam quotiens copia dederit ordinatus, explorabat nostra sollicite, si repperisset usquam locum vi subita perrupturus.</p>
    <p><img src="https://i.imgur.com/XP2BE7q.jpg" /></p>
    <p>Quod cum ita sit, paucae domus studiorum seriis cultibus antea celebratae nunc ludibriis ignaviae torpentis exundant, vocali sonu, perflabili tinnitu fidium resultantes. denique pro philosopho cantor et in locum oratoris doctor artium ludicrarum accitur et bybliothecis sepulcrorum ritu in perpetuum clausis organa fabricantur hydraulica, et lyrae ad speciem carpentorum ingentes tibiaeque et histrionici gestus instrumenta non levia.</p>
    <p><img src="https://i.imgur.com/gSmWCJF.jpg" /></p>    
`;

const images404 = `
    <img src="http://example.tld/image.jpg" />
    <p>The following images are not valid.</p>
    <img src="http://example.tld/image.jpg" />
    <p>The following images are not valid.</p>    
    <img src="http://example.tld/image.jpg" />
    <p>The following images are not valid.</p>    
    <img src="http://example.tld/image.jpg" />
`;

const trickyStuff = `
    <p>This example showcases tricky stuff like empty paragraphs, nested tags...</p>
    <p>Next paragraph is empty</p>
    <p></p>
    <p>Next paragraph has an image nested in 3 p tags</p>
    <p><p><p><img src="https://i.imgur.com/gSmWCJF.jpgg" /></p></p></p>
`;

const layoutStyles = `
    <p>Nested rectangle with percentage dimensions and positionning</p>
    <div style="background-color:red;height:200px;">
        <div style="background-color:blue; width:80%; height:80%; top:10%; left:10%"></div>
    </div>
    <div style="background-color:red; height:200px; padding:20%; margin-top:30px;">
        <p style="color:white">Text inside a rectangle with a 20% padding</p>
    </div>
`;

const ignoringTagsAndStyles = `
    <p>The following tag (h2) is ignored with the "ignoredTags" prop</p>
    <h2>This shouldn't be rendered !</h2>
    <p>^^^ no title there ? great.</p>
    <p>The next div has a red background. It should be ignored with the "ignoredStyles" prop.</p>
    <div style="background-color:red;height:200px;width:200px;border-width:1px;"></div>
`;

export const snippets = { simpleLorem, simpleLoremWithImages, imagesWithinParagraphs, images404, trickyStuff, layoutStyles, ignoringTagsAndStyles };

export const EXAMPLES = {
    simpleLorem: { name: 'Simple lorem' },
    simpleLoremWithImages: { name: 'Simple lorem (images)' },
    imagesWithinParagraphs: { name: 'Images within paragraphs' },
    images404: { name: '404 images' },
    trickyStuff: { name: 'Tricky stuff' },
    layoutStyles: { name: 'Layout styles' },
    ignoringTagsAndStyles: { name: 'Ignoring tags & styles', props: { ignoredTags: ['h2'], ignoredStyles: ['background-color'] } }
};
