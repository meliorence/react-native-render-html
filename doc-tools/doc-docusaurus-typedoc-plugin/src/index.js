//@ts-check
const init = require('./typedoc-init.js');
const genPages = require('./gen-pages.js');
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

/**
 * @type {import('@docusaurus/types').PluginModule}
 * @param {import('@docusaurus/types').LoadContext} context
 * @param {{outDir: string; sidebarFile: string; id: string; version: string; typedoc: import('typedoc').TypeDocOptions}} options
 * @returns {import('@docusaurus/types').Plugin<import('typedoc').JSONOutput.ProjectReflection>}
 */
function plugin(context, { outDir, sidebarFile, version, typedoc }) {
  async function task__extractReflections() {
    /**@type {import('typedoc').Application} */
    const app = init(typedoc);
    const project = app.convert();
    if (!project) {
      throw new Error(
        'Typedoc plugin encountered a type error while generating reflections'
      );
    }
    return app.serializer.toObject(project);
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
    name: 'doc-docusaurus-typedoc-plugin',
    async loadContent() {
      return task__extractReflections();
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
          const reflections = await task__extractReflections();
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
