const path = require('path');
const fs = require('fs');
const { getDefaultConfig } = require('@expo/metro-config');

const packagesRoot = path.resolve(__dirname, '../packages');

const localPkgs = fs.readdirSync(packagesRoot);

module.exports = (async () => {
  const { resolver, ...other } = await getDefaultConfig(__dirname);
  return {
    ...other,
    watchFolders: localPkgs.map((f) => path.join(packagesRoot, f)),
    resolver: {
      ...resolver,
      extraNodeModules: new Proxy(
        {},
        {
          get: (target, name) => path.join(__dirname, `node_modules/${name}`)
        }
      )
    }
  };
})();
