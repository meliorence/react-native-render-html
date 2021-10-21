const fs = require('fs/promises');
const path = require('path');
const { extendDefaultPlugins, optimize } = require('svgo');
const processSvgWithInkscape = require('./processSvgWithInkscape.js');

const sourceDir = 'assets/doc/svg';
const targetDemoDir = 'apps/discovery/assets/svg';
const targetWebsiteDir = 'apps/website/src/svg';

const configPluginsFirstPass = extendDefaultPlugins([
  { name: 'convertColors', active: true },
  { name: 'minifyStyles', active: true },
  {
    name: 'inlineStyles',
    active: true,
    params: {
      onlyMatchedOnce: false
    }
  },
  {
    name: 'convertStyleToAttrs',
    active: true,
    params: {}
  }
]);

async function optimizeSvgFile(assetName) {
  const sourceFile = path.join(sourceDir, assetName);
  const svg = await fs.readFile(sourceFile);
  const inkscapeSvg = await processSvgWithInkscape(svg);
  const resultPass1 = optimize(inkscapeSvg, {
    multipass: true,
    plugins: configPluginsFirstPass
  });
  if (resultPass1.error) {
    throw new Error(resultPass1.error);
  }

  await fs.writeFile(path.join(targetDemoDir, assetName), resultPass1.data);
  await fs.writeFile(path.join(targetWebsiteDir, assetName), resultPass1.data);
}

async function run() {
  const assets = await fs.readdir(sourceDir);
  const targetDemoTasks = assets.map((asset) => optimizeSvgFile(asset));
  return Promise.all(targetDemoTasks);
}

run().catch((e) => console.error(e));
