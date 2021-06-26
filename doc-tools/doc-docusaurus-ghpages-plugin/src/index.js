const path = require('path');
const fs = require('fs/promises');

// quick fix for GH pages trailing slash in root issue
// .com/root => .com/root/
async function fixIndex({ outDir, baseUrl, siteConfig: { url } }) {
  // Don't normalize if baseUrl is not defined
  if (!baseUrl) {
    return;
  }

  const projectName = baseUrl.replace(/\//g, '');
  const rootFile = path.join(outDir, projectName + '.html');

  // copy baseurl file to index
  if ((await fs.stat(rootFile)).isFile()) {
    await fs.copyFile(rootFile, path.join(outDir, 'index.html'));
  }
  // fix sitemap.xml
  const sitemap = path.join(outDir, 'sitemap.xml');
  const sitemapStr = await fs.readFile(sitemap);
  const rootUri = new URL(projectName, url).href;
  await fs.writeFile(
    sitemap,
    sitemapStr
      .toString()
      .replace(`<loc>${rootUri}</loc>`, `<loc>${rootUri}/</loc>`)
  );
}

module.exports = function () {
  return {
    plugin: 'doc-docusaurus-ghpages-plugin',
    async postBuild(props) {
      await fixIndex(props);
    }
  };
};
