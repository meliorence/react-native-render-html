//@ts-check
const path = require('path');
const init = require('./typedoc-init.js');
const genPages = require('./gen-pages.js');
const { readFile, mkdir, writeFile, unlink } = require('fs/promises');
const { existsSync } = require('fs');
const { Joi } = require('@docusaurus/utils-validation');

const optionsSchema = Joi.object({
  outDir: Joi.string().required(),
  version: Joi.string().required(),
  sidebarFile: Joi.string().required(),
  typedoc: {
    entryPoints: Joi.array().items(Joi.string()).required(),
    tsconfig: Joi.string(),
    excludePrivate: Joi.boolean()
  }
});

const name = 'doc-docusaurus-typedoc-plugin';
const reflectionsFile = 'reflections.json';

/**
 * @type {import('@docusaurus/types').PluginModule}
 * @param {import('@docusaurus/types').LoadContext} context
 * @param {{outDir: string; sidebarFile: string; id: string; version: string; typedoc: import('typedoc').TypeDocOptions}} options
 * @returns {import('@docusaurus/types').Plugin<import('typedoc').JSONOutput.ProjectReflection>}
 */
function plugin(
  { generatedFilesDir },
  { outDir, sidebarFile, version, typedoc, id = 'default' }
) {
  function getCachePath() {
    return path.join(generatedFilesDir, name, id);
  }

  function getReflectionPath() {
    return path.join(getCachePath(), reflectionsFile);
  }

  async function task__clearcache() {
    const reflectionPath = getReflectionPath();
    try {
      if (existsSync(reflectionPath)) {
        await unlink(reflectionPath);
      }
    } catch (e) {
      console.warn(e);
    }
  }

  /**
   * @param {boolean} clearCache
   */
  async function task__extractReflections(clearCache) {
    const reflectionPath = getReflectionPath();
    const cachePath = getCachePath();
    if (existsSync(reflectionPath)) {
      if (!clearCache) {
        try {
          const fileData = await readFile(reflectionPath);
          return JSON.parse(fileData.toString());
        } catch (e) {
          console.warn(e);
        }
      } else {
        await task__clearcache();
      }
    }
    /**@type {import('typedoc').Application} */
    const app = init(typedoc);
    const project = app.convert();
    if (!project) {
      throw new Error(
        'Typedoc plugin encountered a type error while generating reflections'
      );
    }
    const data = app.serializer.toObject(project);
    try {
      if (!existsSync(cachePath)) {
        await mkdir(cachePath, { recursive: true });
      }
      await writeFile(reflectionPath, JSON.stringify(data));
    } catch (e) {
      console.warn(e);
    }
    return data;
  }

  /**
   * @param {import('typedoc').JSONOutput.ProjectReflection} content
   */
  async function task__genPages(content) {
    try {
      await genPages(content, outDir, sidebarFile, outDir, version);
    } catch (e) {
      console.error(e);
      throw new Error(
        'Typedoc generator encountered an error while generating pages'
      );
    }
  }
  return {
    name,
    async loadContent() {
      return task__extractReflections(false);
    },
    async contentLoaded({ content, actions }) {
      //@ts-ignore
      const reflectionsIndex = Object.fromEntries(
        content.children.map((c) => [c.id, c])
      );
      // Add global data
      // https://docusaurus.io/fr/docs/lifecycle-apis#actions
      actions.setGlobalData(reflectionsIndex);
    },
    extendCli(cli) {
      cli
        .command('api:gen')
        .description('Generate API docs with typedoc')
        .action(async () => {
          const reflections = await task__extractReflections(true);
          await task__genPages(reflections);
        });
    }
  };
}

/**
 *
 * @param {import('@docusaurus/types').OptionValidationContext} context
 */
plugin.validateOptions = function validateOptions(context) {
  const { options, validate } = context;
  return validate(optionsSchema, options);
};

module.exports = plugin;
