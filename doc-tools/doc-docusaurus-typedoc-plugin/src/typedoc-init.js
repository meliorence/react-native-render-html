//@ts-check

// Forked from https://github.com/TypeStrong/typedoc/blob/master/bin/typedoc
const td = require('typedoc');

/**
 * @param {import('typedoc').TypeDocOptions} options
 * @returns {import('typedoc').Application}
 */
module.exports = function init(options) {
  const app = new td.Application();

  app.options.addReader(new td.TypeDocReader());
  app.options.addReader(new td.TSConfigReader());

  app.bootstrap(options);

  if (app.logger.hasErrors()) {
    throw new Error('Typedoc plugin is misconfigured.');
  }

  if (app.options.getValue('entryPoints').length === 0) {
    app.logger.error('No entry points provided');
    throw new Error('Typedoc plugin is missing entryPoints.');
  }

  return app;
};
