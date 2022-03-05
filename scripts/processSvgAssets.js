const fs = require('fs/promises');
const path = require('path');
const { optimize } = require('svgo');

const sourceDir = 'assets/doc/svg';
const targetDemoDir = 'apps/discovery/assets/svg';
const targetWebsiteDir = 'apps/website/src/svg';

const configPluginsFirstPass = [
  {
    name: 'preset-default',
  },
  'convertColors',
  'minifyStyles',
  {
    name: 'inlineStyles',
    params: {
      onlyMatchedOnce: false
    }
  },
  {
    name: 'convertStyleToAttrs',
    params: {
      convertArcs: true
    }
  }
]

async function optimizeSvgFile(assetName) {
  const sourceFile = path.join(sourceDir, assetName);
  const svg = await fs.readFile(sourceFile);
  const resultPass1 = optimize(svg, {
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
