const path = require('path');
const fs = require('fs');
const { getDefaultConfig } = require('metro-config');

const packagesRoot = path.resolve(__dirname, '../packages');

const localPkgs = fs.readdirSync(packagesRoot);

module.exports = (async () => {
  const {
    resolver: { sourceExts }
  } = await getDefaultConfig();
  return {
    watchFolders: localPkgs.map((f) => path.join(packagesRoot, f)),
    resolver: {
      sourceExts,
      extraNodeModules: new Proxy(
        {},
        {
          get: (target, name) => path.join(__dirname, `node_modules/${name}`)
        }
      )
    }
  };
})();
