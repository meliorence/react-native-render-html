import * as path from 'path';
import { readFile, mkdir, writeFile, unlink } from 'fs/promises';
import { existsSync } from 'fs';
import { Joi } from '@docusaurus/utils-validation';
import { HtmlTags, LoadContext, PluginModule } from '@docusaurus/types';
import { init } from 'rfg-api';
import { parseDOM } from 'htmlparser2';
import { Element } from 'domhandler';

const rfg = init();

const optionsSchema = Joi.object({
  icon: Joi.string().required(),
  apiKey: Joi.string().required(),
  name: Joi.string().required(),
  backgroundColor: Joi.string(),
  themeColor: Joi.string(),
  staticDir: Joi.string()
});

interface Options {
  icon: string;
  apiKey: string;
  name: string;
  id?: string;
  staticDir?: string;
  backgroundColor?: string;
  themeColor?: string;
}

const ICON_PATH = '/favicons';
const NAME = 'doc-docusaurus-rfg-plugin';

function generateFaviconAsync(request: any, dest: string) {
  return new Promise((res, rej) => {
    rfg.generateFavicon(request, dest, (error, success) => {
      if (error) {
        rej(error);
      } else {
        res(success);
      }
    });
  });
}

// TODO also clear favicon folder when cleaning.

//@ts-ignore
const plugin: PluginModule = function plugin(
  { baseUrl, generatedFilesDir }: LoadContext,
  {
    apiKey,
    icon,
    name,
    staticDir = 'static',
    backgroundColor = '#ffffff',
    themeColor = '#ffffff'
  }: Options
) {
  const faviconOutDir = path.join(staticDir, ICON_PATH);
  const cacheOutDir = path.join(generatedFilesDir, NAME);
  const headTagsCacheFile = path.join(cacheOutDir, 'headtags.json');
  const iconsPath = path.join(baseUrl, ICON_PATH);
  let headTags: HtmlTags[] = [];

  async function task__fetchAndWriteFiles() {
    const request = rfg.createRequest({
      apiKey,
      iconsPath,
      masterPicture: icon,
      design: {
        ios: {
          pictureAspect: 'noChange',
          assets: {
            ios6AndPriorIcons: false,
            ios7AndLaterIcons: false,
            precomposedIcons: false,
            declareOnlyDefaultIcon: true
          }
        },
        desktopBrowser: {
          design: 'raw'
        },
        windows: {
          pictureAspect: 'noChange',
          backgroundColor: backgroundColor,
          onConflict: 'override',
          assets: {
            windows80Ie10Tile: false,
            windows10Ie11EdgeTiles: {
              small: false,
              medium: true,
              big: false,
              rectangle: false
            }
          }
        },
        androidChrome: {
          pictureAspect: 'noChange',
          themeColor,
          backgroundColor,
          manifest: {
            display: 'standalone',
            orientation: 'notSet',
            onConflict: 'override',
            declared: true,
            name
          },
          assets: {
            legacyIcon: false,
            lowResolutionIcons: false
          }
        },
        safariPinnedTab: {
          pictureAspect: 'silhouette',
          themeColor
        }
      },
      settings: {
        scalingAlgorithm: 'Mitchell',
        errorOnImageTooSmall: false,
        readmeFile: false,
        htmlCodeFile: false,
        usePathAsIs: false
      }
    });
    console.info(
      'Generating favicons to',
      faviconOutDir,
      'This operation might take a while...'
    );
    const favIconData = await generateFaviconAsync(request, faviconOutDir);
    return task__fillHeadTags(favIconData);
  }

  function task__fillHeadTags(content: any) {
    const html = (content as any).favicon.html_code;
    const dom = parseDOM(html.replace(/\n/g, ''));
    return dom.map((n) => {
      const element = n as Element;
      return {
        tagName: element.tagName,
        attributes: element.attribs
      } as HtmlTags;
    });
  }

  async function task__cleanHeadTags() {
    if (existsSync(headTagsCacheFile)) {
      await unlink(headTagsCacheFile);
    }
  }

  async function task__storeHeadTags(data: HtmlTags[]) {
    if (!existsSync(cacheOutDir)) {
      await mkdir(cacheOutDir);
    }
    await writeFile(headTagsCacheFile, JSON.stringify(data));
  }

  async function task__fetchCachedHeadTags() {
    if (existsSync(headTagsCacheFile)) {
      const data = await readFile(headTagsCacheFile);
      return JSON.parse(data.toString()) as HtmlTags[];
    }
    return null;
  }

  return {
    name: NAME,
    async loadContent() {
      let data = await task__fetchCachedHeadTags();
      if (!data) {
        data = await task__fetchAndWriteFiles();
        await task__storeHeadTags(data);
      } else {
        console.info(
          'Favicons plugin has been loaded from the cache. If you want to invalidate this cache, regenerate favicons data with rfg:gen CLI command.'
        );
      }
      headTags = data;
      return null;
    },
    injectHtmlTags() {
      return { headTags };
    },
    extendCli(cli) {
      cli
        .command('rfg:gen')
        .description('Generate Favicon with Real Favicon Generator')
        .action(async () => {
          await task__cleanHeadTags();
          const data = await task__fetchAndWriteFiles();
          await task__storeHeadTags(data);
        });
    }
  };
};

plugin.validateOptions = function validateOptions(context) {
  const { options, validate } = context;
  return validate(optionsSchema, options);
};

module.exports = plugin;
