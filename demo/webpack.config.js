const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const webpack = require('webpack');

// Expo CLI will await this method so you can optionally return a promise.
module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Allow named imports from CJS into ESM modules
  config.module.rules.push({
    type: 'javascript/auto',
    test: /\.mjs$/,
    use: []
  });
  config.module.rules.push({
    test: /^.*native.tsx?$/g,
    use: [{ loader: 'ignore-loader' }]
  });
  config.module.rules.push({
    test: /@gorhom\/bottom-sheet/g,
    use: [{ loader: 'ignore-loader' }]
  });

  // Ignore plugin incompatible with Web
  config.plugins.push(new webpack.IgnorePlugin(/@gorhom\/bottom-sheet/g));

  return config;
};
