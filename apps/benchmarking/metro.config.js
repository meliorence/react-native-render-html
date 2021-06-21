const path = require('path');
const fs = require('fs');
const { getDefaultConfig } = require('expo/metro-config');

const packagesRoot = path.resolve(__dirname, '../../packages');
const docToolsRoot = path.resolve(__dirname, '../../doc-tools');

const localPkgs = fs.readdirSync(packagesRoot);
const docToolksPkgs = fs.readdirSync(docToolsRoot);

const watchFolders = localPkgs
  .map((f) => path.join(packagesRoot, f))
  .concat(docToolksPkgs.map((f) => path.join(docToolsRoot, f)));

module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);
  return {
    ...config,
    watchFolders,
    resolver: {
      extraNodeModules: new Proxy(
        {},
        {
          get: (target, name) => path.join(__dirname, `node_modules/${name}`)
        }
      )
    }
  };
})();
