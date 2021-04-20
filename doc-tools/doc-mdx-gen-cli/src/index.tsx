import genPage from './genPage';
import { pagesSpecs } from '@doc/pages';
import { program } from 'commander';
import path from 'path';
import fs from 'fs/promises';

async function docMdxGen(outDir: string) {
  const dirPath = path.join(process.cwd(), outDir);
  try {
    const dir = await fs.opendir(dirPath);
    await dir.close();
  } catch (e) {
    console.warn(`${outDir} cannot be read or isn't a directory.`);
    process.exit(1);
  }
  const specs = Object.values(pagesSpecs);
  await Promise.all(specs.map((s) => genPage(s, dirPath)));
}

program
  .version('0.1.0')
  .arguments('<outDir>')
  .description('@doc/mdx-gen-cli command', {
    outDir: 'the directory in which mdx files should be generated'
  })
  .action(docMdxGen);

program.parseAsync().catch((e) => {
  console.error(e);
});
